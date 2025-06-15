import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { usePatientNeomers } from '../../hooks/use-patients';

import GenomePatientNeomers from './genome-patient-neomers';
import ExomePatientNeomers from './exome-patient-neomers';

interface PatientNeomersProperties {
  id: string;
  tab: 'genome' | 'exomes';
}

const PatientNeomers = ({ id, tab }: PatientNeomersProperties) => {
  const [neomerProperties, setNeomerProperties] = useState({
    length: 15,
    topK: 10,
    prefix: '',
  });

  const [selectedNeomer, setSelectedNeomer] = useState<string | undefined>();

  const { length, topK, prefix } = neomerProperties;

  const { data: neomersData, isFetching: isNeomersLoading } = usePatientNeomers(
    id,
    length,
    topK,
    tab,
    prefix,
    () => {
      setSelectedNeomer(undefined);
    },
  );

  const handleRowClick = (neomer: string) => {
    setSelectedNeomer(neomer);
  };

  const { neomers } = neomersData || { neomers: [] };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }} direction={'column'}>
        <Card elevation={3} style={{ height: '100%' }}>
          <CardHeader
            title="Patient Neomers"
            subheader={`Details for patient ID: ${id}`}
            slotProps={{
              title: {
                variant: 'h5',
              },
              subheader: {
                variant: 'subtitle1',
              },
            }}
            style={{ backgroundColor: '#f5f5f5' }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="length-select-label">Neomer Length</InputLabel>
                  <Select
                    labelId="length-select-label"
                    id="length-select"
                    value={neomerProperties.length}
                    label="Neomer Length"
                    onChange={(event) =>
                      setNeomerProperties((previous) => ({
                        ...previous,
                        length: event.target.value as number,
                      }))
                    }
                  >
                    {Array.from({ length: 7 }, (_, index) => index + 11).map((length_) => (
                      <MenuItem key={length_} value={length_}>
                        {length_}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  id="top-n-results"
                  value={neomerProperties.topK}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === '' || /^\d+$/.test(value)) {
                      setNeomerProperties((previous) => ({
                        ...previous,
                        topK: Number(value),
                      }));
                    }
                  }}
                  fullWidth
                  label="Top N Results"
                  type="number"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                    htmlInput: {
                      inputMode: 'numeric',
                      min: 1,
                      max: 100,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  size="small"
                  id="neomer-prefix"
                  value={neomerProperties.prefix}
                  onChange={(event) =>
                    setNeomerProperties((previous) => ({
                      ...previous,
                      prefix: event.target.value,
                    }))
                  }
                  fullWidth
                  label="Neomer Prefix"
                  placeholder="Enter neomer prefix"
                />
              </Grid>
            </Grid>
            <Grid size={{ xs: 12 }} minHeight={300} marginTop={4} position={'relative'}>
              {isNeomersLoading ? (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <CircularProgress
                    sx={{ width: '100%' }}
                    color="primary"
                    variant="indeterminate"
                    size={40}
                  />
                </Box>
              ) : (
                <TableContainer sx={{ maxHeight: 400 }}>
                  <Table
                    stickyHeader
                    size="small"
                    aria-label="patient neomers table"
                    sx={{
                      '& thead th': {
                        fontWeight: 'bold',
                      },
                      '& tbody tr:hover': {
                        backgroundColor: '#f1f1f1',
                      },
                      '& td, & th': {
                        whiteSpace: 'nowrap',
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Neomer</TableCell>
                        <TableCell>Count</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!neomers && (
                        <TableRow>
                          <TableCell colSpan={2} align="center">
                            No neomers found for the selected criteria.
                          </TableCell>
                        </TableRow>
                      )}
                      {neomers?.map((neomer) => (
                        <TableRow
                          key={neomer.neomer}
                          onClick={() => handleRowClick(neomer.neomer)}
                          sx={{
                            cursor: 'pointer',
                            backgroundColor:
                              selectedNeomer === neomer.neomer ? '#e0f7fa' : 'inherit',
                            '&:hover': {
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            },
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                              {neomer.neomer}
                            </Box>
                          </TableCell>
                          <TableCell>{neomer.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }} direction={'column'}>
        <Card elevation={3} style={{ height: '100%' }}>
          <CardHeader
            title="Analyze Neomers"
            subheader={
              selectedNeomer
                ? `Analysis for neomer: ${selectedNeomer}`
                : 'Select a neomer to analyze'
            }
            slotProps={{
              title: {
                variant: 'h5',
              },
              subheader: {
                variant: 'subtitle1',
              },
            }}
            style={{ backgroundColor: '#f5f5f5' }}
          />
          <CardContent
            style={{
              position: 'relative',
              height: '100%',
            }}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  size="small"
                  id="selected-neomer"
                  value={selectedNeomer || ''}
                  onClick={() => {
                    if (selectedNeomer) {
                      navigator.clipboard.writeText(selectedNeomer);
                      alert(`Copied ${selectedNeomer} to clipboard!`);
                    }
                  }}
                  style={{
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  fullWidth
                  label="Selected Neomer"
                  placeholder="Select or enter a neomer"
                  slotProps={{ input: { readOnly: true } }}
                />
              </Grid>

              {tab === 'genome' && <GenomePatientNeomers neomer={selectedNeomer} />}
              {tab === 'exomes' && <ExomePatientNeomers neomer={selectedNeomer} />}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PatientNeomers;
