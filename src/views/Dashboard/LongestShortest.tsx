import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import { ConfigColumns } from 'datatables.net-dt';
import { DataTable } from '../../components/DataTable';
import { AwardRange } from '../../interfaces/movies';

const columns: ConfigColumns[] = [
  {
    data: 'producer',
    title: 'Producer',
    orderable: false,
    className: 'dt-body-left dt-head-left',
  },
  {
    data: 'interval',
    title: 'Interval',
    orderable: false,
    className: 'dt-body-left dt-head-left',
  },
  {
    data: 'previousWin',
    title: 'Previous Year',
    orderable: false,
    className: 'dt-body-left dt-head-left',
  },
  {
    data: 'followingWin',
    title: 'Following Year',
    orderable: false,
    className: 'dt-body-left dt-head-left',
  },
];

type Props = {
  maxRows: AwardRange[];
  minRows: AwardRange[];
};
export function LongestShortest({ maxRows, minRows }: Props) {
  return (
    <Fragment>
      <Typography variant="h6">
        Producers with longest and shortest interval between wins
      </Typography>

      <Typography mt={1} variant="caption" fontSize={22}>
        Maximum
      </Typography>
      <DataTable
        id="LongestShortest1"
        columns={columns}
        data={maxRows}
        paging={false}
        info={false}
        lengthChange={false}
        processing={true}
      />

      <Typography mt={1} variant="caption" fontSize={22}>
        Minimum
      </Typography>
      <DataTable
        id="LongestShortest2"
        columns={columns}
        data={minRows}
        paging={false}
        info={false}
        lengthChange={false}
        processing={true}
      />
    </Fragment>
  );
}
