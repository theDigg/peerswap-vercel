import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { alpha, Theme, styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { setFilters } from "../features/swaps/swapsSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.common.white, 0.15)
      : alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.common.white, 0.25)
        : alpha(theme.palette.common.black, 0.25),
  },
  "&:focused": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.common.white, 0.25)
        : alpha(theme.palette.common.black, 0.25),
  },
  marginTop: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

const swapTypes = ["all", "offer", "request", "immediate"];
const swapStatuses = ["all", "open", "exchanging", "disputing", "complete"];

export default function SwapFilterBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [swapType, setSwapType] = React.useState("all");
  const [swapStatus, setSwapStatus] = React.useState("all");

  const handleDelete = (chip) => {
    setTags((tags) => tags.filter((tag) => tag !== chip));
  };

  const handleClick = (e) => {
    console.info("You clicked the Chip.", e);
  };

  const handleSearch = (ev) => {
    if (ev.key === "Enter") {
      setTags((tags) => [...tags, ...search.split(" ")]);
      setSearch("");
      ev.preventDefault();
    }
  };

  const handleSetFilters = () => {
    dispatch(
      setFilters({
        on: true,
        swapType,
        swapStatus,
        tags,
      })
    );
  };

  return (
    <Box sx={{ mb: 2, flexGrow: 1 }}>
      <AppBar position="static" color="inherit" elevation={5}>
        <Toolbar>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={1}
          >
            <Grid item xs={12}>
              <InputLabel id="search-help-label" sx={{ fontSize: 11, mt: 1 }}>
                Enter tokens separated by spaces, then hit enter
              </InputLabel>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Token list..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  inputProps={{ "aria-label": "search" }}
                  onKeyPress={handleSearch}
                />
              </Search>
            </Grid>
            {/* <Divider /> */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  textAlign: "center",
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    flexWrap: "wrap",
                    "& > *": {
                      m: 0.5,
                    },
                  }}
                >
                  <Box>
                    <FormControl
                      sx={{
                        m: 1,
                        minWidth: 100,
                        maxWidth: 200,
                      }}
                    >
                      <InputLabel id="swap-type-label">Swap Type</InputLabel>
                      <Select
                        labelId="swap-type-label"
                        id="swap-type"
                        value={swapType}
                        onChange={(e: any) => setSwapType(e.target.value)}
                        input={<Input />}
                        MenuProps={MenuProps}
                      >
                        {swapTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      sx={{
                        m: 1,
                        minWidth: 100,
                        maxWidth: 200,
                      }}
                    >
                      <InputLabel id="swap-type-label">Status</InputLabel>
                      <Select
                        labelId="swap-status-label"
                        id="swap-status"
                        value={swapStatus}
                        onChange={(e: any) => setSwapStatus(e.target.value)}
                        input={<Input />}
                        MenuProps={MenuProps}
                      >
                        {swapStatuses.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      onClick={handleSetFilters}
                      sx={{ mt: 3, ml: 2 }}
                      variant="contained"
                      color="primary"
                    >
                      Apply Filter
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            {/* <Divider /> */}
            <Grid item xs={12}>
              {tags.length > 0 && (
                <Paper
                  sx={{
                    textAlign: "center",
                    color: (theme) => theme.palette.text.secondary,
                    mb: 1,
                    p: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      flexWrap: "wrap",
                      "& > *": {
                        m: 0.5,
                      },
                    }}
                  >
                    {tags.map((chip) => (
                      <Chip
                        key={chip}
                        id={chip}
                        label={chip}
                        onClick={() => handleClick(chip)}
                        onDelete={() => handleDelete(chip)}
                        //   deleteIcon={<DoneIcon />}
                        variant="outlined"
                        sx={{ mx: 0.5 }}
                      />
                    ))}
                  </Box>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
