/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'town.cave',
  name: '洞窟一层',
  hint: '边境之村通往邻村的一条小路旁的洞窟，里面阴森且潮湿。',
  requirement: {
    stories: ['eyer-stories-4'],
  },
  monsters: [
    {
      type: 'slime.minimal',
      warmup: 1000,
      delay: 10000,
      max: 2,
      quality: [49, 7, 1],
    },
    {
      type: 'slime.minimal',
      warmup: 6000,
      delay: 10000,
      max: 2,
      quality: [49, 7, 1],
    },
    {
      type: 'slime.giant.enemy',
      warmup: 15000,
      delay: 60000,
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
