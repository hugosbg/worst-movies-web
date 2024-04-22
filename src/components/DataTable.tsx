import React, { useCallback, useEffect } from 'react';
import MyDataTable, { Config } from 'datatables.net-dt';
import 'datatables.net-buttons-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.min.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';

export type Props = Config & {
  id: string;
  innerProps?: React.TableHTMLAttributes<HTMLTableElement>;
};

export const DataTable = ({ id, innerProps, data = [], ...config }: Props) => {
  const initTable = useCallback(
    () =>
      new MyDataTable(`#${id}`, {
        ...config,
        destroy: true,
        responsive: true,
      }),
    [config],
  );

  useEffect(() => {
    const table = initTable();
    table.clear();
    table.rows.add(data).draw();
    return () => {
      table.destroy();
    };
  }, [data]);

  return (
    <table id={id} width="100%" className="display" {...innerProps}></table>
  );
};
