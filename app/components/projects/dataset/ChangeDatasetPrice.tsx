import React, { useEffect } from "react";
import { db } from "@/lib/polybase_init";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

interface Props {
  projectData: {
    id: string;
    owner: string;
  };
  datapoints: number;
  pricePerDatapoint: number;
}

export default function ChangeDatasetPrice(props: Props) {
  const { projectData, datapoints, pricePerDatapoint } = props;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [price, setPrice] = React.useState(
    pricePerDatapoint ? pricePerDatapoint : 0
  );
  const [decimalPlaces, setDecimalPlaces] = React.useState(0);
  const [overallPrice, setOverallPrice] = React.useState(0);

  useEffect(() => {
    calculateOverallPrice();
  }, [price]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setPrice(0);
    } else {
      //get decimal places of input value
      setDecimalPlaces(
        inputValue.split(".")[1] ? inputValue.split(".")[1].length : 0
      );
      const parsedNumber = parseFloat(inputValue);
      if (!isNaN(parsedNumber)) {
        setPrice(parsedNumber);
      }
    }
  };

  const calculateOverallPrice = () => {
    const calculatedOveralprice = datapoints * price;
    const datasetprice = parseFloat(
      calculatedOveralprice.toFixed(decimalPlaces ? decimalPlaces : 0)
    );
    setOverallPrice(datasetprice);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function setDatasetPrice() {
    setLoading(true);
    const collectionReference = db.collection("Project");
    try {
      const editData = await collectionReference
        .record(projectData.id)
        .call("setDatasetPrice", [price]);
      console.log(editData);
      setLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Box>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleClickOpen}
          sx={{
            textTransform: "none",
          }}
        >
          Set Dataset Price
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Set dataset price</DialogTitle>
        <DialogContent>
          <Typography variant="body2" component="div" color="text.secondary">
            The overal price of the dataset is calculated by multiplying the
            price per datapoint by the number of datapoints in the dataset. For
            example, if the price per datapoint is 0.1 and the dataset has 100
            datapoints, the price will be 10. For this projects' dataset, the
            overal price is {price} X {datapoints} datapoints = {overallPrice}
          </Typography>
          <Typography sx={{ fontWeight: 600 }} variant="body1" component="div">
            Current Overall price: {overallPrice}
          </Typography>
          <TextField
            fullWidth
            label="Price per datapoint"
            variant="outlined"
            value={price}
            type="number"
            onChange={handlePriceChange}
            sx={{ mt: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            component="label"
            sx={{ textTransform: "none", mt: 2 }}
            onClick={setDatasetPrice}
            disabled={!price}
          >
            {loading ? (
              <CircularProgress size={25} sx={{ color: "#fff" }} />
            ) : (
              "Confirm price"
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
