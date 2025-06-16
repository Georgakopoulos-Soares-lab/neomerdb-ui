import { Container, Grid, Typography } from '@mui/material';
import { CancerTypeLengthPie } from '../../components/Visualazations/neomers-by-cancer-type-length';
import { JaccardChart } from '../../components/Visualazations/jaccard-chart';
import { DistributionChart } from '../../components/Visualazations/distribution-chart';

const Visualazations = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: 4, display: 'flex' }}>
      <Grid container spacing={3} flex={1} display={'flex'} flexDirection={'column'}>
        <Grid>
          <Typography variant="h4" textAlign={'center'} gutterBottom>
            Visualizations
          </Typography>
        </Grid>
        <Grid flex={1}>
          <CancerTypeLengthPie />
        </Grid>
        <Grid flex={1}>
          <JaccardChart />
        </Grid>
        <Grid flex={1}>
          <DistributionChart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Visualazations;
