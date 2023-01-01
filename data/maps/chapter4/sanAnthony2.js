/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter4.sanAnthony2',
  name: '未知暗殿',
  hint: '小湖边的镇子，到处都是鱼人。',
  isDungeon: true,
  outside: 'chapter4.sanAnthony',
  requirement: {
    stories: ['chapter3-7'],
  },
  phases: [
    {
      description: '触动把手，打开秘密的通道。',
      monsters: [
        {
          type: 'chapter4.humans.trigger.1',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '进入下水道，揭开未知暗殿的奥秘。',
      monsters: [
        {
          type: 'chapter4.humans.trigger.2',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '通过陷阱阵。',
      monsters: [
        {
          type: 'chapter4.humans.trigger.3.1',
          max: 1,
          randomPosition: true,
          delay: 10,
          total: 1,
        },
        {
          type: 'chapter4.humans.trigger.3.2',
          max: 3,
          randomPosition: true,
          delay: 10,
          total: 3,
        },
        {
          type: 'chapter4.humans.trigger.3.3',
          max: 3,
          randomPosition: true,
          delay: 10,
          total: 3,
        },
        {
          type: 'chapter4.humans.trigger.3.4',
          max: 3,
          randomPosition: true,
          delay: 10,
          total: 3,
        },
      ],
    },
    {
      description: '击败守门人菲尔斯男爵',
      monsters: [
        {
          type: 'chapter4.humans.boss.fearas',
          max: 1,
          delay: 10,
          total: 1,
        },
      ],
    },
    {
      description: '打开监狱的牢笼，释放强大的邪恶',
      monsters: [
        {
          type: 'chapter4.humans.trigger.6',
          max: 1,
          warmup: 1000,
          delay: 10,
          total: 1,
        },
      ],
    },
    {
      description: '击败……哈？',
      monsters: [
        {
          type: 'chapter4.humans.boss.milhous',
          max: 1,
          delay: 10,
        },
        {
          type: 'chapter4.humans.trigger.6',
          max: 1,
          warmup: 2000,
          delay: 10,
          total: 1,
        },
      ],
    },
    {
      description: '击败解除封印的上古邪恶。',
      monsters: [
        {
          type: 'chapter4.humans.boss.evil',
          max: 1,
          delay: 10,
          total: 1,
        },
      ],
    },
  ],
  monsters: [],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 320,
  level: 160,
  exp: 2200000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [100000, 150000],
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 200,
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
      mfRate: 300,
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 500,
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 500,
    },
  ],
};
