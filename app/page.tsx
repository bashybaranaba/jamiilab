"use client";

import { Box, Divider, Grid, Typography } from "@mui/material";
import AppNavBar from "./components/layout/AppNavBar";
import { DrawerHeader } from "./components/layout/DrawerHeader";
import ProjectsList from "./components/projects/ProjectsList";

export default function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Box
          sx={{
            p: 1,
            backgroundColor: "#f9fbe7",
            backgroundImage:
              "linear-gradient(#80deea 0.8px, transparent 0.5px), linear-gradient(to right, #80deea 0.8px, #fafafa 0.5px)",
            backgroundSize: "20px 20px",
          }}
        >
          <Grid
            container
            height="62vh"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Typography
              variant="h2"
              sx={{
                backgroundImage: "linear-gradient(200deg, #1e88e5, #1a237e)",
                backgroundClip: "text",
                textFillColor: "transparent",
                fontWeight: 700,
              }}
            >
              Decentralized
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 600,
              }}
            >
              People-Powered Science
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 3 }}>
              Discover, teach, learn and and get rewarded for
            </Typography>
            <Typography variant="h6" color="text.secondary">
              contributing to research projects
            </Typography>
          </Grid>
        </Box>
        <Box sx={{ p: 5 }}>
          <Grid
            container
            height="12vh"
            alignItems="center"
            justifyContent="center"
            direction="column"
            sx={{ mt: 2 }}
          >
            <Typography variant="h5">Explore projects</Typography>
            <Divider
              sx={{
                width: "74px",
                height: "3px",
                mt: 1.5,
                backgroundColor: "#283593",
              }}
            />
          </Grid>
          <br />
          <br />
          <ProjectsList projets={[1, 2, 3, 4]} />
        </Box>
      </Box>
    </Box>
  );
}
