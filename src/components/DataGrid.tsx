import * as React from "react";
import { Link } from "react-router-dom";
import {
  DataGridPro,
  GridToolbar,
  GridColDef,
  GridRenderCellParams,
  GridOverlay,
} from "@mui/x-data-grid-pro";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/material/IconButton";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CheckIcon from "@mui/icons-material/Check";
import LoopIcon from "@mui/icons-material/Loop";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import { makeStyles } from "@mui/styles";
import { createTheme, Theme, styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { StyledEngineProvider } from "@mui/material/styles";
import { formatDateTime } from "../utils/stringUtils";
import { BootstrapTooltip } from "../style/components/Tooltip";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  "&:hover": {
    cursor: "pointer",
    opacity: 0.9,
  },
}));

type GridDataType = "Swaps" | "Bids";
type GridDataThemeOption = "default" | "ant";

interface GridPaginationSettings {
  pagination: boolean;
  autoPageSize: boolean;
  pageSize: number | undefined;
}

interface GridConfigOptions {
  size: number;
  type: GridDataType;
  pagesize: number;
  theme: GridDataThemeOption;
}

interface GridToolbarContainerProps {
  onApply: (options: GridConfigOptions) => void;
  size: number;
  type: GridDataType;
  theme: GridDataThemeOption;
}

const defaultTheme = createTheme();
const useStylesAntDesign = makeStyles(
  (theme) => ({
    root: {
      border: `1px solid ${
        theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
      }`,
      color:
        theme.palette.mode === "light"
          ? "rgba(0,0,0,.85)"
          : "rgba(255,255,255,0.85)",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      WebkitFontSmoothing: "auto",
      letterSpacing: "normal",
      "& .MuiDataGrid-columnsContainer": {
        backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
      },
      "& .MuiDataGrid-iconSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
        borderRight: `1px solid ${
          theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
        }`,
      },
      "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
        borderBottom: `1px solid ${
          theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
        }`,
      },
      "& .MuiDataGrid-cell": {
        color:
          theme.palette.mode === "light"
            ? "rgba(0,0,0,.85)"
            : "rgba(255,255,255,0.85)",
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
        WebkitFontSmoothing: "auto",
        letterSpacing: "normal",
        "& .MuiDataGrid-columnsContainer": {
          backgroundColor:
            theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
        },
        "& .MuiDataGrid-iconSeparator": {
          display: "none",
        },
        "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
          borderRight: `1px solid ${
            theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
          }`,
        },
        "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
          borderBottom: `1px solid ${
            theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
          }`,
        },
        "& .MuiDataGrid-cell": {
          color:
            theme.palette.mode === "light"
              ? "rgba(0,0,0,.85)"
              : "rgba(255,255,255,0.65)",
        },
        "& .MuiPaginationItem-root": {
          borderRadius: 0,
        },
        "& .MuiCheckbox-root svg": {
          width: 16,
          height: 16,
          backgroundColor: "transparent",
          border: `1px solid ${
            theme.palette.mode === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
          }`,
          borderRadius: 2,
        },
        "& .MuiCheckbox-root svg path": {
          display: "none",
        },
        "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
        },
        "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
          position: "absolute",
          display: "table",
          border: "2px solid #fff",
          borderTop: 0,
          borderLeft: 0,
          transform: "rotate(45deg) translate(-50%,-50%)",
          opacity: 1,
          transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
          content: '""',
          top: "50%",
          left: "39%",
          width: 5.71428571,
          height: 9.14285714,
        },
        "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
          {
            width: 8,
            height: 8,
            backgroundColor: "#1890ff",
            transform: "none",
            top: "39%",
            border: 0,
          },
      },
    },
  }),
  { defaultTheme }
);

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      "& .MuiFormGroup-options": {
        alignItems: "center",
        paddingBottom: theme.spacing(1),
        "& > div": {
          minWidth: 100,
          margin: theme.spacing(2, 2, 2, 0),
        },
      },
      "& .ant-empty-img-1": {
        fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
      },
      "& .ant-empty-img-2": {
        fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
      },
      "& .ant-empty-img-3": {
        fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
      },
      "& .ant-empty-img-4": {
        fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
      },
      "& .ant-empty-img-5": {
        fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
        fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
      },
    },
    label: {
      marginTop: theme.spacing(1),
    },
  }),
  { defaultTheme }
);

