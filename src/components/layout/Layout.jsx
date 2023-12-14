import { Container } from '@mui/material';
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
    <>
      <MenuAppBar toggleDrawer={toggleDrawer} />
      <SideNav toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
      <Container maxWidth="xl" fixed sx={{ padding: 2, marginTop: 8 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
