import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { UserContextProvider } from 'contexts/UserContext';
import { OverlayContextProvider } from 'contexts/OverlayContext';
import App from 'pages/App';
import { theme } from 'theme';
import 'index.css';

interface ContextProps {
  children: ReactNode;
}

const ContextProviders: React.FC<ContextProps> = ({
  children,
}: ContextProps) => (
  <OverlayContextProvider>
    <UserContextProvider>{children}</UserContextProvider>
  </OverlayContextProvider>
);

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ContextProviders>
      <App />
    </ContextProviders>
  </ChakraProvider>,
  document.getElementById('root'),
);
