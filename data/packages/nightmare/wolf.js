/**
 * Created by tdzl2003 on 27/08/2017.
 */

require('./base');

const { define, extend } = require('../util');

define('skills', 'nightmare.wolf.hunter', {
  name: '召唤陷阱',
  castTime: 25000,
  canUse(world, self) {
    return !world.units.find(v => v.type === 'nightmare.wolf.hunter.trigger');
  },
  effect(world, self, level) {
    world.addEnemy('nightmare.wolf.hunter.trigger', null, 0, self);
  },
});

define('enemies', 'nightmare.wolf.hunter', {
  name: '老练的猎人',
  description: '的',
  camp: 'shrine',
  race: 'unknown',
  career: 'melee',
  skills: [
    {
      key: 'nightmare.wolf.hunter',
      level: 0,
    },
  ],
});

define('enemies', 'nightmare.wolf.hunter.trigger', {
  name: '陷阱',
  description: '的',
  camp: 'shrine',
  race: 'unknown',
  career: 'melee',
  onPress(world) {
    for (const unit of world.units) {
      if (unit.type === 'nightmare.wolf.king') {
        unit.stun(5, 'stunned', true);
      }
    }
    this.kill();
  },
});

define('enemies', 'nightmare.wolf.healer', {
  name: '母狼',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 2500000,
  exp: 2400,
  atk: 2000,
  level: 250,
  atkSpeed: 0.6,
  skills: [
    {
      key: 'melee',
      level: 0,
    },
    {
      key: 'wolf.heal',
      level: 8000000,
    },
  ],
});

define('enemies', 'nightmare.wolf.minium', {
  name: '公狼',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 2500000,
  exp: 2400,
  atk: 2000,
  level: 250,
  atkSpeed: 0.6,
  skills: [
    {
      key: 'melee',
      level: 0,
    },
    {
      key: 'wolf.worry',
      level: 0,
    },
  ],
});

extend('skills', 'nightmare.wolf.1', 'wolf.call', {
  coolDown: 30000,
  notBreakable: true,
  canUse(origin) {
    return function(world, self) {
      if (self.runAttrHooks(100, 'bossState') > 75) {
        return false;
      }
      return origin.call(this, world, self);
    };
  },
  effect() {
    return function(world, self, level) {
      world.sendSkillUsage(self, null, this);
      world.addEnemy('nightmare.wolf.healer', null, 0, self);
      world.addEnemy('nightmare.wolf.minium', null, 0, self);
      world.addEnemy('nightmare.wolf.minium', null, 0, self);
    };
  },
});

extend('skills', 'nightmare.wolf.2', 'knight.melee1', {
  name: '爪击',
  coolDown: 2000,
  canUse(origin) {
    return function(world, self) {
      if (self.runAttrHooks(100, 'bossState') > 50) {
        return false;
      }
      return origin.call(this, world, self);
    };
  },
});

extend('skills', 'nightmare.wolf.3', 'rosa.angry', {
  name: '嗜血',
  canUse(origin) {
    return function(world, self) {
      if (self.runAttrHooks(100, 'bossState') > 25) {
        return false;
      }
      return origin.call(this, world, self);
    };
  },
});

define('enemies', 'nightmare.wolf.king', {
  name: '白鬃狼王',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 160000000,
  def: 100,
  allResist: 50,
  exp: 2400,
  atk: 20000,
  level: 250,
  atkSpeed: 0.8,
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
      key: 'nightmare.wolf.1',
      level: 0,
    },
    {
      key: 'nightmare.wolf.2',
      level: 0,
    },
    {
      key: 'nightmare.wolf.3',
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

define('maps', 'nightmare.wolf', {
  name: '噩梦-狼王',
  isDungeon: true,
  outside: 'home',
  group: 'nightmare.1',
  requirement: {
    stories: ['chapter3-7'],
    atLeastMaxLevel: 70,
  },
  phases: [
    {
      description: '击败噩梦中再次出现的狼王。',
      monsters: [
        {
          type: 'nightmare.wolf.hunter',
          max: 1,
          delay: 10,
        },
        {
          type: 'nightmare.wolf.king',
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
      position: 'weapon',
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 750,
      position: 'weapon',
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 1250,
      position: 'weapon',
    },
    {
      key: 'year2018.redbag',
      count: [1, 1],
      rate: 0.1,
    },
  ],
});
