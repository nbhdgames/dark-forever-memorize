/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter5.byer5',
  name: '噩梦边境',
  requirement: {
    stories: ['chapter3-7'],
    atLeastMaxLevel: 70,
  },
  monsters: [
    {
      types: {
        'chapter5.daughter.monster1': 1,
        'chapter5.daughter.monster2': 1,
        'chapter5.daughter.monster3': 1,
        'chapter5.daughter.monster4': 1,
        'chapter5.daughter.monster5': 1,
        'chapter5.daughter.monster6': 1,
      },
      warmup: 1000,
      delay: 6000,
      max: 5,
      quality: [49, 7, 1],
    },
    {
      types: {
        'chapter5.daughter.monster1': 1,
        'chapter5.daughter.monster2': 1,
        'chapter5.daughter.monster3': 1,
        'chapter5.daughter.monster4': 1,
        'chapter5.daughter.monster5': 1,
        'chapter5.daughter.monster6': 1,
      },
      warmup: 4000,
      delay: 6000,
      max: 5,
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
