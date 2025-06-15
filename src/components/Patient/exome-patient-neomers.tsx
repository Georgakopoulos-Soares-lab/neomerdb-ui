import {
  Box,
  CircularProgress,
  Grid,
  Link,
  Typography,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  TableHead,
} from '@mui/material';
import { useNeomerAnalysis } from '../../hooks/use-patients';
import { useState } from 'react';

import type { ExomeAnalysisResponse } from '../../types/nullomers';
import NeomerChart from './neomer-genome-chart';

interface ExomePatientNeomerProperties {
  neomer: string | undefined;
}

const ExomePatientNeomers = ({ neomer }: ExomePatientNeomerProperties) => {
  const { data, isFetching } = useNeomerAnalysis(neomer, 'exomes');

  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>();
  const open = Boolean(anchorElement);

  if (isFetching) {
    return (
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
    );
  }

  if (!data || !data.analysis) return;

  const { analysis } = data as ExomeAnalysisResponse;

  const { cancerBreakdown = [], organBreakdown = [], distinctDonorIDs = [] } = analysis || {};

  const distinctDonors = distinctDonorIDs.length;
  const distinctOrgans = organBreakdown.length;
  const distinctCancerTypes = cancerBreakdown.length;
  const totalNeomers = cancerBreakdown.reduce((sum, item) => sum + (item.count || 0), 0);

  return (
    <>
      <Grid size={{ xs: 12, sm: 6 }} direction={'column'}>
        <Typography variant="subtitle2" color="textSecondary">
          Total Neomers
        </Typography>
        <Typography variant="body1" fontWeight={700}>
          {totalNeomers}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }} direction={'column'}>
        <Typography variant="subtitle2" color="textSecondary">
          Distinct Donors
        </Typography>
        {distinctDonors > 0 ? (
          <>
            <Typography
              component={Link}
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              variant="body1"
              fontWeight={700}
              onClick={(event) => setAnchorElement(event.currentTarget)}
            >
              {distinctDonors}
            </Typography>
            <Popover
              open={open}
              anchorEl={anchorElement}
              onClose={() => setAnchorElement(undefined)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              disableRestoreFocus
            >
              <TableContainer component={Paper} sx={{ minWidth: 400, maxHeight: 300 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'primary.light' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Donor ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {distinctDonorIDs.map((donorId, index) => (
                      <TableRow
                        key={index}
                        hover
                        sx={{
                          '&:hover': { backgroundColor: 'primary' },
                          cursor: 'pointer',
                        }}
                        onClick={() => (globalThis.location.href = `/patient/${donorId}?tab=exome`)}
                      >
                        <TableCell
                          sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
                        >
                          {donorId}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Popover>
          </>
        ) : (
          <Typography variant="body1" fontWeight={700}>
            {distinctDonors}
          </Typography>
        )}
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }} direction={'column'}>
        <Typography variant="subtitle2" color="textSecondary">
          Distinct Cancer Types
        </Typography>
        <Typography variant="body1" fontWeight={700}>
          {distinctCancerTypes}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }} direction={'column'}>
        <Typography variant="subtitle2" color="textSecondary">
          Distinct Organs
        </Typography>
        <Typography variant="body1" fontWeight={700}>
          {distinctOrgans}
        </Typography>
      </Grid>
      <Grid container flex={1} size={{ xs: 12 }} spacing={2}>
        <Grid size={12}>
          <Typography variant="body1" fontWeight={700} gutterBottom>
            Cancer Types and Organs Distribution
          </Typography>
        </Grid>
        <Grid size={12} flex={1}>
          <NeomerChart cancerBreakdown={cancerBreakdown} organBreakdown={organBreakdown} />
        </Grid>
      </Grid>
    </>
  );
};

export default ExomePatientNeomers;
