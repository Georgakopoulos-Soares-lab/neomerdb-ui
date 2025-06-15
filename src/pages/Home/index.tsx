import { Box, Typography, Button, Grid, Container, keyframes } from '@mui/material';
import { Link } from '@tanstack/react-router';

const Home = () => {
  // make fadeIn animation
  const fadeScaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

  return (
    <Container
      maxWidth="lg"
      sx={{
        animation: `${fadeScaleIn} 1s ease-in-out`,
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="space-around">
        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom color="primary" fontWeight={600}>
            Welcome to NeomerDB
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>neomerDB</strong> is a comprehensive web-based database cataloging{' '}
            <em>kmers</em> that are absent from the human reference genome but present in cancer
            tissues.
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Our curated collection spans <strong>32 distinct cancer types</strong> across{' '}
            <strong>21 tissues</strong>, providing researchers with a resource for cancer-specific
            signatures.
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            This database features analytical tools including{' '}
            <strong>interactive data tables</strong>, <strong>visualizations</strong>, and{' '}
            <strong>advanced filtering capabilities</strong>. Users can exclude nullomers from
            common variants and apply custom parameters to refine their searches.
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            neomerDB serves as a resource for scientists developing{' '}
            <strong>cancer detection platforms</strong>, <strong>biomarkers</strong>, and{' '}
            <strong>precision oncology applications</strong>.
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            To cite neomerDB, please refer to the following publication:
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Provatas K, Chan CSY, Kerasiotis I, Bochalis L, Nayak A, Mouratidis I, Pavlopoulos GA,
            Zacharia B, Li W, Georgakopoulos-Soares I.
          </Typography>
          <Typography variant="body2" sx={{ mb: 4 }}>
            <em>neomerDB: a cancer-specific kmer database</em>. (DOI:{' '}
            <a
              href="https://doi.org/10.1101/2024.12.31.123456"
              target="_blank"
              rel="noopener noreferrer"
            >
              10.1101/2024.12.31.123456
            </a>
            )
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/neomers/genomes"
          >
            Explore Neomers
          </Button>
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <Box
            component="img"
            src="/images/homepage-illustration.png"
            alt="DNA Neomer Illustration"
            sx={{
              width: '100%',
              maxWidth: 330,
              mx: 'auto',
              objectFit: 'contain',
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
