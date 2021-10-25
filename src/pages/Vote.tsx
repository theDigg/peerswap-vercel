import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/rootReducer";
import { setProposals } from "../features/proposals/proposalSlice";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import {
  queryLatestProposals,
  getParameters,
  getWindow,
} from "../api/peerswapAPI";
import Proposal from "../components/Proposal";
import { formatDateTime } from "../utils/stringUtils";
import { Android12Switch } from "../style/components/Switches";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const WindowInfo = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  margin: theme.spacing(1),
}));

const CardInfo = styled(Card)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
  paddingBottom: 0,
}));

const windowNameFormat = {
  proposalWindow: "Proposal Window",
  votingWindow: "Voting Window",
  graceWindow: "Grace Window",
  applyWindow: "Apply Window",
};

export default function Vote(props) {
  const dispatch = useDispatch();
  const { history } = props;
  const [state, setState] = useState({
    checked: false,
  });
  const [windows, setWindows] = useState({} as any);
  const [currentWindow, setCurrentWindow] = useState({} as any);
  const { proposals } = useSelector((state: RootState) => state.proposals);
  const currentWindowName = Object.keys(currentWindow)[0];
  // const currentWindowTime = Object.values(currentWindow)[0]

  useEffect(() => {
    let interval;
    getParameters().then((parameters) => {
      setWindows(parameters.windows);
      setCurrentWindow(getWindow(parameters.windows, Date.now()));
      interval = setInterval(() => {
        setCurrentWindow(getWindow(parameters.windows, Date.now()));
      }, 1000);
      queryLatestProposals().then((proposals) => {
        dispatch(setProposals(proposals));
      });
    });
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: (theme) => theme.spacing(3),
        }}
      >
        <Offset />
        <Container maxWidth="md">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: (theme) => theme.spacing(2) }}
          >
            Vote on proposals
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: (theme) => theme.spacing(2) }}
          >
            Vote for a proposal when the voting window is active.
          </Typography>
          <WindowInfo>
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
              onClick={() => history.push("/economy")}
            >
              Proposal
            </Button>
          </WindowInfo>
          {!state.checked && windows[currentWindowName] && (
            <CardInfo elevation={6} sx={{ border: "2px solid green" }}>
              <Typography
                variant="body1"
                color="textPrimary"
                gutterBottom
                align="center"
                sx={{ m: (theme) => theme.spacing(1) }}
              >
                {windowNameFormat[currentWindowName]}
              </Typography>
              <Divider />
              <WindowInfo>
                <Typography color="textSecondary">start</Typography>
                <Typography color="textSecondary">
                  {formatDateTime(windows[currentWindowName][0])}
                </Typography>
              </WindowInfo>
              <WindowInfo>
                <Typography color="textSecondary">end</Typography>
                <Typography color="textSecondary">
                  {formatDateTime(windows[currentWindowName][1])}
                </Typography>
              </WindowInfo>
            </CardInfo>
          )}
          {state.checked && (
            <>
              <CardInfo
                sx={{
                  border:
                    currentWindowName === "proposalWindow" && "2px solid green",
                }}
                elevation={6}
              >
                <Typography
                  variant="body1"
                  color="textPrimary"
                  gutterBottom
                  align="center"
                  sx={{ m: (theme) => theme.spacing(1) }}
                >
                  Proposal Window
                </Typography>
                <Divider />
                <WindowInfo>
                  <Typography color="textSecondary">start</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.proposalWindow[0])}
                  </Typography>
                </WindowInfo>
                <WindowInfo>
                  <Typography color="textSecondary">end</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.proposalWindow[1])}
                  </Typography>
                </WindowInfo>
              </CardInfo>
              <CardInfo
                sx={{
                  border:
                    currentWindowName === "votingWindow" && "2px solid green",
                }}
                elevation={6}
              >
                <Typography
                  variant="body1"
                  color="textPrimary"
                  gutterBottom
                  align="center"
                  sx={{ m: (theme) => theme.spacing(1) }}
                >
                  Voting Window
                </Typography>
                <Divider />
                <WindowInfo>
                  <Typography color="textSecondary">start</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.votingWindow[0])}
                  </Typography>
                </WindowInfo>
                <WindowInfo>
                  <Typography color="textSecondary">end</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.votingWindow[1])}
                  </Typography>
                </WindowInfo>
              </CardInfo>
              <CardInfo
                sx={{
                  border:
                    currentWindowName === "graceWindow" && "2px solid green",
                }}
                elevation={6}
              >
                <Typography
                  variant="body1"
                  color="textPrimary"
                  gutterBottom
                  align="center"
                  sx={{ m: (theme) => theme.spacing(1) }}
                >
                  Grace Window
                </Typography>
                <Divider />
                <WindowInfo>
                  <Typography color="textSecondary">start</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.graceWindow[0])}
                  </Typography>
                </WindowInfo>
                <WindowInfo>
                  <Typography color="textSecondary">end</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.graceWindow[1])}
                  </Typography>
                </WindowInfo>
              </CardInfo>
              <CardInfo
                sx={{
                  border:
                    currentWindowName === "applyWindow" && "2px solid green",
                }}
                elevation={6}
              >
                <Typography
                  variant="body1"
                  color="textPrimary"
                  gutterBottom
                  align="center"
                  sx={{ m: (theme) => theme.spacing(1) }}
                >
                  Apply Window
                </Typography>
                <Divider />
                <WindowInfo>
                  <Typography color="textSecondary">start</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.applyWindow[0])}
                  </Typography>
                </WindowInfo>
                <WindowInfo>
                  <Typography color="textSecondary">end</Typography>
                  <Typography color="textSecondary">
                    {formatDateTime(windows.applyWindow[1])}
                  </Typography>
                </WindowInfo>
              </CardInfo>
            </>
          )}
          {proposals &&
            proposals.map((proposal) => <Proposal proposal={proposal} key={proposal.id} />)}
        </Container>
      </Box>
    </Box>
  );
}
