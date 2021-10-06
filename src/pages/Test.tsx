import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDataGridDemo from "../components/DataGrid";
import { mockSwaps } from "../mocks/mockSwaps";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function Test() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: (theme) => theme.spacing(3),
        height: "90vh",
      }}
    >
      <Offset />
      <MuiDataGridDemo swaps={mockSwaps} />
    </Box>
  );
}
