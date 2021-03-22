import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { ChakraProvider } from '@chakra-ui/react';
import App from './pages/App';
import { theme } from './theme';
import './index.css';

import { UserContextProvider } from './contexts/UserContext';
import { OverlayContextProvider } from './contexts/OverlayContext';

interface ContextProps {
  children: ReactNode;
  // any other props that come into the component
}

function ContextProviders({ children }: ContextProps) {
  return (
    <OverlayContextProvider>
      <UserContextProvider>
        {children}
      </UserContextProvider>
    </OverlayContextProvider>
  );
}

// function Updaters() {
//   return (
//     <>
//       <ApplicationContextUpdater />
//     </>
//   );
// }

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ContextProviders>
      {/* <Updaters /> */}
      <App />
    </ContextProviders>
  </ChakraProvider>,
  document.getElementById('root'),
);
