import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
// import Card from '@mui/material/Card'
// import Container from '@mui/material/Container'
// import CardActions from '@mui/material/CardActions'
// import CardContent from '@mui/material/CardContent'
// import Button from '@mui/material/Button'
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "../components/Grid";
import Box from "@mui/material/Box";
import { makeStyles, Theme, createStyles, styled } from "@mui/material/styles";
import { setMySwaps } from "../features/swaps/swapsSlice";
import { setMyBids } from "../features/bids/bidsSlice";
// import { setAccount } from '../features/account/accountSlice'
import { getMySwaps, getMyBids, getAccountData } from "../api/peerswapAPI";
// import useInterval from '../hooks/useInterval'
import AccountInfo from "../components/AccountInfo";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const styles = {
  root: {
    display: "flex",
    width: "100%",
  },
  card: {
    minWidth: 300,
    marginBottom: 3,
  },
  content: {
    flexGrow: 1,
    padding: 2,
  },
  title: {
    fontSize: 20,
  },
  divider: {
    marginTop: 2,
    marginBottom: 2,
  },
};

let renders = 0;

function Home({ wallet, history }) {
  console.log("HOME RENDERED ", renders++, " Times");
  const dispatch = useDispatch();
  const { account } = useSelector((state: RootState) => state.account)
  const { mySwaps } = useSelector((state: RootState) => state.swaps);
  const { myBids } = useSelector((state: RootState) => state.bids);

  useEffect(() => {
    getMySwaps(wallet.entry.address).then((swaps) => {
      dispatch(setMySwaps(swaps));
    });
    getMyBids(wallet.entry.address).then((bids) => {
      dispatch(setMyBids(bids));
    });
  }, []);

  const swaps = useMemo(
    () => <Grid swaps={mySwaps} bids={[]} opened={true} />,
    [mySwaps]
  );

  return (
    <Box sx={styles.root}>
      <Box component="main" sx={styles.content}>
        <Offset />
        <AccountInfo history={history} account={account}/>
        <Divider sx={styles.divider} />
        <Typography
          variant="body1"
          sx={styles.title}
          color="primary"
          align="center"
          gutterBottom
        >
          Swaps
        </Typography>
        <Divider sx={styles.divider} />
        {swaps}
        <Divider sx={styles.divider} />
        <Typography
          variant="body1"
          sx={styles.title}
          color="primary"
          align="center"
          gutterBottom
        >
          Bids
        </Typography>
        <Divider sx={styles.divider} />
        <Grid swaps={[]} bids={myBids} opened={true} />
      </Box>
    </Box>
  );
}

export default Home;
