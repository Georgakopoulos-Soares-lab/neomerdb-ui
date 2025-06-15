import {
  Box,
  IconButton,
  Menu,
  ListItemText,
  Tooltip,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import { useState } from 'react';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { DragIndicator } from '@mui/icons-material';
import type { Table } from '@tanstack/react-table';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { DragEndEvent } from '@dnd-kit/core';

interface ColumnOrderingToggleProperties<T extends Record<string, unknown>> {
  table: Table<T>;
  onColumnOrderingChange?: (columnId: string, newIndex: number) => void;
}

function SortableItem({ columnId }: { columnId: string; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: columnId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    height: '0.75rem !important',
  };

  return (
    <ListItem ref={setNodeRef} style={style} divider {...attributes} {...listeners}>
      <ListItemIcon>
        <DragIndicator />
      </ListItemIcon>
      <ListItemText
        slotProps={{
          primary: {
            fontSize: '0.75rem !important',
            fontWeight: 'bold',
          },
        }}
        primary={columnId}
      />
    </ListItem>
  );
}

const ColumnOrderingToggle = <T extends Record<string, unknown>>({
  table,
  onColumnOrderingChange,
}: ColumnOrderingToggleProperties<T>) => {
  const [anchorElement, setAnchorElement] = useState<undefined | HTMLElement>();

  const open = Boolean(anchorElement);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(undefined);
  };

  const visibleColumns = table.getAllLeafColumns().filter((col) => col.getIsVisible());
  const columnIds = visibleColumns.map((col) => col.id);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id && over) {
      const oldIndex = columnIds.indexOf(active.id as string);
      const newIndex = columnIds.indexOf(over.id as string);
      const reordered = arrayMove(columnIds, oldIndex, newIndex);
      table.setColumnOrder(reordered);
      onColumnOrderingChange?.(active.id as string, newIndex);
    }
  };

  return (
    <Box>
      <Tooltip title="Reorder columns">
        <IconButton size="small" onClick={handleClick} color="primary">
          <DragHandleIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorElement} open={open} onClose={handleClose}>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={columnIds} strategy={verticalListSortingStrategy}>
            {columnIds.map((columnId, index) => (
              <SortableItem key={columnId} columnId={columnId} index={index} />
            ))}
          </SortableContext>
        </DndContext>
      </Menu>
    </Box>
  );
};

export default ColumnOrderingToggle;
