import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import Divider from "@mui/material/Divider";
import LoopIcon from "@mui/icons-material/Loop";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Masonry from "components/Masonry";
import Box from "@mui/material/Box";
import SwapFilterBar from "components/SwapFilterBar";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { setMySwaps } from "features/swaps/swapsSlice";
import { setMyBids } from "features/bids/bidsSlice";
import { getMySwaps, getMyBids } from "api/peerswapAPI";
import AccountInfo from "components/AccountInfo";
import { useRouter } from "next/router";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { wallet } = useSelector((state: RootState) => state.wallet);
  const { account } = useSelector((state: RootState) => state.account);
  const { mySwaps } = useSelector((state: RootState) => state.swaps);
  const { filteredSwaps } = useSelector((state: RootState) => state.swaps);
  const { myBids } = useSelector((state: RootState) => state.bids);

  // useEffect(() => {
  //   if (!wallet) {
  //     router.push("/register");
  //   }
  // }, [wallet]);

  useEffect(() => {
    if (!wallet) {
      router.push("/welcome");
    } else {
      getMySwaps(wallet.entry.address).then((swaps) => {
        dispatch(setMySwaps(swaps));
      });
      getMyBids(wallet.entry.address).then((bids) => {
        dispatch(setMyBids(bids));
      });
    }
  }, [wallet]);

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
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
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

export default Dashboard;
