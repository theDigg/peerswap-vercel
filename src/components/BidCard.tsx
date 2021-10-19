import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { VariantType, useSnackbar } from "notistack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, blue, yellow, green, common, grey } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { submitContractTx, submitReceiptFromBidTx } from "../api/peerswapAPI";
import { formatDateTime, shortenHex } from "../utils/stringUtils";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

const statusColorBackground = {
  placed: blue[700],
  accepted: yellow[700],
  disputing: red[700],
  complete: green[700],
};

const statusColorText = {
  placed: common.white,
  accepted: common.black,
  disputing: common.white,
  complete: common.white,
};

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  "&:hover": {
    cursor: "pointer",
    opacity: 0.9,
  },
}));

function BidCard({ swap, bid }) {
  const [initiatorChainAddress, setInitiatorChainAddress] = useState("");
  const { wallet } = useSelector((state: RootState) => state.wallet);
  const { enqueueSnackbar } = useSnackbar();
  const [, copy] = useCopyToClipboard();

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  return (
    <Card sx={{ width: "100%" }} elevation={4}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" sx={{ bgcolor: grey[600] }}>
            <LocalOfferIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
                sx={{
                  bgcolor: statusColorBackground[bid.status],
                  color: statusColorText[bid.status],
                }}
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
                label={bid.amountOffered + " " + bid.tokenOffered}
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
                label={bid.amountRequested + " " + bid.tokenRequested}
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
                    "success",
                    "Copied address to clipboard"
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
                <Typography variant="body1" color="textPrimary" component="div">
                  Chain Memo:
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={bid.providerChainMemo}
                  size="small"
                  onClick={() => {
                    copy(bid.providerChainMemo);
                    handleClickVariant("success", "Copied memo to clipboard")();
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
              <Chip label={bid.collateral + " DAI"} size="small" />
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
                label={bid.rate + " " + bid.pair[0] + " per " + bid.pair[1]}
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
              <StyledLink to={`../swap/${bid.swapId}`}>
                <Chip
                  label={shortenHex(bid.swapId)}
                  size="small"
                  color="primary"
                  sx={{ cursor: "pointer" }}
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
                <Typography variant="body1" color="textPrimary" component="div">
                  Contract:
                </Typography>
              </Grid>
              <Grid item>
                <StyledLink
                  to={`../contract/${bid.contractId}`}
                  // className={classes.link}
                >
                  <Chip
                    label={shortenHex(bid.contractId)}
                    size="small"
                    color="primary"
                    sx={{ cursor: "pointer" }}
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
                <Typography variant="body1" color="textPrimary" component="div">
                  Dispute:
                </Typography>
              </Grid>
              <Grid item>
                <StyledLink
                  to={`../dispute/${bid.disputeId}`}
                  // className={classes.link}
                >
                  <Chip
                    label={shortenHex(bid.disputeId)}
                    size="small"
                    color="primary"
                    // className={classes.link}
                  />
                </StyledLink>
              </Grid>
            </Grid>
          )}
          {swap.initiator === wallet.entry.address &&
            swap.swapType === "offer" &&
            swap.status === "open" && (
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
          <Tooltip title="Accept bid">
            <span>
              <IconButton
                aria-label="accept bid"
                disabled={
                  wallet.handle !== swap.initiatorAlias ||
                  swap.status !== "open"
                }
                onClick={() => {
                  submitContractTx(
                    swap.id,
                    swap.swapType,
                    bid.id,
                    bid.provider,
                    swap.swapType === "offer"
                      ? initiatorChainAddress
                      : swap.initiatorChainAddress,
                    wallet
                  ).then(({result}: any) => {
                    handleClickVariant(result.status, result.reason)();
                  });
                }}
              >
                <CheckIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
        {wallet.handle === bid.providerAlias && (
          <Tooltip title="Mark swap as successful">
            <span>
              <IconButton
                aria-label="bid-receipt"
                disabled={bid.status !== "accepted"}
                onClick={() => {
                  submitReceiptFromBidTx(swap, wallet).then(({result}: any) => {
                    handleClickVariant(result.status, result.reason)();
                  });
                }}
              >
                <DoneAllIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}

export default BidCard;
