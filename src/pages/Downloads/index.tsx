import { useState } from 'react';
import {
  Button,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
  Paper,
  useTheme,
  Container,
} from '@mui/material';

const DownLoads = () => {
  const theme = useTheme();
  const [datasetType, setDatasetType] = useState<'genomes' | 'exomes'>('genomes');
  const [scope, setScope] = useState<'whole' | 'cancer' | 'organ'>('whole');
  const [selectedK, setSelectedK] = useState<number>(11);

  const fileName =
    [
      scope === 'whole' ? '' : `per_${scope}`,
      datasetType === 'exomes' ? 'exome' : '',
      'neomers',
      selectedK,
    ]
      .filter(Boolean)
      .join('_') +
    (scope === 'whole' ? '.csv' : '') +
    '.tar.gz';

  const fileUrl = import.meta.env.VITE_ZENODO_BASE_URL + fileName;

  return (
    <Container
      maxWidth="md"
      sx={{
        mx: 'auto',
        mt: 8,
        p: 4,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={4} textAlign="center">
        Downloads
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Dataset Type
      </Typography>
      <ToggleButtonGroup
        fullWidth
        color="primary"
        value={datasetType}
        exclusive
        onChange={(_, value) => value && setDatasetType(value)}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="genomes">Genomes</ToggleButton>
        <ToggleButton value="exomes">Exomes</ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="subtitle1" gutterBottom>
        Scope
      </Typography>
      <ToggleButtonGroup
        fullWidth
        color="primary"
        value={scope}
        exclusive
        onChange={(_, value) => value && setScope(value)}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="whole">Whole Dataset</ToggleButton>
        <ToggleButton value="cancer">Per Cancer</ToggleButton>
        <ToggleButton value="organ">Per Organ</ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="subtitle1" gutterBottom>
        Select k
      </Typography>
      <Select
        value={selectedK}
        onChange={(event) => setSelectedK(Number(event.target.value))}
        fullWidth
        sx={{ mb: 3 }}
      >
        {Array.from({ length: 7 }, (_, index) => index + 11).map((k) => (
          <MenuItem key={k} value={k}>
            {k}
          </MenuItem>
        ))}
      </Select>

      <Paper
        variant="outlined"
        sx={{
          px: 2,
          py: 1.5,
          mb: 4,
          fontFamily: 'monospace',
          textAlign: 'center',
          backgroundColor: '#f9f9f9',
        }}
      >
        {fileName}
      </Paper>

      <Button
        variant="contained"
        fullWidth
        color="primary"
        size="large"
        onClick={() => {
          window.open(fileUrl, '_blank');
        }}
      >
        Download
      </Button>
    </Container>
  );
};

export default DownLoads;
