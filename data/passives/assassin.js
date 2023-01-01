/**
 * Created by tdzl2003 on 2/2/17.
 */

module.exports = [
  {
    key: 'atkByDex',
    name: '强力攻击',
    description: '攻击你的敌人的弱点。每点敏捷增加1%的攻击力。',
    hooks: {
      atkAdd(world, value) {
        return value + this.dex / 100;
      },
    },
  },
  {
    key: 'energy',
    name: '能量',
    description: '增加100点能量上限。增加10点能量恢复速度。',
    hooks: {
      maxEp(world, value) {
        return value + 100;
      },
      epRecovery(world, value) {
        return value + 5;
      },
    },
  },
];
