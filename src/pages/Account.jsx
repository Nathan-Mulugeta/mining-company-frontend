import React from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Box, Container, Typography } from '@mui/material';

const Account = () => {
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
        <Typography variant="h2">Account page in construction</Typography>
        <Box>
          <ConstructionIcon sx={{ fontSize: '100px' }} color="warning" />
        </Box>
      </Box>
    </Container>
  );
};

export default Account;
