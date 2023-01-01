/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter3.auran3',
  name: '卡格西城',
  hint: '小湖边的镇子，到处都是鱼人。',
  requirement: {
    stories: ['chapter3-7'],
  },
  monsters: [
    {
      type: 'chapter3.waterElement.nagaHero',
      warmup: 1000,
      delay: 10000,
      max: 3,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter3.waterElement',
      warmup: 6000,
      delay: 20000,
      max: 2,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter3.waterElement.giants',
      warmup: 30000,
      delay: 50000,
      max: 1,
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
