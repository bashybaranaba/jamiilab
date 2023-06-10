import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Divider, Typography } from "@mui/material";

import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";

interface Props {
  fieldType: string;
  handleFieldChange: any;
}

export default function FieldTypeSelector(props: Props) {
  const { fieldType, handleFieldChange } = props;
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fieldType}
          onChange={handleFieldChange}
        >
          <MenuItem value={"shortAnswer"}>
            <Box sx={{ display: "flex" }}>
              <ShortTextIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Short Answer</Typography>
            </Box>
          </MenuItem>
          <MenuItem value={"paragraph"}>
            <Box sx={{ display: "flex" }}>
              <SubjectIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Paragraph</Typography>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem value={"multipleChoice"}>
            <Box sx={{ display: "flex" }}>
              <RadioButtonCheckedIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Multiple choice</Typography>
            </Box>
          </MenuItem>
          <MenuItem value={"checkboxes"}>
            <Box sx={{ display: "flex" }}>
              <CheckBoxOutlinedIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Checkboxes</Typography>
            </Box>
          </MenuItem>
          <MenuItem value={"linearScale"}>
            <Box sx={{ display: "flex" }}>
              <LinearScaleIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Linear Scale</Typography>
            </Box>
          </MenuItem>
          <Divider />

          <MenuItem value={"fileUpload"}>
            <Box sx={{ display: "flex" }}>
              <UploadFileIcon sx={{ mr: 1 }} />
              <Typography variant="body2">File upload</Typography>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem value={"date"}>
            <Box sx={{ display: "flex" }}>
              <EventOutlinedIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Date</Typography>
            </Box>
          </MenuItem>
          <MenuItem value={"time"}>
            <Box sx={{ display: "flex" }}>
              <AccessTimeIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Time</Typography>
            </Box>
          </MenuItem>
          <MenuItem value={"location"}>
            <Box sx={{ display: "flex" }}>
              <AddLocationAltOutlinedIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Location</Typography>
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
