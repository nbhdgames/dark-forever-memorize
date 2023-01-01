/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'town.neighbourTown.2',
  name: '幽暗的地窖',
  hint: '一个亡灵法师在这里布置了一个招魂阵法。',
  isDungeon: true,
  outside: 'town.neighbourTown',
  requirement: {
    stories: ['aleanor-stories-4'],
  },
  phases: [
    {
      description: '击败亡灵法师，阻止他的邪恶魔法。',
      monsters: [
        {
          type: 'zombie.necromancer',
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'zombies.farmer',
      warmup: 1000,
      delay: 10000,
      max: 3,
      quality: [25, 5, 1],
    },
    {
      type: 'zombies.farmer',
      warmup: 1000,
      delay: 10000,
      max: 3,
      quality: [25, 5, 1],
    },
    {
      type: 'zombies.hammersmith',
      warmup: 10000,
      delay: 30000,
      max: 1,
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
