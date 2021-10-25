import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Alert, { AlertColor } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import { importWallet } from "../api/peerswapAPI";
import { setWallets } from "../features/wallet/walletSlice";

export default function Import() {
  const dispatch = useDispatch();
  const [secretKey, setSecretKey] = useState("");
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  useEffect(() => {
    if (secretKey.length !== 128) {
      setStatus("SecretKey must be 128 characters long");
      setSeverity("warning");
    } else {
      setStatus("Ready to import!");
      setSeverity("success");
    }
  }, [secretKey]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        mt: 10,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          padding: 3,
          justifyContent: "center",
        }}
      >
        <Typography variant="h2" align="center">
          Import
        </Typography>
        <FormGroup sx={{ p: 5}}>
          <Alert variant="filled" severity={severity} sx={{ mb: 1 }}>
            {status}
          </Alert>
          <TextField
            sx={{ mb: 1 }}
            label="Secret Key"
            variant="outlined"
            id="custom-css-outlined-input"
            type="password"
            onChange={(e) => setSecretKey(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={() => {
              importWallet(secretKey).then((result) => {
                if (!result.error) {
                  dispatch(setWallets(result));
                } else {
                  setStatus("No account found with that secret key");
                  setSeverity("error");
                }
              });
            }}
          >
            import
          </Button>
        </FormGroup>
      </Paper>
    </Container>
  );
}
