import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
// import Nav from './Nav';

const Layout = () => {
  return (
    <>
      {/* <Nav /> */}
      <Container fixed>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
