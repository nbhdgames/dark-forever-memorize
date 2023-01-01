/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'silver.warrior',
  name: '白银试炼 - 战士',
  hint: '小湖边的镇子，到处都是鱼人。',
  isDungeon: true,
  outside: 'chapter4.sanAnthony',
  requirement: {
    career: 'warrior',
    level: 60,
    atMostMaxLevel: 60,
  },
  phases: [
    {
      description: '进行坚毅试炼。',
      monsters: [
        {
          type: 'silver.warrior.trigger.1',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '击败科力克。',
      monsters: [
        {
          type: 'silver.warrior.boss.1',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '进行勇气试炼。',
      monsters: [
        {
          type: 'silver.warrior.trigger.2',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '击败马道克和士兵们。',
      monsters: [
        {
          type: 'silver.warrior.boss.2',
          max: 1,
          delay: 5000,
          total: 1,
        },
        {
          type: 'chapter4.humans.soldier',
          max: 3,
          delay: 10000,
          total: 6,
        },
        {
          type: 'chapter4.humans.musketeer',
          max: 3,
          delay: 10000,
          warmup: 3000,
          total: 6,
        },
        {
          type: 'chapter4.humans.soldier',
          max: 3,
          delay: 10000,
          warmup: 5000,
          total: 6,
        },
        {
          type: 'chapter4.humans.musketeer',
          max: 3,
          delay: 10000,
          warmup: 8000,
          total: 6,
        },
      ],
    },
    {
      description: '进行技巧试炼。',
      monsters: [
        {
          type: 'silver.warrior.trigger.3',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '击败塔里克。',
      monsters: [
        {
          type: 'silver.warrior.boss.3',
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
