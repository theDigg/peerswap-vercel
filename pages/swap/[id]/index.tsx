import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { VariantType, useSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import { BootstrapTooltip } from 'style/components/Tooltip';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QueueIcon from '@mui/icons-material/Queue';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import WarningIcon from '@mui/icons-material/Warning';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { formatDateTime, shortenHex } from 'utils/stringUtils';
import BidCard from 'components/BidCard';
import useInterval from 'hooks/useInterval';
import Modal from '@mui/material/Modal';
import {
  getSwap,
  submitBidTx,
  submitReceiptTx,
  submitDisputeTx,
  queryBids
} from 'api/peerswapAPI';
import useCopyToClipboard from 'hooks/useCopyToClipboard';
import { StyledLink } from 'style/components/Link';
import { ExpandMore } from 'style/components/Buttons';
import { RedditTextField } from 'style/components/TextFields';
// import useSWR from 'swr';

// const fetcher = (url) => fetch(url).then((res) => res.json());

// TODO: Refactor THIS

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const statusColor = {
  open: 'info',
  exchanging: 'warning',
  disputing: 'error',
  complete: 'success'
};

const OfferForm = ({ handleChange, setNumber }) => {
  return (
    <>
      <TextField
        id="filled-basic"
        label="Token Offered"
        variant="filled"
        onChange={(e) => handleChange(e, 'tokenOffered')}
        sx={{ my: 1 }}
        fullWidth
      />
      <TextField
        id="filled-basic"
        label="Amount Offered"
        type="number"
        variant="filled"
        onChange={(e) => setNumber(e, 'amountOffered')}
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
        onChange={(e) => handleChange(e, 'tokenRequested')}
        sx={{ my: 1 }}
        fullWidth
      />
      <TextField
        id="filled-basic"
        label="Amount Requested"
        type="number"
        variant="filled"
        onChange={(e) => setNumber(e, 'amountRequested')}
        sx={{ my: 1 }}
        fullWidth
      />
    </>
  );
};

export default function Swap({ swap, initialBids }) {
  //   const { node } = useSelector((state: RootState) => state.archiver);
  const isCurrent = React.useRef(true);
  const [, copy] = useCopyToClipboard();
  const [state, setState] = useState({
    swapId: '',
    tokenOffered: '',
    amountOffered: 0,
    tokenRequested: '',
    amountRequested: 0,
    providerCollateral: 0,
    providerChainAddress: ''
  });
  const [expanded, setExpanded] = useState(true);
  const [bids, setBids] = useState(initialBids);
  const { wallet } = useSelector((state: RootState) => state.wallet);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [explanation, setExplanation] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  useEffect(() => {
    if (swap.swapType === 'offer') {
      setState({
        ...state,
        tokenRequested: swap.tokenOffered,
        amountRequested: swap.amountOffered
      });
    }
    if (swap.swapType === 'request') {
      setState({
        ...state,
        tokenOffered: swap.tokenRequested,
        amountOffered: swap.amountRequested
      });
    }
    if (swap.swapType === 'immediate') {
      setState({
        ...state,
        tokenOffered: swap.tokenRequested,
        amountOffered: swap.amountRequested,
        tokenRequested: swap.tokenOffered,
        amountRequested: swap.amountOffered
      });
    }
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useInterval(() => {
    queryBids(swap.id).then((data) => {
      setBids(data.bids);
    });
  }, 10000);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event, field) => {
    setState({
      ...state,
      [field]: event.target.value
    });
  };

  const handleNumberChange = (event, field) => {
    setState({
      ...state,
      [field]: parseFloat(event.target.value)
    });
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Offset />
        {swap && (
          <>
            <Card sx={{ width: '100%' }} elevation={9}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="swap-initiator"
                    sx={{ bgcolor: red[500] }}
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
                        color={statusColor[swap.status]}
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
                              'success',
                              'Copied address to clipboard'
                            )();
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}
                  {swap.initiatorChainMemo !== 'None' && (
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
                              'success',
                              'Copied memo to clipboard'
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
                          label={swap.maxTimeToSend / 60 + ' Minutes'}
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
                          label={swap.maxTimeToReceive / 60 + ' Minutes'}
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
                        <Chip label={swap.collateral + ' DAI'} size="small" />
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
                        <StyledLink href={`../bid/${swap.acceptedBid}`}>
                          <Chip
                            label={shortenHex(swap.acceptedBid)}
                            size="small"
                            color="primary"
                            sx={{ cursor: 'pointer' }}
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
                        <StyledLink href={`../contract/${swap.contractId}`}>
                          <Chip
                            label={shortenHex(swap.contractId)}
                            size="small"
                            color="primary"
                            sx={{ cursor: 'pointer' }}
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
                        <StyledLink href={`../disputes/${swap.disputeId}`}>
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
                <BootstrapTooltip title="mark swap as successful" arrow>
                  <span>
                    <IconButton
                      aria-label="mark swap as successful"
                      disabled={
                        wallet.handle !== swap.initiatorAlias ||
                        swap.status !== 'exchanging'
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
                </BootstrapTooltip>
                <BootstrapTooltip title="dispute this swap" arrow>
                  <span>
                    <IconButton
                      aria-label="dispute swap"
                      disabled={
                        wallet.handle !== swap.initiatorAlias ||
                        swap.status !== 'exchanging'
                      }
                      onClick={handleOpen}
                    >
                      <WarningIcon />
                    </IconButton>
                  </span>
                </BootstrapTooltip>
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
                    {swap.status === 'open' && (
                      <Box
                        component="form"
                        sx={{
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => {
                          e.preventDefault();
                          submitBidTx(
                            { ...state, swapId: swap.id },
                            wallet
                          ).then(({ result }: any) => {
                            handleClickVariant(result.status, result.reason)();
                          });
                        }}
                      >
                        {swap.swapType === 'offer' && (
                          <>
                            <OfferForm
                              handleChange={handleChange}
                              setNumber={handleNumberChange}
                            />
                            <TextField
                              sx={{ my: 1 }}
                              id="blockchain-address"
                              label={swap.tokenOffered + ' Address'}
                              variant="filled"
                              color="primary"
                              fullWidth
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  providerChainAddress: e.target.value
                                })
                              }
                            />
                          </>
                        )}
                        {swap.swapType === 'request' && (
                          <>
                            <RequestForm
                              handleChange={handleChange}
                              setNumber={handleNumberChange}
                              requestedToken={swap.tokenRequested}
                            />
                            <TextField
                              sx={{ my: 1 }}
                              id="blockchain-address"
                              label={state.tokenRequested + ' Address'}
                              variant="filled"
                              color="primary"
                              fullWidth
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  providerChainAddress: e.target.value
                                })
                              }
                            />
                          </>
                        )}
                        {swap.swapType === 'immediate' && (
                          <TextField
                            sx={{ my: 1 }}
                            id="blockchain-address"
                            label={state.tokenRequested + ' Address'}
                            variant="filled"
                            color="primary"
                            fullWidth
                            onChange={(e) =>
                              setState({
                                ...state,
                                providerChainAddress: e.target.value
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
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Explain your reasoning for opening a dispute
                </Typography>
                <RedditTextField
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  label="Explanation"
                  multiline
                  fullWidth
                  rows={4}
                  onChange={(e) => setExplanation(e.target.value)}
                />
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    submitDisputeTx(explanation, swap, wallet).then(
                      ({ result }: any) => {
                        handleClickVariant(result.status, result.reason)();
                      }
                    );
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Modal>
          </>
        )}
      </Box>
    </Box>
  );
}

// This gets called on every request
export async function getServerSideProps({ query }) {
  // Fetch data from external API
  const { id } = query;
  const { swap } = await getSwap(id);
  const { bids } = await queryBids(swap.accountId);

  return {
    props: {
      swap: swap.data,
      initialBids: bids
    }
  };
}

// Swap.getInitialProps = async ({ query }) => {
//   const { id } = query;
//   const { swap } = await getSwap(id);
//   const { bids } = await queryBids(swap.accountId);

//   return {
//     swap: swap.data,
//     initialBids: bids
//   };
// };
