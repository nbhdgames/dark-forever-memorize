/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'town.cave2',
  name: '洞窟深处',
  hint: '洞穴的底层，让人隐隐赶到不安。',
  isDungeon: true,
  outside: 'town.cave',
  requirement: {
    stories: ['eyer-stories-4'],
  },
  phases: [
    {
      description: '击败母体史莱姆，拯救亚莲娜。',
      monsters: [
        {
          type: 'slime.queen',
          total: 1,
        },
      ],
    },
  ],
  monsters: [
    {
      type: 'slime.minimal',
      warmup: 1000,
      delay: 10000,
      max: 2,
    },
    {
      type: 'slime.minimal',
      warmup: 6000,
      delay: 10000,
      max: 2,
    },
    {
      type: 'slime.giant.enemy',
      warmup: 10000,
      delay: 30000,
      max: 2,
    },
  ],
  coolDown: 24 * 3600 * 1000,
  maxCoolDownStack: 1,
  coolDownOffset: -4 * 3600 * 1000, // 凌晨4点更新
  resetPrice: 30,
  level: 30,
  exp: 5000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [1000, 2000],
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
