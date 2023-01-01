/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter3.tower2',
  name: '混乱元素王座',
  isDungeon: true,
  outside: 'chapter3.tower1',
  hint: '小湖边的镇子，到处都是鱼人。',
  requirement: {
    stories: ['chapter3-7'],
  },
  phases: [
    {
      description: '击败失去控制的阿撒托斯的分身',
      monsters: [
        {
          type: 'chapter3.element.azathoth.fire',
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'chapter3.element.fire',
      warmup: 5000,
      delay: 60000,
      max: 1,
      quality: [25, 2],
    },
    {
      type: 'chapter3.element.water',
      warmup: 25000,
      delay: 60000,
      max: 1,
      quality: [25, 2],
    },
    {
      type: 'chapter3.element.earth',
      warmup: 45000,
      delay: 60000,
      max: 1,
      quality: [25, 2],
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 110,
  level: 110,
  exp: 500000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [25000, 50000],
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
