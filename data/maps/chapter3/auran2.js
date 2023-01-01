/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter3.auran2',
  name: '闪光湖',
  hint: '小湖边的镇子，到处都是鱼人。',
  isDungeon: true,
  outside: 'chapter3.auran',
  requirement: {
    stories: ['chapter3-7'],
  },
  phases: [
    {
      description: '击败巨型海怪鱼斯拉。',
      monsters: [
        {
          type: 'chapter3.fishzilla',
          warmup: 25000,
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'chapter3.fishzilla.magician',
      warmup: 5000,
      delay: 10000,
      max: 5,
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 100,
  level: 100,
  exp: 400000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [20000, 40000],
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
