import React, { FunctionComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Image } from '@chakra-ui/core';


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
  return (
    <Flex w='100%'>
      <Flex w='70%' height='75px' align='center'>
        <RouterLink to='/' style={{ paddingLeft: '105px'}}>
          <Image src={require('../../assets/one-up-logo.png')} alt='1-up Logo' height={55}/>
        </RouterLink>
      </Flex>
      <Flex w='30%' justify='center' height='75px'>
        <Flex align='center'>
          {menuItems &&
            menuItems.map((item, i) => {
              return (
                <RouterLink to={item.link} key={i} style={{ padding: '5px', margin: '4px', textAlign: 'center', textDecoration: 'none', color: 'white'}}>
                  {item.label}
                </RouterLink>
              );
            })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Nav;
