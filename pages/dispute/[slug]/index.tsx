import React from "react";
import { getAccountData } from "api/peerswapAPI";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import DisputeCard from "components/DisputeCard";
import MarkdownPost from "components/MarkdownPost";

/*
    This page is where users can see more information regarding the dispute
    They can see the swap and bid that are in question.
    They can see the evidence submitted by each user that are trying to make their case.
    After clicking through and reading the evidence and cases made by each user, users can
    vote for the party that honored the case.
*/

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function Dispute({ dispute }) {
  return (
    <Box p={1} m={1} sx={{ width: "100%" }}>
      <Offset />
      <DisputeCard dispute={dispute}/>
      {/* <MarkdownPost /> */}
    </Box>
  );
}

export async function getServerSideProps({ query }) {
  const { slug } = query;
  const { account } = await getAccountData(slug);

  return {
    props: {
      dispute: account
    }
  };
}

// Dispute.getInitialProps = async ({ query }) => {
//   const { slug } = query;
//   const { account } = await getAccountData(slug);

//   return {
//     dispute: account,
//   };
// };
