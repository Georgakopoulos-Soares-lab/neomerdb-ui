import { Button, Tooltip } from '@mui/material';
import type { Table } from '@tanstack/react-table';
import { type JSX } from 'react';

interface DownLoadSelectedButtoneProperties<T extends Record<string, unknown>> {
  table: Table<T>;
}
const DownLoadSelectedButton = <T extends Record<string, unknown>>({
  table,
}: DownLoadSelectedButtoneProperties<T>): JSX.Element => {
  const onDownload = (selectedRows: T[]) => {
    const visibleColumns = table.getVisibleFlatColumns().map((col) => col.id);
    const csvContent = [
      visibleColumns.join(','),
      ...selectedRows.map((row) => visibleColumns.map((key) => row[`${key}`]).join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const today = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `neomerDB_selected_rows_${today}.csv`);
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original as T);

  return (
    <Tooltip title="Download selected rows">
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (selectedRows.length > 0) {
            onDownload(selectedRows);
          } else {
            alert('No rows selected to download');
          }
        }}
        disabled={selectedRows.length === 0}
      >
        Download Selected Rows ({table.getSelectedRowModel().rows.length})
      </Button>
    </Tooltip>
  );
};

export default DownLoadSelectedButton;
