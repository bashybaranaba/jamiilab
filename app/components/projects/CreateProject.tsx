import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

//import { Web3Storage } from "web3.storage";

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
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { TransitionProps } from "@mui/material/transitions";

import AddBoxIcon from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";

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
  const [activeStep, setActiveStep] = React.useState(1);
  const [next, setNext] = React.useState(false);
  const [finish, setFinish] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [price, setPrice] = React.useState<number>(0);
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState(null);

  useEffect(() => {
    if (activeStep === steps.length) {
      setFinish(true);
    }
  }, [activeStep]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
  };

  const handleBack = () => {
    const nextStep = activeStep - 1;
    setActiveStep(nextStep);
    setFinish(false);
  };

  async function CreateArtCollection() {}

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
          m: 2,
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
        <Container maxWidth="sm">
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
            <Box sx={{ width: "100%", mt: 4, mb: 4 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            {activeStep === 1 ? <p>Step 1</p> : null}
            {activeStep === 2 ? <p>Step 2</p> : null}
            {activeStep === 3 ? <p>Step 3</p> : null}
            <Grid container spacing={2}>
              <Grid item xs={activeStep === 1 ? 0 : 6}>
                {activeStep !== 1 ? (
                  <Button
                    fullWidth
                    variant="outlined"
                    component="label"
                    sx={{ textTransform: "none", mt: 2 }}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                ) : null}
              </Grid>
              <Grid item xs={activeStep === 1 ? 12 : 6}>
                <Button
                  fullWidth
                  variant="contained"
                  component="label"
                  sx={{ textTransform: "none", mt: 2 }}
                  onClick={finish ? CreateArtCollection : handleNext}
                  disabled={files.length < 1 || !name}
                >
                  {finish ? (
                    loading ? (
                      <CircularProgress size={25} sx={{ color: "#fff" }} />
                    ) : (
                      "Finish"
                    )
                  ) : (
                    "Next"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
