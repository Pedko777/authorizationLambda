import { lazy } from 'react';

export default [
  {
    path: '/',
    label: 'Home',
    exact: true,
    component: lazy(() => import('./pages/HomePage')),
    private: false,
    restricted: false,
  },
  {
    path: '/register',
    label: 'Register',
    exact: true,
    component: lazy(() => import('./pages/RegisterPage')),
    private: false,
    restricted: true,
  },
  {
    path: '/login',
    label: 'Login',
    exact: true,
    component: lazy(() => import('./pages/LoginPage')),
    private: false,
    restricted: true,
  },
  {
    path: '/private',
    label: 'Private',
    exact: true,
    component: lazy(() => import('./pages/PrivatePage')),
    private: true,
    restricted: false,
  },
];
