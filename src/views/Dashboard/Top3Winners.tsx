import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import { ConfigColumns } from 'datatables.net-dt';
import { DataTable } from '../../components/DataTable';
import { StudiosWinners } from '../../interfaces/movies';

const columns: ConfigColumns[] = [
  {
    data: 'name',
    title: 'Name',
    orderable: false,
    className: 'dt-body-left dt-head-left',
  },
  {
    data: 'winCount',
    title: 'Win Count',
    orderable: false,
    className: 'dt-body-left dt-head-left',
  },
];

type Props = {
  rows: StudiosWinners[];
};
export function Top3Winners({ rows }: Props) {
  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        Top 3 studios with winners
      </Typography>

      <DataTable
        id="Top3Winners"
        columns={columns}
        data={rows}
        paging={false}
        info={false}
        lengthChange={false}
        processing={true}
      />
    </Fragment>
  );
}
