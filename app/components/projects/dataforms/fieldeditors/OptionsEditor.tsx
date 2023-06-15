import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  Tooltip,
  TextField,
  CardActionArea,
} from "@mui/material";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

interface Props {
  getOption: any;
  addOption: any;
  removeOption: any;
  removeOptionField: any;
  instances: number;
  index: number;
  icon: any;
}

export default function OptionsEditor(props: Props) {
  const {
    getOption,
    addOption,
    removeOption,
    removeOptionField,
    instances,
    index,
    icon,
  } = props;

  const [option, setOption] = useState("");
  const [registered, setRegistered] = useState(false);
  const [finished, setFinished] = useState(false);
  const remove = () => {
    removeOption(option);
    removeOptionField();
  };
  const clearOptionField = () => {
    setRegistered(false);
    setOption("");
    removeOption(option);
  };
  const addAnotherOption = () => {
    getOption(option);
    addOption();
    setRegistered(true);
  };

  const getFinalOption = () => {
    getOption(option);
    setRegistered(true);
    setFinished(true);
  };

  const retainRegistered = () => {
    setRegistered(true);
  };

  return (
    <Grid>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        {icon}
        <TextField
          label={`Option ${index}`}
          variant="standard"
          onChange={(e) => setOption(e.target.value)}
          disabled={registered}
          value={option}
        />

        <IconButton
          aria-label="remove option"
          sx={{ color: "action.active", mb: -1 }}
          onClick={instances > 1 ? remove : clearOptionField}
        >
          <ClearOutlinedIcon />
        </IconButton>

        {index === instances && !finished ? (
          <IconButton
            aria-label="add option"
            sx={{ color: "action.active", mb: -1 }}
            onClick={addAnotherOption}
          >
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        ) : null}
        {index === instances && instances > 1 ? (
          <IconButton
            aria-label="remove option"
            sx={{ color: "action.active", mb: -1 }}
            onClick={getFinalOption}
          >
            <CheckOutlinedIcon color={registered ? "success" : "inherit"} />
          </IconButton>
        ) : null}
      </Box>
    </Grid>
  );
}
