import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { LandingPage } from './components/LandingPage';
import { RestaurantsList } from './components/booking/RestaurantsList';
import { RestaurantBookingPageWrapper } from './components/booking/RestaurantBooking';
import { MyRestaurantPage, VerifyReservation, CancelReservation } from './components/myrestaurant/MyRestaurantPage';

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
        <Route exact path="/booking/restaurants/:id?" component={RestaurantsList} />
        <Route exact path="/booking/restaurants/:id/book" component={RestaurantsList} />

        <Route exact path="/myrestaurant/" component={MyRestaurantPage} />
        <Route exact path="/myrestaurant/verify" component={VerifyReservation} />
        <Route exact path="/myrestaurant/cancel" component={CancelReservation} />
        
        <Route path="*">Not found (404)</Route>
      </Switch>
    </Router>
  );
};
