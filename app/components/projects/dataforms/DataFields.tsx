import { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";

import ProjectBanner from "@/app/components/projects/ProjectBanner";
import DatasetPreviewTable from "@/app/components/projects/dataset/DatasetPreview";
import EditDataField from "@/app/components/projects/dataforms/EditDataField";
import CreateDataField from "@/app/components/projects/dataforms/CreateDataField";

export default function DataFields() {
  const [datafields, setDatafields] = useState<any>([]);
  const [datafieldsCount, setDatafieldsCount] = useState(0);

  //Datafield functions
  const getField = (datafield: object) => {
    setDatafields([...datafields, datafield]);
  };

  const addField = () => {
    const numberOfFields = datafieldsCount + 1;
    setDatafieldsCount(numberOfFields);
  };

  const removeField = (datafield: object) => {
    const filteredFields = datafield.filter(
      (item: object) => item !== datafield
    );
    setDatafieldsCount(filteredFields);
  };

  const removeDataField = () => {
    const numberOfFields = datafieldsCount - 1;
    setDatafieldsCount(numberOfFields);
  };

  console.log(datafields);
  return (
    <Box>
      <CreateDataField
        datafieldsCount={datafieldsCount}
        setDatafieldsCount={setDatafieldsCount}
      />
      {datafieldsCount > 0
        ? (function (rows: any[], i, len) {
            while (++i <= len) {
              rows.push(
                <EditDataField
                  getField={getField}
                  addField={addField}
                  removeField={removeField}
                  instances={datafieldsCount}
                  index={i}
                />
              );
            }
            return rows;
          })([], 0, datafieldsCount)
        : null}
    </Box>
  );
}
