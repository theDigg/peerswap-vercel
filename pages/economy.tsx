import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { VariantType, useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import ParameterTable from "components/Parameters";
import { styled } from "@mui/material/styles";
import { RedditTextField } from "style/components/TextFields";
import { Android12Switch } from "style/components/Switches";
import { getParameters, submitProposalTx, getWindow } from "api/peerswapAPI";
import { formatDateTime } from "utils/stringUtils";
import Page from 'components/Page';

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

const Economy = () => {
  const router = useRouter();
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
              onClick={() => router.push("/vote")}
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
              submitProposalTx(state.parameters, wallet).then(
                ({ result }: any) => {
                  handleClickVariant(result.status, result.reason)();
                }
              );
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

const EconomyPage = () => (
  <Page name="Economy" path="/economy">
    <Economy />
  </Page>
);

export default EconomyPage;