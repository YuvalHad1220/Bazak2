import {createTheme, PaletteOptions, ThemeProvider} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import { CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
 });


 const lightTheme : PaletteOptions = {
  mode: 'light',
  primary: {
    main: "#FF474F",
    dark: "#FF1E32",
    light: "#FF7580"
  },
  secondary: {
    main: "#FFFFFF"
  },
  info: {
    main: "#00B8D9",
    dark: "#006C9C",
    light: "#61F3F3"
  },
  success: {
    main: "#8AD827",
    dark: "#70C531",
    light: "#9DDB36"
  },
  warning: {
    main: "#EF6C00",
    light: "#FF9800"
    // no dark
  },
  background: {
    default: "#EDEFF2",
    paper: "#F4F6F8"
  },
  text: {
    primary: "#212B36",
    secondary: "#637381",
    disabled: "#919EAB"
  },
  
  
 };

 const darkTheme: PaletteOptions = {
    // palette values for dark mode
    mode: 'dark',
    primary: {
      main: "#FF7580"
    },
    secondary: {
      main: "#FCFF60"
    },
    success: {
      main: "#9DDB36"
    },
    error: {
      main: "#E5392A"
    },
    warning: {
      main: "#EF6C00"
    }
 };

const theme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: 'Rubik'
    },
    palette: darkTheme
},

    );
  interface MainThemeProps {
    children: ReactNode;
  }
  
const ThemeWrapper : React.FC<MainThemeProps> = (props) => {
  return (
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  </CacheProvider>
  );
};

export default ThemeWrapper;