/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter4.westRolan1',
  name: '卡尔要塞',
  hint: '小湖边的镇子，到处都是鱼人。',
  isDungeon: true,
  outside: 'chapter4.westRolan',
  requirement: {
    stories: ['chapter3-7'],
  },
  phases: [
    {
      description: '击败汹涌的狼群。',
      monsters: [
        {
          type: 'chapter3.orcs.wolf',
          max: 2,
          delay: 8000,
          total: 4,
        },
        {
          type: 'chapter3.orcs.wolf',
          max: 2,
          delay: 8000,
          total: 4,
        },
        {
          type: 'chapter3.orcs.wolf',
          max: 2,
          delay: 8000,
          total: 4,
        },
        {
          type: 'chapter3.orcs.wolf',
          max: 2,
          delay: 8000,
          total: 4,
        },
      ],
    },
    {
      description: '击败兽人酋长萨布罗·霜狼。',
      monsters: [
        {
          type: 'chapter3.orcs.shaman',
          max: 1,
          delay: 8000,
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'chapter4.orcs.warrior',
      warmup: 1000,
      delay: 10000,
      max: 3,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter4.orcs.warrior',
      warmup: 1000,
      delay: 10000,
      max: 3,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter4.orcs.hunter',
      warmup: 6000,
      delay: 20000,
      max: 2,
      quality: [25, 5, 1],
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 130,
  level: 130,
  exp: 1000000,
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
