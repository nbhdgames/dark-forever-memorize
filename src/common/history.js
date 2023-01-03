import React from 'react';
import { createMemoryRouter } from 'react-router';
import Splash from '../pages/Splash';
import PlayerChoose from '../pages/player/Choose';
import PlayerCreate from '../pages/player/Create';
import Home from '../pages/Home';
import Annoucement from '../pages/stories/Annoucement';
import Purchase from '../pages/Purchase';
import LootRule from '../pages/inventory/LootRule';
import Bank from '../pages/inventory/Bank';
import Enhances from '../pages/career/Enhances';
import CareerChoose from '../pages/career/Choose';
import StoryPurchaseList from '../pages/stories/Purchase';

export const router = createMemoryRouter(
  [
    {
      path: '/splash',
      element: <Splash />,
    },
    {
      path: '/player/choose',
      element: <PlayerChoose />,
    },
    {
      path: '/player/create',
      element: <PlayerCreate />,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/inventory/loot-rule',
      element: <LootRule />,
    },
    {
      path: '/inventory/bank',
      element: <Bank />,
    },
    {
      path: '/career/enhances',
      element: <Enhances />,
    },
    {
      path: '/career/choose',
      element: <CareerChoose />,
    },
    {
      path: '/purchase',
      element: <Purchase />,
    },
    {
      path: '/story/annoucement',
      element: <Annoucement />,
    },
    {
      path: '/story/purchase',
      element: <StoryPurchaseList />,
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
