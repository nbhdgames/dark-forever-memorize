/**
 * Created by tdzl2003 on 27/08/2017.
 */

require('./base');

const { define, extend } = require('../util');

extend('buffs', 'nightmare.knight.buff.1', 'manaShield', {
  name: '盾墙',
  hooks: {
    hasShield() {
      return function(val) {
        return true;
      };
    },
  },
});

define('buffs', 'nightmare.knight.buff.2', {
  name: '盾姿',
  hooks: {
    hasShield() {
      return true;
    },
    willDamaged(val, from, type) {
      if (type === 'melee') {
        return val / 4;
      }
      return val;
    },
  },
});

define('buffs', 'nightmare.knight.buff.3', {
  name: '盾反',
  hooks: {
    hasShield() {
      return true;
    },
    willDamaged(val, from, type) {
      if (type !== 'melee' && type !== 'real') {
        return 0;
      }
      return val;
    },
  },
});

const names = ['盾墙', '盾姿', '盾反'];

for (let i = 1; i <= 3; i++) {
  define('skills', `nightmare.knight.${i}`, {
    name: names[i],
    castTime: 300,
    coolDown: 30000,
    antiBreak: 0.5,
    canUse(world, self) {
      if (self.runAttrHooks(100, 'bossState') > 75) {
        return false;
      }
      return !self.runAttrHooks(false, 'hasShield');
    },
    effect(world, self, level) {
      self.addBuff(`nightmare.knight.buff.${i}`, 10000, 80000000);
    },
  });
}

extend('skills', 'nightmare.knight.4', 'knight.melee1', {
  canUse(origin) {
    return function(world, self) {
      if (self.runAttrHooks(100, 'bossState') > 50) {
        return false;
      }
      return origin(world, self);
    };
  },
});

extend('skills', 'nightmare.knight.5', 'knight.deserve', {
  canUse(origin) {
    return function(world, self) {
      if (self.runAttrHooks(100, 'bossState') > 50) {
        return false;
      }
      return origin(world, self);
    };
  },
});

extend('skills', 'nightmare.knight.6', 'knight.heal', {
  antiBreak: 0.5,
  canUse(origin) {
    return function(world, self) {
      if (self.runAttrHooks(100, 'bossState') > 50) {
        return false;
      }
      return origin(world, self);
    };
  },
  effect() {
    return function(world, self, level) {
      world.sendSkillUsage(self, [self], this);
      self.hp += 40000000;
    };
  },
});

extend('skills', 'nightmare.knight.7', 'knight.thumpHead.enemy', {
  canUse(origin) {
    return function(world, self) {
      if (self.runAttrHooks(100, 'bossState') > 25) {
        return false;
      }
      return origin(world, self);
    };
  },
});

extend('skills', 'nightmare.knight.8', 'shockWave', {
  name: '神圣愤怒',
  castTime: 3000,
  antiBreak: 0.5,
  canUse(origin) {
    return function(world, self) {
      if (self.runAttrHooks(100, 'bossState') > 25) {
        return false;
      }
      return origin(world, self);
    };
  },
});

define('enemies', 'nightmare.knight.boss', {
  name: '皇家骑士队长卡罗',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 640000000,
  def: 100,
  allResist: 50,
  exp: 2400,
  atk: 25000,
  level: 285,
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
      key: 'nightmare.knight.1',
      level: 0,
    },
    {
      key: 'nightmare.knight.2',
      level: 0,
    },
    {
      key: 'nightmare.knight.3',
      level: 0,
    },
    {
      key: 'nightmare.knight.4',
      level: 0,
    },
    {
      key: 'nightmare.knight.5',
      level: 0,
    },
    {
      key: 'nightmare.knight.6',
      level: 0,
    },
    {
      key: 'nightmare.knight.7',
      level: 0,
    },
    {
      key: 'nightmare.knight.8',
      level: 6,
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
  stunResist: 40000,
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

define('maps', 'nightmare.knight', {
  name: '噩梦-卡罗',
  isDungeon: true,
  outside: 'home',
  group: 'nightmare.2',
  requirement: {
    stories: ['chapter3-7'],
    atLeastMaxLevel: 70,
  },
  phases: [
    {
      description: '击败噩梦中再次出现的皇家骑士队长卡罗。',
      monsters: [
        {
          type: 'nightmare.knight.boss',
          total: 1,
        },
      ],
    },
  ],
  stunResist: 10000,
  resetPrice: 285,
  level: 285,
  exp: 10000000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [250000, 500000],
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
