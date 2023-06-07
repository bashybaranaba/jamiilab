"use client";

import { Box } from "@mui/system";
import AppNavBar from "./components/layout/AppNavBar";
import { DrawerHeader } from "./components/layout/DrawerHeader";
import ProjectsList from "./components/projects/ProjectsList";

export default function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <ProjectsList projets={[1, 2, 3, 4]} />
      </Box>
    </Box>
  );
}
