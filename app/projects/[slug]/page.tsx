"use client";
import { useEffect, useState } from "react";
import { useCollection } from "@polybase/react";
import { db } from "@/lib/polybase_init";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

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
import AddDataContribution from "@/app/components/projects/dataforms/AddDataContribution";

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
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [value, setValue] = useState("1");
  const [datafieldsCount, setDatafieldsCount] = useState(0);
  const [userAddress, setUserAddress] = useState("");

  const { slug } = params;
  const id = slug.split("-lab")[1];
  console.log("id: ", id);

  //Project metadata
  const projectDetailsQuery = db.collection("Project").where("id", "==", id);
  const projectDetails = useCollection(projectDetailsQuery);
  const project: any = projectDetails.data?.data[0]?.data;

  //Project datafields
  const datafieldsQuery = db
    .collection("DataField")
    .where("project_id", "==", id);
  const datafieldsCollection = useCollection(datafieldsQuery);
  console.log("datafieldsCollection: ", datafieldsCollection);
  const datafields: any = datafieldsCollection.data?.data;
  console.log("Saved datafields: ", datafields);

  useEffect(() => {
    if (!userAddress) {
      getUserAddress();
    }
  }, []);

  async function getUserAddress() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setUserAddress(address);
  }

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
                {project?.name}
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
                {!project || !userAddress ? null : userAddress ===
                  project?.owner ? (
                  <Tab
                    label="Data Fields"
                    value="3"
                    sx={{ textTransform: "none", mr: 2, ml: 2 }}
                  />
                ) : null}
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
                {project && <ProjectBanner projectData={project} />}
              </Container>
            </TabPanel>
            <TabPanel value="2">
              <Container maxWidth="md">
                <Box sx={{ mt: 2 }}>
                  {project && (
                    <Box>
                      <DatasetPreviewTable
                        columns={dummydata.columns}
                        rows={dummydata.rows}
                      />
                      <AddDataContribution
                        userAddress={userAddress}
                        projectData={project}
                        formFields={datafields}
                      />
                    </Box>
                  )}
                </Box>
              </Container>
            </TabPanel>
            <TabPanel value="3">
              <Container maxWidth="md">
                {!project || !userAddress ? null : userAddress ===
                  project?.owner ? (
                  <DataFields
                    savedDatafields={datafields}
                    error={datafieldsCollection?.error?.reason}
                    projectId={id}
                  />
                ) : null}
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
