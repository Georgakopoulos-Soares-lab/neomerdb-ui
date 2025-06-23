import { createTheme } from '@mui/material/styles';
import '@fontsource/inter';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4079FE',
    },
    secondary: {
      main: '#C31A70',
    },
    grey: {
      50: '#f9f9f9',
      100: '#f0f0f0',
      200: '#e0e0e0',
      300: '#cfcfcf',
      400: '#bfbfbf',
      500: '#a6a6a6',
      600: '#8c8c8c',
      700: '#737373',
      800: '#595959',
      900: '#404040',
      A100: '#ffffff',
      A200: '#d9d9d9',
      A400: '#b3b3b3',
      A700: '#8c8c8c',
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
});

export default theme;
