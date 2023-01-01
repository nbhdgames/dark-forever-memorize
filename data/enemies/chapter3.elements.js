/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'chapter3.element.fire',
    name: '火焰精灵',
    description: '一团跳动的火焰',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    skills: [
      {
        key: 'fireElement.fireball',
        level: 0,
      },
    ],
    maxHp: 40000,
    def: 150,
    atk: 500,
    fireAbsorb: 0.6,
    atkSpeed: 0.4,
    exp: 180,
    level: 104,
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [20, 50],
        rate: 0.1,
      },
      {
        type: 'equip',
        rate: 0.1,
        mfRate: 1,
      },
    ],
  },
  {
    key: 'chapter3.element.water',
    name: '水元素',
    description: '一团跳动的火焰',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    skills: [
      {
        key: 'waterElement.waterArrow',
        level: 0,
      },
      {
        key: 'iceNova',
        level: 0,
      },
    ],
    maxHp: 40000,
    def: 150,
    atk: 400,
    coldAbsorb: 0.6,
    atkSpeed: 0.4,
    exp: 180,
    level: 104,
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [20, 50],
        rate: 0.1,
      },
      {
        type: 'equip',
        rate: 0.1,
        mfRate: 1,
      },
    ],
  },
  {
    key: 'chapter3.element.earth',
    name: '岩石傀儡',
    description: '一团跳动的火焰',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    skills: [
      {
        key: 'melee',
        level: 0,
      },
    ],
    maxHp: 40000,
    def: 350,
    atk: 800,
    atkSpeed: 0.4,
    exp: 180,
    level: 106,
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [20, 50],
        rate: 0.1,
      },
      {
        type: 'equip',
        rate: 0.15,
        mfRate: 1,
      },
      {
        type: 'ticket',
        rate: 0.0025,
        dungeons: {
          'chapter3.auran1': 4,
          'chapter3.auran2': 2,
          'chapter3.tower2': 1,
        },
      },
    ],
  },
  {
    key: 'chapter3.element.azathoth.fire',
    name: '阿撒托斯[火]',
    description: '一团跳动的混沌元素',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    skills: [
      {
        key: 'fireElement.fireball',
        level: 0,
      },
      {
        key: 'azathoth.transformIce',
        level: 0,
      }
    ],
    stunResist: 3000,
    maxHp: 1000000,
    fireAbsorb: 0.6,
    def: 150,
    atk: 1000,
    atkSpeed: 0.4,
    exp: 7000,
    level: 110,
    loots: [
      {
        key: 'gold',
        count: [250, 500],
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
    key: 'chapter3.element.azathoth.ice',
    name: '阿撒托斯[冰]',
    description: '一团跳动的混沌元素',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    skills: [
      {
        key: 'waterElement.waterArrow',
        level: 0,
      },
      {
        key: 'iceNova',
        level: 0,
      },
      {
        key: 'azathoth.transformEarth',
        level: 0,
      },
    ],
    stunResist: 3000,
    maxHp: 1000000,
    def: 150,
    atk: 1000,
    atkSpeed: 0.4,
    coldAbsorb: 0.6,
    exp: 8000,
    level: 110,
    loots: [
      {
        key: 'gold',
        count: [250, 500],
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
    key: 'chapter3.element.azathoth.earth',
    name: '阿撒托斯[土]',
    description: '一团跳动的混沌元素',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    skills: [
      {
        key: 'azathoth.transformDark',
        level: 0,
      },
      {
        key: 'melee',
        level: 0,
      },
    ],
    maxHp: 1000000,
    def: 350,
    atk: 1000,
    atkSpeed: 0.4,
    exp: 8000,
    level: 110,
    stunResist: 3000,
    loots: [
      {
        key: 'gold',
        count: [250, 500],
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
    key: 'chapter3.element.azathoth.dark',
    name: '阿撒托斯[混乱]',
    description: '一团跳动的混沌元素',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    skills: [
      {
        key: 'azathoth.explode',
        level: 0,
      }
    ],
    maxHp: 1000000,
    def: 0,
    darkAbsorb: 0.6,
    atk: 1000,
    atkSpeed: 0.4,
    exp: 8000,
    level: 110,
    stunResist: 3000,
    loots: [
      {
        key: 'gold',
        count: [250, 500],
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
    key: 'chapter3.element.azathoth.none',
    name: '阿撒托斯的灰烬',
    description: '一团跳动的混沌元素',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    skills: [

    ],
    maxHp: 1000000,
    def: 150,
    darkAbsorb: 0.6,
    atk: 1500,
    atkSpeed: 0.4,
    exp: 5000,
    level: 110,
    buffs: [],
    loots: [
      {
        key: 'gold',
        count: [250, 500],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 0.5,
        mfRate: 2,
      },
    ],
  },
];
