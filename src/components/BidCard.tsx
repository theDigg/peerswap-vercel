import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { VariantType, useSnackbar } from 'notistack';
import { RedditTextField } from 'style/components/TextFields';
import { BootstrapTooltip } from 'style/components/Tooltip';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WarningIcon from '@mui/icons-material/Warning';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {
  submitContractTx,
  submitReceiptFromBidTx,
  submitDisputeTx
} from 'api/peerswapAPI';
import { formatDateTime, shortenHex, stringAvatar } from 'utils/stringUtils';
import useCopyToClipboard from 'hooks/useCopyToClipboard';
import { StyledLink } from 'style/components/Link';

const statusColor = {
  placed: 'info',
  accepted: 'warning',
  disputing: 'error',
  complete: 'success'
};

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

function BidCard({ swap, bid }) {
  const [initiatorChainAddress, setInitiatorChainAddress] = useState('');
  const { wallet } = useSelector((state: RootState) => state.wallet);
  const { enqueueSnackbar } = useSnackbar();
  const [, copy] = useCopyToClipboard();
  const [open, setOpen] = React.useState(false);
  const [explanation, setExplanation] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  return (
    <>
      <Card sx={{ width: '100%' }} elevation={4}>
        <CardHeader
          avatar={
            <BootstrapTooltip title="Bid Page" placement="top">
              <span>
                <Link href={`../bid/${bid.id}`}>
                  <IconButton aria-label="bid-page-link">
                    <Avatar aria-label="bid-icon" sx={{ bgcolor: grey[600] }}>
                      <LocalOfferIcon />
                    </Avatar>
                  </IconButton>
                </Link>
              </span>
            </BootstrapTooltip>
          }
          action={
            <BootstrapTooltip title="User Profile" placement="right">
              <IconButton aria-label="settings">
                <Avatar
                  alt={bid.providerData.alias}
                  {...stringAvatar(bid.providerData)}
                />
              </IconButton>
            </BootstrapTooltip>
          }
          title={bid.providerAlias}
          subheader={formatDateTime(bid.createdAt)}
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
                  label={bid.status}
                  size="small"
                  color={statusColor[bid.status]}
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
                  Offer:
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={bid.amountOffered + ' ' + bid.tokenOffered}
                  size="small"
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
                  Request:
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={bid.amountRequested + ' ' + bid.tokenRequested}
                  size="small"
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
                  Chain Address:
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={shortenHex(bid.providerChainAddress)}
                  size="small"
                  onClick={() => {
                    copy(bid.providerChainAddress);
                    handleClickVariant(
                      'success',
                      'Copied address to clipboard'
                    )();
                  }}
                />
              </Grid>
            </Grid>
            {bid.providerChainMemo && (
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
                    label={bid.providerChainMemo}
                    size="small"
                    onClick={() => {
                      copy(bid.providerChainMemo);
                      handleClickVariant(
                        'success',
                        'Copied memo to clipboard'
                      )();
                    }}
                  />
                </Grid>
              </Grid>
            )}
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Collateral:
                </Typography>
              </Grid>
              <Grid item>
                <Chip label={bid.collateral + ' DAI'} size="small" />
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
                  Pair:
                </Typography>
              </Grid>
              <Grid item>
                <Chip label={`${bid.pair[0]}/${bid.pair[1]}`} size="small" />
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
                  Rate:
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={bid.rate + ' ' + bid.pair[0] + ' per ' + bid.pair[1]}
                  size="small"
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
                  Swap:
                </Typography>
              </Grid>
              <Grid item>
                <StyledLink href={`../swap/${bid.swapId}`}>
                  <Chip
                    label={shortenHex(bid.swapId)}
                    size="small"
                    color="primary"
                    sx={{ cursor: 'pointer' }}
                  />
                </StyledLink>
              </Grid>
            </Grid>
            {bid.contractId && (
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
                  <StyledLink href={`../contract/${bid.contractId}`}>
                    <Chip
                      label={shortenHex(bid.contractId)}
                      size="small"
                      color="primary"
                      sx={{ cursor: 'pointer' }}
                    />
                  </StyledLink>
                </Grid>
              </Grid>
            )}
            {bid.disputeId && (
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
                  <StyledLink href={`../disputes/${bid.disputeId}`}>
                    <Chip
                      label={shortenHex(bid.disputeId)}
                      size="small"
                      color="primary"
                    />
                  </StyledLink>
                </Grid>
              </Grid>
            )}
            {swap.initiator === wallet.entry.address &&
              swap.swapType === 'offer' &&
              swap.status === 'open' && (
                <TextField
                  id="outlined-basic"
                  label={`Address to receive ${bid.tokenOffered}`}
                  onChange={(e) => setInitiatorChainAddress(e.target.value)}
                  sx={{ m: (theme) => `${theme.spacing(1)}` }}
                  fullWidth
                />
              )}
          </Paper>
        </CardContent>
        <CardActions disableSpacing>
          {wallet.handle === swap.initiatorAlias && (
            <BootstrapTooltip title="Accept bid">
              <span>
                <IconButton
                  aria-label="accept bid"
                  disabled={
                    wallet.handle !== swap.initiatorAlias ||
                    swap.status !== 'open'
                  }
                  onClick={() => {
                    submitContractTx(
                      swap.id,
                      swap.swapType,
                      bid.id,
                      bid.provider,
                      swap.swapType === 'offer'
                        ? initiatorChainAddress
                        : swap.initiatorChainAddress,
                      wallet
                    ).then(({ result }: any) => {
                      handleClickVariant(result.status, result.reason)();
                    });
                  }}
                >
                  <CheckIcon />
                </IconButton>
              </span>
            </BootstrapTooltip>
          )}
          {wallet.handle === bid.providerAlias && (
            <>
              <BootstrapTooltip title="Mark swap as successful">
                <span>
                  <IconButton
                    aria-label="bid-receipt"
                    disabled={bid.status !== 'accepted'}
                    onClick={() => {
                      submitReceiptFromBidTx(swap, wallet).then(
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
              <BootstrapTooltip title="Dispute this swap">
                <span>
                  <IconButton
                    aria-label="dispute-swap"
                    disabled={
                      wallet.handle !== bid.providerAlias ||
                      bid.status !== 'accepted'
                    }
                    onClick={handleOpen}
                  >
                    <WarningIcon />
                  </IconButton>
                </span>
              </BootstrapTooltip>
            </>
          )}
        </CardActions>
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
  );
}

export default BidCard;
