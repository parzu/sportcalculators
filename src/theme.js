import { createMuiTheme } from '@material-ui/core/styles';
import { indigo, deepOrange, red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
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
  },
});

export default theme;
