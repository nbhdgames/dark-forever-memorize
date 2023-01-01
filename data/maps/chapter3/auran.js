/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter3.auran',
  name: '奥兰境内',
  hint: '抵达奥兰帝国的必经之路。',
  requirement: {
    stories: ['chapter3-7'],
  },
  monsters: [
    {
      type: 'chapter3.murloc.minions',
      warmup: 1000,
      delay: 10000,
      max: 5,
      quality: [49, 7, 1],
    },
    {
      type: 'chapter3.murloc.shaman',
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
