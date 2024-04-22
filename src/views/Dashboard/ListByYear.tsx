import React, { Fragment, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { ConfigColumns } from 'datatables.net-dt';
import { DataTable } from '../../components/DataTable';
import { Movies } from '../../interfaces/movies';

const columns: ConfigColumns[] = [
  {
    data: 'id',
    title: 'ID',
    orderable: false,
    className: 'dt-body-left dt-head-left',
  },
  {
    data: 'year',
    title: 'Year',
    orderable: false,
    className: 'dt-body-left dt-head-left',
  },
  {
    data: 'title',
    title: 'Title',
    orderable: false,
    className: 'dt-body-left dt-head-left',
  },
];

type Props = {
  rows: Movies[];
  onSearch: (value: string) => void;
};
export function ListByYear({ rows, onSearch }: Props) {
  const [value, setValue] = useState('');

  const handleSearch = () => onSearch(value);

  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        List movie winners by year
      </Typography>

      <TextField
        id="outlined-number"
        variant="filled"
        label="Search by year"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton aria-label="search" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />

      <DataTable
        id="ListByYear"
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
