import React, { useEffect, useRef } from 'react';
import { VariantType, useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { StyledLink } from 'style/components/Link';
import { RedditTextField } from 'style/components/TextFields';
import { ExpandMore } from 'style/components/Buttons';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { BootstrapTooltip } from 'style/components/Tooltip';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import LoopIcon from '@mui/icons-material/Loop';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BidCard from './BidCard';
import { formatDateTime, shortenHex } from '../utils/stringUtils';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import {
  submitReceiptTx,
  submitDisputeTx,
  queryBids
} from '../api/peerswapAPI';
import Modal from '@mui/material/Modal';

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

const statusColor = {
  open: 'info',
  exchanging: 'warning',
  disputing: 'error',
  complete: 'success'
};

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

function SwapCard({ swap, opened }) {
  const isCurrent = useRef(true);
  const [, copy] = useCopyToClipboard();
  const { wallet } = useSelector((state: RootState) => state.wallet);
  const [expanded, setExpanded] = React.useState(opened);
  const [bids, setBids] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [explanation, setExplanation] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    queryBids(swap.id).then((data) => {
      if (isCurrent.current) {
        setBids(data.bids);
      }
    });
  }, [swap.bids, opened]);

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card sx={{ width: '100%' }} elevation={4}>
        <CardHeader
          avatar={
            <Avatar aria-label="swap-initiator" sx={{ bgcolor: red[500] }}>
              <LoopIcon />
            </Avatar>
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
          <Paper elevation={4} sx={{ p: (theme) => `${theme.spacing(2)}` }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
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
                <Typography variant="body1" color="textPrimary" component="div">
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
                  <StyledLink href={`../dispute/${swap.disputeId}`}>
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
          {wallet.handle !== swap.initiatorAlias && (
            <BootstrapTooltip title="bid on this swap" arrow>
              <span>
                <StyledLink href={`swap/${swap.id}`}>
                  <IconButton
                    aria-label="bid on this swap"
                    disabled={swap.status !== 'open'}
                  >
                    <AddIcon />
                  </IconButton>
                </StyledLink>
              </span>
            </BootstrapTooltip>
          )}
          {wallet.handle === swap.initiatorAlias && (
            <BootstrapTooltip title="mark swap as successful" arrow>
              <span>
                <IconButton
                  aria-label="mark swap as successful"
                  disabled={swap.status !== 'exchanging'}
                  onClick={() => {
                    submitReceiptTx(swap, wallet).then(({ result }: any) => {
                      handleClickVariant(result.status, result.reason)();
                    });
                  }}
                >
                  <DoneAllIcon />
                </IconButton>
              </span>
            </BootstrapTooltip>
          )}
          {wallet.handle === swap.initiatorAlias && (
            <BootstrapTooltip title="dispute this swap" arrow>
              <span>
                <IconButton
                  aria-label="dispute swap"
                  disabled={
                    wallet.handle !== swap.initiatorAlias ||
                    swap.status !== 'exchanging'
                  }
                  onClick={handleOpen}
                  // onClick={() => {
                  //   submitDisputeTx(swap, wallet).then(({ result }: any) => {
                  //     handleClickVariant(result.status, result.reason)();
                  //   });
                  // }}
                >
                  <WarningIcon />
                </IconButton>
              </span>
            </BootstrapTooltip>
          )}
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
          <CardContent>
            <Divider orientation="horizontal" sx={{ mb: 2 }}>
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
                <Box sx={{ mt: 1 }} key={bid.id}>
                  <BidCard swap={swap} bid={bid} />
                </Box>
              ))}
          </CardContent>
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
              submitDisputeTx(explanation, swap, wallet).then(({ result }: any) => {
                handleClickVariant(result.status, result.reason)();
              });
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default SwapCard;
