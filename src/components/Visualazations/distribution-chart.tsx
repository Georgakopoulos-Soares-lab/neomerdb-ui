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
} from '@mui/material';
import ReactECharts from 'echarts-for-react';
import {
  useDistributionNeomerKData,
  useOrgansAndCancerTypes,
} from '../../hooks/use-visualazations';
import { useCallback, useMemo, useState } from 'react';

export const DistributionChart = () => {
  const [organsResult, cancerTypesResult] = useOrgansAndCancerTypes();

  const organs = useMemo(() => organsResult.data?.organs || [], [organsResult.data?.organs]);
  const cancerTypes = useMemo(
    () => cancerTypesResult.data?.cancerTypes || [],
    [cancerTypesResult.data?.cancerTypes],
  );

  const [groupBy, setGroupBy] = useState<'organ' | 'cancerType'>('organ');
  const [selectedValue, setSelectedValue] = useState('');
  const [K, setK] = useState<number>(13);

  const { data: distributionData, isFetching: isDistributionFetching } = useDistributionNeomerKData(
    K,
    groupBy,
    selectedValue,
  );

  console.log('Distribution Data:', distributionData);

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} mb={2} gap={2}>
        <FormControl fullWidth size="small">
          <InputLabel id="group-by-label">Group By</InputLabel>
          <Select
            labelId="group-by-label"
            value={groupBy}
            onChange={handleGroupByChange}
            label="Group By"
          >
            <MenuItem value="organ">Organ</MenuItem>
            <MenuItem value="cancerType">Cancer Type</MenuItem>
          </Select>
        </FormControl>
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
        {!isDistributionFetching && distribution && distribution.length > 0 && (
          <Box sx={{ height: 400 }}>
            <ReactECharts
              option={{
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow',
                  },
                },
                xAxis: {
                  type: 'category',
                  data: distribution.map((d) => d.donorCount.toString()),
                  name: 'Donor Count',
                  nameLocation: 'middle',
                  nameGap: 30,
                  axisLabel: {
                    rotate: 0,
                  },
                },
                yAxis: {
                  type: 'value',
                  name: 'Num Nullomers',
                },
                series: [
                  {
                    type: 'bar',
                    data: distribution.map((d) => d.numNullomers),
                    itemStyle: {
                      color: '#4079FE',
                    },
                    name: 'Nullomers',
                  },
                ],
              }}
              style={{ height: '100%', width: '100%' }}
            />
          </Box>
        )}{' '}
        {(!isDistributionFetching && !distribution) ||
          (distribution && distribution.length === 0 && (
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
          ))}
      </Box>
    </Paper>
  );
};
