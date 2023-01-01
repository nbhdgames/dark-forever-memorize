/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter5.byer2',
  name: '幽暗的货仓',
  hint: '一个亡灵法师在这里布置了一个招魂阵法。',
  isDungeon: true,
  outside: 'chapter5.byer1',
  requirement: {
    stories: ['chapter3-7'],
    atLeastMaxLevel: 70,
  },
  phases: [
    {
      description: '击败亡灵法师，阻止他的邪恶魔法。',
      monsters: [
        {
          type: 'chapter5.necromancer',
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'chapter5.undead.ghost',
      warmup: 1000,
      delay: 8000,
      max: 3,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter5.undead.zombie',
      warmup: 1000,
      delay: 8000,
      max: 3,
      quality: [25, 5, 1],
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 190,
  level: 190,
  exp: 1500000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [50000, 100000],
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
