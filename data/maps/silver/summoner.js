/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'silver.summoner',
  name: '白银试炼 - 元素召唤师',
  hint: '小湖边的镇子，到处都是鱼人。',
  isDungeon: true,
  outside: 'chapter4.sanAnthony',
  requirement: {
    career: 'elementSommoner',
    level: 60,
    atMostMaxLevel: 60,
  },
  phases: [
    {
      description: '开启火元素试炼。',
      monsters: [
        {
          type: 'silver.summoner.trigger.1',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '击败火元素。',
      monsters: [
        {
          type: 'silver.summoner.boss.1',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '开启水元素试炼。',
      monsters: [
        {
          type: 'silver.summoner.trigger.2',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '击败水元素。',
      monsters: [
        {
          type: 'silver.summoner.boss.2',
          max: 1,
          delay: 10000,
          total: 1,
        },
      ],
    },
    {
      description: '开启土元素试炼。',
      monsters: [
        {
          type: 'silver.summoner.trigger.3',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '击败土元素。',
      monsters: [
        {
          type: 'silver.summoner.boss.3',
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
