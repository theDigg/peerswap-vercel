import React, { useEffect } from "react";
import Link from 'next/link';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
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
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import BiotechIcon from '@mui/icons-material/Biotech';
import { setWallet } from "features/wallet/walletSlice";
import { setAccount } from "features/account/accountSlice";
import { setChats } from "features/messages/messagesSlice";
import { setMySwaps, setFilters } from "features/swaps/swapsSlice";
import { setMyBids } from "features/bids/bidsSlice";
import NewAppBar from "./AppBarNew";
import { BootstrapTooltip } from "style/components/Tooltip";
import useInterval from "hooks/useInterval";
import { useSnackbar } from "notistack";
import stringify from "fast-stable-stringify";
import {
  getAccountData,
  getChats,
  getMySwaps,
  getMyBids,
  init,
} from "api/peerswapAPI";

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
      text: 'Welcome',
      icon: (
        <Link href="/">
          <HomeIcon color={active === 'welcome' ? 'primary' : 'inherit'} />
        </Link>
      ),
      show: wallet === null,
      onClick: () => {
        setActive('welcome');
      }
    },
    {
      text: 'Register',
      icon: (
        <Link href="/register">
          <AppRegistrationIcon
            color={active === 'register' ? 'primary' : 'inherit'}
          />
        </Link>
      ),
      show: wallet === null,
      onClick: () => {
        setActive('register');
      }
    },
    {
      text: 'Import',
      icon: (
        <Link href="/import">
          <DownloadTwoToneIcon
            color={active === 'import' ? 'primary' : 'inherit'}
          />
        </Link>
      ),
      show: wallet === null,
      onClick: () => {
        setActive('import');
      }
    },
    {
      text: 'Dashboard',
      icon: (
        <Link href="/dashboard">
          <DashboardIcon
            color={active === 'Dashboard' ? 'primary' : 'inherit'}
          />
        </Link>
      ),
      show: wallet !== null,
      onClick: () => {
        setActive('Dashboard');
      }
    },
    {
      text: 'Wallet',
      icon: (
        <Link href="/wallet">
          <AccountBalanceIcon
            color={active === 'wallet' ? 'primary' : 'inherit'}
          />
        </Link>
      ),
      show: wallet !== null,
      onClick: () => {
        setActive('wallet');
      }
    },
    {
      text: 'Swaps',
      icon: (
        <Link href="/swaps">
          <LoopIcon color={active === 'swaps' ? 'primary' : 'inherit'} />
        </Link>
      ),
      show: wallet !== null,
      onClick: () => {
        setActive('swaps');
      }
    },
    {
      text: 'Disputes',
      icon: (
        <Link href="/disputes">
          <WarningAmberIcon
            color={active === 'dispute' ? 'primary' : 'inherit'}
          />
        </Link>
      ),
      show: wallet !== null,
      onClick: () => {
        setActive('disputes');
      }
    },
    {
      text: 'Messages',
      icon: (
        <Link href="/messages">
          <MailIcon color={active === 'messages' ? 'primary' : 'inherit'} />
        </Link>
      ),
      show: wallet !== null,
      onClick: () => {
        setActive('messages');
      }
    },
    {
      text: 'Tx History',
      icon: (
        <Link href="/transactions">
          <HistoryIcon
            color={active === 'transactions' ? 'primary' : 'inherit'}
          />
        </Link>
      ),
      show: wallet !== null,
      onClick: () => {
        setActive('transactions');
      }
    },
    {
      text: 'Economy',
      icon: (
        <Link href="/economy">
          <BarChartIcon color={active === 'economy' ? 'primary' : 'inherit'} />
        </Link>
      ),
      show: wallet !== null,
      onClick: () => {
        setActive('economy');
      }
    },
    {
      text: 'Settings',
      icon: (
        <Link href="/settings">
          <TuneIcon color={active === 'settings' ? 'primary' : 'inherit'} />
        </Link>
      ),
      show: true,
      onClick: () => {
        setActive('settings');
      }
    },
    {
      text: 'Info',
      icon: (
        <Link href="/info">
          <InfoIcon color={active === 'info' ? 'primary' : 'inherit'} />
        </Link>
      ),
      show: wallet !== null,
      onClick: () => {
        setActive('info');
      }
    },
    {
      text: 'Test',
      icon: (
        <Link href="/test">
          <BiotechIcon color={active === 'info' ? 'primary' : 'inherit'} />
        </Link>
      ),
      show: true,
      onClick: () => {
        setActive('test');
      }
    },
    {
      text: 'Sign out',
      icon: (
        <Link href="/">
          <ExitToAppIcon />
        </Link>
      ),
      show: wallet !== null,
      onClick: () => {
        dispatch(setWallet(null));
      }
    }
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
      <NewAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
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

export default MiniDrawer;
