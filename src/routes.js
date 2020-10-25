import { lazy } from 'react';

export default [
  {
    path: '/',
    label: 'Home',
    exact: true,
    component: lazy(() => import('./pages/HomePage')),
  },
  {
    path: '/register',
    label: 'Register',
    exact: true,
    component: lazy(() => import('./pages/RegisterPage')),
  },
  {
    path: '/login',
    label: 'Login',
    exact: true,
    component: lazy(() => import('./pages/LoginPage')),
  },
  {
    path: '/privat',
    label: 'Privat',
    exact: true,
    component: lazy(() => import('./pages/PrivatePage')),
  },
];
