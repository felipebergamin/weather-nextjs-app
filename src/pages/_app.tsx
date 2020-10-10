import { StylesProvider, CssBaseline } from '@material-ui/core';

import GlobalStyles from '~/styles/global-styles';

function MyApp({ Component, pageProps }) {
  return (
    <StylesProvider injectFirst>
      <Component {...pageProps} />
      <GlobalStyles />
      <CssBaseline />
    </StylesProvider>
  );
}

export default MyApp;
