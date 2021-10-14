import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ChatMessage from "components/ChatMessage";
import { VariantType, useSnackbar } from "notistack";
import { submitMessageTx, getChats } from "../api/peerswapAPI";
import { setChats } from "../features/messages/messagesSlice";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function Messages({ wallet, location }) {
  const dispatch = useDispatch();
  const { chats } = useSelector((state: RootState) => state.messages);
  const { account } = useSelector((state: RootState) => state.account);
  const [index, setIndex] = useState(
    Object.keys(chats).indexOf(location.pathname.split("/").pop()) + 1
  );

  console.log(index);

  useEffect(() => {
    getChats(account, wallet).then((chats) => {
      dispatch(setChats(chats));
    });
  }, [account, dispatch, wallet]);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: `100vh`,
        width: "100%",
      }}
    >
      <Offset />
      <VerticalTabs
        wallet={wallet}
        chats={chats}
        index={index}
        setIndex={setIndex}
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
        flexGrow: 1,
        height: '100%'
      }}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function VerticalTabs({ wallet, chats, index, setIndex }) {
  const [value, setValue] = useState(index);
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  // const bottomChat = useRef();

  // useEffect(() => {
  //   // @ts-ignore
  //   bottomChat?.current?.scrollIntoView({ behavior: "smooth" });
  // }, [message]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    setIndex(newValue);
  };

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    submitMessageTx(message, target, wallet).then((data: any) => {
      handleClickVariant("success", data.result.reason)();
    });
    setMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
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
          // borderRight: `1px solid grey`,
          maxWidth: "200px",
          minWidth: "100px",
        }}
      >
        <Tab label="New Chat" {...a11yProps(0)} key={0}></Tab>
        {chats &&
          Object.keys(chats).map((user, i) => (
            <Tab
              label={user}
              {...a11yProps(i + 1)}
              key={user}
              onClick={() => setTarget(user)}
            />
          ))}
      </Tabs>
      <TabPanel value={value} index={0} key={0}>
        <Paper
          elevation={6}
          sx={{
            height: "100%",
            p: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            sx={{ mt: 2, mx: 2 }}
            label="Recipient"
            variant="outlined"
            onChange={(e) => setTarget(e.target.value)}
          />
          <TextField
            sx={{ mt: 2, mx: 2 }}
            label="Message"
            variant="outlined"
            multiline
            minRows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(event) => {
              event.key === "Enter" && handleSendMessage(event);
            }}
          />
        </Paper>
      </TabPanel>
      {chats &&
        Object.keys(chats).map((user, i) => (
          <TabPanel value={value} index={i + 1} key={user}>
            <Paper
              elevation={6}
              sx={{
                height: "100%",
                p: 1,
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <List>
                {chats[user].map((message, i, arr) => (
                  <ChatMessage message={message} key={i} />
                ))}
              </List>
              <TextField
                sx={{ mt: "auto", mx: 2, mb: 2 }}
                label="Message"
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(event) => {
                  event.key === "Enter" && handleSendMessage(event);
                }}
              />
            </Paper>
          </TabPanel>
        ))}
    </Box>
  );
}

export default React.memo(Messages)