/**
 * Created by tdzl2003 on 27/08/2017.
 */

require('./base');

const { define, extend } = require('../util');

define('enemies', 'nightmare.kobold.candle', {
  name: '安全牌蜡烛',
  description: '一根蜡烛。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 2500000,
  exp: 0,
  atk: 8000,
  level: 1,
  atkSpeed: 0.4,
  skills: [
    {
      key: 'nightmare.kobold.bomb',
      level: 0,
    },
  ],
});

extend('skills', 'nightmare.kobold.bomb', 'bomb', {
  notBreakable: true,
});

extend('skills', 'nightmare.kobold.bomb1', 'bomb', {
  notBreakable: true,
  effect(origin) {
    return function (world, self, level) {
      const targets = world.units.filter((v) => self.canAttack(v));
      targets.forEach((target) => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        world.sendDamage('fire', self, target, this, self.atk, false);
        target.stun(5000);
      });
      self.kill();
    };
  },
});

define('enemies', 'nightmare.kobold.candle.1', {
  name: '安全牌大蜡烛',
  description: '一根蜡烛。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 2500000,
  exp: 0,
  atk: 8000,
  level: 1,
  atkSpeed: 0.4,
  skills: [
    {
      key: 'nightmare.kobold.bomb1',
      level: 0,
    },
  ],
});

extend('skills', 'nightmare.kobold.1', 'candle.call', {
  coolDown: 30000,
  canUse(origin) {
    return function (world, self) {
      if (self.runAttrHooks(100, 'bossState') <= 50) {
        return false;
      }
      return origin.call(this, world, self);
    };
  },
  effect(origin) {
    return function (world, self, level) {
      world.sendSkillUsage(self, null, this);
      world.addEnemy('nightmare.kobold.candle', null, 0, self);
    };
  },
});

extend('skills', 'nightmare.kobold.3', 'candle.call', {
  name: '驱散更多暗影',
  coolDown: 30000,
  canUse(origin) {
    return function (world, self) {
      if (self.runAttrHooks(100, 'bossState') > 50) {
        return false;
      }
      return origin.call(this, world, self);
    };
  },
  effect(origin) {
    return function (world, self, level) {
      world.sendSkillUsage(self, null, this);
      world.addEnemy('nightmare.kobold.candle.1', null, 0, self);
    };
  },
});

define('enemies', 'nightmare.kobold.altar', {
  name: '火焰祭坛',
  camp: 'shrine',
  race: 'unknown',
  career: 'melee',
  atk: 8000,
  onPress(world) {
    for (const unit of world.units) {
      if (unit.camp === 'player' || unit.camp === 'alien') {
        world.sendDamage('fire', this, unit, null, this.atk);
      }
    }
    this.kill();
  },
});

define('buffs', 'nightmare.kobold.2.1', {
  name: '火焰献祭',
});

define('buffs', 'nightmare.kobold.2.3', {
  name: '更多火焰献祭',
});

define('buffs', 'nightmare.kobold.2.2', {
  name: '火焰献祭',
  didRemove(world) {
    for (const unit of world.units) {
      if (unit.camp === 'player' || unit.camp === 'alien') {
        world.sendDamage('fire', this.unit, unit, null, this.atk * 5);
      }
    }
    this.unit.kill();
  },
});

define('skills', 'nightmare.kobold.2', {
  name: '火焰献祭',
  coolDown: 15000,
  notBreakable: true,
  canUse(world, self) {
    const state = self.runAttrHooks(100, 'bossState');
    if (state <= 20 || state > 75) {
      return false;
    }
    return !!world.units.find((v) => v.key === 'nightmare.kobold.altar');
  },
  effect(world, self, level) {
    const target = world.units.find((v) => v.type === 'nightmare.kobold.altar');
    target.startRead('nightmare.kobold.2.2', 5000, null, this);
    self.startRead('nightmare.kobold.2.1', 5000, null, this);
  },
});

define('skills', 'nightmare.kobold.4', {
  name: '更多火焰献祭',
  coolDown: 15000,
  notBreakable: true,
  canUse(world, self) {
    if (self.runAttrHooks(100, 'bossState') > 20) {
      return false;
    }
    return !!world.units.find((v) => v.type === 'nightmare.kobold.altar');
  },
  effect(world, self, level) {
    for (const target of world.units.filter(
      (v) => v.type === 'nightmare.kobold.altar'
    )) {
      target.startRead('nightmare.kobold.2.2', 5000, null, this);
    }
    self.startRead('nightmare.kobold.2.3', 5000, null, this);
  },
});

define('enemies', 'nightmare.kobold.king', {
  name: '金牙大王',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 160000000,
  def: 100,
  allResist: 50,
  exp: 2400,
  atk: 10000,
  level: 250,
  atkSpeed: 0.4,
  skills: [
    {
      key: 'melee',
      level: 0,
    },
    {
      key: 'shaman.fireball',
      level: 0,
    },
    {
      key: 'nightmare.kobold.1',
      level: 0,
    },
    {
      key: 'nightmare.kobold.2',
      level: 0,
    },
    {
      key: 'nightmare.kobold.3',
      level: 0,
    },
    {
      key: 'nightmare.kobold.4',
      level: 0,
    },
    {
      key: 'enemy.upgrade',
      level: 0,
    },
    {
      key: 'bossState',
      level: 75,
    },
    {
      key: 'bossState',
      level: 50,
    },
    {
      key: 'bossState',
      level: 20,
    },
  ],
  stunResist: 20000,
  loots: [
    {
      key: 'gold',
      count: [1, 100],
      rate: 0.25,
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 2,
    },
  ],
});

define('maps', 'nightmare.kobold', {
  name: '噩梦-金牙',
  isDungeon: true,
  isEndless: true,
  outside: 'home',
  group: 'nightmare.1',
  requirement: {
    stories: ['chapter3-7'],
    atLeastMaxLevel: 70,
  },
  phases: [
    {
      description: '击败噩梦中再次出现的狗头人金牙。',
      monsters: [
        {
          type: 'nightmare.kobold.altar',
          max: 5,
          delay: 3000,
        },
        {
          type: 'nightmare.kobold.king',
          total: 1,
        },
      ],
    },
  ],
  stunResist: 10000,
  resetPrice: 250,
  level: 250,
  exp: 5000000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [150000, 250000],
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 500,
      position: 'ornament',
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 750,
      position: 'ornament',
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 1250,
      position: 'ornament',
    },
    {
      key: 'year2018.redbag',
      count: [1, 1],
      rate: 0.1,
    },
  ],
});
