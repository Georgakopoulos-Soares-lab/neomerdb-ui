import { Box, Button, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Logo from '../../components/Logo';
import { Link } from '@tanstack/react-router';

const staticLinks = [
  { label: 'Help', to: '/help' },
  { label: 'About', to: '/about' },
];

const DesktopView = () => {
  return (
    <AppBar position="static" sx={{ display: { xs: 'none', md: 'flex' } }} color="default">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Logo />
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        {staticLinks.map(({ label, to }) => (
          <Button
            component={Link}
            to={to}
            key={to}
            color="inherit"
            variant="text"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant="body1">{label}</Typography>
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default DesktopView;
