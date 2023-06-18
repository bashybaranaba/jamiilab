import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface Props {
  setTime: any;
  fieldId: string;
}

export default function BasicTimePicker(props: Props) {
  const { setTime, fieldId } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <TimePicker label="Time" onChange={(time) => setTime(time, fieldId)} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
