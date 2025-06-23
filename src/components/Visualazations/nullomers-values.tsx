import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { ABOUT_US_DIAGRAM_GENOMES_VALUES, ABOUT_US_DIAGRAM_EXOMES_VALUES } from '../../constants';
import { Box, Tab, Tabs } from '@mui/material';

const NullomersValuesDiagram = () => {
  const [tabValue, setTabValue] = useState('genomes');

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const DIAGRAM_VALUES =
    tabValue === 'genomes' ? ABOUT_US_DIAGRAM_GENOMES_VALUES : ABOUT_US_DIAGRAM_EXOMES_VALUES;

  const total = Object.values(DIAGRAM_VALUES).reduce((sum, value) => sum + value, 0);

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}',
    },
    labelLine: {
      show: true,
      length: 10,
      length2: 10,
    },

    legend: {
      show: true,
      orient: 'horizontal',
      bottom: 0,
      type: 'scroll',
      textStyle: {
        fontSize: 10,
      },
    },
    series: [
      {
        name: 'Distribution',
        type: 'pie',

        radius: ['0%', '70%'],
        center: ['50%', '50%'],
        data: Object.entries(DIAGRAM_VALUES).map(([name, value]) => ({
          name,
          value,
        })),
        label: {
          show: true,
          formatter: function (parameters: { name: string; value: number }) {
            const percent = ((parameters.value / total) * 100).toFixed(2);
            return `${parameters.name}: ${percent}%`;
          },
          fontSize: 20,
        },

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <Box sx={{ my: 6, height: '600px', position: 'relative' }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        sx={{
          backgroundColor: '#f0f4ff',
          borderRadius: '12px',
          width: 'fit-content',
          mx: 'auto',
        }}
      >
        <Tab
          label="Genomes"
          value="genomes"
          sx={{
            fontWeight: 'bold',
            color: tabValue === 'genomes' ? '#fff !important' : 'inherit',
            backgroundColor: tabValue === 'genomes' ? 'primary.main' : 'transparent',
            borderRadius: '12px 0 0 12px',
            minWidth: 120,
          }}
        />
        <Tab
          label="Exomes"
          value="exomes"
          sx={{
            fontWeight: 'bold',
            color: tabValue === 'exomes' ? '#fff !important' : 'inherit',
            backgroundColor: tabValue === 'exomes' ? 'primary.main' : 'transparent',
            borderRadius: '0 12px 12px 0',
            minWidth: 120,
          }}
        />
      </Tabs>

      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </Box>
  );
};

export default NullomersValuesDiagram;