function CustomNoRowsOverlay() {
  const classes = useStyles();

  return (
    <GridOverlay className={classes.root}>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <div className={classes.label}>No Swaps</div>
    </GridOverlay>
  );
}

const getStatusChip = (value) => {
  if (value === "open") {
    return (
      <Chip
        icon={<InfoIcon />}
        label={value}
        variant="outlined"
        size="small"
        color="info"
      />
    );
  }
  if (value === "exchanging") {
    return (
      <Chip
        icon={<LoopIcon />}
        label={value}
        variant="outlined"
        size="small"
        color="warning"
      />
    );
  }
  if (value === "disputing") {
    return (
      <Chip
        icon={<WarningIcon />}
        label={value}
        variant="outlined"
        size="small"
        color="error"
      />
    );
  }
  if (value === "complete") {
    return (
      <Chip
        icon={<CheckIcon />}
        label={value}
        variant="outlined"
        size="small"
        color="success"
      />
    );
  }
};

// interface Swap {
//   id: string;
//   type: string;
//   swapType: "offer" | "request" | "immediate";
//   status: string;
//   initiator: string;
//   initiatorAlias: string;
//   provider?: string;
//   providerAlias?: string;
//   tokenOffered?: string;
//   amountOffered?: number;
//   providerChainAddress?: string;
//   providerChainMemo?: string; // Memo in case the blockchain requires it
//   tokenRequested?: string; // Doesn't need to specify, or could specify a range of tokens
//   amountRequested?: number; // If tokenRequested isn't specified or a range is selected, then this should also not be specified in the swap
//   initiatorChainAddress?: string; // This could be set when the agreement is created
//   initiatorChainMemo?: string; // Memo in case the blockchain requires it
//   fixed: boolean;
//   maxTimeToSend?: number; // time in seconds - 3600
//   maxTimeToReceive?: number; // time in seconds after first confirmation of send - 3600
//   initiatorCollateral: number; // Possibly no deposit if initiator is to go first?
//   providerCollateral?: number;
//   timeOfAgreement?: number;
//   disputeId?: string;
//   contractId?: string;
//   acceptedBid?: string;
//   bids: string[];
//   createdAt: number;
//   hash: string;
//   timestamp: number;
// }

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "id",
    headerName: "Action",
    width: 130,
    renderCell: (params: GridRenderCellParams) => (
      <BootstrapTooltip title="Bid" placement="right">
        <StyledLink to={`swap/${params.value}`}>
          <IconButton aria-label="bid on this swap">
            <LocalOfferIcon />
          </IconButton>
        </StyledLink>
      </BootstrapTooltip>
    ),
  },
  {
    field: "swapType",
    headerName: "Type",
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params: GridRenderCellParams) => getStatusChip(params.value),
  },
  {
    field: "tokenOffered",
    headerName: "Token Offered",
    width: 180,
  },
  {
    field: "amountOffered",
    headerName: "Amount Offered",
    type: "number",
    width: 190,
  },
  {
    field: "tokenRequested",
    headerName: "Token Requested",
    width: 200,
  },
  {
    field: "amountRequested",
    headerName: "Amount Requested",
    type: "number",
    width: 210,
  },
  {
    field: "collateral",
    headerName: "Collateral",
    type: "number",
    width: 150,
    renderCell: (params: GridRenderCellParams) => (
      <Chip label={params.value + " DAI"} size="small" />
    ),
  },
  {
    field: "initiator",
    headerName: "Initiator",
    width: 140,
  },
  {
    field: "initiatorAlias",
    headerName: "Initiator Alias",
    width: 170,
  },
  {
    field: "provider",
    headerName: "Provider",
    width: 140,
  },
  {
    field: "providerAlias",
    headerName: "Provider Alias",
    width: 180,
  },
  {
    field: "fixed",
    headerName: "Fixed",
    type: "boolean",
    width: 120,
  },
  {
    field: "createdAt",
    headerName: "Date Created",
    type: "date",
    description: "The timestamp this swap was created",
    width: 190,
    valueFormatter: ({ value }: any) => formatDateTime(value),
  },
];

