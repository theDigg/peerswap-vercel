import * as React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoopIcon from "@mui/icons-material/Loop";
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

const drawerWidth = 200;

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

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
  const { wallet, history } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(location.pathname.split("/")[1]);
  const itemsList = [
    {
      text: "Welcome",
      icon: <HomeIcon color={active === "welcome" ? "primary" : "inherit"} />,
      show: wallet === null,
      onClick: () => {
        setActive("welcome");
        history.push("/welcome");
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
        history.push("/register");
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
        history.push("/import");
      },
    },
    {
      text: "Home",
      icon: <DashboardIcon color={active === "" ? "primary" : "inherit"} />,
      show: wallet !== null,
      onClick: () => {
        setActive("");
        history.push("/");
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
        history.push("/wallet");
      },
    },
    {
      text: "Swaps",
      icon: <LoopIcon color={active === "swaps" ? "primary" : "inherit"} />,
      show: wallet !== null,
      onClick: () => {
        setActive("swaps");
        history.push("/swaps");
      },
    },
    {
      text: "Messages",
      icon: <MailIcon color={active === "messages" ? "primary" : "inherit"} />,
      show: wallet !== null,
      onClick: () => {
        setActive("messages");
        history.push("/messages");
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
        history.push("/transactions");
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
        history.push("/economy");
      },
    },
    {
      text: "Settings",
      icon: <TuneIcon color={active === "settings" ? "primary" : "inherit"} />,
      show: true,
      onClick: () => {
        setActive("settings");
        history.push("/settings");
      },
    },
    {
      text: "Info",
      icon: <InfoIcon color={active === "info" ? "primary" : "inherit"} />,
      show: wallet !== null,
      onClick: () => {
        setActive("info");
        history.push("/info");
      },
    },
    // {
    //   text: "Test",
    //   icon: <StyleIcon />,
    //   show: true,
    //   onClick: () => history.push("/test"),
    // },
    {
      text: "Sign out",
      icon: (
        <ExitToAppIcon />
      ),
      show: wallet !== null,
      onClick: () => {
        dispatch(setWallet(null));
        history.push("/welcome");
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
        history={history}
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

export default withRouter(MiniDrawer);
