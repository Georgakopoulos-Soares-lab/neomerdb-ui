import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Dialog,
  DialogContent,
  Tabs,
  Tab,
} from '@mui/material';
import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { ABOUT_US_DIAGRAM_GENOMES_VALUES, ABOUT_US_DIAGRAM_EXOMES_VALUES } from '../../constants';

const AboutPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [tabValue, setTabValue] = useState('genomes');

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const DIAGRAM_VALUES =
    tabValue === 'genomes' ? ABOUT_US_DIAGRAM_GENOMES_VALUES : ABOUT_US_DIAGRAM_EXOMES_VALUES;

  const total = Object.values(DIAGRAM_VALUES).reduce((sum, value) => sum + value, 0);

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 6, mt: 2, mb: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center" sx={{ mt: 2 }}>
          About Neomer Data
        </Typography>

        <Typography variant="body1" align="justify" sx={{ mt: 2 }}>
          NeomerDB is the first comprehensive database specifically designed to catalog and analyze
          cancer biomarkers based on k-mers. Nullomers, defined as short nucleotide sequences
          entirely absent from the healthy human genome, serve as a unique class of molecular
          signatures. Neomers, a subclass of these nullomers, are identified within the context of
          cancer, arising in tumor-specific DNA and RNA and offering a promising avenue for
          diagnostics, therapeutic targeting, and immunogenic profiling.
        </Typography>

        <Typography variant="body1" align="justify" sx={{ mt: 2 }}>
          The database aggregates neomer sequences derived from over 10,000 tumor-matched Whole
          Exome Sequencing (WES) and 2,775 Whole Genome Sequencing (WGS) samples across multiple
          cancer types and organs. To ensure high precision, NeomerDB integrates extensive germline
          data from more than 76,000 whole genomes and 730,000 exomes representing diverse global
          populations. This large-scale comparison enables the exclusion of sequences originating
          from germline variation, thereby refining the specificity and reliability of detected
          neomers.
        </Typography>

        <Box
          component="img"
          src="/images/neomer-algorithm.jpeg"
          alt="Neomer Algorithm"
          onClick={() => setExpanded(true)}
          sx={{
            display: 'block',
            mx: 'auto',
            width: '70%',
            maxWidth: '400px',
            height: 'auto',
            mt: { xs: 4, md: 0 },
            mb: 2,
            borderRadius: 2,
            boxShadow: 3,
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
          }}
        />

        <Typography variant="body1" gutterBottom align="justify" sx={{ mt: 2 }}>
          The database includes different filtering options, such as:
        </Typography>
        <List sx={{ pl: 2, mt: 2 }}>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: '24px' }}>
              <Typography variant="body2" fontSize="14px">
                •
              </Typography>
            </ListItemIcon>
            <ListItemText primary="Selection of pan-cancer neomers or neomers associated with specific cancer types or organs." />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: '24px' }}>
              <Typography variant="body2" fontSize="14px">
                •
              </Typography>
            </ListItemIcon>
            <ListItemText primary="Filtering by tumor stage and recurrence threshold." />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: '24px' }}>
              <Typography variant="body2" fontSize="14px">
                •
              </Typography>
            </ListItemIcon>
            <ListItemText primary="Advanced germline variant filtering across different ancestries." />
          </ListItem>
        </List>

        <Box sx={{ mt: 4, height: '600px', position: 'relative' }}>
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

          <ReactECharts
            option={{
              tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}',
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
                    fontSize: 10,
                  },
                  labelLayout: {
                    rotate: true,
                    hideOverlap: true,
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
            }}
            style={{ height: '100%', width: '100%' }}
          />
        </Box>

        <Dialog open={expanded} onClose={() => setExpanded(false)} maxWidth="md" fullWidth>
          <DialogContent sx={{ p: 0 }}>
            <Box
              component="img"
              src="/images/neomer-algorithm.jpeg"
              alt="Neomer Algorithm Enlarged"
              sx={{ width: '100%', height: 'auto' }}
            />
          </DialogContent>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default AboutPage;
