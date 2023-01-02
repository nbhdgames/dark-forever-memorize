import React from 'react';
import { createMemoryRouter } from 'react-router';
import NavBar from '../pages/NavBar';
import Splash from '../pages/Splash';
import PlayerChoose from '../pages/player/Choose';
import PlayerCreate from '../pages/player/Create';

export const router = createMemoryRouter(
  [
    {
      path: '/splash',
      element: <Splash />,
    },
    {
      path: '/player/choose',
      element: (
        <NavBar key="/player/choose" title="选择存档" rightNavTitle="编辑">
          <PlayerChoose />
        </NavBar>
      ),
    },
    {
      path: '/player/create',
      element: (
        <NavBar
          key="/player/create"
          title="新游戏"
          rightNavTitle="开始游戏"
          back="/player/choose"
        >
          <PlayerCreate />
        </NavBar>
      ),
    },
    // childRoutes: [
    //   require('./Splash').default,
    //   require('./Purchase').default,
    //   require('./player').default,

    //   require('./home').default,
    //   require('./career').default,
    //   require('./stories').default,
    //   require('./inventory').default,
    // ].map(v => v.routeConfig || v),
  ],
  {
    initialEntries: ['/splash'],
  }
);
