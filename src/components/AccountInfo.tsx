import React from "react";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { setTab } from "features/wallet/walletSlice";
import { RootState } from "app/rootReducer";
import { useSelector, useDispatch } from "react-redux";

const Unit = styled("span")(({ theme }) => ({
  fontSize: "8px",
  letterSpacing: "-.16px",
  textAlign: "left",
  position: "relative",
  top: "-5px",
  left: "5px",
}));

export default function AccountInfo() {
  const { account } = useSelector((state: RootState) => state.account);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Card sx={{ mb: 3, minWidth: 300 }} elevation={5}>
      <CardContent>
        <Typography variant="h6" color="primary" align="center" gutterBottom>
          @{account?.alias}
        </Typography>
        <Divider />
        <Typography sx={{ mt: 2 }} color="textPrimary" align="center">
          Balance: {account?.data?.balance?.toFixed(3)}
          <Unit>SWAP</Unit>
        </Typography>
        <Typography sx={{ mt: 2 }} color="textPrimary" align="center">
          SwapDAI: {account?.data?.swapDAI.toFixed(3)}
          <Unit>SWAP</Unit>
        </Typography>
        <Typography sx={{ mt: 2 }} color="textPrimary" align="center">
          Stake: {account?.data?.stake}
          <Unit>SWAP</Unit>
        </Typography>
      </CardContent>
      <Container maxWidth="sm">
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              dispatch(setTab(0));
              router.push("/wallet");
            }}
          >
            Send
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              dispatch(setTab(1));
              router.push("/wallet");
            }}
          >
            Swap
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(setTab(2));
              router.push("/wallet");
            }}
          >
            Receive
          </Button>
        </CardActions>
      </Container>
    </Card>
  );
}
