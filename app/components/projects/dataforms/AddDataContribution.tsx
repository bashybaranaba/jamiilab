import React, { useEffect } from "react";
import { db } from "@/lib/polybase_init";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import AddIcon from "@mui/icons-material/Add";

import { generateUniqueId } from "@/app/components/util/GenerateUniqueId";
import PresentedDataField from "./PresentedDataField";

import { CitizenScienceRewardsAddress } from "@/lib/config.js";
import CitizenScienceRewards from "@/lib/CitizenScienceRewards.json";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  userAddress: string;
  projectData: {
    id: string;
    owner: string;
    members: string[];
  };
  formFields: any;
}

export default function AddDataContribution(props: Props) {
  const { userAddress, projectData, formFields } = props;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [dataValues, setDataValues] = React.useState({});
  const [dataAdded, setDataAdded] = React.useState(false);

  useEffect(() => {
    if (Object.keys(dataValues).length > 0) {
      setDataAdded(true);
    }
  }, [dataValues]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function addMember() {
    setLoading(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const newMembersList = [...projectData.members, signerAddress];
    const collectionReference = db.collection("Project");

    let contract = new ethers.Contract(
      CitizenScienceRewardsAddress,
      CitizenScienceRewards.abi,
      signer
    );
    try {
      const editData = await collectionReference
        .record(projectData.id)
        .call("updateMembers", [newMembersList]);
      console.log(editData);
      const projectBlockId = await contract.getProjectBlockId(projectData.id);
      await contract.addContributor(projectBlockId.toNumber());
      setLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  const getFieldValues = (value: any, id: any) => {
    setDataValues({ ...dataValues, [id]: value });
  };

  console.log(dataValues);

  async function SubmitData() {
    setLoading(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const collectionReference = db.collection("DataContribution");

    let contract = new ethers.Contract(
      CitizenScienceRewardsAddress,
      CitizenScienceRewards.abi,
      signer
    );
    try {
      const dataContribution = await collectionReference.create([
        generateUniqueId(),
        projectData.id,
        userAddress,
        Object.keys(dataValues),
        Object.values(dataValues),
      ]);
      console.log(dataContribution.data.id);
      const projectBlockId = await contract.getProjectBlockId(projectData.id);
      await contract.contribute(
        projectBlockId.toNumber(),
        Object.keys(dataValues).length,
        dataContribution.data.id
      );
      setLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Box>
        {projectData.members.includes(userAddress) ? (
          !loading && (
            <Button
              fullWidth
              variant="contained"
              onClick={handleClickOpen}
              startIcon={<AddIcon />}
              sx={{
                textTransform: "none",
              }}
            >
              Add data to the project
            </Button>
          )
        ) : (
          <Button
            fullWidth
            variant="contained"
            onClick={addMember}
            startIcon={<AddIcon />}
            sx={{
              textTransform: "none",
            }}
          >
            {!loading ? (
              projectData.owner === userAddress ? (
                "Start adding data to the project"
              ) : (
                "Join to add data to the project"
              )
            ) : (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            )}
          </Button>
        )}
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Container maxWidth="sm" sx={{ mt: -6 }}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              sx={{ ml: 2, flex: 1, fontWeight: 600 }}
              variant="h5"
              component="div"
            >
              Add data to the project
            </Typography>

            {formFields ? (
              formFields.map((field: any) => (
                <PresentedDataField
                  fieldData={field.data}
                  getFieldValues={getFieldValues}
                  key={field.data.id}
                />
              ))
            ) : (
              <Typography>This project has no fields yet</Typography>
            )}

            <Grid container>
              <Button
                fullWidth
                variant="contained"
                component="label"
                sx={{ textTransform: "none", mt: 2 }}
                onClick={SubmitData}
                disabled={!dataAdded}
              >
                {loading ? (
                  <CircularProgress size={25} sx={{ color: "#fff" }} />
                ) : (
                  "Submit Data"
                )}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
