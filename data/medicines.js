/**
 * Created by tdzl2003 on 02/06/2017.
 */

module.exports = [
  {
    key: 'mainPoint',
    name: '根骨药剂',
    description: level => `全部主属性增加${level * 5}点`,
    hooks: {
      str: (level, value) => value + level * 5,
      dex: (level, value) => value + level * 5,
      int: (level, value) => value + level * 5,
      sta: (level, value) => value + level * 5,
    },
  },
  {
    key: 'lucky',
    name: '幸运药剂',
    description: level => `运气增加${level * 5}点`,
    hooks: {
      gf: (level, value) => value + level * 0.05,
      mf: (level, value) => value + level * 0.05,
    },
  },
  {
    key: 'exp',
    name: '知识药剂',
    description: level => `经验获得增加${level * 5}%`,
    hooks: {
      expMul: (level, value) => value * (1 + level * 0.05),
    },
  },
  {
    key: 'skill',
    name: '训练药剂',
    description: level => `技能提升速度增加${level * 5}%`,
    hooks: {
      skillExpMul: (level, value) => value * (1 + level * 0.05),
    },
  },
  {
    key: 'recovery',
    name: '自愈药剂',
    description: level => `每5秒恢复${level}%生命值`,
    hooks: {
      hpRecovery(level, value) {
        return value + level * this.maxHp * 0.002;
      }
    }
  },
  {
    key: 'speed',
    name: '急速药剂',
    description: level => `行动速度提升${level}%`,
    hooks: {
      speedRateMul: (level, value) => value * (1 + level * 0.01),
    }
  },
];
