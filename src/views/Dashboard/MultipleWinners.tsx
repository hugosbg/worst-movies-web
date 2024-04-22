import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import { ConfigColumns } from 'datatables.net-dt';
import { DataTable } from '../../components/DataTable';
import { YearsWinners } from '../../interfaces/movies';

const columns: ConfigColumns[] = [
  {
    data: 'year',
    title: 'Year',
    orderable: false,
    className: 'dt-body-left dt-head-left',
  },
  {
    data: 'winnerCount',
    title: 'Win Count',
    orderable: false,
    className: 'dt-body-left dt-head-left',
  },
];

type Props = {
  rows: YearsWinners[];
};
export const MultipleWinners = ({ rows }: Props) => {
  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        List years with multiple winners
      </Typography>

      <DataTable
        id="MultipleWinners"
        columns={columns}
        data={rows}
        paging={false}
        info={false}
        lengthChange={false}
        processing={true}
      />
    </Fragment>
  );
};
