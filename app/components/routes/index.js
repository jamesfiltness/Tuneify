import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from '../app';
import Home  from '../home';
import Artist from '../artist';
import Album from '../album';
import PageNotFound from '../page-not-found';
import auth0Service from '../../utils/auth-service';
import { loggedIn, loggedOut } from '../../actions/auth-actions';
const authService = new auth0Service({ loggedIn, loggedOut });

function authenticateRoute(nextState, replace, callback) {
  if (authService.isLoggedIn()) {
    callback();
  } else {
    authService.authenticate(callback);
  }
}

export default(
  <Route component={App} path="/">
    <IndexRoute component={Home} />
    <Route component={Artist} path="artist/:mbid" />
    <Route component={Album} path="album/:artist/:album" />
    <Route component={Album} path="album/:mbid" />
    <Route component={Album} path="recent-plays" onEnter={authenticateRoute} />
    <Route component={PageNotFound} path="*" />
  </Route>
);

