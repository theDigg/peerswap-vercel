import React from "react";
// import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { getAccountData } from "api/peerswapAPI";
import BidCard from "components/BidCard";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

// export async function getServerSideProps({ params }) {
//   const { slug } = params;
//   const { account } = await getAccountData(slug);

//   return {
//     props: { bid: account },
//   };
// }

export default function Bid({ bid }) {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <Offset />
        {bid && <BidCard swap={bid.swapId} bid={bid} />}
      </Box>
    </Box>
  );
}

Bid.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const { account } = await getAccountData(slug);

  return {
    bid: account,
  };
};