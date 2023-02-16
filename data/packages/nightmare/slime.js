/**
 * Created by tdzl2003 on 27/08/2017.
 */

require('./base');

const { define, extend } = require('../util');

define('buffs', 'nightmare.slime.queen.debuff.1', {
  name: '粘液',
  description: '所有行动减缓20%。',
  hooks: {
    speedRateMul: (val) => val * 0.8,
  },
});

extend('buffs', 'nightmare.slime.queen.buff.1', 'manaShield', {
  name: '黏性外壳',
  hooks: {
    hasShield() {
      return function (val) {
        return true;
      };
    },
  },
});

define('skills', 'nightmare.slime.queue.1', {
  name: '粘液',
  coolDown: 10000,
  castTime: 300,
  canUse(world, self) {
    return true;
  },
  effect(world, self, level) {
    for (const target of world.units.filter((v) => self.willAttack(v))) {
      world.sendDamage('melee', self, target, this, 5000, true);
      target.addBuff('nightmare.slime.queen.debuff.1', 5000);
    }
  },
});

define('buffs', 'nightmare.slime.queue.2', {
  name: '组合',
  hooks: {},
  willRemove(world) {
    let value = 1000000;
    for (const unit of world.units) {
      if (unit.type === 'nightmare.slime.minium') {
        unit.kill();
        value += 1500000;
      }
    }
    this.unit.addBuff('nightmare.slime.queen.buff.1', null, value);
  },
});

define('skills', 'nightmare.slime.queue.2', {
  name: '分裂',
  castTime: 300,
  notBreakable: true,
  canUse(world, self) {
    return !self.runAttrHooks(false, 'hasShield');
  },
  effect(world, self, level) {
    for (let i = 0; i < 10; i++) {
      world.addEnemy('nightmare.slime.minium', null, 0, self);
    }
    self.startRead('nightmare.slime.queue.2', 15000);
  },
});

define('skills', 'nightmare.slime.queue.3', {
  name: '召唤组合体',
  castTime: 300,
  coolDown: 15000,
  notBreakable: true,
  canUse(world, self) {
    return self.runAttrHooks(100, 'bossState') <= 50;
  },
  effect(world, self, level) {
    world.addEnemy('nightmare.slime.minium1', null, 0, self);
  },
});

define('skills', 'nightmare.slime.queue.3.1', {
  name: '组合',
  castTime: 10000,
  notBreakable: true,
  effect(world, self, level) {
    for (const unit of world.units) {
      if (unit.type === 'nightmare.slime.queen') {
        unit.hp += unit.maxHp / 4;
      }
    }
    self.kill();
  },
});

define('skills', 'nightmare.slime.queue.4', {
  name: '召唤不稳定的组合体',
  castTime: 300,
  coolDown: 15000,
  notBreakable: true,
  canUse(world, self) {
    return self.runAttrHooks(100, 'bossState') === 20;
  },
  effect(world, self, level) {
    world.addEnemy('nightmare.slime.minium2', null, 0, self);
  },
});

define('skills', 'nightmare.slime.queue.4.1', {
  name: '不稳定的组合',
  castTime: 10000,
  notBreakable: true,
  effect(world, self, level) {
    for (const unit of world.units) {
      if (unit.type === 'nightmare.slime.queen') {
        unit.hp += unit.maxHp / 4;
        self.addBuff('enemy.upgrade');
        self.addBuff('enemy.upgrade');
      }
    }
    self.kill();
  },
});

define('enemies', 'nightmare.slime.minium', {
  name: '巨型史莱姆',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 2500000,
  exp: 2400,
  atk: 3000,
  level: 250,
  atkSpeed: 0.6,
  skills: [
    {
      key: 'melee',
      level: 0,
    },
  ],
});

define('enemies', 'nightmare.slime.minium1', {
  name: '史莱姆组合体',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 16000000,
  exp: 2400,
  atk: 2000,
  level: 250,
  atkSpeed: 0.6,
  skills: [
    {
      key: 'nightmare.slime.queue.3.1',
      level: 0,
    },
  ],
});

define('enemies', 'nightmare.slime.minium2', {
  name: '史莱姆组合体',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 16000000,
  exp: 2400,
  atk: 2000,
  level: 250,
  atkSpeed: 0.6,
  skills: [
    {
      key: 'nightmare.slime.queue.4.1',
      level: 0,
    },
  ],
});

define('enemies', 'nightmare.slime.queen', {
  name: '史莱姆王后',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 80000000,
  def: 100,
  allResist: 50,
  exp: 2400,
  atk: 15000,
  level: 250,
  atkSpeed: 0.6,
  skills: [
    {
      key: 'melee',
      level: 0,
    },
    {
      key: 'enemy.upgrade',
      level: 0,
    },
    {
      key: 'nightmare.slime.queue.1',
      level: 0,
    },
    {
      key: 'nightmare.slime.queue.2',
      level: 0,
    },
    {
      key: 'nightmare.slime.queue.3',
      level: 0,
    },
    {
      key: 'nightmare.slime.queue.4',
      level: 0,
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
  hooks: {
    appeared(world, value) {
      this.addBuff('nightmare.slime.queen.buff.1', null, 16000000);
    },
  },
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

define('maps', 'nightmare.slime', {
  name: '噩梦-母体史莱姆',
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
      description: '击败噩梦中再次出现的母体史莱姆。',
      monsters: [
        {
          type: 'nightmare.slime.queen',
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
      position: 'plastron',
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 750,
      position: 'plastron',
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 1250,
      position: 'plastron',
    },
    {
      key: 'year2018.redbag',
      count: [1, 1],
      rate: 0.1,
    },
  ],
});
