import React, { useState } from "react";
import { db } from "@/lib/polybase_init";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";

import EditIcon from "@mui/icons-material/Edit";

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

interface Props {
  projectData: {
    id: string;
    name: string;
    headline: string;
    about: string;
    feature_image: string;
    is_archived: number;
  };
}

export default function EditProject(props: Props) {
  const { projectData } = props;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(projectData.name);
  const [headline, setHeadline] = useState(projectData.headline);
  const [description, setDescription] = useState(projectData.about);
  const [imageUri, setImageUri] = useState(projectData.feature_image);
  const [isArchived, setIsArchived] = useState(projectData.is_archived);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function EditProject() {
    const collectionReference = db.collection("Project");
    try {
      const projectDetails = await collectionReference
        .record(projectData.id)
        .call("editProject", [
          name,
          headline,
          description,
          imageUri,
          isArchived,
        ]);
      console.log(projectDetails.data.id);
      setLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<EditIcon />}
        sx={{
          textTransform: "none",
          m: 1,
        }}
      >
        Edit
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
              Edit Project
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
                  value={name}
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
                value={headline}
              />
              <TextField
                variant="outlined"
                label="Project Description"
                fullWidth
                multiline
                rows={8}
                sx={{ mt: 2 }}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <Button
                fullWidth
                variant="contained"
                component="label"
                sx={{ textTransform: "none", mt: 2 }}
                onClick={EditProject}
                disabled={!name || !headline}
              >
                {loading ? (
                  <CircularProgress size={25} sx={{ color: "#fff" }} />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
