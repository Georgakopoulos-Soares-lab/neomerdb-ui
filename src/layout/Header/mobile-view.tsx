import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import Logo from '../../components/Logo';
import MenuIcon from '@mui/icons-material/Menu';
import { LayoutContext } from '../../context/layout/context';
import { useContext } from 'react';

const MobileView = () => {
  const { isSidemenuOpen, setIsSidemenuOpen } = useContext(LayoutContext);

  return (
    <AppBar position="static" color="default" sx={{ display: { xs: 'flex', md: 'none' } }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', mr: 2 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsSidemenuOpen(!isSidemenuOpen)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 2, display: 'flex', alignItems: 'center' }}>
          <Logo />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MobileView;
