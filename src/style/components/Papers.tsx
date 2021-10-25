import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export const LightPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "1px solid #ddd",
  borderRadius: 0,
}));

export const DimPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: "black",
  border: "1px solid #ddd",
  background: "#eee",
  borderRadius: 0,
}));
