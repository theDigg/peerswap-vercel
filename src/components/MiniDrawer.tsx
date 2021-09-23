import * as React from "react";
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InputIcon from '@mui/icons-material/Input'
import HomeIcon from '@mui/icons-material/Home'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import MessageIcon from '@mui/icons-material/Message'
import GroupIcon from '@mui/icons-material/Group'
import HistoryIcon from '@mui/icons-material/History'
import ReceiptIcon from '@mui/icons-material/Receipt'
import BarChartIcon from '@mui/icons-material/BarChart'
import TuneIcon from '@mui/icons-material/Tune'
import InfoIcon from '@mui/icons-material/Info'
// import StyleIcon from '@mui/icons-material/Style'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { setWallet } from '../features/wallet/walletSlice'
import NewAppBar from './AppBarNew'

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
  const { wallet, history } = props
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const itemsList = [
    {
      text: "Welcome",
      icon: <HomeIcon />,
      show: wallet === null,
      onClick: () => history.push("/welcome"),
    },
    {
      text: "Register",
      icon: <InputIcon />,
      show: wallet === null,
      onClick: () => history.push("/register"),
    },
    {
      text: "Import",
      icon: <ImportExportIcon />,
      show: wallet === null,
      onClick: () => history.push("/import"),
    },
    {
      text: "Home",
      icon: <HomeIcon />,
      show: wallet !== null,
      onClick: () => history.push("/"),
    },
    {
      text: "Wallet",
      icon: <AccountBalanceWalletIcon />,
      show: wallet !== null,
      onClick: () => history.push("/wallet"),
    },
    {
      text: "Swaps",
      icon: <SwapHorizIcon />,
      show: wallet !== null,
      onClick: () => history.push("/swaps"),
    },
    {
      text: "Messages",
      icon: <MailIcon />,
      show: wallet !== null,
      onClick: () => history.push("/messages"),
    },
    {
      text: "Tx History",
      icon: <HistoryIcon />,
      show: wallet !== null,
      onClick: () => history.push("/transactions"),
    },
    {
      text: "Tx Receipts",
      icon: <ReceiptIcon />,
      show: wallet !== null,
      onClick: () => history.push("/receipts"),
    },
    {
      text: "Economy",
      icon: <BarChartIcon />,
      show: wallet !== null,
      onClick: () => history.push("/economy"),
    },
    {
      text: "Settings",
      icon: <TuneIcon />,
      show: true,
      onClick: () => history.push("/settings"),
    },
    {
      text: "About",
      icon: <InfoIcon />,
      show: true,
      onClick: () => history.push("/about"),
    },
    {
      text: "Sign out",
      icon: <ExitToAppIcon />,
      show: wallet !== null,
      onClick: () => {
        dispatch(setWallet(null));
      },
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NewAppBar open={open} handleDrawerOpen={handleDrawerOpen}/>
      <Drawer variant="permanent" open={open}>
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
            const { text, icon, onClick } = item
            return (
              <div key={text}>
                <ListItem button key={text} onClick={onClick}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
                </ListItem>
                <Divider />
              </div>
            )
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </Box>
    </Box>
  );
}

export default withRouter(MiniDrawer)