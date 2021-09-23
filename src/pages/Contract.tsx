import React, { useEffect, useState } from "react";
// import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box";
import { makeStyles, Theme, createStyles, styled } from "@mui/material/styles";
import { getAccountData } from "../api/peerswapAPI";
import ContractCard from "../components/ContractCard";

const styles = {
  root: {
    display: "flex",
    width: "100%",
  },
  content: {
    flexGrow: 1,
    padding: 3,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function Contract({ location }) {
  const [contract, setContract] = useState();
  useEffect(() => {
    getAccountData(location.pathname.split("/")[2]).then(({ account }) => {
      setContract(account);
    });
  }, [location.pathname]);
  return (
    <Box sx={styles.root}>
      <Box component="main" sx={styles.content}>
        <Offset />
        {contract && <ContractCard contract={contract} />}
      </Box>
    </Box>
  );
}
