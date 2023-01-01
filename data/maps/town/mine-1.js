/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'town.mine.1',
  name: '矿洞入口',
  hint: '一个看似废弃已久的矿洞，被附近的狗头人霸占了。',
  requirement: {
    stories: ['eyer-stories-10'],
  },
  monsters: [
    {
      type: 'kobold.miner',
      warmup: 1000,
      delay: 10000,
      max: 4,
      quality: [49, 7, 1],
    },
    {
      type: 'kobold.shaman',
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
