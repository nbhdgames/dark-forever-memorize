const { define, extend } = require('../util');

extend('skills', 'year2018.heal', 'wolf.heal', {
  canUse(origin) {
    return function (world, self) {
      const { summoner } = self;
      if (!summoner) {
        return false;
      }
      if (summoner.hp > summoner.maxHp * 0.25) {
        return false;
      }
      return true;
    };
  },
  effect() {
    return function (world, self, level) {
      const target = this.summoner;
      if (!target) {
        return;
      }
      world.sendSkillUsage(self, [target], this);
      target.hp += 10000000;
    };
  },
});

define('enemies', 'year2018.minimal.fire', {
  name: '火·年兽幼崽',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 25000000,
  exp: 3000,
  atk: 5000,
  level: 300,
  atkSpeed: 0.6,
  skills: [
    {
      key: 'melee',
      level: 0,
    },
    {
      key: 'shaman.fireball',
      level: 3,
    },
    {
      key: 'year2018.heal',
      level: 0,
    },
  ],
});

define('enemies', 'year2018.minimal.cold', {
  name: '冰·年兽幼崽',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 25000000,
  exp: 3000,
  atk: 5000,
  level: 300,
  atkSpeed: 0.6,
  skills: [
    {
      key: 'melee',
      level: 0,
    },
    {
      key: 'shaman.iceball',
      level: 3,
    },
    {
      key: 'year2018.heal',
      level: 0,
    },
  ],
});

define('enemies', 'year2018.minimal.lightning', {
  name: '电·年兽幼崽',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 25000000,
  exp: 3000,
  atk: 5000,
  level: 300,
  atkSpeed: 0.6,
  skills: [
    {
      key: 'melee',
      level: 0,
    },
    {
      key: 'shaman.chainingLightning',
      level: 3,
    },
    {
      key: 'year2018.heal',
      level: 0,
    },
  ],
});

extend('skills', 'year2018.shockWave', 'shockWave', {
  coolDown: 30000,
  canUse(origin) {
    return function (world, self) {
      if (self.runAttrHooks(100, 'bossState') > 75) {
        return false;
      }
      if (self.hp < self.maxHp * 0.25) {
        return false;
      }
      return origin ? origin(world, self) : true;
    };
  },
});

const MINIMALS = [
  'year2018.minimal.fire',
  'year2018.minimal.cold',
  'year2018.minimal.lightning',
];

extend('buffs', 'year2018.summonMinimal', 'murloc.thumpHead', {
  name: '呼唤幼崽',
  effect() {
    return function (world) {
      const enemy = MINIMALS[Math.floor(Math.random() * 3)];
      world.addEnemy(enemy, null, 0, this.unit);
    };
  },
});

extend('skills', 'year2018.summonMinimal', 'murloc.thumpHead', {
  name: '呼唤幼崽',
  castTime: 0,
  antiBreak: 0.9,
  canUse(origin) {
    return function (world, self) {
      if (self.runAttrHooks(100, 'bossState') > 50) {
        return false;
      }
      return origin ? origin(world, self) : true;
    };
  },
  effect() {
    return function (world, self, level) {
      self.startRead('year2018.summonMinimal', 5001, null, this);
    };
  },
});

define('enemies', 'year2018.boss', {
  name: '三头年兽',
  description: '不断变形着的黏液，会吞食周围的其它史莱姆。',
  camp: 'enemy',
  race: 'unknown',
  career: 'melee',
  maxHp: 800000000,
  def: 120,
  allResist: 75,
  exp: 3200,
  atk: 20000,
  level: 300,
  atkSpeed: 0.8,
  stunResist: 40000,
  skills: [
    {
      key: 'melee',
      level: 0,
    },
    {
      key: 'wolf.worry',
      level: 0,
    },
    {
      key: 'year2018.summonMinimal',
      level: 0,
    },
    {
      key: 'year2018.shockWave',
      level: 10,
    },
    {
      key: 'bossState',
      level: 75,
    },
    {
      key: 'bossState',
      level: 50,
    },
  ],
  hooks: {
    onSummonDeath() {
      this.addBuff('swordSkill', undefined, 0.01);
    },
    atkSpeedMul(world, value) {
      if (this.hp < this.maxHp * 0.25) {
        return value * 0.25;
      }
      return value;
    },
  },
});

define('maps', 'year2018.dungeon', {
  name: '年兽巢穴',
  isDungeon: true,
  outside: 'home',
  requirement: {},
  phases: [
    {
      description: '沿着阴森的小路前进，寻找年兽的踪迹。',
      monsters: [
        {
          types: {
            'year2018.minimal.fire': 1,
            'year2018.minimal.cold': 1,
            'year2018.minimal.lightning': 1,
          },
          warmup: 1000,
          delay: 6000,
          max: 4,
          total: 10,
        },
      ],
    },
    {
      description: '击败洞穴中的三头巨兽。',
      monsters: [
        {
          type: 'year2018.boss',
          delay: 1e9,
          total: 1,
        },
      ],
    },
  ],
  level: 300,
  exp: 15000000,
  loots: [
    {
      key: 'gold',
      rate: 1,
      count: [300000, 600000],
    },
    {
      type: 'specialEquip',
      rate: 1,
      items: [
        'year2018.yearBeastWeapon-1',
        'year2018.yearBeastWeapon-2',
        'year2018.yearBeastWeapon-3',
        'year2018.yearBeastPlastron-1',
        'year2018.yearBeastPlastron-2',
        'year2018.yearBeastTrousers-1',
        'year2018.yearBeastTrousers-2',
        'year2018.yearBeastHeart',
      ],
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 200,
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 300,
    },
    {
      type: 'equip',
      rate: 1,
      mfRate: 500,
    },
  ],
});
