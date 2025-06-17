import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useJaccardIndex } from '../../hooks/use-visualazations';
import ReactECharts from 'echarts-for-react';
import { useMemo, useState } from 'react';
import { putAcronym } from '../../helpers';
import { WarningAmber } from '@mui/icons-material';

export const JaccardChart = () => {
  const [K, setK] = useState(13);
  const [warningOpen, setWarningOpen] = useState(false);

  const { data, isFetching, error } = useJaccardIndex(K);
  const { jaccard_indices } = data || { jaccard_indices: [] };

  const { xLabels, yLabels, heatmapData, labels } = useMemo(() => {
    if (!jaccard_indices || jaccard_indices.length === 0) {
      return { xLabels: [], yLabels: [], heatmapData: [], labels: [] };
    }

    const labelsSet = new Set<string>();
    for (const { cancer_type_a, cancer_type_b } of jaccard_indices) {
      labelsSet.add(cancer_type_a);
      labelsSet.add(cancer_type_b);
    }
    const labels = [...labelsSet].sort();
    const labelIndexMap = Object.fromEntries(labels.map((l, index) => [l, index]));

    const dataPoints = jaccard_indices.map(({ cancer_type_a, cancer_type_b, jaccard_index }) => [
      labelIndexMap[`${cancer_type_b}`],
      labelIndexMap[`${cancer_type_a}`],
      jaccard_index,
    ]);

    const xLabels = labels.map((element) => putAcronym(element));
    const yLabels = labels.map((element) => putAcronym(element));

    return {
      xLabels,
      yLabels,
      heatmapData: dataPoints,
      labels, // για tooltip
    };
  }, [jaccard_indices]);

  const option = {
    tooltip: {
      position: 'top',
      formatter: (parameters: { value: [number, number, number] }) =>
        `<b>${labels[parameters.value[1]]}</b> - <b>${labels[parameters.value[0]]}</b>:<br/> ${parameters.value[2]}`,
    },
    grid: {
      height: '75%',
      top: '5%',
    },
    xAxis: {
      type: 'category',
      data: xLabels,
      splitArea: { show: true },
      axisLabel: {
        rotate: 45,
        fontSize: Math.max(10, Math.min(18, 500 / labels.length)),
        overflow: 'truncate',
        interval: 0,
        formatter: (value: string) => value.length > 5 ? value.slice(0, 5) + '…' : value
      },
    },
    yAxis: {
      type: 'category',
      data: yLabels,
      splitArea: { show: true },
      axisLabel: {
        fontSize: Math.max(10, Math.min(18, 500 / labels.length)),
        overflow: 'truncate'
      },
    },
    visualMap: {
      show: false,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      bottom: 20,
      itemGap: 5,
      itemWidth: 20,
      itemHeight: 14,
      textStyle: {
        fontSize: 16,
      },
      pieces: [
        { min: 1, max: 1, color: '#000' },
        { min: 0.1, max: 0.9999, color: '#196127' },
        { min: 0.05, max: 0.0999, color: '#239a3b' },
        { min: 0.01, max: 0.0499, color: '#7bc96f' },
        { min: 0.005, max: 0.0099, color: '#c6e48b' },
        { min: 0.001, max: 0.0049, color: '#ebf4c7' },
        { min: 0.0001, max: 0.000_99, color: '#defde0' },
        { min: 0, max: 0.0001, color: '#f0fff4' },
      ],
    },
    series: [
      {
        name: 'Jaccard',
        type: 'heatmap',
        data: heatmapData,
        label: { show: false },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 0.5,
        },
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
        },
        gridSize: 12,
        square: true,
      },
    ],
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: { xs: 'auto', md: 700 },
        flex: 1,
        padding: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h5" gutterBottom marginBottom={2}>
          Jaccard Similarity
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="k-length"> K Length </InputLabel>
          <Select
            labelId="k-length"
            value={K}
            onChange={(event_) => {
              const newValue = Number(event_.target.value);
              if (newValue >= 15) {
                setWarningOpen(true);
              }
              setK(newValue);
            }}
            displayEmpty
            label="K Length"
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {Array.from({ length: 7 }, (_, index_) => index_ + 11).map((value) =>
              value >= 15 ? (
                <Tooltip title="May cause loading delay" key={value}>
                  <span>
                    <MenuItem key={value} value={value} disabled>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {value}
                        <WarningAmberIcon color="warning" sx={{ ml: 1, fontSize: 18 }} />
                      </Box>
                    </MenuItem>
                  </span>
                </Tooltip>
              ) : (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ),
            )}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: '100%', height: { xs: 300, md: 500 }, flex: 1 }} position="relative">
        {isFetching && (
          <Box
            position={'absolute'}
            sx={{
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1,
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress
              size={50}
              sx={{
                color: 'primary.main',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Box>
        )}
        {error && (
          <Box
            width={'100%'}
            height={'100%'}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 1 }}
            gap={2}
          >
            <WarningAmber color="error" sx={{ fontSize: 48 }} />
            <Typography variant="h6" color="error">
              {error.message}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Please try again later.
            </Typography>
          </Box>
        )}
        {data && <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />}
      </Box>
      <Dialog open={warningOpen} onClose={() => setWarningOpen(false)}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>Selecting a K length of 15 or more may cause loading delays.</DialogContent>
        <DialogActions>
          <Button onClick={() => setWarningOpen(false)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
