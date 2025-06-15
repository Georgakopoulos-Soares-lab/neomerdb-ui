import { Box, useMediaQuery, useTheme } from '@mui/material';
import DesktopView from './desktop-view';
import MobileView from './mobile-view';

const Header = () => {
  const isDesktop = useMediaQuery(useTheme().breakpoints.up('md'));

  return (
    <Box
      flexGrow={1}
      sx={{
        boxShadow: 3,
        position: 'relative',
        zIndex: 3,
      }}
    >
      {isDesktop ? <DesktopView /> : <MobileView />}
    </Box>
  );
};

export default Header;
