import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { VariantType, useSnackbar } from "notistack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchClassKey, SwitchProps } from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled, Theme, createStyles, withStyles } from "@mui/material/styles";
import { getParameters, submitProposalTx, getWindow } from "../api/peerswapAPI";
import { formatDateTime } from "../utils/stringUtils";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const styles = {
  root: {
    display: "flex",
    width: "100%",
  },
  content: {
    flexGrow: 1,
    padding: 3,
  },
  card: {
    width: "100%",
    marginBottom: 2,
    paddingBottom: 0,
  },
  active: {
    width: "100%",
    marginBottom: 2,
    paddingBottom: 0,
    border: "2px solid green",
  },
  cardContent: {
    padding: 0,
    paddingBottom: 0,
  },
  cardTitle: {
    margin: 1,
  },
  windowInfo: {
    display: "flex",
    justifyContent: "space-between",
    margin: 1,
  },
  input: {
    marginTop: 3,
    width: "100%",
  },
  button: {
    width: "100%",
    marginTop: 3,
    marginBottom: 2,
  },
  mb: {
    marginBottom: 2,
  },
  table: {
    minWidth: 350,
  },
};

const windowNameFormat = {
  proposalWindow: "Proposal Window",
  votingWindow: "Voting Window",
  graceWindow: "Grace Window",
  applyWindow: "Apply Window",
};

export default function Economy(props) {
  const { history } = props;
  const [state, setState] = useState({
    checked: false,
    parameters: {
      title: "",
      description: "",
      proposalFee: 0,
      maintenanceFee: 0,
      maintenanceInterval: 0,
      nodePenalty: 0,
      nodeRewardAmount: 0,
      nodeRewardInterval: 0,
      stakeRequired: 0,
      transactionFee: 0,
      faucetAmount: 0,
      defaultToll: 0,
    },
  });
  const [parameters, setParameters] = useState({} as any);
  const [windows, setWindows] = useState({} as any);
  const [currentWindow, setCurrentWindow] = useState({} as any);
  const { wallet } = useSelector((state: RootState) => state.wallet);
  const { enqueueSnackbar } = useSnackbar();

  const currentWindowName = Object.keys(currentWindow)[0];
  // const currentWindowTime = Object.values(currentWindow)[0]

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  useEffect(() => {
    let interval;
    getParameters().then((parameters) => {
      setParameters(parameters.current);
      setWindows(parameters.windows);
      setCurrentWindow(getWindow(parameters.windows, Date.now()));
      interval = setInterval(() => {
        setCurrentWindow(getWindow(parameters.windows, Date.now()));
      }, 1000);
      setState({ ...state, parameters: parameters.current });
    });
    return () => clearInterval(interval);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      parameters: {
        ...state.parameters,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleParameterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({
      ...state,
      parameters: {
        ...state.parameters,
        [event.target.name]: parseFloat(event.target.value),
      },
    });
  };

  return (
    <Box sx={styles.root}>
      <Box component="main" sx={styles.content}>
        <Offset />
        <Container maxWidth="md">
          <Typography variant="h3" align="center" sx={styles.mb}>
            New Economy Proposal
          </Typography>
          <Typography variant="body1" align="center" sx={styles.mb}>
            Submit a new proposal when the proposal window is active.
          </Typography>
          <Box sx={styles.windowInfo}>
            <FormControlLabel
              control={
                <IOSSwitch
                  checked={state.checked}
                  onChange={handleChange}
                  name="checked"
                />
              }
              label="Show all windows"
            />
            <Button
              color="primary"
              variant="contained"
              onClick={() => history.push("/vote")}
            >
              Vote
            </Button>
          </Box>

          {!state.checked && windows[currentWindowName] && (
            <Card sx={styles.active} elevation={3}>
              <Typography
                variant="body1"
                color="textPrimary"
                gutterBottom
                align="center"
                sx={styles.cardTitle}
              >
                {windowNameFormat[currentWindowName]}
              </Typography>
              <Divider />
              <Box sx={styles.windowInfo}>
                <Typography color="textSecondary">start</Typography>
                <Typography color="textSecondary">
                  {formatDateTime(windows[currentWindowName][0])}
                </Typography>
              </Box>
              <Box sx={styles.windowInfo}>
                <Typography color="textSecondary">end</Typography>
                <Typography color="textSecondary">
                  {formatDateTime(windows[currentWindowName][1])}
                </Typography>
              </Box>
            </Card>
          )}
          {state.checked && (
            <div>
              <Card
                sx={
                  currentWindowName === "proposalWindow"
                    ? styles.active
                    : styles.card
                }
                elevation={3}
              >
                <Typography
                  variant="body1"
                  color="textPrimary"
                  gutterBottom
                  align="center"
                  sx={styles.cardTitle}
                >
                  Proposal Window
                </Typography>
                <Divider />
                <Box sx={styles.windowInfo}>
                  <Typography color="textSecondary">start</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.proposalWindow[0])}
                  </Typography>
                </Box>
                <Box sx={styles.windowInfo}>
                  <Typography color="textSecondary">end</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.proposalWindow[1])}
                  </Typography>
                </Box>
              </Card>
              <Card
                sx={
                  currentWindowName === "votingWindow"
                    ? styles.active
                    : styles.card
                }
                elevation={3}
              >
                <Typography
                  variant="body1"
                  color="textPrimary"
                  gutterBottom
                  align="center"
                  sx={styles.cardTitle}
                >
                  Voting Window
                </Typography>
                <Divider />
                <Box sx={styles.windowInfo}>
                  <Typography color="textSecondary">start</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.votingWindow[0])}
                  </Typography>
                </Box>
                <Box sx={styles.windowInfo}>
                  <Typography color="textSecondary">end</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.votingWindow[1])}
                  </Typography>
                </Box>
              </Card>
              <Card
                sx={
                  currentWindowName === "graceWindow"
                    ? styles.active
                    : styles.card
                }
                elevation={3}
              >
                <Typography
                  variant="body1"
                  color="textPrimary"
                  gutterBottom
                  align="center"
                  sx={styles.cardTitle}
                >
                  Grace Window
                </Typography>
                <Divider />
                <Box sx={styles.windowInfo}>
                  <Typography color="textSecondary">start</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.graceWindow[0])}
                  </Typography>
                </Box>
                <Box sx={styles.windowInfo}>
                  <Typography color="textSecondary">end</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.graceWindow[1])}
                  </Typography>
                </Box>
              </Card>
              <Card
                sx={
                  currentWindowName === "applyWindow"
                    ? styles.active
                    : styles.card
                }
                elevation={3}
              >
                <Typography
                  variant="body1"
                  color="textPrimary"
                  gutterBottom
                  align="center"
                  sx={styles.cardTitle}
                >
                  Apply Window
                </Typography>
                <Divider />
                <Box sx={styles.windowInfo}>
                  <Typography color="textSecondary">start</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.applyWindow[0])}
                  </Typography>
                </Box>
                <Box sx={styles.windowInfo}>
                  <Typography color="textSecondary">end</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.applyWindow[1])}
                  </Typography>
                </Box>
              </Card>
            </div>
          )}
          {Object.keys(parameters).length && (
            <ParameterTable
              parameters={parameters}
              nextParameters={state.parameters}
              changeParameters={handleParameterChange}
            />
          )}
          <TextField
            sx={styles.input}
            label="Title"
            variant="outlined"
            onChange={handleInputChange}
            name="title"
          />
          <TextField
            sx={styles.input}
            multiline
            rows={4}
            label="Description"
            variant="outlined"
            onChange={handleInputChange}
            name="description"
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={styles.button}
            onClick={() => {
              submitProposalTx(state.parameters, wallet).then((data: any) => {
                handleClickVariant("success", data.result.reason)();
              });
            }}
          >
            Submit Proposal
          </Button>
          <Typography color="textSecondary" variant="body2">
            Submitting a proposal will cost{" "}
            <strong>{parameters.proposalFee}</strong> coins + Transaction Fee:{" "}
            <strong>{parameters.transactionFee}</strong> coins
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

