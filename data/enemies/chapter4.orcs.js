/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'chapter4.orcs.warrior',
    name: '兽人战士',
    description: '',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 150000,
    atk: 1200,
    atkSpeed: 0.4,
    exp: 300,
    level: 124,
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
        count: [30, 80],
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
    key: 'chapter4.orcs.hunter',
    name: '兽人驯狼师',
    description: '会玩火的狗头人，还是好萌。\u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 200000,
    maxEp: 50,
    epRecovery: 2,
    exp: 450,
    atk: 1000,
    level: 126,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'orcs.summonWolf',
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
        count: [30, 80],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 0.15,
        mfRate: 1.5,
      },
      {
        type: 'ticket',
        rate: 0.002,
        dungeons: {
          'chapter3.auran4': 4,
          'chapter4.westRolan1': 2,
          'chapter4.westRolan2': 1,
        },
      },
    ],
  },
  {
    key: 'chapter3.orcs.wolf',
    name: '野狼',
    description: '',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 100000,
    atk: 1200,
    atkSpeed: 0.6,
    level: 126,
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
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
    ],
  },
  {
    key: 'chapter3.orcs.totem',
    name: '治疗图腾',
    description: '',
    camp: 'neutral',
    race: 'unknown',
    career: 'melee',
    maxHp: 30000,
    atk: 1200,
    atkSpeed: 0.6,
    level: 126,
    skills: [
      {
        key: 'totem.heal',
        level: 0,
      },
    ],
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
    ],
  },
  {
    key: 'chapter3.orcs.shaman',
    name: '萨布罗·霜狼',
    description: '兽人霜狼氏族领袖',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 2400000,
    hpRecovery: 1500,
    exp: 1800,
    atk: 2000,
    level: 130,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'shaman.chainingLightning',
        level: 0,
      },
      {
        key: 'orcs.summonHealToken',
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
