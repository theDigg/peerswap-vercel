import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/rootReducer";
import { VariantType, useSnackbar } from "notistack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "../components/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import SwapCallsIcon from "@mui/icons-material/SwapCalls";
import Button from "@mui/material/Button";
import SwapFilterBar from "../components/SwapFilterBar";
import { styled } from "@mui/material/styles";
// import { useSpring, animated } from 'react-spring'
import { getSwaps, submitSwapTx } from "../api/peerswapAPI";
import { setSwaps } from "../features/swaps/swapsSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const OfferForm = ({ handleChange, setNumber }) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Token Offered"
        variant="outlined"
        onChange={(e) => handleChange(e, "tokenOffered")}
        sx={{ m: 1 }}
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="Amount Offered"
        type="number"
        variant="outlined"
        onChange={(e) => setNumber(e, "amountOffered")}
        sx={{ m: 1 }}
        fullWidth
      />
    </>
  );
};

const RequestForm = ({ handleChange, setNumber }) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Token Requested"
        variant="outlined"
        onChange={(e) => handleChange(e, "tokenRequested")}
        sx={{ m: 1 }}
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="Amount Requested"
        type="number"
        variant="outlined"
        onChange={(e) => setNumber(e, "amountRequested")}
        sx={{ m: 1 }}
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="Blockchain Address"
        variant="outlined"
        onChange={(e) => handleChange(e, "initiatorChainAddress")}
        sx={{ m: 1 }}
        fullWidth
      />
    </>
  );
};

const ImmediateForm = ({ handleChange, setNumber }) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Token Offered"
        variant="outlined"
        onChange={(e) => handleChange(e, "tokenOffered")}
        sx={{ m: 1 }}
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="Amount Offered"
        type="number"
        variant="outlined"
        onChange={(e) => setNumber(e, "amountOffered")}
        sx={{ m: 1 }}
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="Token Requested"
        variant="outlined"
        onChange={(e) => handleChange(e, "tokenRequested")}
        sx={{ m: 1 }}
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="Amount Requested"
        type="number"
        variant="outlined"
        onChange={(e) => setNumber(e, "amountRequested")}
        sx={{ m: 1 }}
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="Blockchain Address"
        variant="outlined"
        onChange={(e) => handleChange(e, "initiatorChainAddress")}
        sx={{ m: 1 }}
        fullWidth
      />
    </>
  );
};

export default function Swaps() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    type: "swap",
    swapType: "",
    initiator: "",
    tokenRequested: "",
    amountRequested: 0,
    tokenOffered: "",
    amountOffered: 0,
    maxTimeToSend: 3600,
    maxTimeToReceive: 3600,
    fixed: false,
    initiatorCollateral: 0,
    initiatorChainAddress: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  let { swaps } = useSelector((state: RootState) => state.swaps);
  let { filteredSwaps } = useSelector((state: RootState) => state.swaps);
  let { wallet } = useSelector((state: RootState) => state.wallet);

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getSwaps().then((data) => {
      dispatch(setSwaps(data.swaps));
    });
  }, [dispatch]);

  const handleChange = (event, field) => {
    setState({
      ...state,
      [field]: event.target.value,
    });
  };

  const handleNumberChange = (event, field) => {
    setState({
      ...state,
      [field]: parseFloat(event.target.value),
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Offset />
        <Modal
          aria-labelledby="create swap"
          aria-describedby="Form to submit a swap request"
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.background.paper,
                border: "2px solid #000",
                borderRadius: 5,
                boxShadow: (theme) => theme.shadows[9],
                padding: 5,
              }}
            >
              <Typography variant="h3" align="center">
                Create swap
              </Typography>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: 1,
                  width: "50ch",
                }}
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitSwapTx(state, wallet).then((data: any) => {
                    handleClickVariant("success", data.result.reason)();
                    setOpen(false);
                  });
                }}
              >
                <FormControl component="fieldset">
                  <Container maxWidth="sm">
                    <FormLabel component="legend" sx={{ m: 1 }}>
                      Swap Type
                    </FormLabel>
                    <RadioGroup
                      aria-label="swap-type"
                      name="swap-type"
                      value={state.swapType}
                      onChange={(e) => handleChange(e, "swapType")}
                      sx={{ m: 1 }}
                      row
                    >
                      <FormControlLabel
                        value="offer"
                        control={<Radio />}
                        label="Offer"
                      />
                      <FormControlLabel
                        value="request"
                        control={<Radio />}
                        label="Request"
                      />
                      <FormControlLabel
                        value="immediate"
                        control={<Radio />}
                        label="Immediate"
                      />
                    </RadioGroup>
                    {state.swapType === "offer" && (
                      <OfferForm
                        handleChange={handleChange}
                        setNumber={handleNumberChange}
                      />
                    )}
                    {state.swapType === "request" && (
                      <RequestForm
                        handleChange={handleChange}
                        setNumber={handleNumberChange}
                      />
                    )}
                    {state.swapType === "immediate" && (
                      <ImmediateForm
                        handleChange={handleChange}
                        setNumber={handleNumberChange}
                      />
                    )}
                    <TextField
                      id="outlined-basic"
                      value={state.maxTimeToSend}
                      type="number"
                      label="Max Time To Send"
                      variant="outlined"
                      onChange={(e) =>
                        setState({
                          ...state,
                          maxTimeToSend: parseFloat(e.target.value),
                        })
                      }
                      sx={{ m: 1 }}
                      fullWidth
                    />
                    <TextField
                      id="outlined-basic"
                      value={state.maxTimeToReceive}
                      type="number"
                      label="Max Time To Receive"
                      variant="outlined"
                      onChange={(e) =>
                        setState({
                          ...state,
                          maxTimeToReceive: parseFloat(e.target.value),
                        })
                      }
                      sx={{ m: 1 }}
                      fullWidth
                    />
                    <TextField
                      id="outlined-basic"
                      type="number"
                      label="Collateral"
                      variant="outlined"
                      onChange={(e) =>
                        setState({
                          ...state,
                          initiatorCollateral: parseFloat(e.target.value),
                        })
                      }
                      sx={{ m: 1 }}
                      fullWidth
                    />
                    <FormControlLabel
                      value={state.fixed}
                      control={
                        <Checkbox
                          color="primary"
                          onChange={() =>
                            setState({ ...state, fixed: !state.fixed })
                          }
                        />
                      }
                      label="Fixed Precision"
                      labelPlacement="start"
                    />
                  </Container>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 3 }}
                  startIcon={<SwapCallsIcon />}
                >
                  Swap
                </Button>
              </form>
            </Box>
          </Box>
        </Modal>
        <SwapFilterBar />
        <Grid swaps={filteredSwaps || swaps} bids={[]} opened={false} />
        <Fab
          variant="extended"
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
          }}
          onClick={handleOpen}
        >
          <AddIcon sx={{ mr: 1 }} />
          Create swap
        </Fab>
      </Box>
    </Box>
  );
}
