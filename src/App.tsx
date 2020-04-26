import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { LandingPage } from './components/LandingPage';
import { RestaurantDetailsPageWrapper } from './components/RestaurantDetails';
import { RestaurantsList } from './components/RestaurantsList';
import { VerificationPage } from './components/VerificationPage';

interface AppProps {}

export const App: FC<AppProps> = () => {
  // todo add 
  // todo add reporting violations page
  return (
    <main>
      <h1>Welcome to SayFood!</h1>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/restaurants">
            <RestaurantsList />
          </Route>
          <Route exact path="/restaurants/:id" children={<RestaurantDetailsPageWrapper />} />
          <Route exact path="/verification">
            <VerificationPage />
          </Route>
          <Route path="*">Not found (404)</Route>
        </Switch>
      </Router>
    </main>
  );
};
