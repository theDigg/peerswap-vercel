import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

const ImmediateForm = ({ handleChange, setNumber }) => (
  <>
    <Alert
      variant="filled"
      severity="info"
      sx={{ mb: (theme) => theme.spacing(1) }}
    >
      Immediate swaps are for used when you want to specify the token that you
      want, the token that you have, and the exact amounts for each in the
      terms.
    </Alert>
    <Alert
      variant="filled"
      severity="warning"
      sx={{ mb: (theme) => theme.spacing(1) }}
    >
      Any bid on an immediate swap will automatically put you and the provider
      into a swap agreement (You don't have to accept the bid)
    </Alert>
    <TextField
      id="filled-basic"
      label="Token Offered"
      variant="filled"
      onChange={(e) => handleChange(e, "tokenOffered")}
      sx={{ my: 1 }}
      fullWidth
    />
    <TextField
      id="filled-basic"
      label="Amount Offered"
      type="number"
      variant="filled"
      onChange={(e) => setNumber(e, "amountOffered")}
      sx={{ my: 1 }}
      fullWidth
    />
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

export default ImmediateForm;
