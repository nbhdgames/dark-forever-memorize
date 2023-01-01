/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'chapter5.undead.ghost',
    name: '受折磨的灵魂',
    description: '',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 250000,
    atk: 2400,
    atkSpeed: 0.4,
    allResist: 50,
    exp: 500,
    level: 184,
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
        count: [75, 200],
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
    key: 'chapter5.undead.zombie',
    name: '不安份的尸体',
    description: '会玩火的狗头人，还是好萌。\u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 300000,
    def: 50,
    exp: 550,
    atk: 2200,
    level: 186,
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
        rate: 0.0025,
        dungeons: {
          'chapter4.westRolan1': 4,
          'chapter4.westRolan2': 2,
          'chapter5.byer2': 1,
        },
      },
    ],
  },

  {
    key: 'chapter5.necromancer',
    name: '邪恶法师奈布',
    description: '狗头人的大王，最萌了~ \u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 8000000,
    hpRecovery: 500,
    exp: 1800,
    atk: 15000,
    level: 190,
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
        key: 'chapter4.humans.seck.healthDrill',
        level: 0,
      },
      {
        key: 'enemy.upgrade',
        level: 0,
      },
      {
        key: 'zombie.hide',
        level: 0,
      },
    ],
    stunResist: 5000,
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [700, 1500],
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
