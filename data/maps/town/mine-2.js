/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'town.mine.2',
  name: '矿洞深处',
  hint: '金牙居住之处。',
  isDungeon: true,
  outside: 'town.mine.1',
  requirement: {
    stories: ['eyer-grow-2'],
  },
  phases: [
    {
      description: '击败金牙，探听村长的情报。',
      monsters: [
        {
          type: 'kobold.goldteeth',
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'kobold.miner',
      warmup: 1000,
      delay: 10000,
      max: 2,
      quality: [25, 5, 1],
    },
    {
      type: 'kobold.miner',
      warmup: 1000,
      delay: 10000,
      max: 2,
      quality: [25, 5, 1],
    },
    {
      type: 'kobold.shaman',
      warmup: 10000,
      delay: 30000,
      max: 2,
      quality: [25, 5, 1],
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 50,
  level: 50,
  exp: 80000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [4000, 7000],
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
