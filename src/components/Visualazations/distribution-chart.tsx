import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  type SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import ReactECharts from 'echarts-for-react';
import {
  useDistributionNeomerKData,
  useOrgansAndCancerTypes,
} from '../../hooks/use-visualazations';
import { useCallback, useMemo, useState } from 'react';
import { WarningAmber } from '@mui/icons-material';

export const DistributionChart = () => {
  const [organsResult, cancerTypesResult] = useOrgansAndCancerTypes();

  const organs = useMemo(() => organsResult.data?.organs || [], [organsResult.data?.organs]);
  const cancerTypes = useMemo(
    () => cancerTypesResult.data?.cancerTypes || [],
    [cancerTypesResult.data?.cancerTypes],
  );

  const [groupBy, setGroupBy] = useState<'organ' | 'cancerType'>('organ');
  const [selectedValue, setSelectedValue] = useState(organs[0] || cancerTypes[0] || '');
  const [K, setK] = useState<number>(13);

  const {
    data: distributionData,
    isFetching: isDistributionFetching,
    error: distributionError,
  } = useDistributionNeomerKData(K, groupBy, selectedValue);

  const { distribution } = distributionData || {};

  const handleGroupByChange = useCallback(
    (event: SelectChangeEvent) => {
      setGroupBy(event.target.value as 'organ' | 'cancerType');
      setSelectedValue(event.target.value === 'organ' ? organs[0] : cancerTypes[0]);
    },
    [organs, cancerTypes],
  );

  const renderFormControl = () => {
    if (groupBy === 'organ') {
      return (
        <FormControl fullWidth size="small">
          <InputLabel id="organ-label">Organ</InputLabel>
          <Select
            labelId="organ-label"
            value={selectedValue || organs[0] || ''}
            onChange={(event) => setSelectedValue(event.target.value)}
            label="Organ"
          >
            {organs.map((organ) => (
              <MenuItem key={organ} value={organ}>
                {organ}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
    if (groupBy === 'cancerType') {
      return (
        <FormControl fullWidth size="small">
          <InputLabel id="cancer-type-label">Cancer Type</InputLabel>
          <Select
            labelId="cancer-type-label"
            value={selectedValue || cancerTypes[0] || ''}
            onChange={(event) => setSelectedValue(event.target.value)}
            label="Cancer Type"
          >
            {cancerTypes.map((cancerType) => (
              <MenuItem key={cancerType} value={cancerType}>
                {cancerType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 600,
        flex: 1,
        padding: 2,
      }}
    >
      <Typography variant="h5" gutterBottom marginBottom={2}>
        Distribution of Neomers by Organ and Cancer Type
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }} mb={2} gap={2}>
        <ToggleButtonGroup
          value={groupBy}
          exclusive
          onChange={(_, newValue) => {
            if (newValue !== null) {
              handleGroupByChange({ target: { value: newValue } } as SelectChangeEvent);
            }
          }}
          color="primary"
          sx={{
            backgroundColor: '#e9efff',
            borderRadius: '999px',
            padding: '4px',
            '& .MuiToggleButton-root': {
              border: 'none',
              borderRadius: '999px',
              textTransform: 'none',
              fontWeight: 600,
              padding: '6px 18px',
              color: '#3a3a3a',
              '&.Mui-selected': {
                backgroundColor: '#2a51d6',
                color: '#fff',
                boxShadow: '0 2px 6px rgba(42, 81, 214, 0.35)',
              },

              '&:hover': {
                backgroundColor: '#d9e3ff',
              },
            },
          }}
        >
          <ToggleButton value="organ">Organs</ToggleButton>
          <ToggleButton value="cancerType">Cancer Types</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        {renderFormControl()}
        <FormControl fullWidth size="small">
          <InputLabel id="k-length-label">K Length</InputLabel>
          <Select
            labelId="k-length-label"
            value={K}
            onChange={(event) => setK(Number(event.target.value))}
            label="K Length"
          >
            {Array.from({ length: 6 }, (_, index) => index + 11).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {isDistributionFetching && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
            position={'relative'}
          >
            <CircularProgress
              size={50}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Box>
        )}
        {distribution && distribution.length > 0 && (
          <>
            <Typography variant="subtitle2" textAlign="center" mb={1}>
              Number of Nullomers per Donor Count
            </Typography>
            <Box sx={{ height: 400 }}>
              <ReactECharts
                option={{
                  tooltip: {
                    trigger: 'item',
                    formatter: '{b} donors: {c} nullomers',
                  },
                  grid: {
                    top: 30,
                    bottom: 60,
                    left: 60,
                    right: 30,
                  },
                  xAxis: {
                    type: 'category',
                    data: distribution.map((d) => d.donorCount.toString()),
                    name: 'Donor Count',
                    nameLocation: 'middle',
                    nameGap: 30,
                    nameTextStyle: {
                      fontSize: 16,
                      color: '#000',
                    },
                    axisLabel: {
                      rotate: 0,
                      fontSize: 16,
                      color: '#000',
                    },
                  },
                  yAxis: {
                    type: 'log',
                    logBase: 10,
                    name: 'Num Nullomers',
                    nameTextStyle: {
                      fontSize: 16,
                      color: '#000',
                    },
                    axisLabel: {
                      fontSize: 16,
                      color: '#000',
                    },
                    splitLine: {
                      lineStyle: {
                        type: 'dashed',
                        color: '#eee',
                      },
                    },
                  },
                  series: [
                    {
                      type: 'bar',
                      data: distribution.map((d) => d.numNullomers),
                      itemStyle: {
                        borderRadius: [4, 4, 0, 0],
                        color: {
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [
                            { offset: 0, color: '#82b1ff' },
                            { offset: 1, color: '#2962ff' },
                          ],
                        },
                      },
                      barWidth: '60%',
                      name: 'Nullomers',
                    },
                  ],
                }}
                style={{ height: '100%', width: '100%' }}
              />
            </Box>
          </>
        )}
        {!distribution?.length && !isDistributionFetching && !distributionError && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Typography variant="h6" color="textSecondary">
              No data available for the selected options.
            </Typography>
          </Box>
        )}
        {!!distributionError && (
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
              {distributionError.message}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Please try again later.
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
