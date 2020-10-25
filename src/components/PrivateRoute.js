import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import withAuth from './hoc/withAuth';

/**
 *  - Если маршрут приватный и пользователь залогиненб рендерит компонент
 *  - В противном случае рендерит редирект на /login
 */

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default withAuth(PrivateRoute);
