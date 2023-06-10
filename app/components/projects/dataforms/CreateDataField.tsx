import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Card,
  Container,
  CardContent,
  CardMedia,
  Grid,
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

import FieldTypeSelector from "./FieldTypeSelector";
import OptionsEditor from "./fieldeditors/OptionsEditor";
import NoneEditable from "./fieldeditors/NoneEditable";

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

export default function CreateDataField(props: Props) {
  const router = useRouter();
  const [fieldType, setFieldType] = React.useState("shortAnswer");
  const [options, setOptions] = React.useState<any>([]);
  const [optionsCount, setOptionCount] = React.useState<number>(1);

  const handleFieldChange = (event: SelectChangeEvent) => {
    setFieldType(event.target.value as string);
  };

  const getOption = (option: string) => {
    setOptions([...options, option]);
  };

  const addOption = () => {
    const numberOfOptions = optionsCount + 1;
    setOptionCount(numberOfOptions);
  };

  const removeOption = (option: string) => {
    const filteredOptions = options.filter((item: string) => item !== option);
    setOptions(filteredOptions);
  };

  const removeOptionField = () => {
    const numberOfOptions = optionsCount - 1;
    setOptionCount(numberOfOptions);
  };

  const { data } = props;
  console.log(options);

  return (
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
          <Grid item xs={11} lg={8}>
            <TextField
              id="filled-basic"
              label="Instruction / Question"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <FieldTypeSelector
              fieldType={fieldType}
              handleFieldChange={handleFieldChange}
            />
          </Grid>
        </Grid>
        {fieldType === "shortAnswer" ? (
          <NoneEditable text="Short response" icon={<ShortTextIcon />} />
        ) : null}
        {fieldType === "paragraph" ? (
          <NoneEditable text="Paragraph response" icon={<SubjectIcon />} />
        ) : null}
        {fieldType === "multipleChoice" ? (
          <Container sx={{ mt: 3 }}>
            {(function (rows, i, len) {
              while (++i <= len) {
                rows.push(
                  <OptionsEditor
                    getOption={getOption}
                    addOption={addOption}
                    removeOption={removeOption}
                    removeOptionField={removeOptionField}
                    instances={optionsCount}
                    index={i}
                    icon={
                      <RadioButtonUncheckedIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                    }
                  />
                );
              }
              return rows;
            })([], 0, optionsCount)}
          </Container>
        ) : null}
        {fieldType === "checkboxes" ? (
          <Container sx={{ mt: 3 }}>
            {(function (rows, i, len) {
              while (++i <= len) {
                rows.push(
                  <OptionsEditor
                    getOption={getOption}
                    addOption={addOption}
                    removeOption={removeOption}
                    removeOptionField={removeOptionField}
                    instances={optionsCount}
                    index={i}
                    icon={
                      <CheckBoxOutlineBlankIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                    }
                  />
                );
              }
              return rows;
            })([], 0, optionsCount)}
          </Container>
        ) : null}
        {fieldType === "linearScale" ? (
          <Box>
            <TextField label="short answer text" variant="standard" fullWidth />
          </Box>
        ) : null}
        {fieldType === "fileUpload" ? (
          <NoneEditable text="File upload" icon={<UploadFileIcon />} />
        ) : null}
        {fieldType === "date" ? (
          <NoneEditable text="Date " icon={<EventOutlinedIcon />} />
        ) : null}
        {fieldType === "time" ? (
          <NoneEditable text="Time " icon={<AccessTimeIcon />} />
        ) : null}
        {fieldType === "location" ? (
          <NoneEditable text="location" icon={<AddLocationAltOutlinedIcon />} />
        ) : null}
      </CardContent>
    </Card>
  );
}
