import { ViewColumn, RestartAlt } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
} from '@mui/material';
import type { Table } from '@tanstack/react-table';
import { useState, type JSX } from 'react';

interface ColumnVisibilityToggleProperties<T extends Record<string, unknown>> {
  table: Table<T>;
  defaultVisibleColumns?: string[];
}

const MIN_VISIBLE_COLUMNS = 4;

export const ColumnVisibilityToggle = <T extends Record<string, unknown>>({
  table,
  defaultVisibleColumns = [],
}: ColumnVisibilityToggleProperties<T>): JSX.Element => {
  const [anchorElement, setAnchorElement] = useState<undefined | HTMLElement>();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElement(undefined);
  };

  const visibleCount = table.getAllLeafColumns().filter((col) => col.getIsVisible()).length;

  const resetToDefault = () => {
    const allColumns = table.getAllLeafColumns();
    const defaultVisibility: Record<string, boolean> = {};
    for (const col of allColumns) {
      defaultVisibility[col.id] = defaultVisibleColumns.includes(col.id);
    }
    table.setColumnVisibility(defaultVisibility);
    handleCloseMenu();
  };

  const setAllChecked = () => {
    const allVisible: Record<string, boolean> = {};
    for (const col of table.getAllLeafColumns()) {
      allVisible[col.id] = true;
    }
    table.setColumnVisibility(allVisible);
    handleCloseMenu();
  };

  const isAllColumnsVisible = table.getAllLeafColumns().every((col) => col.getIsVisible());

  return (
    <Box>
      <Tooltip title="Toggle column visibility">
        <IconButton
          size="small"
          onClick={handleOpenMenu}
          aria-label="Toggle column visibility"
          color="primary"
        >
          <ViewColumn />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={setAllChecked}>
          <Checkbox
            checked={isAllColumnsVisible}
            indeterminate={
              table.getAllLeafColumns().some((col) => col.getIsVisible()) &&
              !table.getAllLeafColumns().every((col) => col.getIsVisible())
            }
          />
          <ListItemText primary="Select All" />
        </MenuItem>
        <Divider />

        <MenuItem onClick={resetToDefault}>
          <RestartAlt fontSize="small" sx={{ mr: 1 }} />
          <ListItemText primary="Reset to Default" />
        </MenuItem>
        <Divider />

        {table.getAllLeafColumns().map((column) => {
          // Prevent hiding if this is the last visible column (minimum visible columns)
          const isLastVisible = visibleCount <= MIN_VISIBLE_COLUMNS && column.getIsVisible();
          return (
            <MenuItem
              key={column.id}
              onClick={() => {
                if (!isLastVisible) column.toggleVisibility();
              }}
              disabled={isLastVisible}
            >
              <Checkbox checked={column.getIsVisible()} />
              <ListItemText primary={column.id} />
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default ColumnVisibilityToggle;
