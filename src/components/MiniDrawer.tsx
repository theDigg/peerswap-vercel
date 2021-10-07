import * as React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import InputIcon from "@mui/icons-material/Input";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import HistoryIcon from "@mui/icons-material/History";
import BarChartIcon from "@mui/icons-material/BarChart";
import TuneIcon from "@mui/icons-material/Tune";
import InfoIcon from "@mui/icons-material/Info";
import StyleIcon from "@mui/icons-material/Style";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { setWallet } from "../features/wallet/walletSlice";
import NewAppBar from "./AppBarNew";

const drawerWidth = 240;

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

const MiniDrawer = (props) => {
  const { wallet } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const itemsList = [
    {
      text: "Welcome",
      icon: <HomeIcon />,
      show: wallet === null,
      link: "/welcome",
    },
    {
      text: "Register",
      icon: <InputIcon />,
      show: wallet === null,
      link: "/register",
    },
    {
      text: "Import",
      icon: <ImportExportIcon />,
      show: wallet === null,
      link: "/import",
    },
    {
      text: "Home",
      icon: <HomeIcon />,
      show: wallet !== null,
      link: "/",
    },
    {
      text: "Wallet",
      icon: <AccountBalanceWalletIcon />,
      show: wallet !== null,
      link: "/wallet",
    },
    {
      text: "Swaps",
      icon: <SwapHorizIcon />,
      show: wallet !== null,
      link: "/swaps",
    },
    {
      text: "Messages",
      icon: <MailIcon />,
      show: wallet !== null,
      link: "/messages",
    },
    {
      text: "Tx History",
      icon: <HistoryIcon />,
      show: wallet !== null,
      link: "/transactions",
    },
    {
      text: "Economy",
      icon: <BarChartIcon />,
      show: wallet !== null,
      link: "/economy",
    },
    {
      text: "Settings",
      icon: <TuneIcon />,
      show: true,
      link: "/settings",
    },
    {
      text: "About",
      icon: <InfoIcon />,
      show: true,
      link: "/about",
    },
    {
      text: "Test",
      icon: <StyleIcon />,
      show: true,
      link: "/test",
    },
    {
      text: "Sign out",
      icon: <ExitToAppIcon />,
      show: wallet !== null,
      link: "/logout",
      // link: () => {
      //   dispatch(setWallet(null));
      // },
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
            const { text, icon, link } = item;
            return (
              <Link key={text} href={link}>
                <ListItem button>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            );
          })}
      </List>
    </div>
  );

  const container = undefined;

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
            backgroundColor: "#000",
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
