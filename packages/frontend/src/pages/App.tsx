import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import Nav from '../components/Nav';
import Dashboard from './Dashboard';
import ActivityCreate from './ActivityCreate';
import ActivityDetail from './ActivityDetail';
import ActivityHistory from './ActivityHistory';
import ActivityList from './ActivityList';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100%;
  width: 100%;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  overflow: auto;
`;

const App: FunctionComponent = () => {
  return (
    <AppWrapper>
      <BodyWrapper>
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
            <Route exact strict path='/' component={() => <Dashboard />} />
            <Redirect to='/' />
          </Switch>
        </HashRouter>
      </BodyWrapper>
    </AppWrapper>
  );
};

export default App;
