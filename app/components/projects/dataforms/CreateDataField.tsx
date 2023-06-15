import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";

import AddBoxIcon from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";

import { CardMedia, Paper } from "@mui/material";

interface Props {
  datafieldsCount: number;
  setDatafieldsCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CreateDataField(props: Props) {
  const { datafieldsCount, setDatafieldsCount } = props;

  const addDataField = () => {
    setDatafieldsCount(datafieldsCount + 1);
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          m: 2,
          p: 3,
          display: datafieldsCount === 0 ? "block" : "none",
          border: 1,
          borderRadius: 4,
          borderColor: "#7986cb",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg={9}>
            <Typography variant="subtitle1" component="div" sx={{ ml: 2 }}>
              Data Fields dertimine what kind of data that gets collected for
              your project.
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ ml: 2 }}>
              Click add data field to start creating your project's data fields.
            </Typography>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={addDataField}
              startIcon={<AddIcon />}
              sx={{
                textTransform: "none",
              }}
            >
              Add Data Field
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
