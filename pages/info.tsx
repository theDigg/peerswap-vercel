import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Timeline from "components/MUIDemo/Timeline";
import { setTab } from 'features/wallet/walletSlice'
import Page from 'components/Page';

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Info = () => {
  const router = useRouter();
  const dispatch = useDispatch();
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
            <Button onClick={() => router.push("/swaps")}>Find a swap</Button>
            <Button onClick={() => {
              dispatch(setTab(0))
              router.push("/wallet")
            }}>
              Create your own
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

const InfoPage = () => (
  <Page name="Info" path="/info">
    <Info />
  </Page>
);

export default InfoPage;
