/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'town.neighbourTown',
  name: '邻村',
  hint: '隔壁的村子。当亚莲娜赶到时，所有的村民都发狂了。',
  requirement: {
    stories: ['aleanor-stories-2'],
  },
  monsters: [
    {
      type: 'zombies.farmer',
      warmup: 1000,
      delay: 10000,
      max: 4,
      quality: [49, 7, 1],
    },
    {
      type: 'zombies.hammersmith',
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
