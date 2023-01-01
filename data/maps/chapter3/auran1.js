/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'chapter3.auran1',
  name: '湖畔镇',
  hint: '小湖边的镇子，到处都是鱼人。',
  isDungeon: true,
  outside: 'chapter3.auran',
  requirement: {
    stories: ['chapter3-7'],
  },
  phases: [
    {
      description: '击败鱼人督军，拯救被鱼人袭击的当地村民。',
      monsters: [
        {
          type: 'chapter3.murloc.warlord',
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'chapter3.murloc.minions',
      warmup: 1000,
      delay: 10000,
      max: 3,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter3.murloc.minions',
      warmup: 1000,
      delay: 10000,
      max: 3,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter3.murloc.shaman',
      warmup: 6000,
      delay: 20000,
      max: 2,
      quality: [25, 5, 1],
    },
    {
      type: 'chapter3.murloc.shaman',
      warmup: 14000,
      delay: 20000,
      max: 2,
      quality: [25, 5, 1],
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 90,
  level: 90,
  exp: 300000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [18000, 30000],
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
