/**
 * Created by tdzl2003 on 2/3/17.
 */

module.exports = [
  {
    key: 'stronger',
    name: '强壮的',
    hooks: {
      maxHpMul: (world, value) => value * 1.5,
      atkMul: (world, value) => value * 1.5,
    },
  },
  {
    key: 'faster',
    name: '快速的',
    hooks: {
      atkSpeedMul: (world, value) => value * 2,
    },
  },
  {
    key: 'recover',
    name: '自愈的',
    hooks: {
      hpRecovery(world, value) {
        return value + this.maxHp * 0.005;
      },
    },
  },
];
