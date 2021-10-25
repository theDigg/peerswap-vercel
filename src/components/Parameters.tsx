import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RedditTextField } from "../style/components/TextFields";
import { StyledTableCell, StyledTableRow } from "../style/components/Tables";

export default function Parameters({
  parameters,
  nextParameters,
  changeParameters,
}) {
  const rows = [
    createData(
      "Network Proposal Fee",
      parameters.proposalFee,
      <RedditTextField
        label="Proposal Fee"
        type="number"
        id="proposalFee-input"
        variant="filled"
        value={nextParameters.proposalFee}
        name="proposalFee"
        onChange={changeParameters}
      />
    ),
    createData(
      "Maintenance Fee",
      parameters.maintenanceFee,
      <RedditTextField
        label="Maintenance Fee"
        type="number"
        id="maintenanceFee-input"
        variant="filled"
        value={nextParameters.maintenanceFee}
        name="maintenanceFee"
        onChange={changeParameters}
      />
    ),
    createData(
      "Maintenance Interval",
      parameters.maintenanceInterval,
      <RedditTextField
        label="Maintenance Interval"
        type="number"
        id="maintenanceInterval-input"
        variant="filled"
        value={nextParameters.maintenanceInterval}
        name="maintenanceInterval"
        onChange={changeParameters}
      />
    ),
    createData(
      "Node Penalty",
      parameters.nodePenalty,
      <RedditTextField
        label="Node Penalty"
        type="number"
        id="nodePenalty-input"
        variant="filled"
        value={nextParameters.nodePenalty}
        name="nodePenalty"
        onChange={changeParameters}
      />
    ),
    createData(
      "Node Reward Amount",
      parameters.nodeRewardAmount,
      <RedditTextField
        label="Node Reward"
        type="number"
        id="nodeRewardAmount-input"
        variant="filled"
        value={nextParameters.nodeRewardAmount}
        name="nodeRewardAmount"
        onChange={changeParameters}
      />
    ),
    createData(
      "Node Reward Interval",
      parameters.nodeRewardInterval,
      <RedditTextField
        label="Node Reward Interval"
        type="number"
        id="nodeRewardInterval-input"
        variant="filled"
        value={nextParameters.nodeRewardInterval}
        name="nodeRewardInterval"
        onChange={changeParameters}
      />
    ),
    createData(
      "Stake Required",
      parameters.stakeRequired,
      <RedditTextField
        label="Stake Required"
        type="number"
        id="stakeRequired-input"
        variant="filled"
        value={nextParameters.stakeRequired}
        name="stakeRequired"
        onChange={changeParameters}
      />
    ),
    createData(
      "Transaction Fee",
      parameters.transactionFee,
      <RedditTextField
        label="TX Fee"
        type="number"
        id="transactionFee-input"
        variant="filled"
        value={nextParameters.transactionFee}
        name="transactionFee"
        onChange={changeParameters}
      />
    ),
    createData(
      "Faucet Amount",
      parameters.faucetAmount,
      <RedditTextField
        label="Faucet Amount"
        type="number"
        id="faucetAmount-input"
        variant="filled"
        value={nextParameters.faucetAmount}
        name="faucetAmount"
        onChange={changeParameters}
      />
    ),
    createData(
      "Default Toll",
      parameters.defaultToll,
      <RedditTextField
        label="Default Toll"
        type="number"
        id="defaultToll-input"
        variant="filled"
        value={nextParameters.defaultToll}
        name="defaultToll"
        onChange={changeParameters}
      />
    ),
  ];

  return (
    <TableContainer component={Paper} elevation={9}>
      <Table
        sx={{
          minWidth: 350,
        }}
        size="small"
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Parameters</StyledTableCell>
            <StyledTableCell align="right">Current</StyledTableCell>
            <StyledTableCell align="right">New</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.parameter}>
              <StyledTableCell component="th" scope="row">
                {row.parameter}
              </StyledTableCell>
              <StyledTableCell align="right">
                <strong>{row.current}</strong>
              </StyledTableCell>
              <StyledTableCell align="right">{row.next}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function createData(parameter: string, current: number, next: any) {
  return { parameter, current, next };
}
