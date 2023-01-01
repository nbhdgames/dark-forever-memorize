/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter5.byer6',
  name: '噩梦巨人国度',
  hint: '一个亡灵法师在这里布置了一个招魂阵法。',
  isDungeon: true,
  outside: 'chapter5.byer1',
  requirement: {
    stories: ['chapter3-7'],
    atLeastMaxLevel: 70,
  },
  phases: [
    {
      description: '击败拦路的噩梦之灵，找到好心的巨人',
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
          total: 10,
        },
      ],
    },
    {
      description: '击败吃小孩的巨人',
      monsters: [
        {
          type: 'chapter5.daughter.badGiant',
          warmup: 5000,
          total: 1,
        },
        {
          type: 'chapter5.woodElf.crazy',
          warmup: 1000,
          delay: 10000,
          max: 3,
          quality: [49, 7, 1],
        },
        {
          type: 'chapter5.woodElf.crazy',
          warmup: 1000,
          delay: 10000,
          max: 3,
          quality: [49, 7, 1],
        },
        {
          type: 'chapter5.woodElf.sad',
          warmup: 6000,
          delay: 15000,
          max: 2,
          quality: [49, 7, 1],
        },
      ],
    },
    {
      description: '唤醒不安的艾米拉',
      monsters: [
        {
          type: 'chapter5.daughter.amira',
          warmup: 5000,
          total: 1,
        },
      ],
    },
  ],
  monsters: [],
  resetPrice: 210,
  level: 210,
  exp: 2200000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [95000, 150000],
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 200,
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 300,
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 500,
    },
    {
      type: 'ticket',
      rate: 1,
      dungeons: {
        'nightmare.1': 2,
        'nightmare.2': 1,
      },
    },
  ],
};
