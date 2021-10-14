import React from 'react'
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { stringAvatar } from "../utils/stringUtils";

export default function ChatMessage({message}) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar {...stringAvatar(message.handle)} />
      </ListItemAvatar>
      <ListItemText
        primary={message.handle}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {formatDate(new Date(message.timestamp))}
            </Typography>
            {" — " + message.body}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

function formatDate(date) {
  // var year = date.getFullYear(),
  // month = date.getMonth() + 1, // months are zero indexed
  // day = date.getDate(),
  var hour = date.getHours(),
    minute = date.getMinutes(),
    // second = date.getSeconds(),
    hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
    minuteFormatted = minute < 10 ? "0" + minute : minute,
    morning = hour < 12 ? "am" : "pm";

  return (
    // month +
    // '/' +
    // day +
    // '/' +
    // year +
    // ' ' +
    hourFormatted + ":" + minuteFormatted + morning
  );
}
