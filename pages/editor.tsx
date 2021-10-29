import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CodeEditor from "components/Editor";

/*
    This page is where users can see dispute cards that are currently active
    They can filter for disputes, apply for becomming a juror, join a dispute court.
    The informationa about how the disputes work is shown at the top of the page, or modal.
    The user stats + reputation information is shown on the dispute cards for each user.
    Any user can view the disputes and vote, but jurors have more sway in the outcome.
*/

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function Editor() {
  return (
    <Box p={1} m={1} width="100%">
      <Offset />
      <CodeEditor />
    </Box>
  );
}
