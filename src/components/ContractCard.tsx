import React from 'react';
import { VariantType, useSnackbar } from 'notistack';
import { StyledLink } from 'style/components/Link';
import { ExpandMore } from 'style/components/Buttons';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, green } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { formatDateTime, shortenHex, stringAvatar } from '../utils/stringUtils';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { BootstrapTooltip } from 'style/components/Tooltip';

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

export default function ContractCard({ contract }) {
  const [, copy] = useCopyToClipboard();
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
    <Card sx={{ width: '100%' }} elevation={9}>
      <CardHeader
        avatar={
          <Avatar aria-label="receipt-icon" sx={{ bgcolor: red[600] }}>
            <ReceiptIcon />
          </Avatar>
        }
        action={
          <>
            <BootstrapTooltip title="Initiator Profile" placement="top">
              <IconButton aria-label="settings">
                <Avatar
                  alt={contract.initiatorData.alias}
                  {...stringAvatar(contract.initiatorData)}
                />
              </IconButton>
            </BootstrapTooltip>
            <BootstrapTooltip title="Provider Profile" placement="top">
              <IconButton aria-label="provider-profile">
                <Avatar
                  alt={contract.providerData.alias}
                  {...stringAvatar(contract.providerData)}
                />
              </IconButton>
            </BootstrapTooltip>
          </>
        }
        // avatar={
        //   <Avatar aria-label="swap-initiator" sx={{ bgcolor: red[600] }}>
        //     <ReceiptIcon />
        //   </Avatar>
        // }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={`Contract for swap: ${shortenHex(contract.swapId)}`}
        subheader={formatDateTime(contract.timeOfAgreement)}
      />
      <CardContent>
        <Paper elevation={5} sx={{ p: 2 }}>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h6" color="textPrimary" component="div">
                Contract Details:
              </Typography>
            </Grid>
            <Divider />
            <Grid item>
              <Typography
                variant="body2"
                color="textSecondary"
                component="div"
                align="center"
                gutterBottom={true}
              >
                <strong>
                  <em>{contract.contractDescription}</em>
                </strong>
              </Typography>
            </Grid>
            <Divider />
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="body1" color="textPrimary" component="div">
                Initiator:
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={shortenHex(contract.initiator)}
                size="small"
                onClick={() => {
                  copy(contract.initiator);
                  handleClickVariant(
                    'success',
                    'Copied address to clipboard'
                  )();
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
                Initiator Chain Address:
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={shortenHex(contract.initiatorChainAddress)}
                size="small"
                onClick={() => {
                  copy(contract.initiatorChainAddress);
                  handleClickVariant(
                    'success',
                    'Copied address to clipboard'
                  )();
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
                Initiator Chain Memo:
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={
                  contract.initiatorChainMemo
                    ? shortenHex(contract.initiatorChainMemo)
                    : 'None'
                }
                size="small"
                onClick={() => {
                  copy(contract.initiatorChainMemo);
                  handleClickVariant(
                    'success',
                    'Copied address to clipboard'
                  )();
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
                Provider:
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={shortenHex(contract.provider)}
                size="small"
                onClick={() => {
                  copy(contract.provider);
                  handleClickVariant(
                    'success',
                    'Copied address to clipboard'
                  )();
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
                Provider Chain Address:
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={shortenHex(contract.providerChainAddress)}
                size="small"
                onClick={() => {
                  copy(contract.providerChainAddress);
                  handleClickVariant(
                    'success',
                    'Copied address to clipboard'
                  )();
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
                Provider Chain Memo:
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={
                  contract.providerChainMemo
                    ? shortenHex(contract.providerChainMemo)
                    : 'None'
                }
                size="small"
                onClick={() => {
                  copy(contract.providerChainMemo);
                  handleClickVariant(
                    'success',
                    'Copied address to clipboard'
                  )();
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
                Collateral:
              </Typography>
            </Grid>
            <Grid item>
              <Chip label={contract.collateral + ' DAI'} size="small" />
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
                Initiator Receipt:
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={`${
                  contract.initiatorReceipt ? 'complete' : 'incomplete'
                }`}
                size="small"
                color={contract.initiatorReceipt ? 'success' : 'error'}
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
                Provider Receipt:
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={`${
                  contract.providerReceipt ? 'complete' : 'incomplete'
                }`}
                size="small"
                color={contract.providerReceipt ? 'success' : 'error'}
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
                Token Requested:
              </Typography>
            </Grid>
            <Grid item>
              <Chip label={contract.tokenRequested} size="small" />
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
                Amount Requested:
              </Typography>
            </Grid>
            <Grid item>
              <Chip label={contract.amountRequested} size="small" />
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
                Token Offered:
              </Typography>
            </Grid>
            <Grid item>
              <Chip label={contract.tokenOffered} size="small" />
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
                Amount Offered:
              </Typography>
            </Grid>
            <Grid item>
              <Chip label={contract.amountOffered} size="small" />
            </Grid>
          </Grid>

          {contract.fixed !== undefined && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Fixed:
                </Typography>
              </Grid>
              <Grid item>
                <Chip label={`${contract.fixed}`} size="small" />
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
                MaxTimeToSend:
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={contract.maxTimeToSend / 60 + ' Minutes'}
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
                MaxTimeToReceive:
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={contract.maxTimeToReceive / 60 + ' Minutes'}
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
                Time Of Agreement:
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={formatDateTime(contract.timeOfAgreement)}
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
              <StyledLink href={`../swap/${contract.swapId}`}>
                <Chip
                  label={shortenHex(contract.swapId)}
                  size="small"
                  color="primary"
                  sx={{ cursor: 'pointer' }}
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
                Accepted Bid:
              </Typography>
            </Grid>
            <Grid item>
              <StyledLink href={`../bid/${contract.bidId}`}>
                <Chip
                  label={shortenHex(contract.bidId)}
                  size="small"
                  color="primary"
                  sx={{ cursor: 'pointer' }}
                />
              </StyledLink>
            </Grid>
          </Grid>
          {contract.disputeId && (
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
                <StyledLink href={`../disputes/${contract.disputeId}`}>
                  <Chip
                    label={shortenHex(contract.disputeId)}
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
        <CardContent></CardContent>
      </Collapse>
    </Card>
  );
}
