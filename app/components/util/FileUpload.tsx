import React, { Dispatch, useState } from "react";
import { Web3Storage } from "web3.storage";

import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

interface Props {
  setFileUri: any;
  fieldId: string;
}

export default function FileUpload(props: Props) {
  const { setFileUri, fieldId } = props;
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>(null);

  const storageToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg2YWIyOTRhMTQ1RThENkU0ZDFCNmNlRTcwODAxZGNDMTkyOWQ5NzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzc5Mzg1Mjg3MTQsIm5hbWUiOiJGb2xpb2hvdXNlIn0.2mttZrpJ6UBXcJwqr28iUb1rV8cqR5Y0MuxhZp-h9n4";

  const storage = new Web3Storage({ token: storageToken });

  const uploadFile = async (e: any) => {
    const file = e.target.files[0];
    setFile(file);
    try {
      setLoading(true);
      const filetoUpload = new File([file], "project-media");
      const storedFile = await storage.put([filetoUpload]);
      const fileUrl = `https://${storedFile.toString()}.ipfs.w3s.link/project-media`;
      setFileUri(fileUrl, fieldId);
      setLoading(false);
    } catch (error) {
      console.log("Error uploading content: ", error);
    }
  };
  return (
    <Grid sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          border: 1,
          borderRadius: 3,
          borderColor: "#556cd6",
          borderStyle: "dashed",
          p: 2,
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          component="label"
          sx={{ textTransform: "none" }}
        >
          Upload file
          <input type="file" hidden onChange={uploadFile} />
        </Button>

        {file ? (
          <Card
            elevation={0}
            sx={{
              ml: 2,
              border: 1,
              borderRadius: 2,
              borderColor: "#cfd8dc",
              width: "70%",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={2}
                lg={2}
                alignItems="center"
                sx={{ bgcolor: "#556cd6" }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: "#fff", m: 1, ml: 2 }}
                >
                  {file.name.split(".").pop()}
                </Typography>
              </Grid>
              <Grid item xs={2} lg={10}>
                <Typography
                  noWrap
                  variant="body2"
                  color="text.secondary"
                  sx={{ m: 1 }}
                >
                  {file.name}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        ) : loading ? (
          <CircularProgress sx={{ ml: 2 }} />
        ) : null}
      </Box>
    </Grid>
  );
}
