import React from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import GroupAvatars from 'components/GroupAvatars';
import UserCard from 'components/UserCard';
import { users } from 'mocks/users';
import Page from 'components/Page';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Test = () => {
  const router = useRouter();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Container maxWidth="md">
        <Offset sx={{ mt: 3 }} />
        <Typography variant="h3" align="center">
          Testing page for component design
        </Typography>
        <Stack
          spacing={2}
          // divider={
          //   <Divider orientation="horizontal" flexItem>
          //     OR
          //   </Divider>
          // }
          sx={{ mx: '10%' }}
        >
          <Box sx={{ mx: 'auto' }}>
            {users.map((user) => (
              <UserCard user={user} />
            ))}
            <GroupAvatars users={users} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

const TestPage = () => (
  <Page name="Testing" path="/test">
    <Test />
  </Page>
);

export default TestPage;
