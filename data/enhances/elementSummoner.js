/**
 * Created by tdzl2003 on 3/7/17.
 */

module.exports = [
  {
    key: 'summonCount',
    name: '召唤大师',
    description: '每种元素可以多召唤一个。',
    hooks: {
      summonCount(world, value) {
        return value + 1;
      },
    },
  },
  {
    key: 'longLive',
    name: '召唤技巧',
    description: '召唤物的持续时间延长10秒。',
    hooks: {
      summonTime(world, value) {
        return value + 10000
      },
    },
  },
  {
    key: 'summonBack',
    name: '法力回流',
    description: '召唤物死亡时，恢复50%的技能消耗。',
    hooks: {
      summonBack(world, value) {
        return true
      },
    },
  },
];
