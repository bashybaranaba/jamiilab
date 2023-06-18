"use client";
import { useEffect, useState } from "react";
import { useCollection } from "@polybase/react";
import { db } from "@/lib/polybase_init";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Container,
  Fab,
  LinearProgress,
  Tab,
  Tooltip,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";

import ProjectBanner from "@/app/components/projects/ProjectBanner";
import DataFields from "@/app/components/projects/dataforms/DataFields";
import AboutProject from "@/app/components/projects/AboutProject";
import DatasetDetails from "@/app/components/projects/dataset/DatasetDetails";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [value, setValue] = useState("1");
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

  //Project data contributions
  const dataQuery = db
    .collection("DataContribution")
    .where("project_id", "==", id);
  const dataCollection = useCollection(dataQuery);
  const dataContributions: any = dataCollection.data?.data;
  console.log("Data contributions: ", dataContributions);

  const dataColumns = datafields?.map((datafield: any) => {
    return {
      field: datafield.data.id,
      headerName: datafield.data.name,
    };
  });
  console.log("Data columns: ", dataColumns);

  const dataRows = dataContributions?.map((dataContribution: any) => {
    const dataRow: any = {};
    //get datafield id which is dataContribution.data.keys[i] and corresponding value which id dataContribution.data.values[i]
    if (dataContribution.data.keys) {
      for (let i = 0; i < dataContribution.data.keys.length; i++) {
        dataRow.id = dataContribution.data.id;
        dataRow[dataContribution.data.keys[i]] =
          dataContribution.data.values[i];
      }
    }
    return dataRow;
  });
  console.log("Data rows: ", dataRows);

  //Project total datapoints count: if value isan empty string do not count it
  let totalDatapointsCount = 0;
  dataContributions?.forEach((dataContribution: any) => {
    if (!dataContribution.data.values) return;
    dataContribution.data.values.forEach((value: any) => {
      if (value !== "") {
        totalDatapointsCount++;
      }
    });
  });

  console.log("Total datapoints count: ", totalDatapointsCount);

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

  const router = useRouter();

  const handleBacktoProjects = (e: any) => {
    e.preventDefault();
    router.push(`/projects`);
  };
  const myProjectsButton = (
    <Box sx={{ position: "fixed" }}>
      <Tooltip title="back to projects">
        <Fab
          onClick={handleBacktoProjects}
          color="primary"
          sx={{ mt: 3, mb: -10 }}
        >
          <ScienceOutlinedIcon />
        </Fab>
      </Tooltip>
    </Box>
  );

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
        }}
      >
        {!project ? <LinearProgress /> : null}
        <TabContext value={value}>
          <Box sx={{ borderColor: "divider", mr: 3, ml: 3 }}>
            <AppBar position="fixed" sx={{ bgcolor: "#fff" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ ml: 4, mt: 2, mb: -4, color: "#263238" }}
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
              {myProjectsButton}
              <Container maxWidth="lg">
                {project && (
                  <Box>
                    <ProjectBanner
                      projectData={project}
                      userAddress={userAddress}
                    />
                    <Box sx={{ m: 3 }}>
                      <AboutProject
                        projectData={project}
                        userAddress={userAddress}
                        dataContributions={
                          dataContributions ? dataContributions.length : 0
                        }
                        formFields={datafields}
                      />
                    </Box>
                  </Box>
                )}
              </Container>
            </TabPanel>
            <TabPanel value="2">
              {myProjectsButton}
              <Container maxWidth="md">
                <Box sx={{ mt: 2 }}>
                  {project && (
                    <Box>
                      <DatasetDetails
                        userAddress={userAddress}
                        projectData={project}
                        formFields={datafields}
                        totalDatapointsCount={totalDatapointsCount}
                        pricePerDatapoint={
                          project.price_per_datapoint
                            ? project.price_per_datapoint
                            : 0
                        }
                        dataColumns={dataColumns}
                        dataRows={dataRows}
                      />
                    </Box>
                  )}
                </Box>
              </Container>
            </TabPanel>
            <TabPanel value="3">
              {myProjectsButton}
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
              {myProjectsButton}
              <Container maxWidth="md">Coming soon</Container>
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
}
