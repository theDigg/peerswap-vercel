// import React from 'react'
// import { useSelector } from 'react-redux'
// import { RootState } from '../app/rootReducer'
// import {
//   makeStyles,
//   Theme,
//   createStyles,
//   styled
// } from '@mui/material/styles'
// import { Grid } from '@mui/material'
// import MUIDataTable from 'mui-datatables'

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//       width: '100%',
//     },
//     // necessary for content to be below app bar
//     toolbar: theme.mixins.toolbar,
//     content: {
//       flexGrow: 1,
//       padding: theme.spacing(3),
//     },
//     tableOverflow: {
//       overflow: 'auto',
//     },
//   })
// )

// export default function Transactions() {
//   const classes = useStyles()
//   const { account } = useSelector((state: RootState) => state.account)

//   return (
//     <div className={classes.root}>
//       <main className={classes.content}>
//         <div className={classes.toolbar} />
//         {account && <Tables transactions={account.data.transactions} />}
//       </main>
//     </div>
//   )
// }

// function convertTimestamp(timestamp: number) {
//   return `${new Date(timestamp).toLocaleDateString()}  ${new Date(timestamp).toLocaleTimeString()}`
// }

// function Tables({ transactions }) {
//   const data = transactions.map(tx => [tx.txId.slice(0, 8), tx.type, convertTimestamp(tx.timestamp), tx.from ? tx.from.slice(0, 8) : '', tx.to ? tx.to.slice(0, 8) : ''])
//   return (
//     <>
//       <Grid container spacing={4}>
//         <Grid item xs={12}>
//           <MUIDataTable
//             title="Transactions"
//             data={data}
//             columns={['TxID', 'Type', 'Time', 'From', 'To', 'Action']}
//             options={{
//               filterType: 'checkbox',
//             }}
//           />
//         </Grid>
//       </Grid>
//     </>
//   )
// }

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataGridDemo() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}