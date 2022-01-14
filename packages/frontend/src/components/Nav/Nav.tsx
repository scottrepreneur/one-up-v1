import React, { FunctionComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Image, Link, Icon, useDisclosure } from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import Drawer from './Drawer';
import OneUpLogo from '../../assets/one-up-logo.png';

const menuItems = [
  {
    label: 'Create',
    link: '/activity/create',
  },
  {
    label: 'Activities',
    link: '/activity/list',
  },
  {
    label: 'History',
    link: '/activity/history',
  },
];

const Nav: FunctionComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex w='100%' justify='space-between'>
      <Flex w='70%' height='75px' align='center'>
        <Link as={RouterLink} to='/' px={{ base: '25px', md: '105px' }}>
          <Image
            src={OneUpLogo}
            alt='1-up Logo'
            height={[30, null, null, 55]}
          />
        </Link>
      </Flex>
      <Flex
        w='30%'
        justify='center'
        height='75px'
        display={{ base: 'none', sm: 'flex' }}
      >
        <Flex align='center'>
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
              >
                {item.label}
              </RouterLink>
            ))}
        </Flex>
      </Flex>
      <Flex
        display={{ base: 'flex', sm: 'none' }}
        w='15%'
        justify='center'
        align='center'
      >
        <Icon as={AiOutlineMenu} w={6} h={6} onClick={onOpen} />
      </Flex>
      <Drawer isOpen={isOpen} onClose={onClose} menuItems={menuItems} />
    </Flex>
  );
};

export default Nav;
