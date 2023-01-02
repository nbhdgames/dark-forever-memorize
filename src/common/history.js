import React from 'react';
import { createMemoryRouter } from 'react-router';
import NavBar from '../pages/NavBar';
import Splash from '../pages/Splash';

export const router = createMemoryRouter(
  [
    {
      path: '/splash',
      element: <Splash />,
    },
    {
      path: '/',
      element: <NavBar />,
      children: [{ path: '/splash' }],

      // childRoutes: [
      //   require('./Splash').default,
      //   require('./Purchase').default,
      //   require('./player').default,

      //   require('./home').default,
      //   require('./career').default,
      //   require('./stories').default,
      //   require('./inventory').default,
      // ].map(v => v.routeConfig || v),
    },
  ],
  {
    initialEntries: ['/splash'],
  }
);
