import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import MasonryItem from "@mui/lab/MasonryItem";
import SwapCard from "./SwapCard";
import BidCard from "./BidCard";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function BasicMasonry({ items }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Masonry columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }} spacing={1}>
        {items &&
          items.map((item) => (
            <MasonryItem key={item.id}>
              <Item>
                {item.type === "SwapAccount" && (
                  <SwapCard swap={item} opened={false} />
                )}
                {item.type === "BidAccount" && (
                  <BidCard swap={item.swapId} bid={item} />
                )}
              </Item>
            </MasonryItem>
          ))}
      </Masonry>
    </Box>
  );
}
