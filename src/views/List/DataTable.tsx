import React, { Fragment, useMemo, useContext, useState } from 'react';
import { ConfigColumns, Api, AjaxData, AjaxResponse } from 'datatables.net-dt';
import Typography from '@mui/material/Typography';
import { DataTable } from '../../components/DataTable';
import { ProviderContext } from '../../common/Provider';

enum Winner {
  yes = 'Yes',
  no = 'No',
}

const columns: ConfigColumns[] = [
  {
    data: 'id',
    title: 'ID',
    orderable: false,
    searchable: false,
    className: 'dt-body-left dt-head-center dt-head-autowidth',
  },
  {
    data: 'year',
    title: 'Year',
    orderable: false,
    searchable: true,
    className: 'dt-body-left dt-head-center dt-head-autowidth',
  },
  {
    data: 'title',
    title: 'Title',
    orderable: false,
    searchable: false,
    className: 'dt-body-left dt-head-center dt-head-autowidth',
  },
  {
    data: 'winner',
    title: 'Winner',
    orderable: false,
    searchable: true,
    className: 'dt-body-left dt-head-center dt-head-autowidth',
    render: function (data, type) {
      if (type === 'display' || type === 'filter') {
        return data ? Winner.yes : Winner.no;
      }
      return data;
    },
  },
];

export function DataTableList() {
  const { api } = useContext(ProviderContext);

  const inputYear = useMemo(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('min', '1000');
    input.classList.add('dt-head-input');

    const handleKeyup = function (event: Event) {
      event.stopPropagation();
      input.dispatchEvent(new Event('change'));
      input.focus();
    };
    input.removeEventListener('keyup', handleKeyup);
    input.addEventListener('keyup', handleKeyup);
    return input;
  }, []);

  const selectWinner = useMemo(() => {
    const select = document.createElement('select');
    select.setAttribute('style', 'width: 100%');
    select.classList.add('dt-head-input');
    select.add(new Option(''));
    select.add(new Option(Winner.yes));
    select.add(new Option(Winner.no));
    return select;
  }, []);

  const handleAjax = (
    data: AjaxData,
    callback: (data: AjaxResponse) => void,
  ) => {
    const size = data.length;
    const page = data.start / data.length;
    const year = Number(data.columns[1].search.value) || undefined;
    const winnerValue = data.columns[3].search.value;
    const winner = winnerValue ? winnerValue === Winner.yes : undefined;

    api
      .getMovies({ page, size, year, winner })
      .then((result) =>
        callback({
          data: result.content,
          recordsTotal: result.totalElements,
          recordsFiltered: result.totalElements,
        }),
      )
      .catch((error) => {
        console.error('[List]', error);
        callback({
          data: [],
          recordsTotal: 0,
          recordsFiltered: 0,
        });
      });
  };

  const handleComplete = (settings: any) => {
    const table = settings.api as Api;
    table.columns([1, 3]).every(function (index) {
      const column = this;
      const title = String(column.header().textContent);
      const th = column.header();

      if (1 === index) {
        const handleChange = function () {
          if (column.search() !== this.value) {
            column.search(this.value).draw();
          }
        };
        inputYear.setAttribute('placeholder', title);
        inputYear.removeEventListener('change', handleChange);
        inputYear.addEventListener('change', handleChange);
        th.appendChild(inputYear);
      }

      if (3 === index) {
        const handleChange = function () {
          if (column.search() !== this.value) {
            column.search(this.value, { exact: true }).draw();
          }
        };
        selectWinner.removeEventListener('change', handleChange);
        selectWinner.addEventListener('change', handleChange);
        th.appendChild(selectWinner);
      }
    });
  };

  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        List movies
      </Typography>

      <DataTable
        id="DataTableList"
        pageLength={10}
        initComplete={handleComplete}
        ajax={handleAjax as never}
        columns={columns}
        lengthChange={false}
        serverSide={true}
        processing={true}
        paging={true}
        info={false}
      />
    </Fragment>
  );
}
