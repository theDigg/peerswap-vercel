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
import { stringAvatar } from '../utils/stringUtils'

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const styles = {
  input: {
    width: "100%",
    marginTop: 2,
  },
  button: {
    width: "100%",
    marginTop: 2,
  },
};

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
    <Box
      component="main"
      sx={{
        width: "100%",
        height: "calc(100vh - 64px)",
      }}
    >
      <Offset />
      <VerticalTabs
        wallet={wallet}
        chats={chats}
        index={index}
        location={location}
      />
    </Box>
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
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      sx={{
        width: "100%",
        height: "100%",
      }}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
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

  // useEffect(() => {
  //   // @ts-ignore
  //   bottomChat?.current?.scrollIntoView({ behavior: "smooth" });
  // }, [message]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  return (
    <div
      style={{
        flexGrow: 1,
        backgroundColor: "theme.palette.background.paper",
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: `1px dashed grey`,
          minWidth: "200px",
        }}
      >
        <Tab label="New Chat" {...a11yProps(0)} key={0}></Tab>
        {chats &&
          Object.keys(chats).map((user, i) => (
            <Tab label={user} {...a11yProps(i + 1)} key={user}></Tab>
          ))}
      </Tabs>
      <TabPanel value={value} index={0} key={0}>
        <Container maxWidth="xl">
          <TextField
            sx={styles.input}
            label="Recipient"
            variant="outlined"
            onChange={(e) => setTarget(e.target.value)}
          />
          <TextField
            sx={styles.input}
            multiline
            minRows={3}
            label="Message"
            variant="outlined"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            color="primary"
            variant="contained"
            sx={styles.button}
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
              maxWidth="md"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <List
                sx={{
                  width: "100%",
                  backgroundColor: "theme.palette.background.default",
                  height: "77vh",
                  overflow: "auto",
                }}
              >
                {chats[user].map((message, i, arr) => (
                  <Box key={i}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        display: "flex",
                        gap: 2,
                        "&:hover, &:focus": {
                          backgroundColor: "theme.palette.background.default",
                        },
                      }}
                    >
                      <Box
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
                      </Box>
                      <ListItemText
                        primary={message.handle}
                        secondary={message.body}
                      />
                    </ListItem>
                    {arr[i + 1] && <Divider />}
                  </Box>
                ))}
                <div ref={bottomChat} />
              </List>
              <>
                <TextField
                  sx={styles.input}
                  label="Message"
                  variant="outlined"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  color="primary"
                  variant="contained"
                  sx={styles.button}
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
