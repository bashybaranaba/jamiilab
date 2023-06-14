"use client";
import { useState } from "react";
import { Box, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AppNavBar from "../components/layout/AppNavBar";
import { DrawerHeader } from "../components/layout/DrawerHeader";
import ProjectsList from "../components/projects/ProjectsList";
import StatBox from "../components/stats/StatBox";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";

export default function Projects() {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <DrawerHeader />
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Grid container>
            <StatBox
              text="Total projects"
              icon={<FilterNoneOutlinedIcon />}
              value={5}
              bgcolor="#e3f2fd"
            />

            <StatBox
              text="Total contributions"
              icon={<FilterNoneOutlinedIcon />}
              value={5}
              bgcolor="#e3f2fd"
            />

            <StatBox
              text="Total Achievements"
              icon={<FilterNoneOutlinedIcon />}
              value={5}
              bgcolor="#e3f2fd"
            />
          </Grid>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mr: 3, ml: 3 }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
              >
                <Tab
                  label="Joined"
                  value="1"
                  sx={{ textTransform: "none", mr: 4, ml: 4 }}
                />
                <Tab
                  label="Owned"
                  value="2"
                  sx={{ textTransform: "none", mr: 4, ml: 4 }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ProjectsList projets={[1, 2, 3]} />
            </TabPanel>
            <TabPanel value="2">
              <ProjectsList projets={[1, 2]} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
}
