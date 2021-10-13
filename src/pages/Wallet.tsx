import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { VariantType, useSnackbar } from "notistack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SwapCallsIcon from "@mui/icons-material/SwapCalls";
import SendIcon from "@mui/icons-material/Send";
import QRCode from "react-qr-code";
import {
  getAccountFromAlias,
  submitTransferTx,
  submitSwapTx,
} from "../api/peerswapAPI";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Unit = styled("span")(({ theme }) => ({
  fontSize: "16px",
  letterSpacing: "-.16px",
  textAlign: "left",
  position: "relative",
  top: "-25px",
  left: "5px",
}));

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

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
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

interface LinkTabProps {
  label?: string;
  href?: string;
  icon?: any;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const tabMapping = {
  send: 0,
  swap: 1,
  receive: 2,
};

export default function Wallet({ wallet, location }) {
  let currentTab = tabMapping[location.pathname.split("/")[2]];
  const [value, setValue] = useState(currentTab !== undefined ? currentTab : 0);
  const { account } = useSelector((state: RootState) => state.account);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: (theme) => theme.spacing(3),
        }}
      >
        <Offset />
        <Typography variant="h4" align="center" sx={{ m: 1 }}>
          {account && account.data.balance.toFixed(3)}
          <Unit>SWAP</Unit>
        </Typography>
        <Paper sx={{ flexGrow: 1 }} elevation={9}>
          <Paper sx={{ flexGrow: 1 }} elevation={3}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="icon label tabs example"
              centered
            >
              <LinkTab icon={<AttachMoneyIcon />} label="Send" />
              <LinkTab icon={<SwapHorizIcon />} label="Swap" />
              <LinkTab icon={<CardGiftcardIcon />} label="Receive" />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            <SendTab wallet={wallet} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SwapTab wallet={wallet} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ReceiveTab account={account} />
          </TabPanel>
        </Paper>
      </Box>
    </Box>
  );
}

function SendTab({ wallet }) {
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("success");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (target.length > 3) {
      getAccountFromAlias(target).then((res) => {
        if (res.error) {
          setStatus("This user doesn't exist.");
          setSeverity("error");
        } else {
          setStatus("User found! Safe to submit");
          setSeverity("success");
        }
      });
    } else {
      setStatus("Enter the user's alias to send them tokens");
      setSeverity("info");
    }
  }, [target]);

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: (theme) => theme.spacing(3),
      }}
    >
      <Container maxWidth="sm">
        <Form
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            submitTransferTx(target, amount, wallet).then((data: any) => {
              handleClickVariant("success", data.result.reason)();
            });
          }}
        >
          {status && (
            <Alert
              variant="filled"
              severity={severity as any}
            >
              {status}
            </Alert>
          )}
          <TextField
            sx={{ mt: (theme) => theme.spacing(2) }}
            id="recipient-address"
            label="Recipient"
            variant="filled"
            color="primary"
            onChange={(e) => setTarget(e.target.value)}
          />
          <TextField
            sx={{ mt: (theme) => theme.spacing(2) }}
            id="offer-amount"
            label="Amount"
            variant="filled"
            color="primary"
            type="number"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: (theme) => theme.spacing(2) }}
            startIcon={<SendIcon />}
            disabled={severity === "error"}
          >
            Send
          </Button>
        </Form>
      </Container>
    </Box>
  );
}

function ReceiveTab({ account }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: (theme) => theme.spacing(3),
      }}
    >
      <Typography variant="body1" align="center">
        Share your username
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="primary"
        sx={{
          mt: (theme) => theme.spacing(2),
          wordBreak: "break-all",
        }}
      >
        {account.alias}
      </Typography>
      <Typography
        align="center"
        sx={{
          mt: (theme) => theme.spacing(2),
          wordBreak: "break-all",
        }}
      >
        <QRCode value={account.alias} size={150} />
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{
          mt: (theme) => theme.spacing(2),
          wordBreak: "break-all",
        }}
      >
        Share your address
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="primary"
        sx={{
          mt: (theme) => theme.spacing(2),
          wordBreak: "break-all",
        }}
      >
        {account.id}
      </Typography>
      <Typography
        align="center"
        sx={{
          mt: (theme) => theme.spacing(2),
          wordBreak: "break-all",
        }}
      >
        <QRCode value={account.id} size={150} />
      </Typography>
    </Box>
  );
}

