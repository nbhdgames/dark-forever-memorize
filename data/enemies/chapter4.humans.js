/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'chapter4.humans.thief',
    name: '小偷',
    description: '',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 200000,
    atk: 1800,
    atkSpeed: 0.6,
    exp: 450,
    level: 134,
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
    key: 'chapter4.humans.rogue',
    name: '流氓',
    description: '会玩火的狗头人，还是好萌。\u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 280000,
    exp: 450,
    atk: 1800,
    level: 126,
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
    ],
  },
  {
    key: 'chapter4.humans.monster',
    name: '虚空行者',
    description: '',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 2000000,
    atk: 2500,
    atkSpeed: 0.4,
    level: 136,
    skills: [
      {
        key: 'darkElement.darkball',
        level: 0,
      },
      {
        key: 'summon.earth.comeToMe',
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
    key: 'chapter4.humans.seck',
    name: '罗兰·赛克',
    description: '手黑党的领袖',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 2400000,
    maxMp: 1000,
    mpRecovery: 20,
    hpRecovery: 2000,
    exp: 1500,
    atk: 4000,
    level: 140,
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
        key: 'chapter4.humans.seck.summonDarkSoul',
        level: 0,
      },
      {
        key: 'enemy.upgrade',
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
    key: 'chapter4.humans.women',
    name: '魅魔',
    description: '',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 2000000,
    atk: 4000,
    atkSpeed: 0.4,
    level: 136,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'chapter4.humans.women.thumpHead',
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
    key: 'chapter4.humans.seck1',
    name: '罗兰·赛克',
    description: '手黑党的领袖，丫用灵魂石复活了',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 2400000,
    maxMp: 1000,
    mpRecovery: 20,
    hpRecovery: 2000,
    exp: 1500,
    atk: 4000,
    level: 140,
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
        key: 'chapter4.humans.seck.summonWomen',
        level: 0,
      },
      {
        key: 'chapter4.humans.seck.healthDrill',
        level: 0,
      },
      {
        key: 'enemy.upgrade',
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
