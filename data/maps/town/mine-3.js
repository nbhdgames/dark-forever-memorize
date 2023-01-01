/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'town.mine.3',
  name: '神秘祭坛',
  hint: '矿洞深处的祭坛，通往下位面的传送门。',
  isDungeon: true,
  outside: 'town.mine.1',
  requirement: {
    stories: ['eyer-grow-4'],
  },
  phases: [
    {
      description: '击败卡卡列夫的幻象，找回村长',
      monsters: [
        {
          type: 'kakarif.illusion',
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'kakarif.generations',
      warmup: 1000,
      delay: 10000,
      max: 2,
      quality: [25, 5, 1],
    },
    {
      type: 'kakarif.generations',
      warmup: 1000,
      delay: 10000,
      max: 2,
      quality: [25, 5, 1],
    },
    {
      type: 'kakarif.servants',
      warmup: 10000,
      delay: 30000,
      max: 2,
      quality: [25, 5, 1],
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 60,
  level: 60,
  exp: 120000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [5000, 10000],
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
