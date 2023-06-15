import React, { Dispatch, SetStateAction, useState } from "react";
import { Web3Storage } from "web3.storage";

import { CircularProgress, Fab, Tooltip } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

interface Props {
  setImageUri: Dispatch<SetStateAction<any>>;
}

export default function ImageUpload(props: Props) {
  const { setImageUri } = props;
  const [loading, setLoading] = useState(false);

  const storageToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg2YWIyOTRhMTQ1RThENkU0ZDFCNmNlRTcwODAxZGNDMTkyOWQ5NzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzc5Mzg1Mjg3MTQsIm5hbWUiOiJGb2xpb2hvdXNlIn0.2mttZrpJ6UBXcJwqr28iUb1rV8cqR5Y0MuxhZp-h9n4";

  const storage = new Web3Storage({ token: storageToken });

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    try {
      setLoading(true);
      const imageFile = new File([file], "project-media");
      const storedImage = await storage.put([imageFile]);
      const imageUrl = `https://${storedImage.toString()}.ipfs.w3s.link/project-media`;
      setImageUri(imageUrl);
      setLoading(false);
    } catch (error) {
      console.log("Error uploading content: ", error);
    }
  };

  return (
    <div>
      <label htmlFor="fileInput">
        <Tooltip title="add image">
          <Fab
            aria-label="upload media"
            size="large"
            component="span"
            sx={{ backgroundColor: "#fff" }}
          >
            {loading ? (
              <CircularProgress size={20} color="primary" />
            ) : (
              <AddPhotoAlternateOutlinedIcon color="primary" />
            )}
          </Fab>
        </Tooltip>
      </label>
      <input
        type="file"
        accept="image/*"
        id="fileInput"
        hidden
        onChange={uploadImage}
      />
    </div>
  );
}
