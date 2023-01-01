/**
 * Created by tdzl2003 on 4/18/17.
 */

module.exports = [
  {
    key: 'chapter3.fishzilla.magician',
    name: '湖畔镇魔法师',
    camp: 'alien',
    race: 'unknown',
    career: 'melee',
    maxHp: 5000,
    atk: 150,
    atkSpeed: 0.4,
    level: 94,
    skills: [
      {
        key: 'fishzilla.focus',
        level: 0,
      },
    ],
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 1,
    },
  },
  {
    key: 'chapter3.murloc.slaves',
    name: '鱼人奴隶',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 10000,
    atk: 1000,
    exp: 100,
    atkSpeed: 0.5,
    level: 94,
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
    key: 'chapter3.fishzilla',
    name: '鱼斯拉',
    description: '狗头人的大王，最萌了~ \u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 10000000,
    hpRecovery: 250,
    exp: 5000,
    atk: 1500,
    level: 100,
    atkSpeed: 0.6,
    skills: [
      {
        key: 'fishzilla.summonSlaves',
        level: 0,
      },
      {
        key: 'fishzilla.bomb',
        level: 12,
      },
      {
        key: 'melee',
        level: 0,
      },
    ],
    stunResist: 3000,
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [200, 400],
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