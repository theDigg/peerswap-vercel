// import React from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function Welcome() {
  return (
    <Box display="flex">
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Offset />
        <Typography variant="h1" align="center">
          Get Started
        </Typography>
        <Typography paragraph>
          Welcome to the PeerSwap web wallet v0.0.1
        </Typography>
      </Box>
    </Box>
  );
}
