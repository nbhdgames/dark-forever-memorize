/**
 * Created by tdzl2003 on 4/12/17.
 */

module.exports = [
  {
    key: 'chapter3.beast.wildpig',
    name: '豪猪',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 2500,
    def: 100,
    atk: 100,
    exp: 65,
    atkSpeed: 0.4,
    level: 70,
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
        count: [5, 35],
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
    key: 'chapter3.beast.lion',
    name: '雄狮',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    exp: 85,
    maxHp: 1500,
    def: 50,
    atk: 80,
    atkSpeed: 0.7,
    level: 72,
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
        count: [5, 35],
        rate: 0.1,
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
          'chapter3.shelter773': 2,
          'chapter3.wood1': 1,
        },
      },
    ],
  },
  {
    key: 'chapter3.beast.pengpeng',
    name: '彭彭',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 80000,
    exp: 800,
    def: 100,
    atk: 400,
    atkSpeed: 0.4,
    level: 80,
    skills: [
      {
        key: 'simba.thumpHead',
        level: 0,
      },
      {
        key: 'melee',
        level: 0,
      }
    ],
    hooks: {
      'simba.goodFriends': value => true,
    },
    buffs: [
      {
        type: 'simba.goodFriends',
      },
    ],
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 1,
    },
    loots: [
      {
        type: 'equip',
        rate: 1,
        mfRate: 2,
      },
    ],
  },
  {
    key: 'chapter3.beast.simba',
    name: '辛巴',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 60000,
    def: 50,
    exp: 800,
    atk: 400,
    atkSpeed: 0.7,
    level: 80,
    skills: [
      {
        key: 'melee',
        level: 0,
      }
    ],
    hooks: {
      'simba.goodFriends': value => true,
    },
    buffs: [
      {
        type: 'simba.goodFriends',
      },
    ],
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 1,
    },
    loots: [
    ],
  },
  {
    key: 'chapter3.beast.dingman',
    name: '丁满',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 40000,
    atk: 200,
    exp: 800,
    atkSpeed: 0.6,
    level: 80,
    skills: [
      {
        key: 'simba.heal',
        level: 0,
      },
      {
        key: 'melee',
        level: 0,
      }
    ],
    hooks: {
      'simba.goodFriends': value => true,
    },
    buffs: [
      {
        type: 'simba.goodFriends',
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
        count: [150, 250],
        rate: 1,
      },
    ],
  },
];