function SwapTab({ wallet }) {
  const [state, setState] = React.useState({
    type: "swap",
    swapType: "",
    initiator: "",
    tokenRequested: "",
    amountRequested: 0,
    tokenOffered: "",
    amountOffered: 0,
    maxTimeToSend: 3600,
    maxTimeToReceive: 3600,
    fixed: false,
    initiatorCollateral: 0,
    initiatorChainAddress: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event, field) => {
    setState({
      ...state,
      [field]: event.target.value,
    });
  };

  const handleNumberChange = (event, field) => {
    setState({
      ...state,
      [field]: parseFloat(event.target.value),
    });
  };

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };
  return (
    <Form
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        submitSwapTx(state, wallet).then((data: any) => {
          handleClickVariant("success", data.result.reason)();
        });
      }}
    >
      <FormControl component="fieldset">
        <Container
          maxWidth="sm"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <FormLabel component="legend" sx={{ my: 1 }}>
            Swap Type
          </FormLabel>
          <RadioGroup
            aria-label="swap-type"
            name="swap-type"
            value={state.swapType}
            onChange={(e) => handleChange(e, "swapType")}
            sx={{
              my: 1,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
            }}
            row
          >
            <FormControlLabel value="offer" control={<Radio />} label="Offer" />
            <FormControlLabel
              value="request"
              control={<Radio />}
              label="Request"
            />
            <FormControlLabel
              value="immediate"
              control={<Radio />}
              label="Immediate"
            />
          </RadioGroup>
          {state.swapType === "offer" && (
            <OfferForm
              handleChange={handleChange}
              setNumber={handleNumberChange}
            />
          )}
          {state.swapType === "request" && (
            <RequestForm
              handleChange={handleChange}
              setNumber={handleNumberChange}
            />
          )}
          {state.swapType === "immediate" && (
            <ImmediateForm
              handleChange={handleChange}
              setNumber={handleNumberChange}
            />
          )}
          <TextField
            id="filled-basic"
            value={state.maxTimeToSend}
            type="number"
            label="Max Time To Send"
            variant="filled"
            onChange={(e) =>
              setState({
                ...state,
                maxTimeToSend: parseFloat(e.target.value),
              })
            }
            sx={{ my: 1 }}
            fullWidth
          />
          <TextField
            id="filled-basic"
            value={state.maxTimeToReceive}
            type="number"
            label="Max Time To Receive"
            variant="filled"
            onChange={(e) =>
              setState({
                ...state,
                maxTimeToReceive: parseFloat(e.target.value),
              })
            }
            sx={{ my: 1 }}
            fullWidth
          />
          <TextField
            id="filled-basic"
            type="number"
            label="Collateral"
            variant="filled"
            onChange={(e) =>
              setState({
                ...state,
                initiatorCollateral: parseFloat(e.target.value),
              })
            }
            sx={{ my: 1 }}
            fullWidth
          />
          <FormControlLabel
            value={state.fixed}
            control={
              <Checkbox
                color="primary"
                onChange={() => setState({ ...state, fixed: !state.fixed })}
              />
            }
            label="Fixed Precision"
            labelPlacement="end"
          />
          <Alert
            variant="filled"
            severity="info"
            sx={{ mb: (theme) => theme.spacing(1) }}
          >
            Fixed precision means that each user in the swap agreement needs to
            send the exact amounts specified in the swap, otherwise a
            0.001 difference in the amounts sent will be accepted.
          </Alert>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ my: 1 }}
            startIcon={<SwapCallsIcon />}
          >
            Swap
          </Button>
        </Container>
      </FormControl>
    </Form>
  );
}

const OfferForm = ({ handleChange, setNumber }) => {
  return (
    <>
      <Alert
        variant="filled"
        severity="info"
        sx={{ mb: (theme) => theme.spacing(1) }}
      >
        Offer swaps are for used when you want to offer a token that you have
        while being open to receiving any token offered in bids
      </Alert>
      <TextField
        id="filled-basic"
        label="Token Offered"
        variant="filled"
        onChange={(e) => handleChange(e, "tokenOffered")}
        sx={{ my: 1 }}
        fullWidth
      />
      <TextField
        id="filled-basic"
        label="Amount Offered"
        type="number"
        variant="filled"
        onChange={(e) => setNumber(e, "amountOffered")}
        sx={{ my: 1 }}
        fullWidth
      />
    </>
  );
};

const RequestForm = ({ handleChange, setNumber }) => {
  return (
    <>
      <Alert
        variant="filled"
        severity="info"
        sx={{ mb: (theme) => theme.spacing(1) }}
      >
        Request swaps are for used when you want to request a token that you
        want while being open to offering tokens requested in bids
      </Alert>
      <TextField
        id="filled-basic"
        label="Token Requested"
        variant="filled"
        onChange={(e) => handleChange(e, "tokenRequested")}
        sx={{ my: 1 }}
        fullWidth
      />
      <TextField
        id="filled-basic"
        label="Amount Requested"
        type="number"
        variant="filled"
        onChange={(e) => setNumber(e, "amountRequested")}
        sx={{ my: 1 }}
        fullWidth
      />
      <TextField
        id="filled-basic"
        label="Blockchain Address"
        variant="filled"
        onChange={(e) => handleChange(e, "initiatorChainAddress")}
        sx={{ my: 1 }}
        fullWidth
      />
    </>
  );
};

const ImmediateForm = ({ handleChange, setNumber }) => {
  return (
    <>
      <Alert
        variant="filled"
        severity="info"
        sx={{ mb: (theme) => theme.spacing(1) }}
      >
        Immediate swaps are for used when you want to specify the token that you
        want, the token that you have, and the exact amounts for each in the
        terms.
      </Alert>
      <Alert
        variant="filled"
        severity="warning"
        sx={{ mb: (theme) => theme.spacing(1) }}
      >
        Any bid on an immediate swap will automatically put you and the provider
        into a swap agreement (You don't have to accept the bid)
      </Alert>
      <TextField
        id="filled-basic"
        label="Token Offered"
        variant="filled"
        onChange={(e) => handleChange(e, "tokenOffered")}
        sx={{ my: 1 }}
        fullWidth
      />
      <TextField
        id="filled-basic"
        label="Amount Offered"
        type="number"
        variant="filled"
        onChange={(e) => setNumber(e, "amountOffered")}
        sx={{ my: 1 }}
        fullWidth
      />
      <TextField
        id="filled-basic"
        label="Token Requested"
        variant="filled"
        onChange={(e) => handleChange(e, "tokenRequested")}
        sx={{ my: 1 }}
        fullWidth
      />
      <TextField
        id="filled-basic"
        label="Amount Requested"
        type="number"
        variant="filled"
        onChange={(e) => setNumber(e, "amountRequested")}
        sx={{ my: 1 }}
        fullWidth
      />
      <TextField
        id="filled-basic"
        label="Blockchain Address"
        variant="filled"
        onChange={(e) => handleChange(e, "initiatorChainAddress")}
        sx={{ my: 1 }}
        fullWidth
      />
    </>
  );
};
