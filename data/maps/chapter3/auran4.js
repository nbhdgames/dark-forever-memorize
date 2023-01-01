/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter3.auran4',
  name: '雨之都卡格西',
  hint: '小湖边的镇子，到处都是鱼人。',
  isDungeon: true,
  outside: 'chapter3.auran3',
  requirement: {
    stories: ['chapter3-7'],
  },
  phases: [
    {
      description: '击败奈因洛斯降临的分身',
      monsters: [
        {
          type: 'chapter3.waterElement.Nynnroth',
          total: 1,
        },
        {
          type: 'shrine.nynnroth.shield',
          max: 1,
          warmup: 15000,
          delay: 30000,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'chapter3.waterElement.nagaHero',
      warmup: 1000,
      delay: 15000,
      max: 3,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter3.waterElement',
      warmup: 6000,
      delay: 25000,
      max: 2,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter3.waterElement.giants',
      warmup: 30000,
      delay: 50000,
      max: 1,
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 120,
  level: 120,
  exp: 750000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [40000, 60000],
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
