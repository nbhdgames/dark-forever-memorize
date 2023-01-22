/**
 * Created by tdzl2003 on 2/3/17.
 */

module.exports = [
  {
    key: 'assassin.cutting',
    name: '切割',
    description: '增加攻击速度和能量恢复速度',
    hooks: {
      atkSpeed(value) {
        return this.arg * value;
      },
      epRecoveryMul(value) {
        return this.arg * value;
      },
    },
  },
  {
    key: 'assassin.Ambush',
    name: '伏击',
    notRemoveWhenTransform: true,
    description: '不能再次被伏击',
    hooks: {
      isAmbushed(value) {
        return true;
      },
    },
  },
  {
    key: 'assassin.dodge',
    name: '闪避',
    description: '几率闪避所有攻击',
    hooks: {
      noDodgeRate(value) {
        return value / this.arg;
      },
    },
  },
  {
    key: 'assassin.prevertDeath',
    name: '假死',
    description: '减少所受所有伤害的90%',
    hooks: {
      willDamaged(value) {
        return value * 0.1;
      },
    },
  },
  {
    key: 'assassin.prevertDeathCD',
    name: '假死冷却',
    description: '最近激活过了假死，不能再次激活',
    hooks: {},
  },
];
