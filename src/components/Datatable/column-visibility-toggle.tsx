import { ViewColumn, RestartAlt, ExpandMore, ExpandLess } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  Collapse,
} from '@mui/material';
import type { Table } from '@tanstack/react-table';
import { useState, type JSX } from 'react';

interface GroupedColumn {
  group: string;
  columns: string[];
}

interface ColumnVisibilityToggleProperties<T extends Record<string, unknown>> {
  table: Table<T>;
  defaultVisibleColumns?: string[];
  groupedColumns?: GroupedColumn[];
}

const MIN_VISIBLE_COLUMNS = 4;

export const ColumnVisibilityToggle = <T extends Record<string, unknown>>({
  table,
  defaultVisibleColumns = [],
  groupedColumns = [],
}: ColumnVisibilityToggleProperties<T>): JSX.Element => {
  const [anchorElement, setAnchorElement] = useState<undefined | HTMLElement>();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groupedColumns.map((group) => [group.group, true])),
  );

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

        {groupedColumns.length > 0
          ? groupedColumns.map((group) => {
              const groupColumns = table
                .getAllLeafColumns()
                .filter((col) => group.columns.includes(col.id));
              const allGroupVisible = groupColumns.every((col) => col.getIsVisible());
              const someGroupVisible = groupColumns.some((col) => col.getIsVisible());
              return (
                <Box key={group.group}>
                  <Divider />
                  <MenuItem
                    onClick={() =>
                      setExpandedGroups((previous) => ({
                        ...previous,
                        [group.group]: !previous[group.group],
                      }))
                    }
                    sx={{ fontWeight: 600 }}
                  >
                    <Checkbox
                      checked={allGroupVisible}
                      indeterminate={someGroupVisible && !allGroupVisible}
                    />
                    <ListItemText primary={group.group} />
                    {expandedGroups[group.group] ? <ExpandLess /> : <ExpandMore />}
                  </MenuItem>
                  <Collapse in={expandedGroups[group.group]}>
                    {groupColumns.map((column) => {
                      const isLastVisible =
                        visibleCount <= MIN_VISIBLE_COLUMNS && column.getIsVisible();
                      return (
                        <MenuItem
                          key={column.id}
                          onClick={() => {
                            if (!isLastVisible) column.toggleVisibility();
                          }}
                          disabled={isLastVisible}
                          sx={{ pl: 4 }}
                        >
                          <Checkbox checked={column.getIsVisible()} />
                          <ListItemText primary={column.id} />
                        </MenuItem>
                      );
                    })}
                  </Collapse>
                </Box>
              );
            })
          : undefined}
        {(() => {
          const groupedColumnIds = new Set(groupedColumns.flatMap((group) => group.columns));
          const ungroupedColumns = table
            .getAllLeafColumns()
            .filter((col) => !groupedColumnIds.has(col.id));
          if (ungroupedColumns.length > 0) {
            return (
              <Box key="ungrouped">
                <Divider />
                <MenuItem disabled sx={{ fontWeight: 600 }}>
                  Other Columns
                </MenuItem>
                {ungroupedColumns.map((column) => {
                  const isLastVisible =
                    visibleCount <= MIN_VISIBLE_COLUMNS && column.getIsVisible();
                  return (
                    <MenuItem
                      key={column.id}
                      onClick={() => {
                        if (!isLastVisible) column.toggleVisibility();
                      }}
                      disabled={isLastVisible}
                      sx={{ pl: 4 }}
                    >
                      <Checkbox checked={column.getIsVisible()} />
                      <ListItemText primary={column.id} />
                    </MenuItem>
                  );
                })}
              </Box>
            );
          }
        })()}
      </Menu>
    </Box>
  );
};

export default ColumnVisibilityToggle;
