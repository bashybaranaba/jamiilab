"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/polybase_init";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";

import { CitizenScienceRewardsAddress } from "@/lib/config.js";
import CitizenScienceRewards from "@/lib/CitizenScienceRewards.json";

interface Props {
  projectData: {
    id: string;
    owner: string;
    name: string;
    dataset_downloads: number;
  };
  dataColumns: any;
  dataRows: any;
  datasetPrice: number;
}

export default function GetDataset(props: Props) {
  const { projectData, datasetPrice, dataColumns, dataRows } = props;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getDataset() {
    setLoading(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(
      CitizenScienceRewardsAddress,
      CitizenScienceRewards.abi,
      signer
    );
    setLoading(true);
    try {
      const collectionReference = db.collection("Project");

      const projectBlockId = await contract.getProjectBlockId(projectData.id);
      const purchase = await contract.purchaseDataset(
        projectBlockId.toNumber(),
        {
          value: ethers.utils.parseEther(datasetPrice.toString()),
        }
      );
      console.log(purchase);
      if (purchase) {
        const editData = await collectionReference
          .record(projectData.id)
          .call("updateDownloads", [1]);
        console.log(editData);
        downloadDataset();
        setLoading(false);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const downloadDataset = async () => {
    //get the dataset columns and rows and download it as a csv file
    const columns = dataColumns;
    const data = dataRows;
    const headers = columns.map((column: any) => column.headerName);
    const rows = data.map((row: any) =>
      columns.map((column: any) => row[column.field])
    );
    const csvRows = [headers, ...rows].map((row) => row.join(","));
    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "dataset.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <Box>
        <Button
          fullWidth
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            textTransform: "none",
          }}
        >
          Get Dataset
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Get Dataset</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontWeight: 600 }} variant="h3" component="div">
            Pay: {datasetPrice}
          </Typography>

          <Typography variant="body2" component="div" color="text.secondary">
            Pay {datasetPrice} to get the dataset of this project. You will be
            able to download the dataset after the payment is confirmed.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            component="label"
            sx={{ textTransform: "none", mt: 2 }}
            onClick={getDataset}
          >
            {loading ? (
              <CircularProgress size={25} sx={{ color: "#fff" }} />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
