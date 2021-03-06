import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TxDataGrid from 'components/TransactionDataGrid';
import Page from 'components/Page';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Users = () => {
  const { account } = useSelector((state: RootState) => state.account);

  const transactions = account.data.transactions.map((transaction: any) => ({
    ...transaction,
    id: transaction.txId,
    data: JSON.stringify(transaction)
  }));

  return (
    <Box sx={{ height: '90vh', width: '100%', p: 2 }}>
      <Offset />
      <TxDataGrid transactions={transactions} />
    </Box>
  );
};

const TransactionsPage = () => (
  <Page name="Users" path="/users">
    <Users />
  </Page>
);

export default TransactionsPage;
