import React from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Box, Container, Typography } from '@mui/material';
import useTitle from '../hooks/useTitle';

const Account = () => {
  useTitle('My Account');
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh',
        }}
      >
        <Typography variant="h2">Account page under construction</Typography>
        <Box>
          <ConstructionIcon sx={{ fontSize: '100px' }} color="warning" />
        </Box>
      </Box>
    </Container>
  );
};

export default Account;