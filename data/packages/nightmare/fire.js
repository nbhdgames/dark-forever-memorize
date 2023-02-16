/**
 * Created by tdzl2003 on 27/08/2017.
 */

require('./base');

const { define, extend } = require('../util');

define('skills', 'nightmare.fire.kakarif.1', {
  name: '地震',
  coolDown: 15000,
  castTime: 1000,
  notBreakable: true,
  canUse(world, self) {
    return true;
  },
  effect(world, self, level) {
    for (const target of world.units.filter((v) => self.willAttack(v))) {
      world.sendDamage('melee', self, target, this, self.atk, true);
    }
  },
});

define('skills', 'nightmare.fire.kakarif.2', {
  name: '火狱之楔',
  coolDown: 30000,
  castTime: 1000,
  notBreakable: true,
  canUse(world, self) {
    if (self.runAttrHooks(100, 'bossState') > 75) {
      return false;
    }
    return true;
  },
  effect(world, self, level) {
    let dmg = self.atk;
    for (const target of world.units.filter(
      (v) => v.type === 'nightmare.fire.minimal'
    )) {
      target.kill();
      dmg += self.atk;
    }
    for (let i = 0; i < 8; i++) {
      world.addEnemy('nightmare.fire.minimal', null, 0, self);
    }
    for (const target of world.units.filter((v) => self.willAttack(v))) {
      world.sendDamage('fire', self, target, this, dmg / 2, true);
    }
  },
});

define('buffs', 'nightmare.fire.kakarif.3', {
  name: '烈焰之子',
  effectInterval: 500,
  effect(world) {
    world.addEnemy('nightmare.fire.minimal1', null, 0, this.unit);
  },
});

define('skills', 'nightmare.fire.kakarif.3', {
  name: '烈焰之子',
  coolDown: 30000,
  notBreakable: true,
  canUse(world, self) {
    if (self.runAttrHooks(100, 'bossState') > 50) {
      return false;
    }
    return true;
  },
  effect(world, self, level) {
    self.startRead('nightmare.fire.kakarif.3', 10000, null, this);
  },
});

define('buffs', 'nightmare.fire.kakarif.4', {
  name: '元素怒火',
  effectInterval: 1000,
  effect(world) {
    world.sendDamage('fire', null, this.unit, null, this.arg, false);
  },
});

define('skills', 'nightmare.fire.kakarif.4', {
  name: '元素怒火',
  coolDown: 30000,
  castTime: 1000,
  notBreakable: true,
  canUse(world, self) {
    if (self.runAttrHooks(100, 'bossState') > 50) {
      return false;
    }
    return !!self.target;
  },
  effect(world, self, level) {
    const { target } = self;
    world.sendSkillUsage(self, [target], this);
    target.addBuff('nightmare.fire.kakarif.4', 10000, self.atk, null);
  },
});

define('skills', 'nightmare.fire.kakarif.5', {
  name: '卡卡列夫之怒',
  description: '增加300%攻击速度，持续6秒。',
  targetType: 'target',
  castTime: 2000,
  coolDown: 30000,
  nonBreakable: true,
  canUse(world, self) {
    if (self.runAttrHooks(100, 'bossState') > 25) {
      return false;
    }
    return !!self.target;
  },
  effect(world, self, level) {
    self.addBuff('kakarif.mad', 6000, null, 'kakarif.mad');
  },
});

define('enemies', 'nightmare.fire.minimal', {
  name: '火狱之楔',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 15000000,
  exp: 2400,
  atk: 3000,
  level: 285,
  atkSpeed: 0.6,
  skills: [],
});

define('enemies', 'nightmare.fire.minimal1', {
  name: '卡卡列夫之子',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 15000000,
  exp: 2400,
  atk: 3000,
  level: 285,
  atkSpeed: 0.6,
  skills: [
    {
      key: 'fireElement.fireball',
      level: 0,
    },
  ],
});

define('enemies', 'nightmare.fire.kakarif', {
  name: '烈焰领主卡卡列夫',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 160000000,
  def: 100,
  allResist: 50,
  exp: 2400,
  atk: 25000,
  level: 285,
  atkSpeed: 0.4,
  skills: [
    {
      key: 'kakarif.melee',
      level: 0,
    },
    {
      key: 'nightmare.fire.kakarif.1',
      level: 0,
    },
    {
      key: 'nightmare.fire.kakarif.2',
      level: 0,
    },
    {
      key: 'nightmare.fire.kakarif.3',
      level: 0,
    },
    {
      key: 'nightmare.fire.kakarif.4',
      level: 0,
    },
    {
      key: 'nightmare.fire.kakarif.5',
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

define('maps', 'nightmare.fire', {
  name: '噩梦-卡卡列夫',
  isDungeon: true,
  isEndless: true,
  outside: 'home',
  group: 'nightmare.2',
  requirement: {
    stories: ['chapter3-7'],
    atLeastMaxLevel: 70,
  },
  phases: [
    {
      description: '击败噩梦中再次出现的烈焰领主卡卡列夫。',
      monsters: [
        {
          type: 'nightmare.fire.kakarif',
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
