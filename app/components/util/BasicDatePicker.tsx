import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface Props {
  setDate: any;
  fieldId: string;
}

export default function BasicDatePicker(props: Props) {
  const { setDate, fieldId } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker label="Date" onChange={(date) => setDate(date, fieldId)} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
