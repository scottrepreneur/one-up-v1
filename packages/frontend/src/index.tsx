import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import App from './pages/App';
import { customTheme } from './theme';

import ApplicationContextProvider, {
  Updater as ApplicationContextUpdater,
} from './contexts/Application';

interface IProps {
  children: ReactNode;
  // any other props that come into the component
}

function ContextProviders({ children }: IProps) {
  return <ApplicationContextProvider>{children}</ApplicationContextProvider>;
}

function Updaters() {
  return (
    <>
      <ApplicationContextUpdater />
    </>
  );
}

ReactDOM.render(
  <ThemeProvider theme={customTheme}>
    <CSSReset />
    <ContextProviders>
      <Updaters />
      <App />
    </ContextProviders>
  </ThemeProvider>,
  document.getElementById('root'),
);
