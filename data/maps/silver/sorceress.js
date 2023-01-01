/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'silver.sorceress',
  name: '白银试炼 - 魔法少女',
  hint: '小湖边的镇子，到处都是鱼人。',
  isDungeon: true,
  outside: 'chapter4.sanAnthony',
  requirement: {
    career: 'sorceress',
    level: 60,
    atMostMaxLevel: 60,
  },
  phases: [
    {
      description: '进行奥术试炼。',
      monsters: [
        {
          type: 'silver.sorceress.trigger.1',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '击败奥术灵体。',
      monsters: [
        {
          type: 'silver.sorceress.boss.1',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '进行数学试炼。',
      monsters: [
        {
          type: 'silver.sorceress.trigger.2',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '从魔力书籍的围困中脱身。',
      monsters: [
        {
          type: 'silver.sorceress.boss.2',
          max: 3,
          delay: 10000,
          total: 6,
        },
        {
          type: 'silver.sorceress.boss.2',
          max: 3,
          delay: 10000,
          warmup: 3000,
          total: 6,
        },
        {
          type: 'silver.sorceress.boss.2',
          max: 3,
          delay: 10000,
          warmup: 5000,
          total: 6,
        },
        {
          type: 'silver.sorceress.boss.2',
          max: 3,
          delay: 10000,
          warmup: 8000,
          total: 6,
        },
      ],
    },
    {
      description: '进行作战试炼。',
      monsters: [
        {
          type: 'silver.sorceress.trigger.3',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '击败恐怖的怪物。',
      monsters: [
        {
          type: 'silver.sorceress.boss.3',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
  ],
  monsters: [
  ],
  resetPrice: -1,
  level: 180,
  loots: [
    {
      type: 'maxLevel',
      value: 70,
    },
  ],
};
