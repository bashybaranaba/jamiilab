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

  const handleOptionChange = (event: any) => {
    setOption(event.target.value);
    setRegistered(false);
    removeOption(option);
  };
  const remove = () => {
    setRegistered(false);
    setOption("");
    removeOption(option);
    removeOptionField();
  };
  const clearOptionField = () => {
    setRegistered(false);
    setOption("");
    removeOption(option);
  };
  const registerOption = () => {
    getOption(option);
    setRegistered(true);
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
          onChange={handleOptionChange}
          value={option}
        />
        <IconButton
          aria-label="remove option"
          sx={{ color: "action.active", mb: -1 }}
          onClick={!registered ? registerOption : retainRegistered}
        >
          <CheckOutlinedIcon color={registered ? "success" : "inherit"} />
        </IconButton>

        <IconButton
          aria-label="remove option"
          sx={{ color: "action.active", mb: -1 }}
          onClick={instances > 1 ? remove : clearOptionField}
        >
          <ClearOutlinedIcon />
        </IconButton>

        {index === instances ? (
          <IconButton
            aria-label="add option"
            sx={{ color: "action.active", mb: -1 }}
            onClick={addOption}
          >
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        ) : null}
      </Box>
    </Grid>
  );
}
