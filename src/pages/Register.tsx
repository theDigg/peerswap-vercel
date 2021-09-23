import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/rootReducer";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { VariantType, useSnackbar } from "notistack";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Alert, { AlertColor } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import {
  getAccountFromAlias,
  createAccount,
  registerAlias,
} from "../api/peerswapAPI";
import { setWallets, setWallet } from "../features/wallet/walletSlice";

const StyledTextField = styled(TextField)`
  label.Mui-focused {
    color: green;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: red;
    }
    &:hover fieldset {
      border-color: blue;
    }
    &.Mui-focused fieldset {
      border-color: green;
    }
  }
` as typeof TextField;

async function _sleep(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Register() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [found, setFound] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [loading, setLoading] = useState(false);
  const { wallets } = useSelector((state: RootState) => state.wallet);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  useEffect(() => {
    // ! Figure out why this needs to be any ??
    if (wallets.some((wallet: any) => wallet.handle === username)) {
      setStatus("This wallet was found in your local storage!");
      setSeverity("success");
      setFound(true);
    } else if (username.length > 3) {
      setFound(false);
      getAccountFromAlias(username).then((res) => {
        if (res.error) {
          setStatus("This username is available!");
          setSeverity("success");
        } else {
          setStatus("This username is already taken");
          setSeverity("error");
        }
      });
    } else {
      setFound(false);
      setStatus("Username must be longer than 3 characters");
      setSeverity("warning");
    }
  }, [username, wallets]);

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
          p: 3,
          justifyContent: "center",
        }}
      >
        <Typography variant="h2" align="center">
          Register
        </Typography>
        <FormGroup
          sx={{
            p: 5,
          }}
        >
          <Alert variant="filled" severity={severity} sx={{ mb: 2 }}>
            {status}
          </Alert>
          <StyledTextField
            sx={{ mb: 2 }}
            label="Username"
            variant="outlined"
            id="custom-css-outlined-input"
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
          />
          {found ? (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={severity !== "success"}
              onClick={() =>
                dispatch(
                  setWallet(
                    wallets.filter(
                      (wallet: any) => wallet.handle === username
                    )[0]
                  )
                )
              }
            >
              Login
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={loading || severity !== "success"}
              onClick={async () => {
                let wallet = createAccount(username);
                registerAlias(username, wallet).then((data: any) => {
                  handleClickVariant("success", data.result.reason)();
                });
                setLoading(true);
                while ((await getAccountFromAlias(username)).error) {
                  await _sleep(500);
                }
                setLoading(false);
                dispatch(setWallets(wallet));
              }}
            >
              Register
            </Button>
          )}
          {loading && (
            <LinearProgress
              sx={{
                width: "100%",
                mt: 4,
              }}
              color="secondary"
            />
          )}
        </FormGroup>
      </Paper>
    </Container>
  );
}
