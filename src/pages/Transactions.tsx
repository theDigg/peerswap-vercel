import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { makeStyles, Theme, createStyles, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid-pro";
import { formatDateTime } from "../utils/stringUtils";

const columns: GridColDef[] = [
  { field: "id", headerName: "TxID", width: 150 },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
  {
    field: "data",
    headerName: "Data",
    width: 150,
  },
  {
    field: "timestamp",
    headerName: "Timestamp",
    type: "date",
    width: 180,
    valueFormatter: ({ value }: any) => formatDateTime(value),
  },
];

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function DataGridDemo() {
  const { account } = useSelector((state: RootState) => state.account);

  const transactions = account.data.transactions.map((transaction: any) => ({
    ...transaction,
    id: transaction.txId,
    data: JSON.stringify(transaction)
  }));

  return (
    <Box sx={{ height: "90vh", width: "100%" }}>
      <Offset />
      <DataGridPro
        rows={transactions}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}
