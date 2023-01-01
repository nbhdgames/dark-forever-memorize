/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'silver.knight',
  name: '白银试炼 - 圣骑士',
  hint: '小湖边的镇子，到处都是鱼人。',
  isDungeon: true,
  outside: 'chapter4.sanAnthony',
  requirement: {
    career: 'knight',
    level: 60,
    atMostMaxLevel: 60,
  },
  phases: [
    {
      description: '开始祷告',
      monsters: [
        {
          type: 'silver.knight.trigger.1',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '击败内心深处的迷惘。',
      monsters: [
        {
          type: 'silver.knight.boss.1',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '继续祷告。',
      monsters: [
        {
          type: 'silver.knight.trigger.2',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '在梦境中复仇。',
      monsters: [
        {
          type: 'silver.knight.boss.2',
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
      description: '继续祷告。',
      monsters: [
        {
          type: 'silver.knight.trigger.3',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '阻止你自己。',
      monsters: [
        {
          type: 'silver.knight.boss.3',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '完成祷告。',
      monsters: [
        {
          type: 'silver.knight.trigger.4',
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
