import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";

interface Props {
  text: string;
  icon: any;
}

export default function NoneEditable(props: Props) {
  const { text, icon } = props;

  return (
    <Box
      sx={{
        display: "flex",
        m: 2,
        p: 3,
        border: 1,
        borderRadius: 3,
        borderColor: "#b0bec5",
      }}
    >
      {icon}
      <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
        {text}
      </Typography>
    </Box>
  );
}
