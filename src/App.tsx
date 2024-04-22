import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Provider from './common/Provider';
import Dashboard from './views/Dashboard';
import List from './views/List';
import { NotFound } from './views/Errors';

export default function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Provider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} index />
              <Route path="/list" element={<List />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </Provider>
    </ThemeProvider>
  );
}
