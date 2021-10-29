import React, { useEffect, useRef } from "react";
import { VariantType, useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { StyledLink } from "style/components/Link";
import { ExpandMore } from "style/components/Buttons";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LoopIcon from "@mui/icons-material/Loop";
import WarningIcon from "@mui/icons-material/Warning";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import BidCard from "./BidCard";
import SwapCard from "./SwapCard";
import { formatDateTime, shortenHex } from "../utils/stringUtils";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { PlaygroundSpeedDial } from 'components/MUIDemo/SpeedDial'
import {
  submitReceiptTx,
  submitDisputeTx,
  queryBids,
} from "../api/peerswapAPI";

const statusColor = {
  open: "info",
  exchanging: "warning",
  disputing: "error",
  complete: "success",
};

interface Dispute {
  id: string;
  type: string;
  prosecutor: string;
  prosecutorAlias: string;
  defendant: string;
  defendantAlias: string;
  reasonForDispute: string;
  swapId: string;
  bidId: string;
  contractId: string;
  prosecutorEvidence: string; // Links of relevant documentation for making their case in the dispute
  defendantEvidence: string; // Links of relevant documentation for making their case in the dispute
  jury: string[];
  juryVotes?: Array<{
    jurorId: string; // AccountId of the juror
    favor: string; // AccountId of the user who this juror voted in favor of
  }>;
  //   users: string[];
  //   userVotes?: Array<{
  //     userId: string; // AccountId of the juror
  //     favor: string; // AccountId of the user who this juror voted in favor of
  //   }>;
  createdAt: number;
  votingStarts: number;
  votingEnds: number;
  verdict: boolean;
  innocent: string;
  guilty: string;
  hash: string;
  timestamp: number;
}

const dispute: Dispute = {
  id: "39d1935b5740de7b81fccd923fb52d211941167497f118b4e569eb44f0c65e9d",
  type: "DisputeAccount",
  prosecutor:
    "5b05aaa08ba44fc365b80c86ee9ef5e27b53a182d6ba666eff35ef036e12a2c7",
  prosecutorAlias: "kyle",
  defendant: "5b05aaa08ba44fc365b80c86ee9ef5e27b53a182d6ba666eff35ef036e12a2c7",
  defendantAlias: "aamir",
  swapId: "5d2862e10e2fc0ec3976915b12252b9ed0051a14dcf2215f6d37ecddd3cb7b9d",
  bidId: "14b218a052ec439b52fa6199f8bb5eed2b481290571092138a43db81271aa986",
  contractId:
    "01c02d4878ee6dff59605bb5231e82dd845c95c2c8f63752e364ab1ca8ea096e",
  reasonForDispute: "Aamir never sent me the offer he made in the contract.",
  prosecutorEvidence: "",
  defendantEvidence: "",
  jury: [],
  juryVotes: [],
  //   users: [],
  //   userVotes: [],
  createdAt: 1635377941270,
  votingStarts: 1635378941270,
  votingEnds: 1635379941270,
  verdict: false,
  innocent: "",
  guilty: "",
  timestamp: 1635377941270,
  hash: "14eab9b349d2a82a85dca5d4c78a6a122c91c8ab946049b61649b9f2ba9fab4d",
};

const swap = {
  id: "5d2862e10e2fc0ec3976915b12252b9ed0051a14dcf2215f6d37ecddd3cb7b9d",
  type: "SwapAccount",
  swapType: "offer",
  status: "disputing",
  initiator: "5b05aaa08ba44fc365b80c86ee9ef5e27b53a182d6ba666eff35ef036e12a2c7",
  initiatorAlias: "kyle",
  provider: "5b05aaa08ba44fc365b80c86ee9ef5e27b53a182d6ba666eff35ef036e12a2c7",
  providerAlias: "aamir",
  tokenOffered: "XRP",
  amountOffered: 2345,
  providerChainAddress:
    "f6b13aef6878fa3ad064fc7e9bd55ad523e90c2e062cb968b29ffb48548dbd54",
  providerChainMemo: "None",
  tokenRequested: "DGB",
  amountRequested: 4534,
  initiatorChainAddress:
    "f6b13aef6878fa3ad064fc7e9bd55ad523e90c2e062cb968b29ffb48548dbd54",
  initiatorChainMemo: "None",
  fixed: false,
  maxTimeToSend: 3600,
  maxTimeToReceive: 3600,
  collateral: 345,
  timeOfAgreement: 1635377799089,
  disputeId: "39d1935b5740de7b81fccd923fb52d211941167497f118b4e569eb44f0c65e9d",
  contractId:
    "01c02d4878ee6dff59605bb5231e82dd845c95c2c8f63752e364ab1ca8ea096e",
  acceptedBid:
    "14b218a052ec439b52fa6199f8bb5eed2b481290571092138a43db81271aa986",
  bids: ["14b218a052ec439b52fa6199f8bb5eed2b481290571092138a43db81271aa986"],
  createdAt: 1635377571111,
  hash: "2865196047d5c509ba92ff988c14a1e2556bda9902c28a0538ca7cd96a1774e3",
  timestamp: 1635377941270,
};

const contract = {
  id: "01c02d4878ee6dff59605bb5231e82dd845c95c2c8f63752e364ab1ca8ea096e",
  type: "ContractAccount",
  contractDescription:
    "kyle must send exactly 2345 XRP to aamir at this address: f6b13aef6878fa3ad064fc7e9bd55ad523e90c2e062cb968b29ffb48548dbd54\n" +
    "  aamir must send exactly 4534 DGB to kyle at this address: f6b13aef6878fa3ad064fc7e9bd55ad523e90c2e062cb968b29ffb48548dbd54",
  swapId: "5d2862e10e2fc0ec3976915b12252b9ed0051a14dcf2215f6d37ecddd3cb7b9d",
  bidId: "14b218a052ec439b52fa6199f8bb5eed2b481290571092138a43db81271aa986",
  disputeId: "39d1935b5740de7b81fccd923fb52d211941167497f118b4e569eb44f0c65e9d",
  initiator: "5b05aaa08ba44fc365b80c86ee9ef5e27b53a182d6ba666eff35ef036e12a2c7",
  provider: "5b05aaa08ba44fc365b80c86ee9ef5e27b53a182d6ba666eff35ef036e12a2c7",
  tokenOffered: "XRP",
  amountOffered: 2345,
  initiatorChainAddress:
    "f6b13aef6878fa3ad064fc7e9bd55ad523e90c2e062cb968b29ffb48548dbd54",
  initiatorChainMemo: "",
  initiatorReceipt: false,
  tokenRequested: "DGB",
  amountRequested: 4534,
  providerChainAddress:
    "f6b13aef6878fa3ad064fc7e9bd55ad523e90c2e062cb968b29ffb48548dbd54",
  providerChainMemo: "",
  providerReceipt: false,
  fixed: false,
  maxTimeToSend: 3600,
  maxTimeToReceive: 3600,
  collateral: 345,
  timeOfAgreement: 1635377799089,
  hash: "6d9aba1ffe235066958bf507d1731dc983ac2e828d6f442624b1974a5ed46454",
  timestamp: 1635377941270,
};

const bid = {
  amountOffered: 4534,
  amountRequested: 2345,
  collateral: 345,
  contractId:
    "01c02d4878ee6dff59605bb5231e82dd845c95c2c8f63752e364ab1ca8ea096e",
  createdAt: 1635377768407,
  disputeId: "39d1935b5740de7b81fccd923fb52d211941167497f118b4e569eb44f0c65e9d",
  hash: "1de0640a64ec5efb6d5d9aad351f534c234811b991c0d8c23a67f9d7d9f02e2e",
  id: "14b218a052ec439b52fa6199f8bb5eed2b481290571092138a43db81271aa986",
  pair: ["XRP", "DGB"],
  provider: "5b05aaa08ba44fc365b80c86ee9ef5e27b53a182d6ba666eff35ef036e12a2c7",
  providerAlias: "aamir",
  providerChainAddress:
    "f6b13aef6878fa3ad064fc7e9bd55ad523e90c2e062cb968b29ffb48548dbd54",
  providerChainMemo: null,
  rate: 0.5172033524481694,
  status: "disputing",
  swapId: "5d2862e10e2fc0ec3976915b12252b9ed0051a14dcf2215f6d37ecddd3cb7b9d",
  timestamp: 1635377941270,
  tokenOffered: "DGB",
  tokenRequested: "XRP",
  type: "BidAccount",
};

export default function DisputeCard() {
  const [, copy] = useCopyToClipboard();
  const { wallet } = useSelector((state: RootState) => state.wallet);
  const [expanded, setExpanded] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "100%" }} elevation={4}>
      <CardHeader
        avatar={
          <Avatar aria-label="dispute-icon" sx={{ bgcolor: red[500] }}>
            <WarningAmberIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={dispute.prosecutorAlias}
        subheader={formatDateTime(dispute.createdAt)}
      />
      <CardContent>
        <Paper elevation={4} sx={{ p: (theme) => `${theme.spacing(2)}` }}>
          <Typography variant="h5" align="center">
            Reason for the dispute
          </Typography>
          <Typography variant="h6" align="center">
            {dispute.reasonForDispute}
          </Typography>
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
                label={dispute.verdict ? "Resolved" : "Disputing"}
                size="small"
                color={dispute.verdict ? "success" : "warning"}
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
                Prosecutor:
              </Typography>
            </Grid>
            <Grid item>
              <Chip label={shortenHex(dispute.prosecutor)} size="small" />
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
                defendant:
              </Typography>
            </Grid>
            <Grid item>
              <Chip label={shortenHex(dispute.defendant)} size="small" />
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
              <StyledLink href={`swap/${dispute.swapId}`}>
                <Chip
                  label={shortenHex(dispute.swapId)}
                  size="small"
                  color="primary"
                />
              </StyledLink>
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
                Bid:
              </Typography>
            </Grid>
            <Grid item>
              <StyledLink href={`bid/${dispute.bidId}`}>
                <Chip
                  label={shortenHex(dispute.bidId)}
                  size="small"
                  color="primary"
                />
              </StyledLink>
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
                Contract:
              </Typography>
            </Grid>
            <Grid item>
              <StyledLink href={`contract/${dispute.contractId}`}>
                <Chip
                  label={shortenHex(dispute.contractId)}
                  size="small"
                  color="primary"
                />
              </StyledLink>
            </Grid>
          </Grid>
        </Paper>
      </CardContent>
      <CardActions disableSpacing>
        <PlaygroundSpeedDial dir="right" />
        {/* <Tooltip title="bid on this swap" arrow>
          <span>
            <StyledLink href={`swap/${swap.id}`}>
              <IconButton aria-label="bid on this swap" disabled={false}>
                <AddIcon />
              </IconButton>
            </StyledLink>
          </span>
        </Tooltip>
        <Tooltip title="mark swap as successful" arrow>
          <span>
            <IconButton
              aria-label="mark swap as successful"
              disabled={false}
              onClick={() => {
                submitReceiptTx(swap as any, wallet).then(({ result }: any) => {
                  handleClickVariant(result.status, result.reason)();
                });
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
              disabled={false}
              onClick={() => {
                submitDisputeTx(swap, wallet).then(({ result }: any) => {
                  handleClickVariant(result.status, result.reason)();
                });
              }}
            >
              <WarningIcon />
            </IconButton>
          </span>
        </Tooltip> */}
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
              label="Evidence"
              variant="outlined"
              size="small"
              color="secondary"
            />
          </Divider>
          <Box sx={{ mt: 1 }}>
            <SwapCard swap={swap} opened={false} />
          </Box>
          <Box sx={{ mt: 1 }}>
            <BidCard swap={swap} bid={bid} />
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
