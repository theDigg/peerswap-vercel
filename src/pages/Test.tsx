import React from "react";
import { makeStyles, Theme, createStyles, styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
// import Typography from '@mui/material/Typography'
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

// tx = {
//   type: 'swap',
//   initiator: USER.address,
//   tokenOffered: trade.tokenOffered,
//   amountOffered: trade.amountOffered,
//   maxTimeToSend: trade.maxTimeToSend,
//   maxTimeToReceive: trade.maxTimeToReceive,
//   fixed: trade.fixed,
//   initiatorCollateral: trade.initiatorCollateral,
// }

// tx = {
//   type: 'swap',
//   initiator: USER.address,
//   tokenRequested: trade.tokenRequested,
//   amountRequested: trade.amountRequested,
//   maxTimeToSend: trade.maxTimeToSend,
//   maxTimeToReceive: trade.maxTimeToReceive,
//   fixed: trade.fixed,
//   initiatorCollateral: trade.initiatorCollateral,
// }

// tx = {
//   type: 'swap',
//   initiator: USER.address,
//   tokenOffered: trade.tokenOffered,
//   amountOffered: trade.amountOffered,
//   tokenRequested: trade.tokenRequested,
//   amountRequested: trade.amountRequested,
//   initiatorChainAddress: trade.initiatorChainAddress,
//   maxTimeToSend: trade.maxTimeToSend,
//   maxTimeToReceive: trade.maxTimeToReceive,
//   fixed: trade.fixed,
//   initiatorCollateral: trade.initiatorCollateral,
// }
// tx.swapType = swapType
// tx.timestamp = Date.now()
// tx.swapId = crypto.hashObj(tx)

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const OfferForm = ({ handleChange }) => {
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
        variant="outlined"
        onChange={(e) => handleChange(e, "amountOffered")}
        sx={{ m: 1 }}
        fullWidth
      />
    </>
  );
};

const RequestForm = ({ handleChange }) => {
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
        variant="outlined"
        onChange={(e) => handleChange(e, "amountRequested")}
        sx={{ m: 1 }}
        fullWidth
      />
    </>
  );
};

const ImmediateForm = ({ handleChange }) => {
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
        variant="outlined"
        onChange={(e) => handleChange(e, "amountOffered")}
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
        variant="outlined"
        onChange={(e) => handleChange(e, "amountRequested")}
        sx={{ m: 1 }}
        fullWidth
      />
    </>
  );
};

function RadioButtonsGroup() {
  const [state, setState] = React.useState({
    type: "swap",
    swapType: "",
    initiator: "",
    tokenRequested: "",
    amountRequested: "",
    tokenOffered: "",
    amountOffered: "",
    maxTimeToSend: 3600,
    maxTimeToReceive: 3600,
    fixed: false,
    initiatorCollateral: "",
  });

  const handleChange = (event, field) => {
    setState({
      ...state,
      [field]: event.target.value,
    });
  };

  return (
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
          <FormControlLabel value="offer" control={<Radio />} label="Offer" />
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
          <OfferForm handleChange={handleChange} />
        )}
        {state.swapType === "request" && (
          <RequestForm handleChange={handleChange} />
        )}
        {state.swapType === "immediate" && (
          <ImmediateForm handleChange={handleChange} />
        )}
        <TextField
          id="outlined-basic"
          label="Max Time To Send"
          variant="outlined"
          onChange={(e) => handleChange(e, "maxTimeToSend")}
          sx={{ m: 1 }}
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="Max Time To Receive"
          variant="outlined"
          onChange={(e) => handleChange(e, "maxTimeToReceive")}
          sx={{ m: 1 }}
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="Collateral"
          variant="outlined"
          onChange={(e) => handleChange(e, "initiatorCollateral")}
          sx={{ m: 1 }}
          fullWidth
        />
        <FormControlLabel
          value={state.fixed}
          control={
            <Checkbox
              color="primary"
              onChange={() => setState({ ...state, fixed: !state.fixed })}
            />
          }
          label="Fixed Precision"
          labelPlacement="start"
        />
      </Container>
    </FormControl>
  );
}

export default function Test() {
  return (
    <Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Offset />
        <RadioButtonsGroup />
      </Box>
    </Box>
  );
}
