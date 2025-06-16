import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type VisibilityState,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  CircularProgress,
  Grid,
  Checkbox,
  Typography,
  Button,
} from '@mui/material';

import { generateColumns } from '../../helpers';

import ColumnsVisibilityToggle from './column-visibility-toggle';
import ColumnOrderingToggle from './column-ordering-toggle';
import RowFiltering from './row-filtering';
import ShareLink from './share-link';
import DownLoadSelectedButton from './download-selected-button';
import { Error } from '@mui/icons-material';

interface DataTableProperties<T extends Record<string, unknown>> {
  data: T[];
  columns: string[];
  columnsOrdering?: string[];
  totalRows?: number;
  pageSize?: number;
  page?: number;
  pageSizeSelection?: number[];
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  loading?: boolean;
  error?: string;
  onRowClick?: (row: T) => void;
  onCellClick?: (cell: T, columnId: string) => void;
  onHeaderClick?: (columnId: string) => void;
  columnVisibility?: VisibilityState;
  defaultColumnVisibility?: string[];
  onColumnVisibilityChange?: (visibility: VisibilityState) => void;
  onFilterChange?: (columnId: string, value: string) => void;
  onColumnOrderingChange?: (columnId: string, newIndex: number) => void;
  tableToolbox?: React.ReactNode;
  filterSuggestions?: string[];
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  columnsOrdering,
  totalRows,
  page,
  pageSize,
  pageSizeSelection = [10, 20, 50, 100],
  onPageChange,
  onRowsPerPageChange,
  onRowClick,
  loading = false,
  error,
  columnVisibility,
  defaultColumnVisibility,
  onColumnVisibilityChange,
  onColumnOrderingChange,
  tableToolbox,
  filterSuggestions = [],
}: DataTableProperties<T>) {
  const initialVisibility = useMemo(() => {
    const visibility: Record<string, boolean> = {};
    for (const column of columns) {
      visibility[`${column}`] = defaultColumnVisibility?.includes(column) ?? true;
    }
    return visibility;
  }, [columns, defaultColumnVisibility]);

  const [internalVisibility, setInternalVisibility] = useState<VisibilityState>(initialVisibility);

  const effectiveVisibility = columnVisibility ?? internalVisibility;

  const table = useReactTable({
    data,
    columns: generateColumns<T>(columns),
    state: {
      columnVisibility: effectiveVisibility,
      columnOrder: columnsOrdering ?? columns,
    },
    onColumnVisibilityChange: (updaterOrValue) => {
      if (onColumnVisibilityChange) {
        if (typeof updaterOrValue === 'function') {
          onColumnVisibilityChange(updaterOrValue(effectiveVisibility));
        } else {
          onColumnVisibilityChange(updaterOrValue);
        }
      } else {
        if (typeof updaterOrValue === 'function') {
          setInternalVisibility((previous) => updaterOrValue(previous));
        } else {
          setInternalVisibility(updaterOrValue);
        }
      }
    },
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    getRowId: (row, index) => (row.id === undefined ? index.toString() : String(row.id)),
  });

  const parentReference = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentReference.current,
    estimateSize: () => 48,
    measureElement:
      globalThis.window !== undefined && !navigator.userAgent.includes('Firefox')
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  return (
    <Box flex={1} display="flex" flexDirection="column" position="relative">
      {loading && (
        <Box
          position={'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(4px)',
            zIndex: 10,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: 2,
            transition: 'background-color 0.3s ease-in-out',
          }}
        >
          <Box
            position={'absolute'}
            top={'50%'}
            left={'50%'}
            sx={{
              transform: {
                translateY: '-50%',
                translateX: '-50%',
              },
            }}
          >
            <CircularProgress
              size={40}
              sx={{
                color: 'primary.main',
                animationDuration: '550ms',
              }}
            />
          </Box>
        </Box>
      )}

      <Grid
        container
        spacing={2}
        sx={{ mb: 2 }}
        justifyContent="space-between"
        alignItems="center"
        direction={'row'}
      >
        <Grid container direction={{ xs: 'column', sm: 'row' }} size={{ xs: 12, sm: 'auto' }}>
          <ColumnsVisibilityToggle table={table} defaultVisibleColumns={defaultColumnVisibility} />
          <ColumnOrderingToggle table={table} onColumnOrderingChange={onColumnOrderingChange} />
          <RowFiltering table={table} filterSuggestions={filterSuggestions} />
          <DownLoadSelectedButton table={table} />
          <ShareLink />
        </Grid>
        <Grid>{tableToolbox}</Grid>
      </Grid>
      {error && (
        <Box
          sx={{
            color: 'error.main',
            backgroundColor: 'rgba(255, 235, 238, 0.8)',
            padding: 2,
            borderRadius: 1,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          zIndex={1}
          width="100%"
          height="100%"
          flexDirection="column"
          gap={2}
        >
          <Error sx={{ fontSize: 40, marginRight: 1, color: 'error.main' }} />
          <Typography variant="h6" color="error.main">
            {error}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please check your data or contact support.
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              globalThis.location.reload();
            }}
          >
            Refresh
          </Button>
        </Box>
      )}
      {!error && (
        <TableContainer
          component={Paper}
          ref={parentReference}
          square
          sx={{
            flex: 1,
            overflowX: 'auto',
            overflowY: 'auto',
            maxHeight: '70vh',
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
            },
          }}
        >
          <Table
            stickyHeader={true}
            sx={{
              tableLayout: 'auto',
              width: '100%',
              minWidth: 600,
              borderCollapse: 'collapse',
              '& tbody': {
                display: 'table-row-group',
              },
              '& tbody tr:nth-of-type(odd)': { backgroundColor: '#fcfcfc' },
            }}
          >
            <TableHead
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(6px)',
                position: 'sticky',
                top: 0,
                zIndex: 1,
                borderBottom: '2px solid #e0e0e0',
              }}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  sx={{
                    display: 'flex',
                    width: '100%',
                  }}
                >
                  <TableCell
                    padding="checkbox"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox
                      indeterminate={table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                      checked={table.getIsAllRowsSelected()}
                      onChange={table.getToggleAllRowsSelectedHandler()}
                      slotProps={{ input: { 'aria-label': 'select all rows' } }}
                    />
                  </TableCell>
                  {headerGroup.headers
                    .filter((header) =>
                      table.getVisibleFlatColumns().some((col) => col.id === header.column.id),
                    )
                    .map((header) => (
                      <TableCell
                        key={header.id}
                        sx={{
                          fontWeight: 'bold',
                          width: header.getSize(),
                          display: 'flex',
                          flex: 1,
                          alignItems: 'center',
                          boxSizing: 'border-box',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </Box>
                      </TableCell>
                    ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody
              sx={{
                display: 'grid',
                height: `${totalSize}px`,
                position: 'relative',
              }}
            >
              {virtualRows.map((virtualRow) => {
                const row = table.getRowModel().rows[virtualRow.index];
                return (
                  <TableRow
                    key={row.id}
                    ref={(element) => rowVirtualizer.measureElement(element)}
                    data-index={virtualRow.index}
                    onClick={() => {
                      if (onRowClick) {
                        onRowClick(row.original);
                      }
                    }}
                    sx={{
                      display: 'flex',
                      position: 'absolute',
                      transform: `translateY(${virtualRow.start}px)`,
                      width: '100%',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#e3f2fd !important',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={row.getIsSelected()}
                        onChange={row.getToggleSelectedHandler()}
                        slotProps={{ input: { 'aria-label': 'select row' } }}
                      />
                    </TableCell>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        sx={{
                          py: 1.5,
                          px: {
                            xs: 1,
                            sm: 2,
                          },
                          minWidth: 120,
                          fontSize: {
                            xs: '0.75rem',
                            sm: '0.875rem',
                          },
                          fontFamily: 'Roboto, sans-serif',
                          flex: 1,
                          borderBottom: '1px solid #eee',
                          wordBreak: 'break-word',
                          width: cell.column.getSize(),
                          display: 'flex',
                          alignItems: 'center',
                          boxSizing: 'border-box',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPage={pageSize || 10}
        component="div"
        count={totalRows || 0}
        page={page || 0}
        onPageChange={(_, newPage) => {
          table.resetRowSelection(); // unselect all rows
          if (onPageChange) {
            onPageChange(newPage);
          }
        }}
        onRowsPerPageChange={(event) => {
          const newSize = Number.parseInt(event.target.value, 10);
          table.resetRowSelection(); // unselect all rows
          if (onRowsPerPageChange) {
            onRowsPerPageChange(newSize);
          }
        }}
        rowsPerPageOptions={pageSizeSelection}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(6px)',
          position: 'sticky',
          bottom: 0,
          zIndex: 1,
          borderTop: '1px solid #e0e0e0',
        }}
      />
    </Box>
  );
}
