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
import DatasetPreviewTable from "@/app/components/projects/dataset/DatasetPreview";
import EditDataField from "@/app/components/projects/dataforms/EditDataField";
import CreateDataField from "@/app/components/projects/dataforms/CreateDataField";
import DataFields from "@/app/components/projects/dataforms/DataFields";

const dummydata = {
  image: "",
  name: "Test Project",
  headline: "Test Headline",

  columns: [
    { field: "name", headerName: "Name" },
    { field: "age", headerName: "Age" },
  ],
  rows: [
    { id: 1, name: "John", age: 20 },
    { id: 2, name: "Jane", age: 30 },
  ],
};
export default function Projects() {
  const [value, setValue] = useState("1");
  const [datafields, setDatafields] = useState<any>([]);
  const [datafieldsCount, setDatafieldsCount] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };

  //Datafield functions
  const getOption = (option: string) => {
    setOptions([...options, option]);
  };

  const addOption = () => {
    const numberOfOptions = optionsCount + 1;
    setOptionCount(numberOfOptions);
  };

  const removeOption = (option: string) => {
    const filteredOptions = options.filter((item: string) => item !== option);
    setOptions(filteredOptions);
  };

  const removeOptionField = () => {
    const numberOfOptions = optionsCount - 1;
    setOptionCount(numberOfOptions);
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
                Project Name
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
                  label="Dataset"
                  value="2"
                  sx={{ textTransform: "none", mr: 2, ml: 2 }}
                />
                <Tab
                  label="Data Fields"
                  value="3"
                  sx={{ textTransform: "none", mr: 2, ml: 2 }}
                />
                <Tab
                  label="Forum"
                  value="4"
                  sx={{ textTransform: "none", mr: 2, ml: 2 }}
                />
              </TabList>
            </AppBar>
          </Box>
          <Box sx={{ mt: 6 }}>
            <TabPanel value="1">
              <Container maxWidth="lg">
                <ProjectBanner projectData={dummydata} />
              </Container>
            </TabPanel>
            <TabPanel value="2">
              <Container maxWidth="md">
                <Box sx={{ mt: 2 }}>
                  <DatasetPreviewTable
                    columns={dummydata.columns}
                    rows={dummydata.rows}
                  />
                </Box>
              </Container>
            </TabPanel>
            <TabPanel value="3">
              <Container maxWidth="md">
                <DataFields />
              </Container>
            </TabPanel>
            <TabPanel value="4">
              <Container maxWidth="md">Coming soon</Container>
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
}
