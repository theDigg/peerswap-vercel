import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { VariantType, useSnackbar } from "notistack";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, green, yellow, blue } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import QueueIcon from "@mui/icons-material/Queue";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import WarningIcon from "@mui/icons-material/Warning";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Theme, styled } from "@mui/material/styles";
import { formatDateTime, shortenHex } from "../utils/stringUtils";
import BidCard from "../components/BidCard";
import useInterval from "../hooks/useInterval";
import {
  Accounts,
  getSwap,
  submitBidTx,
  submitReceiptTx,
  submitDisputeTx,
  queryBids,
} from "../api/peerswapAPI";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  "&:hover": {
    cursor: "pointer",
    opacity: 0.9,
  },
}));

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const statusColor = {
  open: blue[700],
  exchanging: yellow[700],
  disputing: red[700],
  complete: green[700],
};

const OfferForm = ({ handleChange, setNumber }) => {
  return (
    <>
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

const RequestForm = ({ handleChange, setNumber, requestedToken }) => {
  return (
    <>
      <TextField
        id="filled-basic"
        label={`Token Requested for sending ${requestedToken}`}
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
    </>
  );
};

export default function Swap({ location }) {
  const [swap, setSwap] = useState<Accounts.Swap>();
  const [bids, setBids] = React.useState([]);
  const isCurrent = React.useRef(true);
  const [, copy] = useCopyToClipboard();
  const [state, setState] = React.useState({
    swapId: "",
    tokenOffered: "",
    amountOffered: 0,
    tokenRequested: "",
    amountRequested: 0,
    providerCollateral: 0,
    providerChainAddress: "",
  });
  const [expanded, setExpanded] = React.useState(true);
  const { wallet } = useSelector((state: RootState) => state.wallet);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    getSwap(location.pathname).then(({ swap }) => {
      setSwap(swap.data);
      queryBids(swap.data.id).then((data) => {
        // if (isCurrent.current) {
        setBids(data.bids);
        // }
      });
      if (swap.data.swapType === "offer") {
        setState({
          ...state,
          tokenRequested: swap.data.tokenOffered,
          amountRequested: swap.data.amountOffered,
        });
      }
      if (swap.data.swapType === "request") {
        setState({
          ...state,
          tokenOffered: swap.data.tokenRequested,
          amountOffered: swap.data.amountRequested,
        });
      }
      if (swap.data.swapType === "immediate") {
        setState({
          ...state,
          tokenOffered: swap.data.tokenRequested,
          amountOffered: swap.data.amountRequested,
          tokenRequested: swap.data.tokenOffered,
          amountRequested: swap.data.amountOffered,
        });
      }
    });
  }, [location.pathname]);

  useInterval(() => {
    queryBids(swap.id).then((data) => {
      // if (isCurrent.current) {
      setBids(data.bids);
      // }
    });
  }, 10000);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
          p: 3,
        }}
      >
        <Offset />
        {swap && (
          <>
            <Card
              sx={{
                width: "100%",
              }}
              elevation={9}
            >
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="swap-initiator"
                    sx={{
                      bgcolor: red[500],
                    }}
                  ></Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={swap.initiatorAlias}
                subheader={formatDateTime(swap.createdAt)}
              />
              <CardContent>
                <Paper elevation={5} sx={{ p: 2 }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        component="div"
                      >
                        Status:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Chip
                        label={swap.status}
                        size="small"
                        style={{ backgroundColor: statusColor[swap.status] }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        component="div"
                      >
                        Swap type:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Chip label={swap.swapType} size="small" />
                    </Grid>
                  </Grid>
                  {swap.tokenOffered && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="div"
                        >
                          Token Offered:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Chip label={swap.tokenOffered} size="small" />
                      </Grid>
                    </Grid>
                  )}
                  {swap.amountOffered && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="div"
                        >
                          Amount Offered:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Chip label={swap.amountOffered} size="small" />
                      </Grid>
                    </Grid>
                  )}
                  {swap.tokenRequested && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="div"
                        >
                          Token Requested:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Chip label={swap.tokenRequested} size="small" />
                      </Grid>
                    </Grid>
                  )}
                  {swap.amountRequested && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="div"
                        >
                          Amount Requested:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Chip label={swap.amountRequested} size="small" />
                      </Grid>
                    </Grid>
                  )}
                  {swap.initiatorChainAddress && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="div"
                        >
                          Chain Address:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Chip
                          label={shortenHex(swap.initiatorChainAddress)}
                          size="small"
                          onClick={() => {
                            copy(swap.initiatorChainAddress);
                            handleClickVariant(
                              "success",
                              "Copied address to clipboard"
                            )();
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}
                  {swap.initiatorChainMemo !== "None" && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="div"
                        >
                          Chain Memo:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Chip
                          label={swap.initiatorChainMemo}
                          size="small"
                          onClick={() => {
                            copy(swap.initiatorChainMemo);
                            handleClickVariant(
                              "success",
                              "Copied memo to clipboard"
                            )();
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}
                  {swap.fixed !== undefined && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="div"
                        >
                          Fixed:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Chip label={`${swap.fixed}`} size="small" />
                      </Grid>
                    </Grid>
                  )}
                  {swap.maxTimeToSend && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="div"
                        >
                          MaxTimeToSend:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Chip
                          label={swap.maxTimeToSend / 60 + " Minutes"}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  )}
                  {swap.maxTimeToReceive && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="div"
                        >
                          MaxTimeToReceive:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Chip
                          label={swap.maxTimeToReceive / 60 + " Minutes"}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  )}
                  {swap.collateral && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="div"
                        >
                          Collateral:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Chip label={swap.collateral + " DAI"} size="small" />
                      </Grid>
                    </Grid>
                  )}
                  {swap.timeOfAgreement && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="div"
                        >
                          Time Of Agreement:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Chip
                          label={formatDateTime(swap.timeOfAgreement)}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  )}
                  {swap.acceptedBid && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="div"
                        >
                          Accepted Bid:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <StyledLink to={`../bid/${swap.acceptedBid}`}>
                          <Chip
                            label={shortenHex(swap.acceptedBid)}
                            size="small"
                            color="primary"
                            sx={{ cursor: "pointer" }}
                          />
                        </StyledLink>
                      </Grid>
                    </Grid>
                  )}
                  {swap.contractId && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="div"
                        >
                          Contract:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <StyledLink to={`../contract/${swap.contractId}`}>
                          <Chip
                            label={shortenHex(swap.contractId)}
                            size="small"
                            color="primary"
                            sx={{ cursor: "pointer" }}
                          />
                        </StyledLink>
                      </Grid>
                    </Grid>
                  )}
                  {swap.disputeId && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="div"
                        >
                          Dispute:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <StyledLink to={`../dispute/${swap.disputeId}`}>
                          <Chip
                            label={shortenHex(swap.disputeId)}
                            size="small"
                            color="primary"
                          />
                        </StyledLink>
                      </Grid>
                    </Grid>
                  )}
                </Paper>
              </CardContent>
              <CardActions disableSpacing>
                <Tooltip title="mark swap as successful" arrow>
                  <span>
                    <IconButton
                      aria-label="mark swap as successful"
                      disabled={
                        wallet.handle !== swap.initiatorAlias ||
                        swap.status !== "exchanging"
                      }
                      onClick={() => {
                        submitReceiptTx(swap, wallet).then(
                          ({ result }: any) => {
                            handleClickVariant(result.status, result.reason)();
                          }
                        );
                      }}
                    >
                      <DoneAllIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="dispute this swap" arrow>
                  <span>
                    <IconButton
                      aria-label="dispute swap"
                      disabled={
                        wallet.handle !== swap.initiatorAlias ||
                        swap.status !== "exchanging"
                      }
                      onClick={() => {
                        submitDisputeTx(swap, wallet).then(
                          ({ result }: any) => {
                            handleClickVariant(result.status, result.reason)();
                          }
                        );
                      }}
                    >
                      <WarningIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Container maxWidth="md">
                  <CardContent>
                    {swap.status === "open" && (
                      <Box
                        component="form"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => {
                          e.preventDefault();
                          submitBidTx(
                            { ...state, swapId: swap.id },
                            wallet
                          ).then(({result}: any) => {
                            handleClickVariant(result.status, result.reason)();
                          });
                        }}
                      >
                        {swap.swapType === "offer" && (
                          <>
                            <OfferForm
                              handleChange={handleChange}
                              setNumber={handleNumberChange}
                            />
                            <TextField
                              sx={{ my: 1 }}
                              id="blockchain-address"
                              label={swap.tokenOffered + " Address"}
                              variant="filled"
                              color="primary"
                              fullWidth
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  providerChainAddress: e.target.value,
                                })
                              }
                            />
                          </>
                        )}
                        {swap.swapType === "request" && (
                          <>
                            <RequestForm
                              handleChange={handleChange}
                              setNumber={handleNumberChange}
                              requestedToken={swap.tokenRequested}
                            />
                            <TextField
                              sx={{ my: 1 }}
                              id="blockchain-address"
                              label={state.tokenRequested + " Address"}
                              variant="filled"
                              color="primary"
                              fullWidth
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  providerChainAddress: e.target.value,
                                })
                              }
                            />
                          </>
                        )}
                        {swap.swapType === "immediate" && (
                          <TextField
                            sx={{ my: 1 }}
                            id="blockchain-address"
                            label={state.tokenRequested + " Address"}
                            variant="filled"
                            color="primary"
                            fullWidth
                            onChange={(e) =>
                              setState({
                                ...state,
                                providerChainAddress: e.target.value,
                              })
                            }
                          />
                        )}
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          sx={{ mt: 3 }}
                          startIcon={<QueueIcon />}
                        >
                          Place Bid
                        </Button>
                      </Box>
                    )}
                    <Divider orientation="horizontal" sx={{ my: 2 }}>
                      <Chip
                        icon={<LocalOfferIcon />}
                        label="BIDS"
                        variant="outlined"
                        size="small"
                        color="secondary"
                      />
                    </Divider>
                    {bids &&
                      bids.map((bid, i) => (
                        <Box sx={{ my: 2 }} key={bid.id}>
                          <BidCard swap={swap} bid={bid} />
                        </Box>
                      ))}
                  </CardContent>
                </Container>
              </Collapse>
            </Card>
          </>
        )}
      </Box>
    </Box>
  );
}
