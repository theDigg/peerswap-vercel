import React from 'react'
import Card from "@mui/material/Card";
import Container from '@mui/material/Container'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'

const Unit = styled('span')(({theme}) => ({
  fontSize: '8px',
  letterSpacing: '-.16px',
  textAlign: 'left',
  position: 'relative',
  top: '-5px',
  left: '5px',
}))

export default function AccountInfo({ history, account }) {
  return (
    <Card sx={{ mb: 3, minWidth: 300 }} elevation={9}>
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
              history.push("/wallet/send");
            }}
          >
            Send
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              history.push("/wallet/swap");
            }}
          >
            Swap
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              history.push("/wallet/receive");
            }}
          >
            Receive
          </Button>
        </CardActions>
      </Container>
    </Card>
  );
}
