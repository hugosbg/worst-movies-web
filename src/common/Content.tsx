import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
  children: React.ReactNode;
};
const Content: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(true);
  return (
    <React.Fragment>
      <Header open={open} handleDrawerToggle={() => setOpen(!open)} />
      <Sidebar open={open} handleDrawerClose={() => setOpen(false)} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Content;
