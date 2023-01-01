/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter4.westRolan',
  name: '东罗兰帝国',
  requirement: {
    stories: ['chapter3-7'],
  },
  monsters: [
    {
      type: 'chapter4.orcs.warrior',
      warmup: 1000,
      delay: 10000,
      max: 5,
      quality: [49, 7, 1],
    },
    {
      type: 'chapter4.orcs.hunter',
      warmup: 6000,
      delay: 15000,
      max: 2,
      quality: [49, 7, 1],
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
