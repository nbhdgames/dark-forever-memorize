/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'town.street',
  name: '村间小路',
  hint: '边境之村通往邻村的一条小路。',
  requirement: {
    stories: ['eyer-stories-1'],
  },
  monsters: [
    {
      type: 'slime.minimal',
      warmup: 1000,
      delay: 5000,
      max: 2,
      quality: [81, 9, 1],
    },
    {
      type: 'slime.giant',
      warmup: 120000,
      delay: 120000,
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
