import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useToast } from '@chakra-ui/react';

export const OverlayContext: any = createContext(null);

interface OverlayContextProps {
  children: ReactNode;
}

interface ToastProps {
  title: string;
  description: string;
}

export const OverlayContextProvider: React.FC<OverlayContextProps> = ({
  children,
}: OverlayContextProps) => {
  const toast = useToast();
  const [modals, setModals] = useState({
    questSuccess: false,
    brightId: false,
    nonFungibleReward: false,
  });

  const errorToast = (content: ToastProps): any => {
    toast({
      title: content.title,
      description: content.description,
      position: 'top-right',
      status: 'error',
      duration: 7000,
      isClosable: true,
    });
  };
  const successToast = (content: ToastProps): any => {
    toast({
      title: content.title,
      description: content.description,
      position: 'top-right',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  const warningToast = (content: ToastProps): any => {
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

export const useOverlay = (): any => {
  const { modals, setModals, errorToast, warningToast, successToast } =
    useContext(OverlayContext);
  return {
    modals,
    setModals,
    errorToast,
    warningToast,
    successToast,
  };
};
