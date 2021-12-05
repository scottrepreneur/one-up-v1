import React, { FunctionComponent } from 'react';
import { Flex } from '@chakra-ui/react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import Nav from 'components/Nav';
import Dashboard from 'pages/Dashboard';
import ActivityCreate from 'pages/ActivityCreate';
import ActivityEdit from 'pages/ActivityEdit';
import ActivityDetail from 'pages/ActivityDetail';
import ActivityHistory from 'pages/ActivityHistory';
import ActivityList from 'pages/ActivityList';

const App: FunctionComponent = () => (
  <Flex
    flexWrap='wrap'
    align='flex-start'
    minHeight='100vh'
    height='100%'
    width='100%'
    background='mainBackground'
  >
    <Flex
      direction='column'
      w='100%'
      h='100%'
      justify='flex-start'
      align='flex-start'
      flex='1'
      overflow='auto'
    >
      <HashRouter>
        <Nav />
        <Switch>
          <Route
            exact
            strict
            path='/activity/history'
            component={() => <ActivityHistory />}
          />
          <Route
            exact
            strict
            path='/activity/list'
            component={() => <ActivityList />}
          />
          <Route
            exact
            strict
            path='/activity/create'
            component={() => <ActivityCreate />}
          />
          <Route
            exact
            strict
            path='/activity/:activity'
            component={() => <ActivityDetail />}
          />
          <Route
            exact
            strict
            path='/activity/:activity/edit'
            component={() => <ActivityEdit />}
          />
          <Route exact strict path='/' component={() => <Dashboard />} />
          <Redirect to='/' />
        </Switch>
      </HashRouter>
    </Flex>
  </Flex>
);

export default App;
