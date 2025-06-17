import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  Box,
  Dialog,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CACHED_DATA } from '../../constants';
import { putAcronym } from '../../helpers';

const getRingSeries = () => {
  const levels = Object.keys(CACHED_DATA).sort((a, b) => Number(b) - Number(a));
  const ringWidth = 3;
  const gap = 5;

  return levels.map((level, index) => {
    const outerRadius = 90 - index * (ringWidth + gap);
    const innerRadius = outerRadius - ringWidth;

    const isOutermost = index === 0;

    return {
      name: `Length ${level}`,
      type: 'pie',
      radius: [`${innerRadius}%`, `${outerRadius}%`],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      label: isOutermost
        ? {
            show: true,
            position: 'outside',
            formatter: (parameters: { name: string }) => {
              const name = parameters.name;
              return putAcronym(name);
            },
            fontSize: 18,
            overflow: 'truncate',
            distanceToLabelLine: 10,
          }
        : { show: false },
      labelLine: isOutermost
        ? {
            show: true,
            length: 10,
            length2: 15,
            smooth: true,
            margin: 8,
            lineStyle: {
              width: 1,
            },
          }
        : { show: false },
      emphasis: { scale: true },
      data: [...CACHED_DATA[Number(level) as keyof typeof CACHED_DATA]]
        .sort((a, b) => a.cancer_type.localeCompare(b.cancer_type))
        .map(({ cancer_type, count }) => ({
          name: cancer_type,
          value: Number(count),
        })),
    };
  });
};

export const CancerTypeLengthPie: React.FC = () => {
  const [, setSelected] = useState<string | null>();
  const [open, setOpen] = useState(false);
  const [dialogSelected, setDialogSelected] = useState<string | null>();

  const handleEvents = {
    click: (parameters: { name: string }) => {
      setSelected(parameters.name);
      if (open) {
        setDialogSelected(parameters.name);
      } else {
        setOpen(true);
        setDialogSelected(undefined);
      }
    },
  };

  const getPieForCancerType = (cancerType: string) => {
    const entries = Object.entries(CACHED_DATA)
      .map(([length, cancers]) => {
        const match = cancers.find((c) => c.cancer_type === cancerType);
        return match ? { length: `Length ${length}`, value: Number(match.count) } : undefined;
      })
      .filter(Boolean) as { length: string; value: number }[];

    return [
      {
        name: cancerType,
        type: 'pie',
        radius: ['30%', '60%'],
        label: {
          show: true,
          formatter: '{b}: {c}',
          fontSize: 18,
        },
        data: entries.map(({ length, value }) => ({
          name: length,
          value,
        })),
      },
    ];
  };

  const option = {
    tooltip: { trigger: 'item' },
    series: getRingSeries(),
  };

  const dialogOption = {
    ...option,
    tooltip: {
      trigger: 'item',
      formatter: (parameters: { name?: string; value?: number }) => {
        const name = parameters?.name || '—';
        const value = parameters?.value ?? '—';
        return `<b>${name}</b><br/>Count: ${value}`;
      },
    },
    legend: {
      show: false,
    },

    series: dialogSelected ? getPieForCancerType(dialogSelected) : getRingSeries(),
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '500px',
        flex: 1,
      }}
    >
      <Typography variant="h5" gutterBottom marginBottom={2}>
        Neomers by Cancer Type & Length
      </Typography>
      <Box sx={{ width: '100%', height: 500, flex: 1 }}>
        <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
          <ReactECharts
            option={option}
            onEvents={handleEvents}
            style={{ width: '100%', height: '100%' }}
          />
          <IconButton onClick={() => setOpen(true)} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <ZoomOutMapIcon color="primary" />
          </IconButton>
        </Box>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
          <Box sx={{ p: 1 }}>
            <Box display="flex" mt={1} justifyContent="space-between" alignItems="center">
              {dialogSelected && (
                <>
                  <IconButton
                    style={{
                      margin: 'auto',
                    }}
                    onClick={() => setDialogSelected(undefined)}
                  >
                    <ArrowBackIcon />
                  </IconButton>

                  <FormControl fullWidth>
                    <InputLabel id="cancer-select-label">Select Cancer Type</InputLabel>
                    <Select
                      size="small"
                      labelId="cancer-select-label"
                      value={dialogSelected || ''}
                      label="Select Cancer Type"
                      onChange={(event_) => setDialogSelected(event_.target.value)}
                    >
                      {[
                        ...new Set(
                          Object.values(CACHED_DATA)
                            .flat()
                            .map((item) => item.cancer_type),
                        ),
                      ]
                        .sort((a, b) => a.localeCompare(b))
                        .map((cancerType) => (
                          <MenuItem key={cancerType} value={cancerType}>
                            {cancerType}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </>
              )}
              <IconButton
                style={dialogSelected ? { margin: 'auto' } : { marginLeft: 'auto' }}
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <ReactECharts
              option={dialogOption}
              onEvents={handleEvents}
              style={{ width: '100%', height: '80vh' }}
            />
          </Box>
        </Dialog>
      </Box>
    </Paper>
  );
};
