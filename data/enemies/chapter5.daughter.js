/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'chapter5.daughter.monster1',
    name: '黑暗之灵',
    description: '',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 500000,
    atk: 3000,
    atkSpeed: 0.4,
    def: 50,
    allResist: 50,
    exp: 700,
    level: 204,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'shaman.darkball',
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
        count: [180, 250],
        rate: 0.5,
      },
      {
        type: 'equip',
        rate: 0.15,
        mfRate: 1,
      },
      {
        type: 'ticket',
        rate: 0.005,
        dungeons: {
          'chapter5.byer4': 1,
          'chapter5.byer6': 1,
        },
      },
    ],
  },
  {
    key: 'chapter5.daughter.monster2',
    name: '孤独之灵',
    description: '会玩火的狗头人，还是好萌。\u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 500000,
    def: 50,
    allResist: 50,
    exp: 700,
    atk: 3000,
    level: 204,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'chapter5.daughter.monster2',
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
        count: [180, 250],
        rate: 0.5,
      },
      {
        type: 'equip',
        rate: 0.15,
        mfRate: 1,
      },
    ],
  },
  {
    key: 'chapter5.daughter.monster3',
    name: '疼痛之灵',
    description: '会玩火的狗头人，还是好萌。\u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 500000,
    def: 50,
    allResist: 50,
    exp: 700,
    atk: 3000,
    level: 204,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'enemy.evil.reading1',
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
        count: [180, 250],
        rate: 0.5,
      },
      {
        type: 'equip',
        rate: 0.15,
        mfRate: 1,
      },
    ],
  },
  {
    key: 'chapter5.daughter.monster4',
    name: '惊悸之灵',
    description: '会玩火的狗头人，还是好萌。\u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 500000,
    def: 50,
    allResist: 50,
    exp: 700,
    atk: 3000,
    level: 204,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'chapter5.daughter.monster4',
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
        count: [180, 250],
        rate: 0.5,
      },
      {
        type: 'equip',
        rate: 0.15,
        mfRate: 1,
      },
    ],
  },
  {
    key: 'chapter5.daughter.monster5',
    name: '寒冷之灵',
    description: '会玩火的狗头人，还是好萌。\u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 500000,
    def: 50,
    allResist: 50,
    exp: 700,
    atk: 3000,
    level: 204,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'shaman.iceball',
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
        count: [180, 250],
        rate: 0.5,
      },
      {
        type: 'equip',
        rate: 0.15,
        mfRate: 1,
      },
    ],
  },
  {
    key: 'chapter5.daughter.monster6',
    name: '饥饿之灵',
    description: '会玩火的狗头人，还是好萌。\u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 500000,
    def: 50,
    allResist: 50,
    exp: 700,
    atk: 3000,
    level: 204,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'chapter4.humans.seck.healthDrill',
        level: 20,
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
        count: [180, 250],
        rate: 0.5,
      },
      {
        type: 'equip',
        rate: 0.15,
        mfRate: 1,
      },
    ],
  },
  {
    key: 'chapter5.daughter.badGiant',
    name: '吃小孩的巨人',
    description: '狗头人的大王，最萌了~ \u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 10000000,
    def: 50,
    allResist: 50,
    hpRecovery: 2500,
    exp: 3000,
    atk: 10000,
    level: 210,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'slime.swallow',
        level: 0,
      },
      {
        key: 'shockWave',
        level: 0,
      },
      {
        key: 'enemy.upgrade',
        level: 0,
      },
    ],
    stunResist: 5000,
    loots: [
      {
        key: 'gold',
        count: [850, 1800],
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
    key: 'chapter5.daughter.amira',
    name: '艾米拉',
    description: '狗头人的大王，最萌了~ \u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 10000000,
    def: 50,
    allResist: 50,
    hpRecovery: 2500,
    exp: 3000,
    atk: 10000,
    level: 210,
    atkSpeed: 0.4,
    speedRate: 1.5,
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
        key: 'chapter5.daughter.monster2',
        level: 0,
      },
      {
        key: 'enemy.evil.reading1',
        level: 0,
      },
      {
        key: 'chapter5.daughter.monster4',
        level: 0,
      },
      {
        key: 'shaman.iceball',
        level: 0,
      },
      {
        key: 'chapter4.humans.seck.healthDrill',
        level: 20,
      },
      {
        key: 'enemy.upgrade',
        level: 0,
      },
    ],
    stunResist: 5000,
    loots: [
      {
        key: 'gold',
        count: [850, 1800],
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
