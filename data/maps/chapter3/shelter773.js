/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter3.shelter773',
  name: '庇护所773号',
  hint: '一个被亡灵化了的庇护所',
  isDungeon: true,
  outside: 'chapter3.road',
  requirement: {
    stories: ['chapter3-3'],
  },
  phases: [
    {
      description: '击败暗影法师奈布。',
      monsters: [
        {
          type: 'chapter3.necromancer',
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'chapter3.undead.ghost',
      warmup: 1000,
      delay: 10000,
      max: 3,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter3.undead.ghost',
      warmup: 1000,
      delay: 10000,
      max: 3,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter3.undead.zombie',
      warmup: 6000,
      delay: 20000,
      max: 2,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter3.undead.zombie',
      warmup: 14000,
      delay: 20000,
      max: 2,
      quality: [25, 5, 1],
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 70,
  level: 70,
  exp: 180000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [10000, 20000],
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
