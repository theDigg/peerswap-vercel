import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Fab from '@mui/material/Fab'
import Brightness4Icon from "@mui/icons-material/Brightness4";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notification from "./Notification/Notification";
import MoreIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import { Send as SendIcon } from "@mui/icons-material";
import { withRouter } from "react-router-dom";
import { setWallet } from "../features/wallet/walletSlice";
import { setTheme } from "../features/theme/themeSlice";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const notifications = [
  { id: 0, color: "warning", message: "Someone has bid on your swap!" },
  {
    id: 1,
    color: "success",
    type: "info",
    message: "Your swap is complete!",
  },
  {
    id: 2,
    color: "secondary",
    type: "notification",
    message: "This is just a simple notification",
  },
];

export default function PrimarySearchAppBar({ open, handleDrawerOpen, history }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  var [mailMenu, setMailMenu] = React.useState(null);
  var [notificationsMenu, setNotificationsMenu] = React.useState(null);
  var [isMailsUnread, setIsMailsUnread] = React.useState(true);
  var [isNotificationsUnread, setIsNotificationsUnread] = React.useState(true);
  const { recentMessages } = useSelector((state: RootState) => state.messages);
  const { theme } = useSelector((state: RootState) => state.theme);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (route: string) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push(route);
  };

  const handleMailMenuClose = (route: string) => {
    setMailMenu(null);
    handleMobileMenuClose();
    history.push(route);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleThemeClick = (event: React.MouseEvent<HTMLElement>) => {
    if (theme === "light") {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose("/")}>Profile</MenuItem>
      <MenuItem onClick={() => handleMenuClose("/settings")}>Settings</MenuItem>
      <MenuItem onClick={() => handleMenuClose("/email")}>Email</MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose("/");
          dispatch(setWallet(null));
        }}
      >
        Sign out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleThemeClick}>
        <IconButton
          aria-label="toggle-dark-theme"
          aria-controls="toggle-dark-theme"
          aria-haspopup="true"
          color="inherit"
        >
          <Brightness4Icon />
        </IconButton>
        <p>Dark Mode</p>
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          setMailMenu(e.currentTarget);
          setIsMailsUnread(false);
        }}
      >
        <IconButton
          aria-label="show new messages"
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
        >
          <Badge
            badgeContent={
              isMailsUnread ? Object.keys(recentMessages).length : null
            }
            color="secondary"
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          setNotificationsMenu(e.currentTarget);
          setIsNotificationsUnread(false);
        }}
      >
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Account</p>
      </MenuItem>
    </Menu>
  );

  // or use "fixed"
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              marginLeft: { xs: "-6px", sm: "-12px" },
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Peerswap
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              edge="start"
              aria-label="toggle-dark-theme"
              aria-controls="theme"
              aria-haspopup="true"
              onClick={handleThemeClick}
              color="inherit"
            >
              <Brightness4Icon />
            </IconButton>
              <IconButton
                aria-label="show new messages"
                color="inherit"
                aria-haspopup="true"
                aria-controls="mail-menu"
                onClick={(e) => {
                  setMailMenu(e.currentTarget)
                  setIsMailsUnread(false)
                }}
              >
                <Badge
                  badgeContent={
                    isMailsUnread ? Object.keys(recentMessages).length : null
                  }
                  color="secondary"
                >
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                color="inherit"
                aria-haspopup="true"
                aria-controls="mail-menu"
                onClick={(e) => {
                  setNotificationsMenu(e.currentTarget)
                  setIsNotificationsUnread(false)
                }}
              >
                <Badge
                  badgeContent={
                    isNotificationsUnread ? notifications.length : null
                  }
                  color="secondary"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        id="mail-menu"
        open={Boolean(mailMenu)}
        anchorEl={mailMenu}
        onClose={() => setMailMenu(null)}
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 7,
          minWidth: 265,
        }}
        disableAutoFocusItem
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
          }}
        >
          <Typography variant="h4">New Messages</Typography>
          <Typography
            sx={{
              fontSize: 16,
              textDecoration: "none",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            component="a"
            color="secondary"
          >
            {Object.keys(recentMessages).length} New Messages
          </Typography>
        </Box>
        {Object.keys(recentMessages).map((handle, id) => (
          <MenuItem
            key={id}
            sx={{
              height: "auto",
              display: "flex",
              alignItems: "center",
              "&:hover, &:focus": {
                backgroundColor: (theme) => theme.palette.background.default,
              },
            }}
            onClick={() => handleMailMenuClose(`/messages/${handle}`)}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: 2,
              }}
            >
              <Avatar {...stringAvatar(handle)} />
              <Typography>
                {formatDate(new Date(recentMessages[handle].timestamp))}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: 2,
              }}
            >
              <Typography gutterBottom>{handle}</Typography>
              <Typography>{recentMessages[handle].body}</Typography>
            </Box>
          </MenuItem>
        ))}
        <Fab
          variant="extended"
          color="primary"
          aria-label="Add"
          sx={{
            margin: 4,
            marginTop: 2,
            marginBottom: 2,
            textTransform: "none",
          }}
          onClick={() => history.push("/messages")}
        >
          Send New Message
          <SendIcon
            sx={{
              marginLeft: 2,
            }}
          />
        </Fab>
      </Menu>
      <Menu
        id="notifications-menu"
        open={Boolean(notificationsMenu)}
        anchorEl={notificationsMenu}
        onClose={() => setNotificationsMenu(null)}
        sx={{
          marginTop: 7,
        }}
        disableAutoFocusItem
      >
        {notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={() => setNotificationsMenu(null)}
            sx={{
              "&:hover, &:focus": {
                bgcolor: (theme) => theme.palette.background.default,
              },
            }}
          >
            <Notification {...notification} typographyVariant="inherit" />
          </MenuItem>
        ))}
      </Menu>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name.toUpperCase()),
    },
    children: `${name[0].toUpperCase()}`,
  };
}

function formatDate(date) {
  // var year = date.getFullYear(),
  // month = date.getMonth() + 1, // months are zero indexed
  // day = date.getDate(),
  var hour = date.getHours(),
    minute = date.getMinutes(),
    // second = date.getSeconds(),
    hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
    minuteFormatted = minute < 10 ? "0" + minute : minute,
    morning = hour < 12 ? "am" : "pm";

  return (
    // month +
    // '/' +
    // day +
    // '/' +
    // year +
    // ' ' +
    hourFormatted + ":" + minuteFormatted + morning
  );
}