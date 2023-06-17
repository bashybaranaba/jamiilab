import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/polybase_init";

import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  CardContent,
  CardMedia,
  Checkbox,
  Fab,
  FormGroup,
  FormControlLabel,
  FormControl,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Tooltip,
  CardActionArea,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AddIcon from "@mui/icons-material/Add";

import ImageUpload from "../../util/ImageUpload";
import NoneEditable from "./fieldeditors/NoneEditable";
import { generateUniqueId } from "@/app/components/util/GenerateUniqueId";
import FileUpload from "../../util/FileUpload";

interface Props {
  fieldData: {
    id: string;
    image: string;
    instruction: string;
    name: string;
    options: any;
    project_id: string;
    type: string;
  };
  getFieldValues: any;
}

export default function PresentedDataField(props: Props) {
  const { fieldData, getFieldValues } = props;
  return (
    <Grid container>
      <Grid item xs={12} lg={12}>
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
            <Grid container spacing={1}>
              <Grid item xs={12} lg={12}>
                <Typography variant="caption" component="div">
                  {fieldData.name}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography variant="body1" component="div">
                  {fieldData.instruction}
                </Typography>
              </Grid>
              {fieldData.image && (
                <Grid item xs={12} lg={12} sx={{ m: 2 }}>
                  <CardMedia
                    component="img"
                    height="280"
                    image={fieldData.image}
                    sx={{ borderRadius: 3 }}
                  />
                </Grid>
              )}
            </Grid>

            {fieldData.type === "shortAnswer" ? (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Short answer response"
                  variant="outlined"
                  onChange={(e) => getFieldValues(e.target.value, fieldData.id)}
                />
              </Box>
            ) : null}
            {fieldData.type === "paragraph" ? (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Paragraph response"
                  variant="outlined"
                  multiline
                  rows={4}
                  onChange={(e) => getFieldValues(e.target.value, fieldData.id)}
                />
              </Box>
            ) : null}
            {fieldData.type === "multipleChoice" ? (
              <Box sx={{ mt: 2 }}>
                <FormGroup>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={(e) =>
                      getFieldValues(e.target.value, fieldData.id)
                    }
                  >
                    {fieldData.options.map((option: any, index: number) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Radio
                            value={option}
                            sx={{ color: "#3949ab" }}
                            name={option}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormGroup>
              </Box>
            ) : null}
            {fieldData.type === "checkboxes" ? (
              <Box sx={{ mt: 2 }}>
                <FormGroup>
                  {fieldData.options.map((option: any, index: number) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          value={option}
                          sx={{ color: "#3949ab" }}
                          name={option}
                          onChange={(e) =>
                            getFieldValues(e.target.value, fieldData.id)
                          }
                        />
                      }
                      label={option}
                    />
                  ))}
                </FormGroup>
              </Box>
            ) : null}
            {fieldData.type === "linearScale" ? (
              <Box>
                <TextField
                  label="short answer text"
                  variant="standard"
                  fullWidth
                />
              </Box>
            ) : null}
            {fieldData.type === "fileUpload" ? (
              <FileUpload setFileUri={getFieldValues} fieldId={fieldData.id} />
            ) : null}
            {fieldData.type === "date" ? (
              <NoneEditable text="Date " icon={<EventOutlinedIcon />} />
            ) : null}
            {fieldData.type === "time" ? (
              <NoneEditable text="Time " icon={<AccessTimeIcon />} />
            ) : null}
            {fieldData.type === "location" ? (
              <NoneEditable
                text="location"
                icon={<AddLocationAltOutlinedIcon />}
              />
            ) : null}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
