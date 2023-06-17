import {
  AppBar,
  Box,
  Card,
  CardContent,
  Grid,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";

import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import AddDataContribution from "./dataforms/AddDataContribution";

interface Props {
  projectData: {
    id: string;
    owner: string;
    members: string[];
    about: string;
  };
  dataContributions: number;
  formFields: any;
  userAddress: string;
}
export default function AboutProject(props: Props) {
  const { projectData, dataContributions, formFields, userAddress } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          About this project
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {projectData.about}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card
          elevation={0}
          sx={{
            m: 1,
            border: 1,
            borderRadius: 2,
            borderColor: "#3949ab",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", m: 1 }}>
              <GroupsOutlinedIcon />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {projectData.members.length} contributor
                {projectData.members.length > 1 ? "s" : ""}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", m: 1 }}>
              <AddchartOutlinedIcon />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {dataContributions} data contributions
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <AddDataContribution
                projectData={projectData}
                userAddress={userAddress}
                formFields={formFields}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
