import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import NeomerStatistics from './statistics';
import { useState } from 'react';

interface ToolBarProperties<T> {
  length: number;
  setLength: (event: { target: { value: number } }) => void;
  isLoading?: boolean;
  headers?: string[];
  useStats: (statsParameters: T) => object | undefined;
}

const ToolBar = <T,>({
  length,
  setLength,
  isLoading,
  headers = [],
  useStats,
}: ToolBarProperties<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid>
        <FormControl
          fullWidth
          size="small"
          style={{
            minWidth: 300,
          }}
        >
          <InputLabel id="length-select-label">Neomer Length</InputLabel>
          <Select
            labelId="length-select-label"
            id="length-select"
            value={length}
            label="Neomer Length"
            onChange={setLength}
          >
            {Array.from({ length: 7 }, (_, index) => index + 11).map((length_) => (
              <MenuItem key={length_} value={length_}>
                {length_}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid>
        <Button
          disabled={isLoading}
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Statistics
        </Button>
        <NeomerStatistics
          open={open}
          length={length}
          useStats={useStats}
          onClose={() => {
            setOpen(false);
          }}
          headers={headers}
        />
      </Grid>
    </Grid>
  );
};

export default ToolBar;
