import Link from "next/link";
import { styled } from "@mui/material/styles";

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  "&:hover": {
    cursor: "pointer",
    opacity: 0.9,
  },
}));
