import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import TransformIcon from "@mui/icons-material/Transform";
import SwapCallsIcon from "@mui/icons-material/SwapCalls";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";

export default function CustomizedTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          First
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
          <TimelineDot color="primary" variant="outlined">
            <AppRegistrationIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Register
          </Typography>
          <Typography>Because you need an account</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          Second
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
          <TimelineDot color="primary" variant="outlined">
            <TransformIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Transfer DAI to the peerswap AMM
          </Typography>
          <Typography>Because swaps require collateral</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          Third
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
          <TimelineDot color="primary" variant="outlined">
            <SwapCallsIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Submit a swap
          </Typography>
          <Typography>Because that's what this app is for</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          Fourth
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
          <TimelineDot color="primary" variant="outlined">
            <LocalOfferIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Submit bids
          </Typography>
          <Typography>To provide liquidity and earn rewards</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          Finally
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
          <TimelineDot color="primary" variant="outlined">
            <RepeatIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Repeat
          </Typography>
          <Typography>Because the rewards pile up</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
