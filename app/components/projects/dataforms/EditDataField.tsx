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
  Fab,
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
import AddIcon from "@mui/icons-material/Add";

import FieldTypeSelector from "./FieldTypeSelector";
import OptionsEditor from "./fieldeditors/OptionsEditor";
import NoneEditable from "./fieldeditors/NoneEditable";
import ImageUpload from "../../util/ImageUpload";
import { generateUniqueId } from "@/app/components/util/GenerateUniqueId";

interface Props {
  getField: any;
  addField: any;
  removeField: any;
  instances: number;
  index: number;
}

export default function EditDataField(props: Props) {
  const { getField, addField, removeField, instances, index } = props;

  const [fieldId, setFieldId] = useState("");
  const [fieldType, setFieldType] = useState("shortAnswer");
  const [name, setName] = useState("");
  const [instruction, setInstruction] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [options, setOptions] = useState<any>([]);
  const [optionsCount, setOptionCount] = useState<number>(1);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSaved(false);
  }, [fieldType, name, instruction, imageUrl, options]);

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

  const registerField = async () => {
    setLoading(true);
    const collectionReference = db.collection("DataField");
    const field_id = fieldId ? fieldId : generateUniqueId();
    const fieldDetails = {
      id: field_id,
      field_name: name,
      field_type: fieldType,
      instruction: instruction,
      image: imageUrl,
      options: options,
    };
    getField(fieldDetails);

    const recordData = await collectionReference.create([
      field_id,
      "1686858280324-1063",
      name,
      fieldType,
      instruction,
      imageUrl,
      options,
    ]);
    console.log(recordData);
    setLoading(false);
    setSaved(true);
  };

  return (
    <Grid container>
      <Grid item xs={11} lg={11}>
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
              <Grid item xs={10} lg={7}>
                <TextField
                  id="name"
                  label="Field name"
                  variant="filled"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  sx={{ m: 1, mb: 0 }}
                />
              </Grid>
              <Grid item xs={2} lg={1}>
                <Box sx={{ m: 1, mb: 0 }}>
                  <ImageUpload setImageUri={setImageUrl} />
                </Box>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Box sx={{ m: 1, mb: 0 }}>
                  <FieldTypeSelector
                    fieldType={fieldType}
                    handleFieldChange={handleFieldChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={12} sx={{ m: 1 }}>
                <TextField
                  id="instruction"
                  label="Instruction / Question"
                  variant="filled"
                  fullWidth
                  multiline
                  rows={3}
                  onChange={(e) => setInstruction(e.target.value)}
                />
              </Grid>
              {imageUrl && (
                <Grid item xs={12} lg={12} sx={{ m: 2 }}>
                  <CardMedia
                    component="img"
                    height="280"
                    image={imageUrl}
                    sx={{ borderRadius: 3 }}
                  />
                </Grid>
              )}
            </Grid>

            {fieldType === "shortAnswer" ? (
              <NoneEditable text="Short response" icon={<ShortTextIcon />} />
            ) : null}
            {fieldType === "paragraph" ? (
              <NoneEditable text="Paragraph response" icon={<SubjectIcon />} />
            ) : null}
            {fieldType === "multipleChoice" ? (
              <Container sx={{ mt: 3 }}>
                {(function (rows: any[], i, len) {
                  while (++i <= len) {
                    rows.push(
                      <OptionsEditor
                        getOption={getOption}
                        addOption={addOption}
                        removeOption={removeOption}
                        removeOptionField={removeOptionField}
                        instances={optionsCount}
                        index={i}
                        key={i}
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
                {(function (rows: any[], i, len) {
                  while (++i <= len) {
                    rows.push(
                      <OptionsEditor
                        getOption={getOption}
                        addOption={addOption}
                        removeOption={removeOption}
                        removeOptionField={removeOptionField}
                        instances={optionsCount}
                        index={i}
                        key={i}
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
                <TextField
                  label="short answer text"
                  variant="standard"
                  fullWidth
                />
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
              <NoneEditable
                text="location"
                icon={<AddLocationAltOutlinedIcon />}
              />
            ) : null}
            <Box sx={{ display: "flex" }}>
              <Grid sx={{ flexGrow: 1 }} />
              <Button
                variant="contained"
                sx={{ m: 1, mb: 0, textTransform: "none", width: 100 }}
                disabled={!name || !instruction || saved}
                onClick={registerField}
              >
                {saved ? "Saved" : "Save"}
              </Button>
              <Button
                variant="outlined"
                sx={{ m: 1, mb: 0, textTransform: "none", color: "#e57373" }}
                onClick={registerField}
              >
                Remove
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={1} lg={1}>
        <Box sx={{ display: "flex" }}>
          <Grid sx={{ flexGrow: 1 }} />
          {index === instances ? (
            <Fab
              aria-label="add option"
              sx={{ backgroundColor: "#fff", m: 1 }}
              onClick={addField}
            >
              <AddIcon />
            </Fab>
          ) : null}
        </Box>
      </Grid>
    </Grid>
  );
}
