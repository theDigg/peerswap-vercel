import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles, Theme, createStyles, styled } from "@mui/material/styles";

const styles = {
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: 3,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function About() {
  return (
    <Box sx={styles.root}>
      <Box component="main" sx={styles.content}>
        <Offset />
        <Typography variant="h1" align="center">
          About
        </Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
      </Box>
    </Box>
  );
}
