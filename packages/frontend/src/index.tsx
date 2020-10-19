import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import App from './pages/App';
import ThemeProvider, { GlobalStyle } from './theme';

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
  <ThemeProvider>
    <ContextProviders>
      <Updaters />
      <GlobalStyle />
      <App />
    </ContextProviders>
  </ThemeProvider>,
  document.getElementById('root')
);
