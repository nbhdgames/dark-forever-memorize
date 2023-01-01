/**
 * Created by tdzl2003 on 5/6/17.
 */

module.exports = [
  {
    key: 'shrine.energy',
    name: '能量圣殿',
    description: '恢复能量速度提高',
    hooks: {
      mpRecovery(value) {
        return value + this.unit.maxMp * 0.1;
      },
      rpReceiveMul(value) {
        return value * 3;
      },
      epRecoveryMul(value) {
        return value * 3;
      },
    },
  },
  {
    key: 'shrine.power',
    name: '威能圣殿',
    description: '恢复能量速度提高',
    hooks: {
      atkMul(value) {
        return value * 1.5;
      },
      dmgMul(value) {
        return value * 1.5;
      },
    },
  },
];
