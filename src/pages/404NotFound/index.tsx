import { Typography, Button, Box } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotFoundPage = () => {
  return (
    <Box
      display={'flex'}
      flexGrow={1}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      textAlign={'center'}
      p={3}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '6rem', sm: '8rem' },
          fontWeight: 500,
          textDecoration: 'italic',
          color: 'primary.main',
          letterSpacing: '-4px',
        }}
      >
        404
      </Typography>

      <DotLottieReact
        autoplay
        loop
        src={'/lotties/404.lottie'}
        style={{ width: 200, height: 200 }}
      />
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 400, mb: 3 }}>
        Sorry, the page you are looking for doesn't exist or has been moved.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ px: 4, py: 1.2, fontWeight: 500 }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFoundPage;
