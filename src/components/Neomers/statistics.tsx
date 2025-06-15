import { ExpandMore } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Button,
  Menu,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@mui/material';
import type { UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';

interface NeomerStatisticsProperties<T> {
  open: boolean;
  onClose: () => void;
  headers?: string[];
  length?: number;
  useStats: (statsParameters: T) => object | undefined;
}

const NeomerStatistics = <T,>({
  open,
  onClose,
  headers,
  length,
  useStats,
}: NeomerStatisticsProperties<T>) => {
  const [topNResults, setTopNResults] = useState(10);
  const [anchorElement, setAnchorElement] = useState<undefined | HTMLElement>();

  const [groupByHeader, setGroupByHeader] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElement(undefined);
  };

  const handleToggleHeader = (header: string) => {
    setGroupByHeader((previous) =>
      previous.includes(header) ? previous.filter((h) => h !== header) : [...previous, header],
    );
  };

  const statsParameters = {
    length,
    topN: topNResults,
    groupBy: groupByHeader.join(','),
  } as T;

  const { data: statsData } = useStats(statsParameters) as UseQueryResult<{
    data: string[][];
    headers: string[];
  }>;

  const data = statsData?.data ?? [];
  const tableHeaders = statsData?.headers ?? [];

  const paginatedData = data?.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Neomer Statistics</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid container spacing={1} direction={'row'} size={12}>
            <Grid marginTop={2} size={{ xs: 12, sm: 6 }} alignItems={'center'}>
              <TextField
                id="top-n-results"
                value={topNResults}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value === '' || /^\d+$/.test(value)) {
                    setTopNResults(Number(value));
                  }
                }}
                fullWidth
                label="Top N Results"
                type="number"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                  htmlInput: {
                    inputMode: 'numeric',
                    min: 1,
                    max: 100,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }} display={'flex'} alignItems={'end'}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  height: '80%',
                }}
                onClick={handleOpenMenu}
              >
                Group By {groupByHeader.length > 0 ? `(${groupByHeader.length})` : ''}
                <ExpandMore />
              </Button>
              <Menu
                anchorEl={anchorElement}
                open={Boolean(anchorElement)}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                <MenuItem key={'none'} onClick={() => setGroupByHeader([])}>
                  <input
                    type="checkbox"
                    checked={groupByHeader.length === 0}
                    onChange={() => handleToggleHeader('none')}
                    style={{ marginRight: 8 }}
                  />
                  None
                </MenuItem>
                {headers?.map((header) => {
                  const isSelected = groupByHeader.includes(header);

                  return (
                    <MenuItem key={header} onClick={() => handleToggleHeader(header)}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // Required to suppress React warning
                        style={{ marginRight: 8 }}
                      />
                      {header}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Grid>
          </Grid>
          <Grid
            size={12}
            style={{
              marginTop: 16,
              minHeight: '420px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              width: '100%',
              flex: 1,
            }}
          >
            <div style={{ flex: 1, overflow: 'auto', width: '100%' }}>
              <Table
                stickyHeader
                size="small"
                sx={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  '& tbody': {
                    display: 'table-row-group',
                  },
                  '& tbody tr:nth-of-type(odd)': { backgroundColor: '#fcfcfc' },
                }}
              >
                <TableHead>
                  <TableRow>
                    {tableHeaders?.map((header, index) => (
                      <TableCell key={index} style={{ fontWeight: 'bold' }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData?.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row?.map((value, colIndex) => <TableCell key={colIndex}>{value}</TableCell>)}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              component="div"
              count={data?.length || 0}
              page={currentPage}
              onPageChange={(_, newPage) => setCurrentPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(Number.parseInt(event.target.value, 10));
                setCurrentPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NeomerStatistics;
