/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter4.westRolan2',
  name: '司璐登监狱',
  hint: '小湖边的镇子，到处都是鱼人。',
  isDungeon: true,
  outside: 'chapter4.westRolan',
  requirement: {
    stories: ['chapter3-7'],
  },
  phases: [
    {
      description: '击败流氓和小偷的偷袭。',
      monsters: [
        {
          type: 'chapter4.humans.thief',
          max: 2,
          delay: 20000,
          total: 4,
        },
        {
          type: 'chapter4.humans.thief',
          max: 2,
          delay: 20000,
          warmup: 12000,
          total: 4,
        },
        {
          type: 'chapter4.humans.rogue',
          max: 2,
          delay: 20000,
          warmup: 6000,
          total: 4,
        },
        {
          type: 'chapter4.humans.rogue',
          max: 2,
          delay: 20000,
          warmup: 16000,
          total: 4,
        },
      ],
    },
    {
      description: '击败手黑党的领袖罗兰·赛克。',
      monsters: [
        {
          type: 'chapter4.humans.seck',
          max: 1,
          delay: 8000,
          total: 1,
        },
      ],
    },
    {
      description: '再次击败手黑党的领袖罗兰·赛克。这货绑了灵魂石。',
      monsters: [
        {
          type: 'chapter4.humans.seck1',
          max: 1,
          delay: 8000,
          total: 1,
        },
      ],
    },
  ],
  monsters: [],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 140,
  level: 140,
  exp: 1500000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [75000, 100000],
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
