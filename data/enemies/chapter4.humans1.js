/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'chapter4.humans.soldier',
    name: '士兵',
    description: '',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 250000,
    atk: 2200,
    atkSpeed: 0.6,
    exp: 450,
    level: 144,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
    ],
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [50, 100],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 0.1,
        mfRate: 1,
      },
    ],
  },
  {
    key: 'chapter4.humans.musketeer',
    name: '火枪手',
    description: '',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 200000,
    atk: 1800,
    atkSpeed: 0.8,
    critRate: 0.3,
    critBonus: 2.5,
    exp: 450,
    level: 146,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
    ],
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [50, 100],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 0.1,
        mfRate: 1,
      },
    ],
  },
  {
    key: 'chapter4.humans.mortar',
    name: '迫击炮',
    description: '会玩火的狗头人，还是好萌。\u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 400000,
    exp: 450,
    atk: 5000,
    level: 148,
    atkSpeed: 0.2,
    skills: [
      {
        key: 'melee.aoe',
        level: 0,
      },
    ],
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [50, 100],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 0.15,
        mfRate: 1.5,
      },
      {
        type: 'ticket',
        rate: 0.005,
        dungeons: {
          'chapter4.westRolan1': 4,
          'chapter4.westRolan2': 2,
          'chapter4.sanAnthony1': 2,
          'chapter4.sanAnthony2': 1,
        },
      },
    ],
  },
  {
    key: 'chapter4.humans.knights.dare',
    name: '英勇骑士达尔',
    description: '手黑党的领袖，丫用灵魂石复活了',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 3600000,
    maxRp: 100,
    rpOnAttack: 10,
    rpOnAttacked: 1,
    exp: 1500,
    atk: 4000,
    level: 150,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'meleeForRage',
        level: 4,
      },
      {
        key: 'thump',
        level: 2,
      },
      {
        key: 'mortalStrike',
        level: 5,
      },
      {
        key: 'enemy.upgrade',
        level: 0,
      },
    ],
    stunResist: 4000,
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [500, 1000],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 1,
        mfRate: 2,
      },
    ],
  },
  {
    key: 'chapter4.humans.knights.light',
    name: '光明骑士莱特',
    description: '手黑党的领袖，丫用灵魂石复活了',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 3600000,
    exp: 1500,
    atk: 3000,
    level: 150,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'knight.melee',
        level: 4,
      },
      {
        key: 'knight.glory.enemy',
        level: 0,
      },
      {
        key: 'enemy.upgrade',
        level: 0,
      },
    ],
    hooks: {
      displayCpBar(world, value) {
        return true;
      },
    },
    stunResist: 4000,
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [500, 1000],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 1,
        mfRate: 2,
      },
    ],
  },
  {
    key: 'chapter4.humans.knights.blood',
    name: '鲜血骑士布莱德',
    description: '手黑党的领袖，丫用灵魂石复活了',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 3600000,
    exp: 1500,
    atk: 3000,
    level: 150,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'knight.sacrifice',
        level: 4,
      },
      {
        key: 'knight.thump',
        level: 2,
      },
      {
        key: 'enemy.upgrade',
        level: 0,
      },
    ],
    stunResist: 4000,
    hooks: {
      displayCpBar(world, value) {
        return true;
      },
    },
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [500, 1000],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 1,
        mfRate: 2,
      },
    ],
  },
  {
    key: 'chapter4.humans.knights.sanction',
    name: '制裁骑士山新',
    description: '手黑党的领袖，丫用灵魂石复活了',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 3600000,
    exp: 1500,
    atk: 4000,
    level: 150,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'swordSkill',
        level: 4,
      },
      {
        key: 'knight.kick',
        level: 0,
      },
      {
        key: 'knight.thumpHead.enemy',
        level: 0,
      },
      {
        key: 'enemy.upgrade',
        level: 0,
      },
    ],
    stunResist: 4000,
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [500, 1000],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 1,
        mfRate: 2,
      },
    ],
  },
  {
    key: 'chapter4.humans.knights.rage',
    name: '全能骑士雷格',
    description: '手黑党的领袖，丫用灵魂石复活了',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 3600000,
    maxRp: 100,
    rpRecovery: 1,
    rpOnAttack: 10,
    rpOnAttacked: 3,
    exp: 1500,
    atk: 4000,
    level: 150,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'cleave',
        level: 4,
      },
      {
        key: 'thump',
        level: 2,
      },
      {
        key: 'shockWave',
        level: 0,
      },
      {
        key: 'commandShout',
        level: 0,
      },
      {
        key: 'enemy.upgrade',
        level: 0,
      },
    ],
    stunResist: 4000,
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [500, 1000],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 1,
        mfRate: 2,
      },
    ],
  },
];
