import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';
import SideNav from './SideNav';

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box id="background">
      <MenuAppBar toggleDrawer={toggleDrawer} />
      <SideNav toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
      <Container maxWidth="xl" fixed sx={{ padding: 2, marginTop: 7 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
