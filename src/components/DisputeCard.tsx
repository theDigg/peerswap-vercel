import React from 'react';
import Link from 'next/link';
import { VariantType, useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { StyledLink } from 'style/components/Link';
import { ExpandMore } from 'style/components/Buttons';
import { BootstrapTooltip } from 'style/components/Tooltip';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import GroupAvatars from 'components/GroupAvatars';
import { red } from '@mui/material/colors';
// import AddIcon from '@mui/icons-material/Add';
// import DoneAllIcon from '@mui/icons-material/DoneAll';
// import LoopIcon from '@mui/icons-material/Loop';
// import WarningIcon from '@mui/icons-material/Warning';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AttachmentIcon from '@mui/icons-material/Attachment';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
// import BidCard from './BidCard';
// import SwapCard from './SwapCard';
import { formatDateTime, shortenHex, stringAvatar } from 'utils/stringUtils';
import useCopyToClipboard from 'hooks/useCopyToClipboard';
// import { PlaygroundSpeedDial } from 'components/MUIDemo/SpeedDial';
import MarkdownPost from 'components/MarkdownPost';
import {
  // submitReceiptTx,
  // submitDisputeTx,
  // queryBids,
  submitJoinDisputeTx,
  submitVoteDisputeTx
} from '../api/peerswapAPI';

export default function DisputeCard({ dispute }) {
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
    <Card sx={{ width: '100%' }} elevation={4}>
      <CardHeader
        avatar={
          <BootstrapTooltip title="Dispute Page" placement="top">
            <span>
              <Link href={`../disputes/${dispute.id}`}>
                <IconButton aria-label="swap-page-link">
                  <Avatar aria-label="swap-icon" sx={{ bgcolor: red[500] }}>
                    <WarningAmberIcon />
                  </Avatar>
                </IconButton>
              </Link>
            </span>
          </BootstrapTooltip>
        }
        action={
          <>
            <BootstrapTooltip title="Prosecutor Profile" placement="top">
              <span>
                <Link href={`../users/${dispute.prosecutorData.id}`}>
                  <IconButton aria-label="prosecutor-profile">
                    <Avatar
                      alt={dispute.prosecutorData.alias}
                      {...stringAvatar(dispute.prosecutorData)}
                    />
                  </IconButton>
                </Link>
              </span>
            </BootstrapTooltip>
            <BootstrapTooltip title="Defendant Profile" placement="top">
              <span>
                <Link href={`../users/${dispute.defendantData.id}`}>
                  <IconButton aria-label="defendant-profile">
                    <Avatar
                      alt={dispute.defendantData.alias}
                      {...stringAvatar(dispute.defendantData)}
                    />
                  </IconButton>
                </Link>
              </span>
            </BootstrapTooltip>
          </>
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
                label={dispute.verdict ? 'Resolved' : 'Disputing'}
                size="small"
                color={dispute.verdict ? 'success' : 'warning'}
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
              <StyledLink href={`../swap/${dispute.swapId}`}>
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
              <StyledLink href={`../bid/${dispute.bidId}`}>
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
              <StyledLink href={`../contract/${dispute.contractId}`}>
                <Chip
                  label={shortenHex(dispute.contractId)}
                  size="small"
                  color="primary"
                />
              </StyledLink>
            </Grid>
          </Grid>
          <Typography variant="h6" align="center">
            Jury
          </Typography>
          <Box sx={{ mr: '50%' }}>
            <GroupAvatars users={dispute.jury} />
          </Box>
        </Paper>
      </CardContent>
      <CardActions disableSpacing>
        {/* <PlaygroundSpeedDial dir="right" /> */}
        <BootstrapTooltip title="Join the jury for this dispute" arrow>
          <span
            hidden={
              wallet.entry.address === dispute.prosecutor ||
              wallet.entry.address === dispute.defendant
            }
          >
            <IconButton
              aria-label="join-jury"
              disabled={
                //! Add this back in prod
                // wallet.entry.address === dispute.prosecutor ||
                // wallet.entry.address === dispute.defendant
                false
              }
              onClick={() => {
                submitJoinDisputeTx(dispute.id, wallet).then(
                  ({ result }: any) => {
                    handleClickVariant(result.status, result.reason)();
                  }
                );
              }}
            >
              <GroupAddIcon />
            </IconButton>
          </span>
        </BootstrapTooltip>
        {wallet.entry.address === dispute.prosecutor ||
        wallet.entry.address === dispute.defendant ? (
          <BootstrapTooltip title="Submit Evidence" placement="bottom">
            <span>
              <StyledLink href={`../disputes/${dispute.id}/evidence`}>
                <IconButton aria-label="settings">
                  <PostAddIcon />
                </IconButton>
              </StyledLink>
            </span>
          </BootstrapTooltip>
        ) : (
          <>
            <BootstrapTooltip title="Vote defendant guilty" placement="bottom">
              <span>
                <IconButton
                  aria-label="vote-guilty"
                  disabled={
                    dispute.jury.some(
                      (juror) => juror.id === wallet.entry.address
                    ) === false
                  }
                  onClick={() => {
                    submitVoteDisputeTx(dispute.id, true, wallet).then(
                      ({ result }: any) => {
                        handleClickVariant(result.status, result.reason)();
                      }
                    );
                  }}
                >
                  <ThumbDownAltOutlinedIcon />
                </IconButton>
              </span>
            </BootstrapTooltip>
            <BootstrapTooltip
              title="Vote defendant innocent"
              placement="bottom"
            >
              <span>
                <IconButton
                  aria-label="vote-innocent"
                  disabled={
                    dispute.jury.some(
                      (juror) => juror.id === wallet.entry.address
                    ) === false
                  }
                  onClick={() => {
                    submitVoteDisputeTx(dispute.id, false, wallet).then(
                      ({ result }: any) => {
                        handleClickVariant(result.status, result.reason)();
                      }
                    );
                  }}
                >
                  <ThumbUpAltOutlinedIcon />
                </IconButton>
              </span>
            </BootstrapTooltip>
          </>
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
          <Divider orientation="horizontal" sx={{ my: 2 }}>
            <Chip
              icon={<AttachmentIcon />}
              label="Prosecutor Evidence"
              variant="outlined"
              size="small"
              color="primary"
            />
          </Divider>
          <Box sx={{ mt: 1 }}>
            <MarkdownPost content={dispute.prosecutorEvidence || ''} />
          </Box>
          <Divider orientation="horizontal" sx={{ my: 2 }}>
            <Chip
              icon={<AttachmentIcon />}
              label="Defendant Evidence"
              variant="outlined"
              size="small"
              color="secondary"
            />
          </Divider>
          <Box sx={{ mt: 1 }}>
            <MarkdownPost content={dispute.defendantEvidence || ''} />
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
