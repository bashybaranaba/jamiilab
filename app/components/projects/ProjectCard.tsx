import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Tooltip,
  CardActionArea,
} from "@mui/material";

import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import TollOutlinedIcon from "@mui/icons-material/TollOutlined";
interface Props {
  data: {
    // id: number;
    // name: string;
    // totalAttributions: number;
    // totalArtworks: number;
    // price: number;
    // creator: string;
    // featuredImage: string;
  };
}

export default function ProjectCard(props: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);

  const { data } = props;
  //console.log(data);
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(`/projects/slug`);
  };
  const handleExpand = (e: any) => {
    e.preventDefault();
    setExpanded(!expanded);
  };
  return (
    <Grid item xs={12} lg={3}>
      <Card
        elevation={0}
        onMouseEnter={handleExpand}
        onMouseLeave={handleExpand}
        sx={{
          m: 1,
          border: 1,
          borderRadius: 6,
          borderColor: "#3949ab",
        }}
      >
        <CardActionArea onClick={handleClick}>
          {/*data.featuredImage ? (
            <CardMedia
              component="img"
              height="150"
              image={data.featuredImage}
              alt={data.name}
            />
          ) : (
            <Box sx={{ height: 150, backgroundColor: "#c5cae9" }} />
          )*/}
          <Box
            sx={{ height: expanded ? 90 : 190, backgroundColor: "#c5cae9" }}
          />

          <CardContent sx={{ m: 0.5 }}>
            <Typography variant="body1" component="div" gutterBottom noWrap>
              Very very Long project Name
            </Typography>
            <Box sx={{ display: expanded ? "block" : "none", height: 100 }}>
              <Typography variant="caption" component="div" sx={{ m: 0.5 }}>
                Help us search for extreme types of galaxies in the Fornax
                Galaxy Cluster!
              </Typography>
            </Box>

            <Grid container>
              <Grid item xs={7}>
                <Box sx={{ display: "flex" }}></Box>
              </Grid>
              <Grid item xs={5}>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    variant="caption"
                    component="div"
                    noWrap
                    sx={{ m: 0.5 }}
                  ></Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
