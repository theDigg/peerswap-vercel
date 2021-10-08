import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import Divider from "@mui/material/Divider";
import LoopIcon from "@mui/icons-material/Loop";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Masonry from "../components/Masonry";
import Box from "@mui/material/Box";
import SwapFilterBar from "../components/SwapFilterBar";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { setMySwaps } from "../features/swaps/swapsSlice";
import { setMyBids } from "../features/bids/bidsSlice";
import { getMySwaps, getMyBids } from "../api/peerswapAPI";
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

function Home({ wallet, history }) {
  const dispatch = useDispatch();
  const { account } = useSelector((state: RootState) => state.account);
  const { mySwaps } = useSelector((state: RootState) => state.swaps);
  const { filteredSwaps } = useSelector((state: RootState) => state.swaps);
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
    () =>
      filteredSwaps.length ? (
        <Masonry items={filteredSwaps} />
      ) : (
        <Masonry items={mySwaps} />
      ),
    [filteredSwaps, mySwaps]
  );

  const bids = useMemo(() => <Masonry items={myBids} />, [myBids]);

  return (
    <Box sx={styles.root}>
      <Box component="main" sx={styles.content}>
        <Offset />
        <AccountInfo history={history} account={account} />
        <SwapFilterBar />
        <Divider orientation="horizontal" sx={{ my: 2 }}>
          <Chip
            icon={<LoopIcon />}
            label="YOUR SWAPS"
            variant="outlined"
            size="small"
            color="primary"
          />
        </Divider>
        {swaps}
        <Divider orientation="horizontal" sx={{ my: 2 }}>
          <Chip
            icon={<LocalOfferIcon />}
            label="YOUR BIDS"
            variant="outlined"
            size="small"
            color="secondary"
          />
        </Divider>
        {bids}
      </Box>
    </Box>
  );
}

export default Home;
