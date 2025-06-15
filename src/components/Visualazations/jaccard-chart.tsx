import { Box, Paper, Typography } from '@mui/material';
import { useJaccardIndex } from '../../hooks/use-visualazations';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { putAcronym } from '../../helpers';

export const JaccardChart = () => {
  const { data, isFetching } = useJaccardIndex(13);
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

    console.log('Jaccard Data Points:', dataPoints);

    const xLabels = labels.map((element) => putAcronym(element));
    const yLabels = labels.map((element) => putAcronym(element));

    return {
      xLabels,
      yLabels,
      heatmapData: dataPoints,
      labels, // για tooltip
    };
  }, [jaccard_indices]);

  if (isFetching) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flex: 1,
        }}
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  const option = {
    tooltip: {
      position: 'top',
      formatter: (parameters: { value: [number, number, number] }) =>
        `<b>${labels[parameters.value[1]]}</b> - <b>${labels[parameters.value[0]]}</b>:<br/> ${parameters.value[2]}`,
    },
    grid: {
      height: '75%',
      top: '10%',
    },
    xAxis: {
      type: 'category',
      data: xLabels,
      splitArea: { show: true },
      axisLabel: { rotate: 45, fontFamily: 'Poppins' },
    },
    yAxis: {
      type: 'category',
      data: yLabels,
      splitArea: { show: true },
      axisLabel: { fontFamily: 'Poppins' },
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
        fontSize: 12,
        fontFamily: 'Poppins',
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
        gridSize: 8,
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
        height: 800,
        flex: 1,
        padding: 2,
      }}
    >
      <Typography variant="h5" gutterBottom marginBottom={2}>
        Jaccard Similarity
      </Typography>
      <Box sx={{ width: '100%', height: 800, flex: 1 }}>
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </Box>
    </Paper>
  );
};
