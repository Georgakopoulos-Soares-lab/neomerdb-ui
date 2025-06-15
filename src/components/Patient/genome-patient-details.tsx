import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import type { GPatient } from '../../types/patients';

const GenomePatientDetails = ({ patient }: { patient: GPatient }) => {
  return (
    <Card elevation={3}>
      <CardHeader
        title="Patient Basic Information"
        subheader="Details of the selected patient"
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
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
            direction={'column'}
            container
            spacing={2}
          >
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Donor UID
              </Typography>
              <Typography variant="body1">{patient.donor_unique_id}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                ICGC Donor UID
              </Typography>
              <Typography variant="body1">{patient.icgc_donor_id}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Sex
              </Typography>
              <Typography variant="body1">
                {patient.donor_sex.charAt(0).toUpperCase() + patient.donor_sex.slice(1)}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Age at Diagnosis
              </Typography>
              <Typography variant="body1">{patient.donor_age_at_diagnosis}</Typography>
            </Grid>
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
            direction={'column'}
            container
            spacing={2}
          >
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                First Therapy Type
              </Typography>
              <Typography variant="body1">{patient.first_therapy_type}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Tobacco Smoking History Indicator
              </Typography>
              <Typography variant="body1">{patient.tobacco_smoking_history_indicator}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Alcohol History
              </Typography>
              <Typography variant="body1">{patient.alcohol_history}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Alcohol History Intensity
              </Typography>
              <Typography variant="body1">{patient.alcohol_history_intensity}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GenomePatientDetails;
