"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/polybase_init";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { Box, Grid, LinearProgress, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AppNavBar from "../components/layout/AppNavBar";
import { DrawerHeader } from "../components/layout/DrawerHeader";
import ProjectsList from "../components/projects/ProjectsList";
import StatBox from "../components/stats/StatBox";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";

export default function Projects() {
  const [value, setValue] = useState("1");
  const [ownedProjects, setOwnedProjects] = useState<any>([]);
  const [joinedProjects, setJoinedProjects] = useState<any>([]);
  const [contributions, setContributions] = useState<any>([]);
  const [loadingOwnedState, setLoadingOwnedState] = useState("not-loaded");
  const [loadingJoinedState, setLoadingJoinedState] = useState("not-loaded");
  const [loadingOwned, setLoadingOwned] = useState(false);
  const [loadingJoined, setLoadingJoined] = useState(false);

  useEffect(() => {
    loadProjectsData();
  }, []);

  async function loadProjectsData() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    getOwnedProjects(address);
    getJoinedProjects(address);
    getDataContributions(address);
  }

  const getOwnedProjects = async (address: string) => {
    setLoadingOwned(true); // loading state
    const recordsOwned = await db
      .collection("Project")
      .where("owner", "==", address)
      .sort("id", "desc")
      .get();

    const ownedProjects: any = recordsOwned.data;

    setOwnedProjects(ownedProjects);
    setLoadingOwned(false); // loading state
    setLoadingOwnedState("loaded");
  };

  const getJoinedProjects = async (address: string) => {
    setLoadingJoined(true); // loading state
    const recordsAll = await db.collection("Project").sort("id", "desc").get();

    const allProjects: any = recordsAll.data;
    const filterJoinedProjects = allProjects.filter((project: any) => {
      return project.data.members?.includes(address);
    });

    setJoinedProjects(filterJoinedProjects);
    setLoadingJoined(false); // loading state
    setLoadingJoinedState("loaded");
  };

  const getDataContributions = async (address: string) => {
    const contributionRecords = await db
      .collection("DataContribution")
      .where("contributor", "==", address)
      .sort("id", "desc")
      .get();

    const myContributions: any = contributionRecords.data;
    console.log("myContributions", myContributions);
    setContributions(myContributions);
    setLoadingOwned(false); // loading state
    setLoadingOwnedState("loaded");
  };

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
              text="Owned projects"
              icon={<BadgeOutlinedIcon sx={{ fontSize: 24 }} />}
              value={ownedProjects.length}
              bgcolor="#e3f2fd"
            />

            <StatBox
              text="Joined projects"
              icon={<GroupsOutlinedIcon sx={{ fontSize: 24 }} />}
              value={joinedProjects.length}
              bgcolor="#e3f2fd"
            />

            <StatBox
              text="Total Contributions"
              icon={<AddchartOutlinedIcon sx={{ fontSize: 24 }} />}
              value={contributions.length}
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
                  label="Owned"
                  value="1"
                  sx={{ textTransform: "none", mr: 4, ml: 4 }}
                />
                <Tab
                  label="Joined"
                  value="2"
                  sx={{ textTransform: "none", mr: 4, ml: 4 }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              {loadingOwned ? <LinearProgress sx={{ ml: 2, mr: 2 }} /> : null}
              <ProjectsList projects={ownedProjects} />
              {loadingOwnedState === "loaded" && !ownedProjects.length ? (
                <Box sx={{ m: 3 }}>
                  <Typography variant="h6">
                    You do not own any project yet
                  </Typography>
                </Box>
              ) : null}
            </TabPanel>
            <TabPanel value="2">
              {loadingJoined ? <LinearProgress sx={{ ml: 2, mr: 2 }} /> : null}
              <ProjectsList projects={joinedProjects} />
              {loadingJoinedState === "loaded" && !joinedProjects.length ? (
                <Box sx={{ m: 3 }}>
                  <Typography variant="h6">
                    You have not joined any projects yet
                  </Typography>
                </Box>
              ) : null}
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
}
