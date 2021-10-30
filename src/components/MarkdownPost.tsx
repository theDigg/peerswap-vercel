import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { markdownPost } from "mocks/markdownPost";
import { useSelector } from 'react-redux'
import { RootState } from "app/rootReducer";

// UI component for main post content
export default function PostContent() {
  const { value } = useSelector((state: RootState) => state.editor)
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 4,
        width: "100%",
        backgroundColor: "#0D1117",
        "& h1, h2, h3, h4": { borderBottom: "1px solid #21262d" },
        "& img": { maxWidth: "100%" },
        "& a": { color: "#58a6ff", textDecoration: "none" },
        "& code": {
          backgroundColor: "rgba(110, 118, 129, 0.4)",
          px: 0.6,
          py: 0.4,
          borderRadius: "6px",
        },
        "& pre": {
          padding: "16px",
          overflow: "auto",
          fontSize: "85%",
          lineHeight: 1.45,
          backgroundColor: "#161b22",
          borderRadius: "6px",
          "& code": {
            backgroundColor: "inherit",
            p: 0,
          },
        },
      }}
    >
      <Typography variant="h5">{"Title"}</Typography>
      <span>
        Written by
        <Link href={`https://www.codegolf.dev/kyle`}>
          <a className="text-info">@kyle</a>
        </Link>{" "}
        on {"10/29/2021"}
      </span>
      <ReactMarkdown>{value}</ReactMarkdown>
    </Paper>
  );
}
