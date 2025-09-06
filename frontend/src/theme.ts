import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b5cff'
    },
    secondary: {
      main: '#00b894'
    },
    background: {
      default: '#f5f7fb'
    }
  },
  typography: {
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif'
  }
});

export default theme;
