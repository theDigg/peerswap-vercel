import React from "react";
// import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { getAccountData } from "api/peerswapAPI";
import ContractCard from "components/ContractCard";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function Contract({ contract }) {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <Offset />
        {contract && <ContractCard contract={contract} />}
      </Box>
    </Box>
  );
}

export async function getServerSideProps({ query }) {
  const { slug } = query;
  const { account } = await getAccountData(slug);

  return {
    props: {
      contract: account
    }
  };
}

// Contract.getInitialProps = async ({ query }) => {
//   const { slug } = query;
//   const { account } = await getAccountData(slug);

//   return {
//     contract: account,
//   };
// };
