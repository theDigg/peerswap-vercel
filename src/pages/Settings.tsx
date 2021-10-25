import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { RedditTextField } from "../style/components/TextFields";
import { styled } from "@mui/material/styles";
import { setArchiver } from "../features/archiver/archiverSlice";
import { updateArchiveServer } from "../api/peerswapAPI";
import { LightPaper, DimPaper } from "../style/components/Papers"

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function Settings() {
  const dispatch = useDispatch();
  const { archiver } = useSelector((state: RootState) => state.archiver);
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");

  function FormRow() {
    return (
      <>
        <Grid item xs={6} md={3}>
          <DimPaper>Node IP</DimPaper>
        </Grid>
        <Grid item xs={6} md={3}>
          <LightPaper>{archiver.ip}</LightPaper>
        </Grid>
        <Grid item xs={6} md={3}>
          <DimPaper>Node Port</DimPaper>
        </Grid>
        <Grid item xs={6} md={3}>
          <LightPaper>{archiver.port}</LightPaper>
        </Grid>
      </>
    );
  }

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Offset />
        <Card sx={{ minWidth: 300 }} elevation={9}>
          <CardContent sx={{ p: 0 }}>
            <Typography
              sx={{ flexGrow: 1, p: 2 }}
              variant="body1"
              color="primary"
              align="center"
            >
              Update Archive Server
            </Typography>
            <Divider />
            <Container maxWidth="sm">
              <Typography
                sx={{ flexGrow: 1, p: 2 }}
                color="textPrimary"
                align="center"
              >
                Current Archive Server Info
              </Typography>
              <Grid
                container
                item
                xs={12}
                spacing={0}
                sx={{ border: "1px solid #eee", mb: 4 }}
              >
                <FormRow />
              </Grid>
              <RedditTextField
                sx={{ width: "100%", mt: 2 }}
                label="New IP"
                variant="filled"
                onChange={(e) => setIp(e.target.value)}
              />
              <RedditTextField
                sx={{ width: "100%", mt: 2 }}
                label="New Port"
                variant="filled"
                onChange={(e) => setPort(e.target.value)}
              />
              <CardActions
                disableSpacing
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: "16px",
                }}
              >
                <Button
                  sx={{ mt: 3 }}
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    dispatch(setArchiver({ ip, port: parseInt(port) }));
                    updateArchiveServer(ip, parseInt(port));
                  }}
                >
                  Update Network
                </Button>
                <Button
                  sx={{ mt: 3 }}
                  size="large"
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    dispatch(setArchiver({ ip: "localhost", port: 4000 }));
                    updateArchiveServer("localhost", 4000);
                  }}
                >
                  Reset to default
                </Button>
              </CardActions>
            </Container>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
