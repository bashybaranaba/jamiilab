import React from "react";

import { Box, Grid, Paper, Typography } from "@mui/material";
import EditProject from "./EditProject";

interface Props {
  userAddress: string;
  projectData: {
    id: string;
    name: string;
    headline: string;
    about: string;
    feature_image: string;
    owner: string;
    is_archived: number;
  };
}
export default function ProjectBanner(props: Props) {
  const { feature_image, name, headline, owner } = props.projectData;
  const { userAddress, projectData } = props;
  return (
    <div>
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "#263238",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: "url(" + feature_image + ")",
          borderRadius: 3,
          m: 2,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            background:
              "linear-gradient(45deg, rgba(0,0,0,.7) 30%, rgba(0,0,0,.4) 70%)",
            borderRadius: 3,
          }}
        />
        <Grid container>
          <Grid item md={7}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 7 },
                pr: { md: 0 },
              }}
            >
              <Box sx={{ m: 2 }} />
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {name}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {headline}
              </Typography>
              <Box sx={{ m: 8 }} />
            </Box>
          </Grid>
          <Box sx={{ flexGrow: 1 }} />
        </Grid>
        {userAddress === owner && <EditProject projectData={projectData} />}
      </Paper>
    </div>
  );
}
