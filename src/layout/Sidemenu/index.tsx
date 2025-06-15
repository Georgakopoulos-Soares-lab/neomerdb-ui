import { Box, List, Divider } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import { LayoutContext } from '../../context/layout/context';
import SideMenuSection from './side-menu-section';
import StaticLinks from './static-links';
import ToggleFab from './toggle-fab';

const Sidemenu = () => {
  const [open, setOpen] = useState({
    neomers: false,
    patients: false,
  });

  const toggle = (key: keyof typeof open) => {
    setOpen((previous) => ({ ...previous, [key]: !previous[`${key}`] }));
  };

  const { isSidemenuOpen, setIsSidemenuOpen, isMobile } = useContext(LayoutContext);

  const sideMenuWidth = useMemo(() => {
    if (isSidemenuOpen) {
      return isMobile ? '100%' : 250;
    }

    return isMobile ? 0 : 20;
  }, [isMobile, isSidemenuOpen]);

  return (
    <Box
      flexGrow={1}
      position={isMobile ? 'absolute' : 'relative'}
      zIndex={2}
      sx={{
        boxShadow: 3,
        bgcolor: 'background.paper',
        py: 1,
        width: sideMenuWidth,
        transition: 'width 0.3s',
        height: '100%',
      }}
    >
      {isSidemenuOpen && (
        <List
          component="nav"
          sx={{
            '& .MuiListItemButton-root': {
              px: isSidemenuOpen ? 3 : 1,
            },
          }}
        >
          <SideMenuSection
            title="Neomers"
            isOpen={open.neomers}
            toggle={() => toggle('neomers')}
            items={[
              { label: 'Genomes', to: '/neomers/genomes' },
              { label: 'Exomes', to: '/neomers/exomes' },
            ]}
            visible={isSidemenuOpen}
          />
          <Divider />

          <SideMenuSection
            title="Patient Data"
            isOpen={open.patients}
            toggle={() => toggle('patients')}
            items={[
              { label: 'Genomes', to: '/patients/genomes' },
              { label: 'Exomes', to: '/patients/exomes' },
            ]}
            visible={isSidemenuOpen}
          />

          <Divider sx={{ my: 1 }} />

          <StaticLinks visible={isSidemenuOpen} />
        </List>
      )}

      {!isMobile && (
        <ToggleFab isOpen={isSidemenuOpen} toggle={() => setIsSidemenuOpen(!isSidemenuOpen)} />
      )}
    </Box>
  );
};

export default Sidemenu;
