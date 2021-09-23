import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDataGridDemo from '../components/DataGrid'

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function Test() {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: (theme) => theme.spacing(3),
        }}
      >
        <Offset />
        <MuiDataGridDemo />
      </Box>
    </Box>
  );
}
