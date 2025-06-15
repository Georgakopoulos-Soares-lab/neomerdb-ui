import {
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
  Container,
  Grid,
  CardHeader,
  Box,
  IconButton,
} from '@mui/material';
import { useParams, useSearch } from '@tanstack/react-router';
import { usePatientDetails } from '../../hooks/use-patients';
import PatientNeomers from '../../components/Patient/patient-neomers';
import { predictPatient } from '../../helpers';
import { useMemo } from 'react';
import GenomePatientDetails from '../../components/Patient/genome-patient-details';
import type { EPatient, GPatient } from '../../types/patients';
import ExomePatientDetails from '../../components/Patient/exome-patient-details';
import { Link } from '@mui/icons-material';

const returnTab = (patientId: string, urlTab: string | undefined): 'genome' | 'exomes' => {
  if (urlTab === 'genome' || urlTab === 'exomes') {
    return urlTab;
  }

  return predictPatient(patientId) || 'genome';
};

const PatientDetails = () => {
  const { patientId } = useParams({
    from: '/patient/$patientId',
    strict: true,
  });

  const urlTab = useSearch({ strict: false }).tab;
  const tab = useMemo(() => returnTab(patientId, urlTab), [patientId, urlTab]);

  const isGenomeTab = useMemo(() => tab === 'genome', [tab]);
  const isExomeTab = useMemo(() => tab === 'exomes', [tab]);

  const { data, isLoading, error } = usePatientDetails(patientId);

  if (!patientId) {
    return (
      <Container maxWidth="lg" style={{ marginTop: 4 }}>
        <Typography variant="h4" textAlign={'center'} gutterBottom>
          Patient ID is required
        </Typography>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container maxWidth="lg" style={{ marginTop: 4 }}>
        <Typography variant="h4" textAlign={'center'} gutterBottom>
          Loading patient details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" style={{ marginTop: 4 }}>
        <Typography variant="h4" textAlign={'center'} gutterBottom>
          Error loading patient details: {error.message}
        </Typography>
      </Container>
    );
  }

  if (!data || !data.patient) {
    return (
      <Container maxWidth="lg" style={{ marginTop: 4 }}>
        <Typography variant="h4" textAlign={'center'} gutterBottom>
          No patient details found for ID: {patientId}
        </Typography>
      </Container>
    );
  }

  const copyLinkToClipboard = () => {
    const link = `${globalThis.location.origin}/patient/${patientId}?tab=${tab}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((error_) => {
        console.error('Failed to copy link:', error_);
        alert('Failed to copy link. Please try again.');
      });
  };

  const { patient } = data || {};

  return (
    <Container maxWidth="lg" style={{ marginTop: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>
          Patient Details
        </Typography>
        <IconButton onClick={copyLinkToClipboard} aria-label="Copy link to clipboard">
          <Link color="primary" />
        </IconButton>
      </Box>

      {isGenomeTab && <GenomePatientDetails patient={patient as GPatient} />}
      {isExomeTab && <ExomePatientDetails patient={patient as EPatient} />}

      <Divider style={{ margin: '20px 0' }} />
      <Card elevation={3}>
        <CardHeader
          title="Patient Clinical Information"
          subheader="Clinical details of the selected patient"
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
            <Grid size={{ xs: 12, sm: 6 }} direction={'column'} container spacing={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Cancer Type
              </Typography>
              <Chip
                label={patient.Cancer_Type}
                variant="outlined"
                size="small"
                sx={{ fontSize: '0.75rem', height: '24px', px: 1, width: 'fit-content' }}
              />
            </Grid>

            <Grid
              size={{ xs: 12, sm: 6 }}
              direction={'column'}
              container
              spacing={2}
              textAlign={'center'}
            >
              <Typography variant="subtitle2" color="textSecondary">
                Cancer Type Subtype
              </Typography>
              <Typography variant="body1">{patient.Organ}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Divider style={{ margin: '20px 0' }} />
      <PatientNeomers id={patientId} tab={tab} />
    </Container>
  );
};

export default PatientDetails;
