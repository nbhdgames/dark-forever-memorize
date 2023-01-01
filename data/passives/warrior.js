/**
 * Created by tdzl2003 on 2/2/17.
 */

module.exports = [
  {
    key: 'atkByStr',
    name: '强力攻击',
    description: '用力攻击你的敌人。每点力量增加1%的攻击力。',
    hooks: {
      atkMul(world, value) {
        return value * (this.str / 100 + 1);
      },
    },
  },
  {
    key: 'rage',
    name: '怒气',
    description: '增加100点怒气上限。每次攻击增加5点怒气，每次受到攻击增加1点怒气。',
    hooks: {
      maxRp(world, value)  {
        return value + 100;
      },
      rpOnAttack(world, value) {
        return value + 5;
      },
      rpOnAttacked(world, value) {
        return value + 1;
      },
    },
  },
];
