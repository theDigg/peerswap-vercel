import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

const RequestForm = ({ handleChange, setNumber }) => (
  <>
    <Alert
      variant="filled"
      severity="info"
      sx={{ mb: (theme) => theme.spacing(1) }}
    >
      Request swaps are for used when you want to request a token that you want
      while being open to offering tokens requested in bids
    </Alert>
    <TextField
      id="filled-basic"
      label="Token Requested"
      variant="filled"
      onChange={(e) => handleChange(e, "tokenRequested")}
      sx={{ my: 1 }}
      fullWidth
    />
    <TextField
      id="filled-basic"
      label="Amount Requested"
      type="number"
      variant="filled"
      onChange={(e) => setNumber(e, "amountRequested")}
      sx={{ my: 1 }}
      fullWidth
    />
    <TextField
      id="filled-basic"
      label="Blockchain Address"
      variant="filled"
      onChange={(e) => handleChange(e, "initiatorChainAddress")}
      sx={{ my: 1 }}
      fullWidth
    />
  </>
);

export default RequestForm;
