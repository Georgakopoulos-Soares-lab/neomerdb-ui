import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import type { EPatient } from '../../types/patients';

const ExomePatientDetails = ({ patient }: { patient: EPatient }) => {
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
                Bcr Patient Uuid
              </Typography>
              <Typography variant="body1">{patient.bcr_patient_uuid || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Bcr Patient Barcode
              </Typography>
              <Typography variant="body1">{patient.bcr_patient_barcode || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Sex
              </Typography>
              <Typography variant="body1">
                {(patient.gender && patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)) || 'N/A'}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Race
              </Typography>
              <Typography variant="body1">{patient.race || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Ethnicity
              </Typography>
              <Typography variant="body1">{patient.ethnicity || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Vital Status
              </Typography>
              <Typography variant="body1">{patient.vital_status || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Days To Birth
              </Typography>
              <Typography variant="body1">{patient.days_to_birth || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Days To Death
              </Typography>
              <Typography variant="body1">{patient.days_to_death || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Days To Last Followup
              </Typography>
              <Typography variant="body1">{patient.days_to_last_followup || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Prior Dx
              </Typography>
              <Typography variant="body1">{patient.prior_dx || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                History Of Neoadjuvant Treatment
              </Typography>
              <Typography variant="body1">{patient.history_of_neoadjuvant_treatment || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Radiation Therapy
              </Typography>
              <Typography variant="body1">{patient.radiation_therapy || 'N/A'}</Typography>
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
                ICD 10
              </Typography>
              <Typography variant="body1">{patient.icd_10 || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Clinical Stage
              </Typography>
              <Typography variant="body1">{patient.clinical_stage || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Clinical T
              </Typography>
              <Typography variant="body1">{patient.clinical_T || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Clinical N
              </Typography>
              <Typography variant="body1">{patient.clinical_N || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Pathologic Stage
              </Typography>
              <Typography variant="body1">{patient.pathologic_stage || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Pathologic T
              </Typography>
              <Typography variant="body1">{patient.pathologic_T || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Pathologic N
              </Typography>
              <Typography variant="body1">{patient.pathologic_N || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Person Neoplasm Cancer Status
              </Typography>
              <Typography variant="body1">{patient.person_neoplasm_cancer_status || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Tissue Prospective Collection Indicator
              </Typography>
              <Typography variant="body1">
                {patient.tissue_prospective_collection_indicator || 'N/A'}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Tissue Retrospective Collection Indicator
              </Typography>
              <Typography variant="body1">
                {patient.tissue_retrospective_collection_indicator || 'N/A'}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Tumor Tissue Site
              </Typography>
              <Typography variant="body1">{patient.tumor_tissue_site || 'N/A'}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Year Of Initial Pathologic Diagnosis
              </Typography>
              <Typography variant="body1">
                {patient.year_of_initial_pathologic_diagnosis || 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ExomePatientDetails;
