import { useEffect, useState } from 'react';
import { LayoutContext } from './context';
import { useMediaQuery, useTheme } from '@mui/material';

const LayoutProvider = ({ children = undefined as React.ReactNode | null }) => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

  console.log('isMobile', isMobile);

  const [isSidemenuOpen, setIsSidemenuOpen] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      setIsSidemenuOpen(false);
    } else {
      setIsSidemenuOpen(true);
    }
  }, [isMobile]);

  return (
    <LayoutContext.Provider value={{ isSidemenuOpen, setIsSidemenuOpen, isMobile }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
