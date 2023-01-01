/**
 * Created by tdzl2003 on 27/08/2017.
 */

require('./base');

const { define, extend } = require('../util');

define('enemies', 'nightmare.undead.minimal', {
  name: '重生的僵尸',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 5000000,
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

define('skills', 'nightmare.undead.1', {
  name: '毒爆',
  coolDown: 15000,
  castTime: 5000,
  antiBreak: 0.8,
  canUse(world, self) {
    const state = self.runAttrHooks(100, 'bossState');
    if (state > 75) {
      return false;
    }
    return !!world.units.find(v => v.type === 'nightmare.undead.minimal');
  },
  effect(world, self, level) {
    const minimal = world.units.find(
      v => v.type === 'nightmare.undead.minimal',
    );
    if (!minimal) {
      return;
    }
    const val = minimal.hp / 100;
    minimal.kill();
    for (const target of world.units.filter(v => self.willAttack(v))) {
      world.sendDamage('dark', self, target, this, val, false);
    }
  },
});

define('skills', 'nightmare.undead.2', {
  name: '暗影治疗',
  coolDown: 15000,
  castTime: 5000,
  antiBreak: 0.8,
  canUse(world, self) {
    const state = self.runAttrHooks(100, 'bossState');
    if (state > 50) {
      return false;
    }
    return !!world.units.find(v => v.type === 'nightmare.undead.minimal');
  },
  effect(world, self, level) {
    for (const target of world.units.filter(
      v => v.type === 'nightmare.undead.minimal',
    )) {
      world.sendHeal(self, target, this, target.maxHp);
    }
  },
});

define('skills', 'nightmare.undead.3', {
  name: '死亡一指',
  coolDown: 30000,
  castTime: 10000,
  antiBreak: 0.8,
  canUse(world, self) {
    const state = self.runAttrHooks(100, 'bossState');
    if (state > 20) {
      return false;
    }
    return true;
  },
  effect(world, self, level) {
    const target = world.playerUnit;
    if (target.camp !== 'ghost') {
      target.kill();
    }
  },
});

define('enemies', 'nightmare.undead.king', {
  name: '亡者统帅奈布',
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
      key: 'shaman.darkball',
      level: 0,
    },
    {
      key: 'nightmare.undead.1',
      level: 0,
    },
    {
      key: 'nightmare.undead.2',
      level: 0,
    },
    {
      key: 'nightmare.undead.3',
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

define('maps', 'nightmare.undead', {
  name: '噩梦-奈布',
  isDungeon: true,
  outside: 'home',
  group: 'nightmare.1',
  requirement: {
    stories: ['chapter3-7'],
    atLeastMaxLevel: 70,
  },
  phases: [
    {
      description: '击败噩梦中再次出现的死灵法师奈布。',
      monsters: [
        {
          type: 'nightmare.undead.minimal',
          max: 10,
          delay: 5000,
        },
        {
          type: 'nightmare.undead.king',
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
      position: 'gaiter',
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 750,
      position: 'gaiter',
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 1250,
      position: 'gaiter',
    },
    {
      key: 'year2018.redbag',
      count: [1, 1],
      rate: 0.1,
    },
  ],
});
