import { FilterAlt, RemoveCircleOutline } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Tooltip,
  Popover,
  Typography,
  Button,
  TextField,
  MenuItem,
  Autocomplete,
  Badge,
  Slider,
} from '@mui/material';
import type { Table } from '@tanstack/react-table';
import { useState, type JSX } from 'react';
import type { FilterItem } from '../../types/nullomers';

interface RowFilteringProperties<T extends Record<string, unknown>> {
  table: Table<T>;
  filters?: FilterItem[];
  defaultVisibleColumns?: string[];
  filterSuggestions?: string[];
  onFiltersChange?: (filters: FilterItem[]) => void;
  filtersOperators?: Record<string, string[]>;
}

const RowFiltering = <T extends Record<string, unknown>>({
  table,
  filters = [],
  filterSuggestions = [],
  onFiltersChange = () => {},
  filtersOperators = {},
}: RowFilteringProperties<T>): JSX.Element => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>();

  const open = Boolean(anchorElement);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(undefined);
  };

  const handleAddFilter = () => {
    onFiltersChange([
      ...filters,
      {
        field: undefined,
        operator: 'contains',
        value: '',
      },
    ]);
  };

  const handleClearFilters = () => {
    onFiltersChange([]);
    setAnchorElement(undefined);
  };

  const handleChange = (index: number, key: keyof FilterItem, value: string | null) => {
    onFiltersChange(
      filters.map((filter, index_) =>
        index_ === index ? { ...filter, [key]: value === null ? undefined : value } : filter,
      ),
    );
    if (key === 'value' && value === '') {
      onFiltersChange(
        filters.map((filter, index_) => (index_ === index ? { ...filter, value: '' } : filter)),
      );
    }
  };

  const columnOptions = table.getAllColumns().map((col) => col.id);

  const activeFiltersCount = filters.filter((f) => f.field && f.value).length;

  const handleRemoveFilter = (index: number) => {
    const newFilters = filters.filter((_, index_) => index_ !== index);
    onFiltersChange(newFilters);
    if (newFilters.length === 0) {
      setAnchorElement(undefined);
    }
  };

  if (Object.keys(filtersOperators).length === 0 && !open) {
    return (
      <Box>
        <Tooltip title="Filter rows">
          <IconButton size="small" aria-label="Filter rows" disabled onClick={handleClick}>
            <Badge badgeContent={activeFiltersCount} color="secondary">
              <FilterAlt />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box>
      <Tooltip title="Filter rows">
        <IconButton size="small" aria-label="Filter rows" color="primary" onClick={handleClick}>
          <Badge badgeContent={activeFiltersCount} color="secondary">
            <FilterAlt />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorElement}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{ paper: { sx: { borderRadius: 2, boxShadow: 3 } } }}
      >
        <Box p={2} minWidth={600} display="flex" flexDirection="column" gap={2}>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: 'pointer', fontWeight: 500, display: 'inline-block', mb: 1 }}
            onClick={handleAddFilter}
          >
            + Add Filter
          </Typography>
          {filters.map((filter, index) => (
            <Box key={index} display="flex" gap={1} alignItems="center">
              <IconButton
                size="small"
                color="error"
                sx={{ mt: '4px' }}
                onClick={() => handleRemoveFilter(index)}
              >
                <RemoveCircleOutline />
              </IconButton>
              <Autocomplete
                options={columnOptions}
                // eslint-disable-next-line unicorn/no-null
                value={filter.field ?? null}
                onChange={(_, newValue) => {
                  const updatedFilters = filters.map((f, _index) =>
                    _index === index
                      ? {
                          ...f,
                          field: newValue === null ? undefined : newValue,
                          operator: (filtersOperators[newValue || ''] || [])[0] || 'contains',
                          value: '',
                        }
                      : f,
                  );
                  onFiltersChange(updatedFilters);
                }}
                renderInput={(parameters) => (
                  <TextField {...parameters} label="Field" size="small" />
                )}
                sx={{ flex: 1 }}
              />
              <TextField
                select
                label="Operator"
                value={filter.operator}
                onChange={(event) => handleChange(index, 'operator', event.target.value)}
                size="small"
                variant="outlined"
                sx={{ width: 120 }}
                disabled={!filter.field}
              >
                {(filtersOperators[filter.field || ''] || []).map((operator) => (
                  <MenuItem key={operator} value={operator}>
                    {operator}
                  </MenuItem>
                ))}
              </TextField>
              {filter.field?.startsWith('AF') ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  sx={{ minWidth: 180, px: 1 }}
                  flex={1}
                >
                  <Typography variant="caption">
                    Range: {filter.value?.split(',').join(' - ') || '0.00 - 1.00'}
                  </Typography>
                  <Slider
                    value={
                      filter.value
                        ? filter.value.split(',').map((v) => Number.parseFloat(v))
                        : [0, 1]
                    }
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={(_, newValue) =>
                      handleChange(
                        index,
                        'value',
                        (newValue as number[]).map((v) => v.toFixed(2)).join(','),
                      )
                    }
                    valueLabelDisplay="auto"
                    disableSwap
                    track="normal"
                  />
                </Box>
              ) : (
                <Autocomplete
                  freeSolo
                  sx={{ flex: 1 }}
                  options={filterSuggestions}
                  value={filter.value}
                  onInputChange={(_, newValue) => handleChange(index, 'value', newValue)}
                  renderInput={(parameters) => (
                    <TextField
                      {...parameters}
                      label="Value"
                      size="small"
                      variant="outlined"
                      sx={{ flex: 1 }}
                    />
                  )}
                />
              )}
            </Box>
          ))}
          <Box mt={1}>
            <Button fullWidth onClick={handleClearFilters} size="small">
              Clear All Filters
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default RowFiltering;
