import { createTheme} from '@mui/material/styles';
import { indigo, deepOrange, red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: deepOrange[500],
    },
    error: {
      main: red[500],
    },
    background: {
      default: '#fff',
    },
    black: {
      main: "rgba(0, 0, 0, 0.87)"
    }
  },
});

export default theme;
