import { StrictMode } from 'react';
import AppRouter from './routers';

import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query-client';

function App() {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
