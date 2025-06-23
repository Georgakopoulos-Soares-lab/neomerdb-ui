import { useState } from 'react';

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
} from '@mui/material';
import NullomersValuesDiagram from '../../components/Visualazations/nullomers-values';
import SankeyDiagrams from '../../components/Visualazations/sankey-diagrams';

const AboutPage = () => {
  const [expanded, setExpanded] = useState(false);

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

        <Box
          component="img"
          src="/images/neomer-algorithm.jpeg"
          alt="Neomer Algorithm"
          onClick={() => setExpanded(true)}
          sx={{
            display: 'block',
            mx: 'auto',
            width: '70%',
            maxWidth: '500px',
            height: 'auto',

            my: 5,
            borderRadius: 2,
            boxShadow: 3,
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
          }}
        />

        <Typography variant="body1" align="justify" sx={{ mt: 2 }}>
          The database aggregates neomer sequences derived from over 10,000 tumor-matched Whole
          Exome Sequencing (WES) and 2,775 Whole Genome Sequencing (WGS) samples across multiple
          cancer types and organs. To ensure high precision, NeomerDB integrates extensive germline
          data from more than 76,000 whole genomes and 730,000 exomes representing diverse global
          populations. This large-scale comparison enables the exclusion of sequences originating
          from germline variation, thereby refining the specificity and reliability of detected
          neomers.
        </Typography>

        <NullomersValuesDiagram />

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

        <SankeyDiagrams />

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
