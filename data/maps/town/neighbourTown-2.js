/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'town.neighbourTown.3',
  name: '邻村村口',
  hint: '闻讯赶来的圣殿骑士团保卫了整个村子。',
  isDungeon: true,
  outside: 'town.neighbourTown',
  requirement: {
    stories: ['aleanor-stories-5'],
  },
  phases: [
    {
      description: '阻止骑士团对村民的屠杀。',
      monsters: [
        {
          type: 'knight.leader',
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'knight.normal',
      warmup: 1000,
      delay: 10000,
      max: 2,
      quality: [25, 5, 1],
    },
    {
      type: 'knight.normal',
      warmup: 1000,
      delay: 10000,
      max: 2,
      quality: [25, 5, 1],
    },
    {
      type: 'knight.prayer',
      warmup: 10000,
      delay: 30000,
      max: 2,
      quality: [25, 5, 1],
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 60,
  level: 60,
  exp: 120000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [5000, 10000],
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
  ],
};
