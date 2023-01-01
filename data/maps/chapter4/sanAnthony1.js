/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter4.sanAnthony1',
  name: '四骑士圣殿',
  hint: '小湖边的镇子，到处都是鱼人。',
  isDungeon: true,
  outside: 'chapter4.sanAnthony',
  requirement: {
    stories: ['chapter3-7'],
  },
  phases: [
    {
      description: '抵挡迫击炮的齐射。',
      monsters: [
        {
          type: 'chapter4.humans.mortar',
          max: 1,
          warmup: 1000,
          delay: 5000,
          total: 2,
        },
        {
          type: 'chapter4.humans.mortar',
          max: 1,
          warmup: 3000,
          delay: 5000,
          total: 2,
        },
        {
          type: 'chapter4.humans.mortar',
          max: 1,
          warmup: 5000,
          delay: 5000,
          total: 2,
        },
        {
          type: 'chapter4.humans.mortar',
          max: 1,
          warmup: 7000,
          delay: 5000,
          total: 2,
        },
        {
          type: 'chapter4.humans.mortar',
          max: 1,
          warmup: 9000,
          delay: 5000,
          total: 2,
        },
        {
          type: 'chapter4.humans.mortar',
          max: 1,
          warmup: 11000,
          delay: 5000,
          total: 2,
        },
      ],
    },
    {
      description: '击败英勇骑士达尔。',
      monsters: [
        {
          type: 'chapter4.humans.knights.dare',
          max: 1,
          warmup: 8000,
          delay: 8000,
          total: 1,
        },
      ],
    },
    {
      description: '击败光明骑士莱特和鲜血骑士布莱德。',
      monsters: [
        {
          type: 'chapter4.humans.knights.blood',
          max: 1,
          warmup: 8000,
          delay: 8000,
          total: 1,
        },
        {
          type: 'chapter4.humans.knights.light',
          max: 1,
          warmup: 8000,
          delay: 8000,
          total: 1,
        },
      ],
    },
    {
      description: '击败制裁骑士山新和全能骑士雷格。没错，四骑士组合有五个人。',
      monsters: [
        {
          type: 'chapter4.humans.knights.sanction',
          max: 1,
          warmup: 8000,
          delay: 8000,
          total: 1,
        },
        {
          type: 'chapter4.humans.knights.rage',
          max: 1,
          warmup: 8000,
          delay: 8000,
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'chapter4.humans.soldier',
      warmup: 1000,
      delay: 20000,
      max: 3,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter4.humans.musketeer',
      warmup: 1000,
      delay: 30000,
      max: 3,
      quality: [25, 5, 1],
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 300,
  level: 150,
  exp: 1800000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [75000, 150000],
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 200,
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
      mfRate: 300,
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 500,
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 500,
    },
  ],
};
