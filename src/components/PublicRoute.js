import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import withAuth from './hoc/withAuth';

/**
 *  - Если маршрут ограниченный и пользователь залогинен тогда рендерит на /private
 *  - В противном случае рендерит компонент
 */

const PublicRoute = ({
  component: Component,
  isAuthenticated,
  restricted,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={props =>
      isAuthenticated && restricted ? (
        <Redirect to="/private" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default withAuth(PublicRoute);
