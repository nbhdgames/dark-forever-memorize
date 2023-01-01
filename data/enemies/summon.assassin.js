/**
 * Created by tdzl2003 on 4/26/17.
 */

module.exports = [
  {
    key: 'summon.assassin.puppet',
    name: '活动假人',
    description: '哈哈哈哈，来打我啊',
    camp: 'alien',
    race: 'unknown',
    career: 'melee',
    maxHp: 10,
    skills: [
      {
        key: 'summon.puppet.comeToMe',
        level: 0,
      },
    ],
    hooks: {
      maxHp(world, value) {
        if (!this.summoner) {
          return 0;
        }
        return this.summoner.maxHp * 0.5;
      },
    },
  },
];
