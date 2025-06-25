import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

const SankeyDiagrams = () => {
  const [tabValue, setTabValue] = useState('genomes');

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Typography variant="h5" gutterBottom>
          Sankey Diagrams
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '80%', height: '100%' }}>
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
        </Box>
      </Box>
      <Box sx={{ width: '80%', marginTop: 4 }}>
        <Box
          component={'img'}
          src={`/images/${tabValue === 'genomes' ? 'sankey-genome.png' : 'sankey-exome.png'}`}
          alt={`Sankey Diagram for ${tabValue}`}
          sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
        />
      </Box>
    </Box>
  );
};

export default SankeyDiagrams;
