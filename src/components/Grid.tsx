import React from "react";
// import { makeStyles, createStyles, Theme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import Divider from '@mui/material/Divider'
import SwapCard from "./SwapCard";
import BidCard from "./BidCard";

function NestedGrid({ swaps, bids, opened }) {
  function FormRow() {
    return (
      <>
        {swaps &&
          swaps.map((swap) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={swap.id}>
              <SwapCard swap={swap} opened={opened} />
            </Grid>
          ))}
        {bids &&
          bids.map((bid) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={bid.id}>
              <BidCard bid={bid} swap={bid.swapId} />
            </Grid>
          ))}
      </>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
      }}
    >
      <Grid container spacing={1}>
        <Grid container item spacing={2}>
          <FormRow />
        </Grid>
      </Grid>
    </Box>
  );
}

export default NestedGrid;
