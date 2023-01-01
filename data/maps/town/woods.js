/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'town.woods',
  name: '迷雾森林',
  hint: '山谷底部的森林，笼罩在雾气之中。',
  isDungeon: true,
  outside: 'town.valley',
  requirement: {
    stories: ['eyer-stories-8'],
  },
  phases: [
    {
      description: '击败狼王。',
      monsters: [
        {
          type: 'wolf.king',
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'wolf.minimal',
      warmup: 1000,
      delay: 30000,
      max: 2,
      quality: [49, 7, 1],
    },
    {
      type: 'wolf.minimal',
      warmup: 6000,
      delay: 30000,
      max: 2,
      quality: [49, 7, 1],
    },
    {
      type: 'wolf.giant',
      warmup: 10000,
      delay: 30000,
      max: 2,
      quality: [25, 5, 1],
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 40,
  level: 40,
  exp: 20000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [25, 5000],
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 200,
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 300,
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 500,
    },
  ],
};
