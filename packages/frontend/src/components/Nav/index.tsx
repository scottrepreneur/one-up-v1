import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Column from '../Column';
import Row from '../Row';

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

const NavWrapper = styled(Row)`
  width: 100%;
`;

type ColumnProps = {
  width: string;
};

const SplitColumn = styled(Column)<ColumnProps>`
  width: ${({ width }) => width && width};
  height: 75px;
  justify-content: center;
`;

const Logo = styled.img`
  height: 50px;
  width: 100px;
  margin-left: 10%;
`;

const MenuItems = styled(Row)``;

const MenuLinks = styled(Link)`
  width: 100px;
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.white};

  :hover {
    font-weight: bold;
  }
`;

const Nav: FunctionComponent = () => {
  return (
    <NavWrapper>
      <SplitColumn width='70%'>
        <Link to='/'>
          <Logo src={require('../../assets/one-up-logo.png')} alt='1-up Logo' />
        </Link>
      </SplitColumn>
      <SplitColumn width='30%'>
        <MenuItems>
          {menuItems &&
            menuItems.map((item, i) => {
              return (
                <MenuLinks to={item.link} key={i}>
                  {item.label}
                </MenuLinks>
              );
            })}
        </MenuItems>
      </SplitColumn>
    </NavWrapper>
  );
};

export default Nav;
