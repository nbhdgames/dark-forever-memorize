/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter4.sanAnthony',
  name: '圣安东尼帝国',
  requirement: {
    stories: ['chapter3-7'],
  },
  monsters: [
    {
      type: 'chapter4.humans.soldier',
      warmup: 1000,
      delay: 10000,
      max: 5,
      quality: [49, 7, 1],
    },
    {
      type: 'chapter4.humans.musketeer',
      warmup: 6000,
      delay: 15000,
      max: 2,
      quality: [49, 7, 1],
    },
    {
      type: 'chapter4.humans.mortar',
      warmup: 18000,
      delay: 40000,
      max: 1,
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
