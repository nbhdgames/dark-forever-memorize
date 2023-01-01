/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter3.tower1',
  name: '混乱元素之塔',
  hint: '小湖边的镇子，到处都是鱼人。',
  requirement: {
    stories: ['chapter3-7'],
  },
  monsters: [
    {
      type: 'chapter3.element.fire',
      warmup: 5000,
      delay: 30000,
      max: 2,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter3.element.water',
      warmup: 15000,
      delay: 30000,
      max: 2,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter3.element.earth',
      warmup: 25000,
      delay: 30000,
      max: 2,
      quality: [25, 5, 1],
    },
    {
      types: {
        'shrine.heal': 10,
        'shrine.energy': 10,
        'shrine.power': 2.5,
      },
      warmup: 300000,
      delay: 300000,
      max: 1,
    },
  ],
};
