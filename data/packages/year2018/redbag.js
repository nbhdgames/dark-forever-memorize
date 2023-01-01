const { define, extend } = require('../util');

define('goods', 'year2018.redbag', {
  type: 'package',
  name: '红包',
  description: '狗年吉祥，旺，旺，旺！',
  stack: 999,
  price: 1,
  requireInventory: 2,
  backgroundColor: '#ff215b',
  nameColor: 'white',
  loots: [
    {
      key: 'diamonds',
      rate: 1,
      count: [1, 100],
    },
    {
      type: 'ticket',
      rate: 0.1,
      dungeons: {
        'year2018.dungeon': 1,
      },
    },
    {
      type: 'specialEquip',
      rate: 0.2,
      items: [
        'year2018.yearBeastWeapon-1',
        'year2018.yearBeastWeapon-2',
        'year2018.yearBeastWeapon-3',
        'year2018.yearBeastPlastron-1',
        'year2018.yearBeastPlastron-2',
        'year2018.yearBeastTrousers-1',
        'year2018.yearBeastTrousers-2',
        'year2018.yearBeastHeart',
      ],
    },
  ],
});

const { enemies, maps } = require('../../base');

for (const key of Object.keys(enemies)) {
  const enemy = enemies[key];
  if (enemy.loots) {
    enemy.loots.push({
      key: 'year2018.redbag',
      count: [1, 1],
      rate: 0.0001,
    });
  }
}

for (const key of Object.keys(maps)) {
  const map = maps[key];
  if (map.loots) {
    map.loots.push({
      key: 'year2018.redbag',
      count: [1, 1],
      rate: 0.1,
    });
  }
}
