/**
 * Created by tdzl2003 on 4/12/17.
 */

module.exports = [
  {
    key: 'chapter3.murloc.minions',
    name: '鱼人战士',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 8000,
    atk: 150,
    exp: 150,
    atkSpeed: 0.4,
    level: 80,
    skills: [
      {
        key: 'melee',
        level: 0,
      }
    ],
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 1,
    },
    loots: [
      {
        key: 'gold',
        count: [10, 40],
        rate: 0.1,
      },
      {
        type: 'equip',
        rate: 0.1,
        mfRate: 1,
      }
    ],
  },
  {
    key: 'chapter3.murloc.shaman',
    name: '鱼人祭祀',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    exp: 125,
    maxHp: 6000,
    def: 50,
    atk: 180,
    atkSpeed: 0.7,
    level: 82,
    skills: [
      {
        key: 'shaman.iceball',
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
      recover: 1,
    },
    loots: [
      {
        key: 'gold',
        count: [20, 40],
        rate: 0.1,
      },
      {
        type: 'equip',
        rate: 0.15,
        mfRate: 1,
      },
      {
        type: 'ticket',
        rate: 0.00125,
        dungeons: {
          'chapter3.wood1': 4,
          'chapter3.auran1': 2,
          'chapter3.auran2': 1,
        },
      },
    ],
  },
  {
    key: 'chapter3.murloc.army',
    name: '鱼人大军',
    camp: 'neutral',
    race: 'unknown',
    career: 'melee',
    maxHp: 1000,
    def: 50,
    atk: 50,
    atkSpeed: 0.4,
    level: 1,
    skills: [
      {
        key: 'murloc.army.thumpHead',
        level: 0,
      },
    ],
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 1,
    }
  },
  {
    key: 'chapter3.murloc.warlord',
    name: '鱼人督军',
    description: '狗头人的大王，最萌了~ \u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 300000,
    hpRecovery: 50,
    exp: 3000,
    atk: 500,
    level: 90,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'murloc.thumpHead',
        level: 0,
      },
      {
        key: 'murloc.shieldShout',
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
        count: [180, 300],
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
