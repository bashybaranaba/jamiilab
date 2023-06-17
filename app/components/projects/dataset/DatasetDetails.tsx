import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Grid,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";

import DatasetPreviewTable from "@/app/components/projects/dataset/DatasetPreview";
import AddDataContribution from "@/app/components/projects/dataforms/AddDataContribution";
import ChangeDatasetPrice from "@/app/components/projects/dataset/ChangeDatasetPrice";
import GetDataset from "./GetDataset";

import TollIcon from "@mui/icons-material/Toll";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

interface Props {
  userAddress: string;
  projectData: {
    id: string;
    owner: string;
    members: string[];
    name: string;
    dataset_downloads: number;
  };
  formFields: any;
  dataColumns: any;
  dataRows: any;
  totalDatapointsCount: number;
  pricePerDatapoint: number;
}

export default function DatasetDetails(props: Props) {
  const {
    userAddress,
    projectData,
    formFields,
    dataColumns,
    dataRows,
    totalDatapointsCount,
    pricePerDatapoint,
  } = props;

  const [overallPrice, setOverallPrice] = React.useState(0);

  useEffect(() => {
    calculateOverallPrice();
  }, [pricePerDatapoint]);

  const calculateOverallPrice = () => {
    const calculatedOveralprice = totalDatapointsCount * pricePerDatapoint;
    const datapointPricetoString = pricePerDatapoint.toString();
    const decimalPlaces = pricePerDatapoint.toString().split(".")[1]
      ? datapointPricetoString.split(".")[1].length
      : 0;
    const datasetprice = parseFloat(
      calculatedOveralprice.toFixed(decimalPlaces ? decimalPlaces : 0)
    );
    setOverallPrice(datasetprice);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}>
        <Box sx={{ display: "flex", m: 1 }}>
          <RemoveRedEyeOutlinedIcon
            color="primary"
            sx={{ fontSize: 30, mr: 1 }}
          />
          <Typography variant="h5">Dataset Preview</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} lg={4}>
        <AddDataContribution
          userAddress={userAddress}
          projectData={projectData}
          formFields={formFields}
        />
      </Grid>
      <Grid item xs={12} lg={12}>
        <DatasetPreviewTable columns={dataColumns} rows={dataRows} />
      </Grid>
      <Grid item xs={12} lg={7}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Dataset Details
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography variant="body1" color="text.secondary">
            Dataset Field Names:{" "}
          </Typography>
          <Typography variant="body1">
            {" "}
            {dataColumns.map((column: any) => column.headerName + ", ")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="body1" color="text.secondary">
            Number of Columns in Dataset:{" "}
          </Typography>
          <Typography variant="body1">{dataColumns.length}</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="body1" color="text.secondary">
            Number of Rows in Dataset:{" "}
          </Typography>
          <Typography variant="body1">{dataRows.length}</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="body1" color="text.secondary">
            Number of datapoints:{" "}
          </Typography>
          <Typography variant="body1">{totalDatapointsCount}</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="body1" color="text.secondary">
            Number of missing values:{" "}
          </Typography>
          <Typography variant="body1">
            {totalDatapointsCount - dataRows.length}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Card
          elevation={0}
          sx={{
            m: 1,
            border: 1,
            borderRadius: 2,
            borderColor: "#3949ab",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", m: 1 }}>
              <TollIcon />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Dataset Price: {overallPrice}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", m: 1 }}>
              <TollIcon />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Price/Datapoint: {pricePerDatapoint}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", m: 1 }}>
              <FileDownloadOutlinedIcon />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Downloads:{" "}
                {projectData.dataset_downloads && projectData.dataset_downloads}
              </Typography>
            </Box>

            <Box sx={{ m: 2 }} />
            {userAddress === projectData.owner ? (
              <ChangeDatasetPrice
                projectData={projectData}
                datapoints={totalDatapointsCount}
                pricePerDatapoint={pricePerDatapoint}
              />
            ) : (
              dataRows.length > 0 && (
                <GetDataset
                  datasetPrice={overallPrice}
                  projectData={projectData}
                  dataColumns={dataColumns}
                  dataRows={dataRows}
                />
              )
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
