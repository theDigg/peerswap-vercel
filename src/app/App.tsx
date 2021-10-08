import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import lightTheme from "../theme";
import darkTheme from "../theme2";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./rootReducer";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import Drawer from "../components/MiniDrawer";
import stringify from "fast-stable-stringify";
import { setAccount } from "../features/account/accountSlice";
import { setChats } from "../features/messages/messagesSlice";
import { setMySwaps, setFilters } from "../features/swaps/swapsSlice";
import { setMyBids } from "../features/bids/bidsSlice";
import {
  getAccountData,
  getChats,
  getMySwaps,
  getMyBids,
  init
} from "../api/peerswapAPI";
import useInterval from "../hooks/useInterval";

const LazyWelcome = React.lazy(() => import("../pages/Welcome"));
const LazyRegister = React.lazy(() => import("../pages/Register"));
const LazyImport = React.lazy(() => import("../pages/Import"));
const LazyHome = React.lazy(() => import("../pages/Home"));
const LazyWallet = React.lazy(() => import("../pages/Wallet"));
const LazySwaps = React.lazy(() => import("../pages/Swaps"));
const LazySwap = React.lazy(() => import("../pages/Swap"));
const LazyBid = React.lazy(() => import("../pages/Bid"));
const LazyContract = React.lazy(() => import("../pages/Contract"));
const LazyMessages = React.lazy(() => import("../pages/Messages"));
const LazyTransactions = React.lazy(() => import("../pages/Transactions"));
const LazyEconomy = React.lazy(() => import("../pages/Economy"));
const LazyVote = React.lazy(() => import("../pages/Vote"));
const LazySettings = React.lazy(() => import("../pages/Settings"));
// const LazyTest = React.lazy(() => import("../pages/Test"));
const LazyInfo = React.lazy(() => import("../pages/Info"));

function App() {
  const dispatch = useDispatch();

  const { mySwaps } = useSelector((state: RootState) => state.swaps);
  const { filters } = useSelector((state: RootState) => state.swaps);
  const { myBids } = useSelector((state: RootState) => state.bids);
  const { account } = useSelector((state: RootState) => state.account);
  const { wallet } = useSelector((state: RootState) => state.wallet);
  const { theme } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    init().then(() => {
      console.log("APP RENDERED");
      if (wallet) {
        getAccountData(wallet.entry.address).then((accountData) => {
          dispatch(setAccount(accountData.account));
          getChats(accountData.account, wallet).then((chats) => {
            dispatch(setChats(chats));
          });
        });
        getMySwaps(wallet.entry.address).then((swaps) => {
          // if (stringify(swaps) !== stringify(mySwaps)) {
            dispatch(setMySwaps(swaps));
          // }
        });
        getMyBids(wallet.entry.address).then((bids) => {
          if (stringify(bids) !== stringify(myBids)) {
            dispatch(setMyBids(bids));
          }
        });
      }
    });
  }, []);

  // ! Probably bad idea to do this here.
  useInterval(() => {
    let startTime = Date.now();
    if (wallet) {
      getAccountData(wallet.entry.address).then((accountData) => {
        if (stringify(account) !== stringify(accountData.account)) {
          dispatch(setAccount(accountData.account));
        }
        getChats(accountData.account, wallet).then((chats) => {
          dispatch(setChats(chats));
        });
      });
      getMySwaps(wallet.entry.address).then((swaps) => {
        if (stringify(swaps) !== stringify(mySwaps)) {
          dispatch(setMySwaps(swaps));
          dispatch(setFilters(filters));
        }
      });
      getMyBids(wallet.entry.address).then((bids) => {
        if (stringify(bids) !== stringify(myBids)) {
          dispatch(setMyBids(bids));
        }
        console.log(Date.now() - startTime);
      });
    }
  }, 10000);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Box sx={{ display: "flex" }}>
        <Drawer wallet={wallet} />
        <Switch>
          <React.Suspense fallback="Loading...">
            <Route path="/welcome">
              <LazyWelcome />
            </Route>
            {/* <Route path="/test">
              <LazyTest />
            </Route> */}
            <Route path="/settings">
              <LazySettings />
            </Route>
            <PublicRoute
              path="/register"
              component={LazyRegister}
              wallet={wallet}
            />
            <PublicRoute
              path="/import"
              component={LazyImport}
              wallet={wallet}
            />
            <PrivateRoute exact path="/" component={LazyHome} wallet={wallet} />
            <PrivateRoute
              path="/wallet"
              component={LazyWallet}
              wallet={wallet}
            />
            <PrivateRoute path="/swaps" component={LazySwaps} wallet={wallet} />
            <PrivateRoute
              path="/swap/:id"
              component={LazySwap}
              wallet={wallet}
            />
            <PrivateRoute path="/bid/:id" component={LazyBid} wallet={wallet} />
            <PrivateRoute
              path="/contract/:id"
              component={LazyContract}
              wallet={wallet}
            />
            <PrivateRoute
              path="/messages"
              wallet={wallet}
              component={(props) => (
                <LazyMessages
                  wallet={wallet}
                  key={window.location.pathname}
                  {...props}
                />
              )}
            />
            <PrivateRoute
              path="/transactions"
              component={LazyTransactions}
              wallet={wallet}
            />
            <PrivateRoute
              path="/economy"
              component={LazyEconomy}
              wallet={wallet}
            />
            <PrivateRoute path="/vote" component={LazyVote} wallet={wallet} />
            <PrivateRoute path="/info" component={LazyInfo} wallet={wallet} />
          </React.Suspense>
        </Switch>
      </Box>
    </ThemeProvider>
  );
}

export default App;
