import { Box } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <Box onClick={() => navigate({ to: '/' })} sx={{ cursor: 'pointer', display: 'inline-block' }}>
      <Box
        component="img"
        src={'/images/neomer-logo.png'}
        alt="Logo"
        sx={{ maxHeight: 48 }}
        loading="eager"
        fetchPriority="high"
      />
    </Box>
  );
};

export default Logo;
