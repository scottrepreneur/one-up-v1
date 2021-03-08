import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { ChakraProvider } from '@chakra-ui/react';
import App from './pages/App';
import { customTheme } from './theme';

import { UserContextProvider } from './contexts/UserContext';

interface ContextProps {
  children: ReactNode;
  // any other props that come into the component
}

function ContextProviders({ children }: ContextProps) {
  return <UserContextProvider>{children}</UserContextProvider>;
}

// function Updaters() {
//   return (
//     <>
//       <ApplicationContextUpdater />
//     </>
//   );
// }

ReactDOM.render(
  <ChakraProvider theme={customTheme}>
    <ContextProviders>
      {/* <Updaters /> */}
      <App />
    </ContextProviders>
  </ChakraProvider>,
  document.getElementById('root'),
);