const StyledTableTextField = styled(TextField)`
  width: 100px;
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

function createData(parameter: string, current: number, next: any) {
  return { parameter, current, next };
}

function ParameterTable({ parameters, nextParameters, changeParameters }) {
  const rows = [
    createData(
      "Network Proposal Fee",
      parameters.proposalFee,
      <StyledTableTextField
        value={nextParameters.proposalFee}
        name="proposalFee"
        onChange={changeParameters}
      />
    ),
    createData(
      "Min. Maintenance Fee",
      parameters.maintenanceFee,
      <StyledTableTextField
        value={nextParameters.maintenanceFee}
        name="maintenanceFee"
        onChange={changeParameters}
      />
    ),
    createData(
      "Maintenance Interval",
      parameters.maintenanceInterval,
      <StyledTableTextField
        value={nextParameters.maintenanceInterval}
        name="maintenanceInterval"
        onChange={changeParameters}
      />
    ),
    createData(
      "Node Penalty",
      parameters.nodePenalty,
      <StyledTableTextField
        value={nextParameters.nodePenalty}
        name="nodePenalty"
        onChange={changeParameters}
      />
    ),
    createData(
      "Node Reward Amount",
      parameters.nodeRewardAmount,
      <StyledTableTextField
        value={nextParameters.nodeRewardAmount}
        name="nodeRewardAmount"
        onChange={changeParameters}
      />
    ),
    createData(
      "Node Reward Interval",
      parameters.nodeRewardInterval,
      <StyledTableTextField
        value={nextParameters.nodeRewardInterval}
        name="nodeRewardInterval"
        onChange={changeParameters}
      />
    ),
    createData(
      "Stake Required",
      parameters.stakeRequired,
      <StyledTableTextField
        value={nextParameters.stakeRequired}
        name="stakeRequired"
        onChange={changeParameters}
      />
    ),
    createData(
      "Transaction Fee",
      parameters.transactionFee,
      <StyledTableTextField
        value={nextParameters.transactionFee}
        name="transactionFee"
        onChange={changeParameters}
      />
    ),
    createData(
      "Faucet Amount",
      parameters.faucetAmount,
      <StyledTableTextField
        value={nextParameters.faucetAmount}
        name="faucetAmount"
        onChange={changeParameters}
      />
    ),
    createData(
      "Default Toll",
      parameters.defaultToll,
      <StyledTableTextField
        value={nextParameters.defaultToll}
        name="defaultToll"
        onChange={changeParameters}
      />
    ),
  ];

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table sx={styles.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Parameters</StyledTableCell>
            <StyledTableCell align="right">Current</StyledTableCell>
            <StyledTableCell align="right">New</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.parameter}>
              <StyledTableCell component="th" scope="row">
                {row.parameter}
              </StyledTableCell>
              <StyledTableCell align="right">{row.current}</StyledTableCell>
              <StyledTableCell align="right">{row.next}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));