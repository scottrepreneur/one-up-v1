import React, { createContext, useState, useContext } from 'react';
import { useToast } from '@chakra-ui/react';

export const OverlayContext = createContext(null);

export const OverlayContextProvider = ({ children }) => {
  const toast = useToast();
  const [modals, setModals] = useState({
    questSuccess: false,
    brightId: false,
    nonFungibleReward: false,
  });

  const errorToast = (content) => {
    toast({
      title: content.title,
      description: content.description,
      position: 'top-right',
      status: 'error',
      duration: 7000,
      isClosable: true,
    });
  };
  const successToast = (content) => {
    toast({
      title: content.title,
      description: content.description,
      position: 'top-right',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  const warningToast = (content) => {
    toast({
      title: content.title,
      description: content.description,
      position: 'top-right',
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <OverlayContext.Provider
      value={{
        modals,
        setModals,
        errorToast,
        warningToast,
        successToast,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export default OverlayContextProvider;

export const useOverlay = () => {
  const {
    modals,
    setModals,
    errorToast,
    warningToast,
    successToast,
  } = useContext(OverlayContext);
  return {
    modals,
    setModals,
    errorToast,
    warningToast,
    successToast,
  };
};
