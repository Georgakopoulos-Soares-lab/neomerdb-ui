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

interface RowFilteringProperties<T extends Record<string, unknown>> {
  table: Table<T>;
  defaultVisibleColumns?: string[];
  filterSuggestions?: string[];
}

interface FilterItem {
  field: string | undefined;
  operator: string;
  value: string;
}

const FILTERS_OPERATORS_GENERIC = ['contains', 'equals', 'startsWith', 'endsWith'];
const FILTERS_OPERATORS_AF = ['between'];
const FILTERS_OPERATORS_NUMERIC = ['equals', 'notEquals', 'greaterThan', 'lessThan'];

const RowFiltering = <T extends Record<string, unknown>>({
  table,
  filterSuggestions = [],
}: RowFilteringProperties<T>): JSX.Element => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>();
  const [filters, setFilters] = useState<FilterItem[]>([]);

  const [filterOperators, setFilterOperators] = useState<string[]>([
    ...FILTERS_OPERATORS_GENERIC,
    ...FILTERS_OPERATORS_NUMERIC,
    ...FILTERS_OPERATORS_AF,
  ]);

  const open = Boolean(anchorElement);

  const updateFilterOperators = (field: string | null) => {
    let operators = FILTERS_OPERATORS_GENERIC;

    console.log('Updating filter operators for field:', field);

    if (field?.startsWith('AF')) operators = FILTERS_OPERATORS_AF;

    setFilterOperators(operators);
    setFilters((previous) => {
      const newFilters = [...previous];
      const currentFilter = newFilters.find((f) => f.field === field);
      if (currentFilter) {
        currentFilter.operator = operators.includes(currentFilter.operator)
          ? currentFilter.operator
          : operators[0];
      }
      return newFilters;
    });
    return operators;
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(undefined);
  };

  const handleAddFilter = () => {
    setFilters((previous) => [...previous, { field: undefined, operator: 'contains', value: '' }]);
  };

  const handleClearFilters = () => {
    setFilters([]);
  };

  const handleChange = (index: number, key: keyof FilterItem, value: string | null) => {
    setFilters((previous) => {
      const newFilters = [...previous];
      newFilters[`${index}`] = { ...newFilters[`${index}`], [key]: value };
      return newFilters;
    });
  };

  const columnOptions = table.getAllColumns().map((col) => col.id);

  const activeFiltersCount = filters.filter((f) => f.field && f.value).length;

  const handleRemoveFilter = (index: number) => {
    setFilters((previous) => previous.filter((_, index_) => index_ !== index));
  };

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
                value={filter.field || null}
                onChange={(_, newValue) => {
                  setFilters((previous) => {
                    const newFilters = [...previous];
                    newFilters[`${index}`] = {
                      field: newValue === null ? undefined : newValue,
                      operator: 'contains',
                      value: '',
                    };
                    return newFilters;
                  });
                  updateFilterOperators(newValue);
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
                disabled={
                  !filter.field ||
                  filter.field === 'undefined' ||
                  filter.field === '' ||
                  filter.field.startsWith('AF')
                }
              >
                {filterOperators.map((operator) => (
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
                // Autocomplete που επιτρέπει ελεύθερη πληκτρολόγηση και προτάσεις από filterSuggestions
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
