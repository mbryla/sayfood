import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { LandingPage } from './components/LandingPage';
import { RestaurantDetails } from './components/RestaurantDetails';
import { RestaurantsList } from './components/RestaurantsList';
import { MyRestaurantPage } from './components/myrestaurant/MyRestaurantPage';

interface AppProps {}

export const App: FC<AppProps> = () => {
  // todo add 
  // todo add reporting violations page
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/booking">
          <Redirect to="/booking/restaurants" />
        </Route>
        <Route exact path="/booking/restaurants">
          <RestaurantsList />
        </Route>
        <Route exact path="/booking/restaurants/:id" children={<RestaurantDetails />} />
        <Route exact path="/myrestaurant/">
          <MyRestaurantPage />
        </Route>
        <Route path="*">Not found (404)</Route>
      </Switch>
    </Router>
  );
};
