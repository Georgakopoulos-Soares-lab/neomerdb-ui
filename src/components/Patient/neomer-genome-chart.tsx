import { Box } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ReactECharts from 'echarts-for-react';
import type { CancerBreakdownItem, OrganBreakdownItem } from '../../types/nullomers';

interface NeomerChartProperties {
  cancerBreakdown: CancerBreakdownItem[];
  organBreakdown: OrganBreakdownItem[];
}

const PRIMARY_SHADES = ['#4079fe', '#6694fe', '#8caffe', '#a0bcff', '#c6d7ff'];
const SECONDARY_SHADES = ['#c31a70', '#cf488d', '#db76a9', '#e7a3c6', '#f3d1e2'];

const buildPieSeries = (cBreakdown: CancerBreakdownItem[], oBreakDown: OrganBreakdownItem[]) => {
  const innerData: { name: string; value: number; itemStyle: { color: string } }[] = [];
  const outerData: { name: string; value: number; itemStyle: { color: string } }[] = [];

  let organColorIndex = 0;
  let cancerColorIndex = 0;

  for (const organ of oBreakDown) {
    innerData.push({
      name: organ.organ,
      value: organ.count,
      itemStyle: {
        color: PRIMARY_SHADES[organColorIndex % PRIMARY_SHADES.length],
      },
    });
    organColorIndex++;
  }

  for (const cancer of cBreakdown) {
    outerData.push({
      name: cancer.cancerType,
      value: cancer.count,
      itemStyle: {
        color: SECONDARY_SHADES[cancerColorIndex % SECONDARY_SHADES.length],
      },
    });
    cancerColorIndex++;
  }

  return [
    {
      name: 'Organs',
      type: 'pie',
      radius: [0, '40%'],
      selectedMode: false,
      label: {
        position: 'inside',
        fontSize: 10,
      },
      data: innerData,
    },
    {
      name: 'Cancer Types',
      type: 'pie',
      radius: ['50%', '75%'],
      selectedMode: false,
      label: {
        position: 'outside',
        fontSize: 11,
        overflow: 'truncate',
      },
      labelLine: {
        length: 10,
        length2: 10,
      },
      data: outerData,
    },
  ];
};

import { useState } from 'react';

const NeomerChart = ({ cancerBreakdown, organBreakdown }: NeomerChartProperties) => {
  const option = {
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: buildPieSeries(cancerBreakdown, organBreakdown),
    tooltip: {
      trigger: 'item',
      formatter: (parameters: { name?: string; value?: number }) => {
        const name = parameters?.name || '—';
        const value = parameters?.value ?? '—';
        return `<b>${name}</b><br/>Count: ${value}`;
      },
    },
  };

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Box sx={{ position: 'relative', width: '100%', height: '600px' }}>
        <IconButton
          onClick={() => setOpenDialog(true)}
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}
          color="primary"
        >
          <ZoomOutMapIcon />
        </IconButton>
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="xl">
        <DialogTitle>Expanded View</DialogTitle>
        <DialogContent>
          <Box sx={{ width: '100%', height: '80vh' }}>
            <ReactECharts
              option={{
                ...option,
                series: buildPieSeries(cancerBreakdown, organBreakdown),
              }}
              style={{ height: '100%', width: '100%' }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NeomerChart;
