/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter5.byer4',
  name: '睡美人湖',
  hint: '一个亡灵法师在这里布置了一个招魂阵法。',
  isDungeon: true,
  outside: 'chapter5.byer1',
  requirement: {
    stories: ['chapter3-7'],
    atLeastMaxLevel: 70,
  },
  phases: [
    {
      description: '击败并安抚节制的萨曼莎。',
      monsters: [
        {
          type: 'chapter5.woodElf.shamansa',
          warmup: 15000,
          total: 1,
        },
      ],
    },
    {
      description: '击败并安抚勤勉的罗莎。',
      monsters: [
        {
          type: 'chapter5.woodElf.rosa',
          warmup: 15000,
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'chapter5.woodElf.crazy',
      warmup: 1000,
      delay: 10000,
      max: 3,
      quality: [49, 7, 1],
    },
    {
      type: 'chapter5.woodElf.crazy',
      warmup: 1000,
      delay: 10000,
      max: 3,
      quality: [49, 7, 1],
    },
    {
      type: 'chapter5.woodElf.sad',
      warmup: 6000,
      delay: 15000,
      max: 2,
      quality: [49, 7, 1],
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 200,
  level: 200,
  exp: 1800000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [75000, 120000],
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
