/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'chapter3.undead.ghost',
    name: '不安的冤魂',
    description: '',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 1000,
    atk: 50,
    atkSpeed: 0.4,
    exp: 50,
    level: 60,
    skills: [
      {
        key: 'shaman.darkball',
        level: 0,
      },
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
        count: [1, 15],
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
    key: 'chapter3.undead.zombie',
    name: '行尸',
    description: '会玩火的狗头人，还是好萌。\u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 2000,
    exp: 50,
    atk: 75,
    level: 64,
    atkSpeed: 0.4,
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
        count: [5, 20],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 0.15,
        mfRate: 1.5,
      },
      {
        type: 'ticket',
        rate: 0.00125,
        dungeons: {
          'town.mine.2': 2,
          'town.mine.3': 1,
          'town.neighbourTown.2': 2,
          'town.neighbourTown.3': 1,
          'chapter3.shelter773': 1,
        },
      },
    ],
  },
  {
    key: 'chapter3.undead.ghostShield',
    name: '幽魂护卫',
    description: '',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 500,
    atkSpeed: 0.4,
    level: 64,
    skills: [
      {
        key: 'ghostShield',
        level: 0,
      }
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
    key: 'chapter3.necromancer',
    name: '暗影法师奈布',
    description: '狗头人的大王，最萌了~ \u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 50000,
    hpRecovery: 50,
    exp: 1800,
    atk: 200,
    level: 66,
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
        key: 'necromancer.ghostShield',
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
        count: [100, 200],
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
