import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

const OfferForm = ({ handleChange, setNumber }) => (
  <>
    <Alert
      variant="filled"
      severity="info"
      sx={{ mb: (theme) => theme.spacing(1) }}
    >
      Offer swaps are for used when you want to offer a token that you have
      while being open to receiving any token offered in bids
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
  </>
);

export default OfferForm;
