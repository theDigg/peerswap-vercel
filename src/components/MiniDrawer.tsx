import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoopIcon from "@mui/icons-material/Loop";
import HistoryIcon from "@mui/icons-material/History";
import BarChartIcon from "@mui/icons-material/BarChart";
import TuneIcon from "@mui/icons-material/Tune";
import InfoIcon from "@mui/icons-material/Info";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { setWallet } from "../features/wallet/walletSlice";
import { setAccount } from "../features/account/accountSlice";
import { setChats } from "../features/messages/messagesSlice";
import { setMySwaps, setFilters } from "../features/swaps/swapsSlice";
import { setMyBids } from "../features/bids/bidsSlice";
import NewAppBar from "./AppBarNew";
import { BootstrapTooltip } from "style/components/Tooltip";
import useInterval from "../hooks/useInterval";
import { useSnackbar } from "notistack";
import stringify from "fast-stable-stringify";
import {
  getAccountData,
  getChats,
  getMySwaps,
  getMyBids,
  init,
} from "../api/peerswapAPI";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MiniDrawer = () => {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { mySwaps } = useSelector((state: RootState) => state.swaps);
  const { filters } = useSelector((state: RootState) => state.swaps);
  const { myBids } = useSelector((state: RootState) => state.bids);
  const { account } = useSelector((state: RootState) => state.account);
  const { wallet } = useSelector((state: RootState) => state.wallet);
  // const { theme } = useSelector((state: RootState) => state.theme);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(location.pathname.split("/")[1]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    init().then(() => {
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
    if (wallet) {
      getAccountData(wallet.entry.address).then((accountData) => {
        if (stringify(account) !== stringify(accountData.account)) {
          if (
            accountData.account.data.lastTransaction.timestamp !==
            account.data.lastTransaction.timestamp
          ) {
            enqueueSnackbar(
              `${accountData.account.data.lastTransaction.type} transaction successful`,
              { variant: "success" }
            );
          }
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
      });
    }
  }, 10000);

  const itemsList = [
    {
      text: "Welcome",
      icon: <HomeIcon color={active === "welcome" ? "primary" : "inherit"} />,
      show: wallet === null,
      onClick: () => {
        setActive("welcome");
        router.push("/");
      },
    },
    {
      text: "Register",
      icon: (
        <AppRegistrationIcon
          color={active === "register" ? "primary" : "inherit"}
        />
      ),
      show: wallet === null,
      onClick: () => {
        setActive("register");
        router.push("/register");
      },
    },
    {
      text: "Import",
      icon: (
        <DownloadTwoToneIcon
          color={active === "import" ? "primary" : "inherit"}
        />
      ),
      show: wallet === null,
      onClick: () => {
        setActive("import");
        router.push("/import");
      },
    },
    {
      text: "Dashboard",
      icon: <DashboardIcon color={active === "Dashboard" ? "primary" : "inherit"} />,
      show: wallet !== null,
      onClick: () => {
        setActive("Dashboard");
        router.push("/dashboard");
      },
    },
    {
      text: "Wallet",
      icon: (
        <AccountBalanceIcon
          color={active === "wallet" ? "primary" : "inherit"}
        />
      ),
      show: wallet !== null,
      onClick: () => {
        setActive("wallet");
        router.push("/wallet");
      },
    },
    {
      text: "Swaps",
      icon: <LoopIcon color={active === "swaps" ? "primary" : "inherit"} />,
      show: wallet !== null,
      onClick: () => {
        setActive("swaps");
        router.push("/swaps");
      },
    },
    {
      text: "Messages",
      icon: <MailIcon color={active === "messages" ? "primary" : "inherit"} />,
      show: wallet !== null,
      onClick: () => {
        setActive("messages");
        router.push("/messages");
      },
    },
    {
      text: "Tx History",
      icon: (
        <HistoryIcon
          color={active === "transactions" ? "primary" : "inherit"}
        />
      ),
      show: wallet !== null,
      onClick: () => {
        setActive("transactions");
        router.push("/transactions");
      },
    },
    {
      text: "Economy",
      icon: (
        <BarChartIcon color={active === "economy" ? "primary" : "inherit"} />
      ),
      show: wallet !== null,
      onClick: () => {
        setActive("economy");
        router.push("/economy");
      },
    },
    {
      text: "Settings",
      icon: <TuneIcon color={active === "settings" ? "primary" : "inherit"} />,
      show: true,
      onClick: () => {
        setActive("settings");
        router.push("/settings");
      },
    },
    {
      text: "Info",
      icon: <InfoIcon color={active === "info" ? "primary" : "inherit"} />,
      show: wallet !== null,
      onClick: () => {
        setActive("info");
        router.push("/info");
      },
    },
    // {
    //   text: "Test",
    //   icon: <StyleIcon />,
    //   show: true,
    //   onClick: () => router.push("/test"),
    // },
    {
      text: "Sign out",
      icon: <ExitToAppIcon />,
      show: wallet !== null,
      onClick: () => {
        dispatch(setWallet(null));
        router.push("/welcome");
      },
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawer = (
    <div>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {itemsList
          .filter((item) => item.show)
          .map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <div key={text}>
                <BootstrapTooltip title={open ? "" : text} placement="right">
                  <ListItem button onClick={onClick}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </BootstrapTooltip>
                <Divider />
              </div>
            );
          })}
      </List>
    </div>
  );

  const container = window !== undefined ? () => document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NewAppBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <MuiDrawer
        container={container}
        variant="temporary"
        open={open}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </MuiDrawer>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
};

// export default withRouter(MiniDrawer);
export default MiniDrawer;
