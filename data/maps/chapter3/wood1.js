/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter3.wood1',
  name: '森林深处',
  hint: '抵达奥兰帝国的必经之路。',
  isDungeon: true,
  outside: 'chapter3.wood',
  requirement: {
    stories: ['chapter3-6'],
  },
  phases: [
    {
      description: '击败辛巴、彭彭和丁满。',
      monsters: [
        {
          type: 'chapter3.beast.pengpeng',
          total: 1,
        },
        {
          type: 'chapter3.beast.simba',
          total: 1,
        },
        {
          type: 'chapter3.beast.dingman',
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'chapter3.beast.wildpig',
      warmup: 1000,
      delay: 10000,
      max: 5,
      quality: [49, 7, 1],
    },
    {
      type: 'chapter3.beast.lion',
      warmup: 6000,
      delay: 15000,
      max: 2,
      quality: [49, 7, 1],
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 80,
  level: 80,
  exp: 180000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [15000, 25000],
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
