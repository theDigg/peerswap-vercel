import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/rootReducer";
import { VariantType, useSnackbar } from "notistack";
import MuiDataGridDemo from "../components/DataGrid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { getSwaps } from "../api/peerswapAPI";
import { setSwaps } from "../features/swaps/swapsSlice";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function Swaps() {
  const dispatch = useDispatch();

  useEffect(() => {
    getSwaps().then((data) => {
      dispatch(setSwaps(data.swaps));
    });
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "90vh"
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
        }}
      >
        <Offset />
        <MuiDataGridDemo />
      </Box>
    </Box>
  );
}
