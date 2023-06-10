"use client";
import { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import ProjectBanner from "@/app/components/projects/ProjectBanner";
import CreateDataField from "@/app/components/projects/dataforms/CreateDataField";

const dummydata = {
  image: "",
  name: "Test Project",
  headline: "Test Headline",
};
export default function Projects() {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };
  return (
    <Box>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderColor: "divider", mr: 3, ml: 3 }}>
            <AppBar position="fixed" sx={{ bgcolor: "#fff" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ ml: 2, mt: 2, mb: -4, color: "#263238" }}
              >
                JamiiLab
              </Typography>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
              >
                <Tab
                  label="About"
                  value="1"
                  sx={{ textTransform: "none", mr: 2, ml: 2 }}
                />
                <Tab
                  label="Test"
                  value="2"
                  sx={{ textTransform: "none", mr: 2, ml: 2 }}
                />
              </TabList>
            </AppBar>
          </Box>
          <Box sx={{ mt: 6 }}>
            <TabPanel value="1">
              <ProjectBanner projectData={dummydata} />
            </TabPanel>
            <TabPanel value="2">
              <Container maxWidth="md">
                <CreateDataField />
              </Container>
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
}
