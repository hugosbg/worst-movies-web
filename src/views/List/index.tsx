import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Content from '../../common/Content';
import { DataTableList } from './DataTable';

export default function List() {
  return (
    <Content>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 240,
            }}
          >
            <DataTableList />
          </Paper>
        </Grid>
      </Grid>
    </Content>
  );
}
