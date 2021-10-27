import React from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Timeline from "components/MUIDemo/Timeline";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function Info() {
  const router = useRouter();
  return (
    <Box display="flex" sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Container maxWidth="md">
          <Offset sx={{ mt: 3 }} />
          <Typography variant="h3" align="center">
            Welcome to peerswap
          </Typography>
          <Timeline />
          <Stack
            spacing={2}
            divider={
              <Divider orientation="horizontal" flexItem>
                OR
              </Divider>
            }
            sx={{ mx: "10%" }}
          >
            <Button
              onClick={() => {
                router.push("../swaps");
              }}
            >
              Find a swap
            </Button>
            <Button
              onClick={() => {
                router.push("../wallet/swap");
              }}
            >
              Create your own
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default Info;
