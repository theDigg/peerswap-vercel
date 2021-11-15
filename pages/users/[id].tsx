import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TxDataGrid from 'components/TransactionDataGrid';
import UserCard from 'components/UserCard';
import Page from 'components/Page';
import { getAccountData } from 'api/peerswapAPI';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const User = ({ user }) => {
  return (
    <Box sx={{ height: '90vh', width: '100%', p: 2 }}>
      <Offset />
      <UserCard user={user} />
    </Box>
  );
};

const UserPage = ({ user }) => (
  <Page name="User" path={`/users/${user.id}`}>
    <User user={user} />
  </Page>
);

// This gets called on every request
export async function getServerSideProps({ query }) {
  // Fetch data from external API
  const { id } = query;
  const { account } = await getAccountData(id);
  console.log(account);

  return {
    props: {
      user: account
    }
  };
}

export default UserPage;