function SettingsPanel(props: GridToolbarContainerProps) {
  const { onApply, type, size, theme } = props;
  const [sizeState, setSize] = React.useState<number>(size);
  const [typeState, setType] = React.useState<GridDataType>(type);
  const [selectedPaginationValue, setSelectedPaginationValue] =
    React.useState<number>(-1);
  const [activeTheme, setActiveTheme] =
    React.useState<GridDataThemeOption>(theme);

  const handleSizeChange = React.useCallback((event) => {
    setSize(Number(event.target.value));
  }, []);

  const handlePaginationChange = React.useCallback((event) => {
    setSelectedPaginationValue(event.target.value);
  }, []);

  const handleThemeChange = React.useCallback((event) => {
    setActiveTheme(event.target.value);
  }, []);

  const handleApplyChanges = React.useCallback(() => {
    onApply({
      size: sizeState,
      type: typeState,
      pagesize: selectedPaginationValue,
      theme: activeTheme,
    });
  }, [sizeState, typeState, selectedPaginationValue, activeTheme, onApply]);

  return (
    <FormGroup className="MuiFormGroup-options" row>
      {/* <FormControl variant="standard">
        <InputLabel>Dataset</InputLabel>
        <Select value={typeState} onChange={handleDatasetChange}>
          <MenuItem value="Employee">Employee</MenuItem>
          <MenuItem value="Commodity">Commodity</MenuItem>
        </Select>
      </FormControl> */}
      <FormControl variant="standard">
        <InputLabel>Rows</InputLabel>
        <Select value={sizeState} onChange={handleSizeChange}>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
          <MenuItem value={10000}>{Number(10000).toLocaleString()}</MenuItem>
          <MenuItem value={100000}>{Number(100000).toLocaleString()}</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Page Size</InputLabel>
        <Select
          value={selectedPaginationValue}
          onChange={handlePaginationChange}
        >
          <MenuItem value={-1}>off</MenuItem>
          <MenuItem value={0}>auto</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Theme</InputLabel>
        <Select value={activeTheme} onChange={handleThemeChange}>
          <MenuItem value="default">Default Theme</MenuItem>
          <MenuItem value="ant">Ant Design</MenuItem>
        </Select>
      </FormControl>
      <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleApplyChanges}
      >
        <KeyboardArrowRightIcon fontSize="small" /> Apply
      </Button>
    </FormGroup>
  );
}

export default function FullFeaturedDemo({ swaps }) {
  const classes = useStyles();
  const antDesignClasses = useStylesAntDesign();
  const [isAntDesign, setIsAntDesign] = React.useState<boolean>(false);
  const [type, setType] = React.useState<GridDataType>("Swaps");
  const [size, setSize] = React.useState(100);

  const [pagination, setPagination] = React.useState<GridPaginationSettings>({
    pagination: false,
    autoPageSize: false,
    pageSize: undefined,
  });

  const getActiveTheme = () => {
    return isAntDesign ? "ant" : "default";
  };

  const handleApplyClick = (settings) => {
    if (size !== settings.size) {
      setSize(settings.size);
    }

    if (type !== settings.type) {
      setType(settings.type);
    }

    if (getActiveTheme() !== settings.theme) {
      setIsAntDesign(!isAntDesign);
    }

    const newPaginationSettings: GridPaginationSettings = {
      pagination: settings.pagesize !== -1,
      autoPageSize: settings.pagesize === 0,
      pageSize: settings.pagesize > 0 ? settings.pagesize : undefined,
    };

    setPagination(
      (
        currentPaginationSettings: GridPaginationSettings
      ): GridPaginationSettings => {
        if (
          currentPaginationSettings.pagination ===
            newPaginationSettings.pagination &&
          currentPaginationSettings.autoPageSize ===
            newPaginationSettings.autoPageSize &&
          currentPaginationSettings.pageSize === newPaginationSettings.pageSize
        ) {
          return currentPaginationSettings;
        }
        return newPaginationSettings;
      }
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className={classes.root}>
        <SettingsPanel
          onApply={handleApplyClick}
          size={size}
          type={type}
          theme={getActiveTheme()}
        />
        <DataGridPro
          className={isAntDesign ? antDesignClasses.root : undefined}
          rows={[...swaps]}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          // loading={swaps.length  === 0}
          checkboxSelection
          disableSelectionOnClick
          {...pagination}
        />
      </div>
    </StyledEngineProvider>
  );
}
