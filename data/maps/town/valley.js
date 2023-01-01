/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'town.valley',
  name: '山谷',
  hint: '靠近邻村的山谷，有各种各样的野兽。',
  requirement: {
    stories: ['eyer-stories-6'],
  },
  monsters: [
    {
      type: 'wolf.minimal',
      warmup: 1000,
      delay: 10000,
      max: 4,
      quality: [49, 7, 1],
    },
    {
      type: 'wolf.giant',
      warmup: 15000,
      delay: 60000,
      max: 1,
      quality: [100, 10],
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
