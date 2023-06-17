import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
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
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";

import AddBoxIcon from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";

import ImageUpload from "../util/ImageUpload";
import { CardMedia, Paper } from "@mui/material";
import { generateUniqueId } from "@/app/components/util/GenerateUniqueId";

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

const steps = ["Upload files", "Add details", "Confirm details"];

interface Props {
  minimized: boolean;
}

export default function CreateProject(props: Props) {
  const { minimized } = props;
  const router = useRouter();
  const storageToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg2YWIyOTRhMTQ1RThENkU0ZDFCNmNlRTcwODAxZGNDMTkyOWQ5NzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzc5Mzg1Mjg3MTQsIm5hbWUiOiJGb2xpb2hvdXNlIn0.2mttZrpJ6UBXcJwqr28iUb1rV8cqR5Y0MuxhZp-h9n4";

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [headline, setHeadline] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageUri, setImageUri] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function CreateProject() {
    setLoading(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const collectionReference = db.collection("Project");

    let contract = new ethers.Contract(
      CitizenScienceRewardsAddress,
      CitizenScienceRewards.abi,
      signer
    );

    try {
      const members: any[] = [];
      const projectDetails = await collectionReference.create([
        generateUniqueId(),
        signerAddress,
        name,
        headline,
        description,
        imageUri,
        members,
        0,
        0,
      ]);
      console.log(projectDetails.data.id);
      await contract.createProject(projectDetails.data.id);
      setLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ListItemButton
        onClick={handleClickOpen}
        sx={{
          display: minimized ? "block" : "none",
          justifyContent: "center",
          px: 2.0,
        }}
      >
        <ListItemIcon
          sx={{
            color: "#283593",
            minWidth: 0,
            mr: "auto",
            justifyContent: "center",
          }}
        >
          <AddBoxIcon sx={{ fontSize: 32 }} />
        </ListItemIcon>
      </ListItemButton>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        sx={{
          textTransform: "none",
          display: minimized ? "none" : "flex",
        }}
      >
        Create new project
      </Button>
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
              Create a new Project
            </Typography>

            {imageUri && (
              <CardMedia
                component="img"
                height="130"
                image={imageUri}
                sx={{ mt: 2, borderRadius: 3 }}
              />
            )}
            <Grid container>
              <Grid item xs={10} lg={10}>
                <TextField
                  variant="outlined"
                  label="Project Name"
                  fullWidth
                  sx={{ mt: 2 }}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={2} lg={2}>
                <Box sx={{ ml: 2, mt: 2 }}>
                  <ImageUpload setImageUri={setImageUri} />
                </Box>
              </Grid>

              <TextField
                variant="outlined"
                label="Project Headline"
                fullWidth
                multiline
                rows={2}
                sx={{ mt: 2 }}
                onChange={(e) => setHeadline(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="Project Description"
                fullWidth
                multiline
                rows={8}
                sx={{ mt: 2 }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                component="label"
                sx={{ textTransform: "none", mt: 2 }}
                onClick={CreateProject}
                disabled={!name || !headline}
              >
                {loading ? (
                  <CircularProgress size={25} sx={{ color: "#fff" }} />
                ) : (
                  "Create Project"
                )}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
