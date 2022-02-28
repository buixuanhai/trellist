import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';

const AppContainer = () => {
  return (
    <Container sx={{ mt: 2 }} maxWidth="lg">
      <Outlet />
    </Container>
  );
};

AppContainer.propTypes = {};

export default AppContainer;
