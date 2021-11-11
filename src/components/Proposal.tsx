import React from "react";
import { VariantType, useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { styled } from "@mui/material/styles";
// import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BallotIcon from '@mui/icons-material/Ballot';
import { RedditTextField } from "../style/components/TextFields";
import { submitVoteTx } from "../api/peerswapAPI";
import { formatDate, stringAvatar } from "../utils/stringUtils";
import { BootstrapTooltip } from "style/components/Tooltip";
import Avatar from "@mui/material/Avatar";

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

/*
hash: "2755df77c3b2c69d73ab05316bb37d05005c3af0297b5a47dae8d4f21923e891"
id: "82ec9cfe8615fef3bc7a9ccc8f11e62695e4dabd4ec02c09a7e26e641bdc4937"
number: 1
parameters:
    defaultToll: 1
    description: "Keep the current network parameters as they are"
    faucetAmount: 10
    maintenanceFee: 0
    maintenanceInterval: 86400000
    nodePenalty: 10
    nodeRewardAmount: 1
    nodeRewardInterval: 3600000
    proposalFee: 50
    stakeRequired: 5
    title: "Default parameters"
    transactionFee: 0.001
power: 0
timestamp: 1629233261267
totalVotes: 0
type: "ProposalAccount"
*/

const Parameter = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
}));

export default function Proposal({ proposal }) {
  const [amount, setAmount] = React.useState(0);
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
    <Card
      sx={{
        width: '100%',
        mt: 3
      }}
      elevation={6}
    >
      <CardHeader
        avatar={
          <IconButton aria-label="proposal">
            <BallotIcon />
          </IconButton>
        }
        action={
          <BootstrapTooltip title={
            proposal.parameters.proposedBy.alias === "Initial Network Config" ? 'Network Stats' : 'User Profile'
          } placement="top">
            <IconButton aria-label="user-profile">
              <Avatar
                alt={proposal.parameters.proposedBy.alias}
                {...stringAvatar(proposal.parameters.proposedBy)}
              />
              {/* <MoreVertIcon /> */}
            </IconButton>
          </BootstrapTooltip>
        }
        title={proposal.parameters.title}
        subheader={proposal.parameters.description}
      />
      <CardContent>
        <Container maxWidth="md">
          <Parameter color="textPrimary">
            <em>Default Toll:</em>
            <Chip
              label={proposal.parameters.defaultToll}
              size="small"
              color="primary"
            />
          </Parameter>
          <Parameter color="textPrimary">
            <em>Faucet Amount:</em>
            <Chip
              label={proposal.parameters.faucetAmount}
              size="small"
              color="primary"
            />
          </Parameter>
          <Parameter color="textPrimary">
            <em>Maintenance Fee:</em>
            <Chip
              label={proposal.parameters.maintenanceFee}
              size="small"
              color="primary"
            />
          </Parameter>
          <Parameter color="textPrimary">
            <em>Maintenance Interval:</em>
            <Chip
              label={proposal.parameters.maintenanceInterval}
              size="small"
              color="primary"
            />
          </Parameter>
          <Parameter color="textPrimary">
            <em>Node Penalty:</em>
            <Chip
              label={proposal.parameters.nodePenalty}
              size="small"
              color="primary"
            />
          </Parameter>
          <Parameter color="textPrimary">
            <em>Node Reward Amount:</em>
            <Chip
              label={proposal.parameters.nodeRewardAmount}
              size="small"
              color="primary"
            />
          </Parameter>
          <Parameter color="textPrimary">
            <em>Node Reward Interval:</em>
            <Chip
              label={proposal.parameters.nodeRewardInterval}
              size="small"
              color="primary"
            />
          </Parameter>
          <Parameter color="textPrimary">
            <em>Proposal Fee:</em>
            <Chip
              label={proposal.parameters.proposalFee}
              size="small"
              color="primary"
            />
          </Parameter>
          <Parameter color="textPrimary">
            <em>Stake Required:</em>
            <Chip
              label={proposal.parameters.stakeRequired}
              size="small"
              color="primary"
            />
          </Parameter>
          <Parameter color="textPrimary">
            <em>Transaction Fee:</em>
            <Chip
              label={proposal.parameters.transactionFee}
              size="small"
              color="primary"
            />
          </Parameter>
        </Container>
        <Box
          sx={{
            display: 'flex',
            marginTop: (theme) => theme.spacing(3),
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="body1" color="textPrimary">
            <strong>Total: {proposal.totalVotes} votes</strong>
          </Typography>
          <Typography variant="body1" color="textPrimary">
            <em>Voted: {proposal.power} coins</em>
          </Typography>
          <Typography variant="body1" color="textPrimary">
            <strong>{formatDate(proposal.timestamp)}</strong>
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
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
          <Divider />
          <RedditTextField
            sx={{ width: '100%', mt: 3 }}
            id="vote-amount"
            label="Vote Amount"
            variant="filled"
            color="primary"
            type="number"
            onChange={(e) => {
              setAmount(parseFloat(e.target.value));
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              width: '100%',
              my: 2
            }}
            startIcon={<DoneAllIcon />}
            onClick={() => {
              submitVoteTx(proposal, amount, wallet).then(({ result }: any) => {
                handleClickVariant(result.status, result.reason)();
              });
            }}
          >
            Vote
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
