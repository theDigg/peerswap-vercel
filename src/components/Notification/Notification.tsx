import React from "react";
import Button from "@mui/material/Button";
// import {
//   NotificationsNone as NotificationsIcon,
//   ThumbUp as ThumbUpIcon,
//   ShoppingCart as ShoppingCartIcon,
//   LocalOffer as TicketIcon,
//   BusinessCenter as DeliveredIcon,
//   SmsFailed as FeedbackIcon,
//   DiscFull as DiscIcon,
//   Email as MessageIcon,
//   Report as ReportIcon,
//   Error as DefenceIcon,
//   AccountBox as CustomerIcon,
//   Done as ShippedIcon,
//   Publish as UploadIcon,
// } from "@mui/icons-material";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import { useTheme } from "@mui/styles";
import classnames from "classnames";
import tinycolor from "tinycolor2";

// styles
import useStyles from "./styles";

// components
import Typography from "@mui/material/Typography";

const typesIcons = {
  "e-commerce": <NotificationsNone />,
  notification: <NotificationsNone />,
  offer: <NotificationsNone />,
  info: <NotificationsNone />,
  message: <NotificationsNone />,
  feedback: <NotificationsNone />,
  customer: <NotificationsNone />,
  shipped: <NotificationsNone />,
  delivered: <NotificationsNone />,
  defence: <NotificationsNone />,
  report: <NotificationsNone />,
  upload: <NotificationsNone />,
  disc: <NotificationsNone />,
};

export default function Notification({ variant, ...props }: any) {
  var classes = useStyles();
  var theme = useTheme() as any;

  const icon = getIconByType(props.type);
  const iconWithStyles = React.cloneElement(icon, {
    classes: {
      root: classes.notificationContainer,
    },
    style: {
      color:
        variant !== "contained" &&
        theme.palette[props.color] &&
        theme.palette[props.color].main,
    },
  });

  return (
    <div
      className={classnames(classes.notificationContainer, props.className, {
        [classes.notificationContained]: variant === "contained",
        [classes.notificationContainedShadowless]: props.shadowless,
      })}
      style={{
        backgroundColor:
          variant === "contained" &&
          theme.palette[props.color] &&
          theme.palette[props.color].main,
      }}
    >
      <div
        className={classnames(classes.notificationIconContainer, {
          [classes.notificationIconContainerContained]: variant === "contained",
          [classes.notificationIconContainerRounded]: variant === "rounded",
        })}
        style={{
          backgroundColor:
            variant === "rounded" &&
            theme.palette[props.color] &&
            tinycolor(theme.palette[props.color].main)
              .setAlpha(0.15)
              .toRgbString(),
        }}
      >
        {iconWithStyles}
      </div>
      <div className={classes.messageContainer}>
        <Typography>{props.message}</Typography>
        {props.extraButton && props.extraButtonClick && (
          <Button
            onClick={props.extraButtonClick}
            disableRipple
            className={classes.extraButton}
          >
            {props.extraButton}
          </Button>
        )}
      </div>
    </div>
  );
}

// ####################################################################
function getIconByType(type = "offer") {
  return typesIcons[type];
}
