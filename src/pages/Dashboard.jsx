import React from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Box, Container, Typography } from '@mui/material';
import useTitle from '../hooks/useTitle';

const Dashboard = () => {
  useTitle('Dashboard');
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
        <Typography variant="h3" color="gray">
          Dashboard under construction
        </Typography>
        <Box>
          <ConstructionIcon sx={{ fontSize: '100px' }} color="disabled" />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
