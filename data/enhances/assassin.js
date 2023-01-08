/**
 * Created by tdzl2003 on 2/2/17.
 */

module.exports = [
  {
    key: 'assassin.sharp',
    name: '机敏信条',
    description: '增加25%闪避几率',
    hooks: {
      noDodgeRate(world, value) {
        return value * 0.75;
      },
    },
  },
  {
    key: 'assassin.speed',
    name: '迅捷信条',
    description: '增加25%基础能量恢复速度',
    hooks: {
      epRecovery(world, value) {
        return value * 1.25;
      },
    },
  },
  {
    key: 'assassin.dexBeleive',
    name: '离经叛道',
    description: '增加15%法术吸收',
    hooks: {
      fireAbsorb(world, value) {
        return value + 0.15;
      },
      darkAbsorb(world, value) {
        return value + 0.15;
      },
      coldAbsorb(world, value) {
        return value + 0.15;
      },
      lightningAbsorb(world, value) {
        return value + 0.15;
      },
    },
  },
  {
    key: 'assassin.protect',
    name: '自我保护',
    description: '每点敏捷也会为你增加1点护甲值',
    hooks: {
      def(world, value) {
        return value + this.dex;
      },
    },
  },
  {
    key: 'assassin.atkFromStr',
    name: '刃击',
    description: '每点力量也会为你增加0.75%伤害',
    hooks: {
      atkAdd(world, value) {
        return value + this.str * 0.0075;
      },
    },
  },
  {
    key: 'assassin.prevertDeath',
    name: '假死',
    description:
      '当你受到致命伤害时，阻挡该伤害，并恢复到10%的生命值，并在2秒内减少所受所有伤害的90%，该效果每30秒只能触发一次。',
    hooks: {
      damaged(world, value) {
        if (this.hp <= value) {
          if (
            this.buffs.filter((v) => v.type === 'assassin.prevertDeathCD')
              .length > 0
          ) {
            return value;
          }
          // 恢复到10%伤害
          this.hp = Math.max(this.hp, this.maxHp / 10);
          // 30秒内不能再次触发
          this.addBuff('assassin.prevertDeathCD', 30000);
          // 2秒内减少所受所有伤害的90%
          this.addBuff('assassin.prevertDeath', 2000);
          // 阻挡伤害
          return 0;
        }
        return value;
      },
    },
  },
];
