import React, { FunctionComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Flex,
  Text,
  Drawer as ChakraDrawer,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
} from '@chakra-ui/react';

interface DrawerProps {
  isOpen: boolean;
  onClose: any;
  menuItems: any[];
}

const Drawer: FunctionComponent<DrawerProps> = ({
  isOpen,
  onClose,
  menuItems,
}: DrawerProps) => {
  return (
    <ChakraDrawer placement='right' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px' bg='mainBackground'>
          <Text>Step it Up!</Text>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody bg='mainBackground'>
          <Flex direction='column'>
            {menuItems &&
              menuItems.map((item) => (
                <RouterLink
                  to={item.link}
                  key={item.link}
                  style={{
                    padding: '5px',
                    margin: '4px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: 'white',
                  }}
                  onClick={onClose}
                >
                  {item.label}
                </RouterLink>
              ))}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
};

export default Drawer;
