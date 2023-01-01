/**
 * Created by tdzl2003 on 27/08/2017.
 */

const { define, extend } = require('../util');

define('buffs', 'bossState', {
  name: 'BOSS阶段',
  hidden: true,
  description: 'BOSS阶段',
  hooks: {
    bossState(value) {
      return this.arg;
    }
  },
});

define('skills', 'bossState', {
  name: '转换阶段',
  group: 'boss',
  description: 'BOSS转换阶段',
  coolDown: 1,
  maxExp: (level) => 0,
  canUse(world, self, level) {
    if (self.runAttrHooks(100, 'bossState') <= level) {
      return false;
    }
    const cur = self.hp / self.maxHp * 100;
    return cur <= level;
  },
  effect(world, self, level) {
    self.addBuff('bossState', null, level, 'bossState');
  }
});
