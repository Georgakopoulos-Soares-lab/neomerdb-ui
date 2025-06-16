import { HeadContent, Outlet } from '@tanstack/react-router';

import Grid from '@mui/material/Grid';

import Header from './Header';
import Sidemenu from './Sidemenu';
import LayoutProvider from '../context/layout/provider';

const Layout = () => {
  return (
    <LayoutProvider>
      <Grid
        container
        sx={{
          display: 'flex',
          height: '100vh',
        }}
        direction={'column'}
      >
        <Grid component={'header'}>
          <Header />
        </Grid>
        <Grid size={'grow'} sx={{ flexGrow: 1 }} container overflow={'auto'}>
          <Grid component={'aside'} direction={'column'} container>
            <Sidemenu />
          </Grid>
          <Grid
            size={'grow'}
            display={'flex'}
            position={'relative'}
            sx={{
              flexGrow: 1,
              backgroundColor: 'white',
            }}
            component="main"
            p={3}
          >
            <HeadContent />
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </LayoutProvider>
  );
};

export default Layout;
