import React from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Box, Container, Typography } from '@mui/material';
import useTitle from '../hooks/useTitle';

const Account = () => {
  useTitle('My Account');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography textAlign="center" variant="h3" color="gray">
          Account page under construction
        </Typography>
        <Box>
          <ConstructionIcon sx={{ fontSize: '100px' }} color="disabled" />
        </Box>
      </Box>
    </Box>
  );
};

export default Account;
