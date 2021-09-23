import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { makeStyles, Theme, createStyles, styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { VariantType, useSnackbar } from "notistack";
import { submitMessageTx, getChats } from "../api/peerswapAPI";
import { setChats } from "../features/messages/messagesSlice";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const styles = {
  root: {
    display: "flex",
    width: "100%",
  },
  input: {
    width: "100%",
    marginTop: 2,
  },
  button: {
    width: "100%",
    marginTop: 2,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  content: {
    width: "100%",
    height: "calc(100vh - 60px)",
    flexGrow: 1,
    padding: 2,
  },
  list: {
    width: "100%",
    backgroundColor: "theme.palette.background.paper",
    height: "77vh",
    overflow: "scroll",
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper",
    display: "flex",
    width: "100%",
    height: "100%",
  },
  tabPanel: {
    width: "100%",
    height: "100%",
  },
  tabs: {
    borderRight: `1px solid grey`, // fix
    minWidth: "200px",
  },
  messageNotificationSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: 2,
  },
  messageNotificationBodySide: {
    alignItems: "flex-start",
    marginRight: 0,
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
  messageNotification: {
    height: "auto",
    display: "flex",
    alignItems: "center",
    "&:hover, &:focus": {
      backgroundColor: "theme.palette.background.default",
    },
  },
};

const StyledTextField = styled(TextField)`
  label.Mui-focused {
    color: red;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: grey;
    }
    &:hover fieldset {
      border-color: black;
    }
    &.Mui-focused fieldset {
      border-color: red;
    }
  }
` as typeof TextField;

export default function Messages({ wallet, location }) {
  const dispatch = useDispatch();
  const { chats } = useSelector((state: RootState) => state.messages);
  const { account } = useSelector((state: RootState) => state.account);
  const [index] = useState(
    Object.keys(chats).indexOf(location.pathname.split("/").pop()) + 1
  );

  useEffect(() => {
    getChats(account, wallet).then((chats) => {
      dispatch(setChats(chats));
    });
  }, [account, dispatch, wallet]);

  return (
    <div style={styles.root}>
      <main style={styles.content}>
        <Offset />
        <VerticalTabs
          wallet={wallet}
          chats={chats}
          index={index}
          location={location}
        />
      </main>
    </div>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={styles.tabPanel}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function VerticalTabs({ wallet, chats, index, location }) {
  const [value, setValue] = useState(index);
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const bottomChat = useRef();

  useEffect(() => {
    // @ts-ignore
    bottomChat?.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  return (
    <div style={styles.tabRoot}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        style={styles.tabs}
      >
        <Tab label="New Chat" {...a11yProps(0)} key={0}></Tab>
        {chats &&
          Object.keys(chats).map((user, i) => (
            <Tab label={user} {...a11yProps(i + 1)} key={user}></Tab>
          ))}
      </Tabs>
      <TabPanel value={value} index={0} key={0}>
        <Container maxWidth="xl">
          <StyledTextField
            style={styles.input}
            label="Recipient"
            variant="outlined"
            onChange={(e) => setTarget(e.target.value)}
          />
          <StyledTextField
            style={styles.input}
            multiline
            minRows={3}
            label="Message"
            variant="outlined"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            color="primary"
            variant="contained"
            style={styles.button}
            onClick={(e) => {
              e.preventDefault();
              submitMessageTx(message, target, wallet).then((data: any) => {
                handleClickVariant("success", data.result.reason)();
              });
            }}
          >
            Submit
          </Button>
        </Container>
      </TabPanel>
      {chats &&
        Object.keys(chats).map((user, i) => (
          <TabPanel value={value} index={i + 1} key={user}>
            <Container
              maxWidth="xl"
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <List sx={styles.list}>
                {chats[user].map((message, i, arr) => (
                  <div key={i}>
                    <ListItem
                      alignItems="flex-start"
                      style={styles.messageNotification}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginRight: 2,
                        }}
                      >
                        <Avatar {...stringAvatar(message.handle)} />
                        <Typography>
                          {formatDate(new Date(message.timestamp))}
                        </Typography>
                      </div>
                      <ListItemText
                        primary={message.handle}
                        secondary={message.body}
                      />
                    </ListItem>
                    {arr[i + 1] && <Divider />}
                  </div>
                ))}
                <div ref={bottomChat} />
              </List>
              <>
                <StyledTextField
                  style={styles.input}
                  label="Message"
                  variant="outlined"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  color="primary"
                  variant="contained"
                  style={styles.button}
                  onClick={(e) => {
                    e.preventDefault();
                    submitMessageTx(message, user, wallet).then((data: any) => {
                      handleClickVariant("success", data.result.reason)();
                    });
                  }}
                >
                  Submit
                </Button>
              </>
            </Container>
          </TabPanel>
        ))}
    </div>
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
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}}`,
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
