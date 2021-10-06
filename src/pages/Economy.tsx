import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { VariantType, useSnackbar } from "notistack";
import TextField, { TextFieldProps } from "@mui/material/TextField";
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
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import { RedditTextField } from "../style/components/TextFields";
import { getParameters, submitProposalTx, getWindow } from "../api/peerswapAPI";
import { formatDateTime } from "../utils/stringUtils";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

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
        [event.target.name]: event.target.value || 0,
      },
    });
  };

  return (
    <Box sx={styles.root}>
      <Box component="main" sx={styles.content}>
        <Offset />
        <Typography variant="h3" align="center" sx={styles.mb}>
          New Economy Proposal
        </Typography>
        <Container maxWidth="md">
          <Typography variant="body1" align="center" sx={styles.mb}>
            Submit a new proposal when the proposal window is active.
          </Typography>
          <Box sx={styles.windowInfo}>
            <FormControlLabel
              control={
                <Android12Switch
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
            <Card sx={styles.active} elevation={6}>
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
                elevation={6}
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
                elevation={6}
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
                elevation={6}
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
                elevation={6}
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
          {Object.keys(parameters).length > 0 && (
            <ParameterTable
              parameters={parameters}
              nextParameters={state.parameters}
              changeParameters={handleParameterChange}
            />
          )}
          <RedditTextField
            sx={styles.input}
            label="Title"
            variant="filled"
            onChange={handleInputChange}
            name="title"
          />
          <RedditTextField
            sx={styles.input}
            multiline
            rows={4}
            label="Description"
            variant="filled"
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

// const RedditTextField = styled((props: TextFieldProps) => (
//   <TextField
//     InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
//     {...props}
//   />
// ))(({ theme }) => ({
//   "& .MuiFilledInput-root": {
//     border: "1px solid #e2e2e1",
//     overflow: "hidden",
//     borderRadius: 4,
//     backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
//     transition: theme.transitions.create([
//       "border-color",
//       "background-color",
//       "box-shadow",
//     ]),
//     "&:hover": {
//       backgroundColor: "transparent",
//     },
//     "&.Mui-focused": {
//       backgroundColor: "transparent",
//       boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
//       borderColor: theme.palette.primary.main,
//     },
//   },
// }));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
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
      <RedditTextField
        label="Proposal Fee"
        type="number"
        id="proposalFee-input"
        variant="filled"
        value={nextParameters.proposalFee}
        name="proposalFee"
        onChange={changeParameters}
      />
    ),
    createData(
      "Maintenance Fee",
      parameters.maintenanceFee,
      <RedditTextField
        label="Maintenance Fee"
        type="number"
        id="maintenanceFee-input"
        variant="filled"
        value={nextParameters.maintenanceFee}
        name="maintenanceFee"
        onChange={changeParameters}
      />
    ),
    createData(
      "Maintenance Interval",
      parameters.maintenanceInterval,
      <RedditTextField
        label="Maintenance Interval"
        type="number"
        id="maintenanceInterval-input"
        variant="filled"
        value={nextParameters.maintenanceInterval}
        name="maintenanceInterval"
        onChange={changeParameters}
      />
    ),
    createData(
      "Node Penalty",
      parameters.nodePenalty,
      <RedditTextField
        label="Node Penalt"
        type="number"
        id="nodePenalty-input"
        variant="filled"
        value={nextParameters.nodePenalty}
        name="nodePenalty"
        onChange={changeParameters}
      />
    ),
    createData(
      "Node Reward Amount",
      parameters.nodeRewardAmount,
      <RedditTextField
        label="Node Reward"
        type="number"
        id="nodeRewardAmount-input"
        variant="filled"
        value={nextParameters.nodeRewardAmount}
        name="nodeRewardAmount"
        onChange={changeParameters}
      />
    ),
    createData(
      "Node Reward Interval",
      parameters.nodeRewardInterval,
      <RedditTextField
        label="Node Reward Interval"
        type="number"
        id="nodeRewardInterval-input"
        variant="filled"
        value={nextParameters.nodeRewardInterval}
        name="nodeRewardInterval"
        onChange={changeParameters}
      />
    ),
    createData(
      "Stake Required",
      parameters.stakeRequired,
      <RedditTextField
        label="Stake Required"
        type="number"
        id="stakeRequired-input"
        variant="filled"
        value={nextParameters.stakeRequired}
        name="stakeRequired"
        onChange={changeParameters}
      />
    ),
    createData(
      "Transaction Fee",
      parameters.transactionFee,
      <RedditTextField
        label="TX Fee"
        type="number"
        id="transactionFee-input"
        variant="filled"
        value={nextParameters.transactionFee}
        name="transactionFee"
        onChange={changeParameters}
      />
    ),
    createData(
      "Faucet Amount",
      parameters.faucetAmount,
      <RedditTextField
        label="Faucet Amount"
        type="number"
        id="faucetAmount-input"
        variant="filled"
        value={nextParameters.faucetAmount}
        name="faucetAmount"
        onChange={changeParameters}
      />
    ),
    createData(
      "Default Toll",
      parameters.defaultToll,
      <RedditTextField
        label="Default Toll"
        type="number"
        id="defaultToll-input"
        variant="filled"
        value={nextParameters.defaultToll}
        name="defaultToll"
        onChange={changeParameters}
      />
    ),
  ];

  return (
    <TableContainer component={Paper} elevation={9}>
      <Table sx={styles.table} size="small" aria-label="customized table">
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
              <StyledTableCell align="right">
                <strong>{row.current}</strong>
              </StyledTableCell>
              <StyledTableCell align="right">{row.next}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
