/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'wolf.minimal',
    name: '幼狼',
    description: '山里的狼有这么多？看来大人们真的没有骗人。',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 150,
    atk: 1.5,
    atkSpeed: 0.4,
    exp: 5,
    level: 20,
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
        count: [1, 10],
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
    key: 'wolf.giant',
    name: '母狼',
    description: '你问我怎么分清是公是母的？小孩子不要问太多……',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 300,
    exp: 10,
    atk: 6,
    level: 22,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'wolf.heal',
        level: 0,
      },
    ],
    affixes: {
      stronger: 2,
      faster: 1,
    },
    loots: [
      {
        key: 'gold',
        count: [1, 20],
        rate: 0.1,
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
          'town.cave2': 2,
          'town.woods': 1,
        },
      },
    ],
  },
  {
    key: 'wolf.king',
    name: '狼王',
    description: '头顶有一撮白毛。据说这是最好的品种的象征',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 6000,
    def: 50,
    exp: 200,
    atk: 12,
    level: 26,
    atkSpeed: 0.6,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'wolf.call',
        level: 0,
      },
    ],
    loots: [
      {
        key: 'gold',
        count: [1, 200],
        rate: 0.25,
      },
      {
        type: 'equip',
        rate: 1,
        mfRate: 2,
      },
    ],
  },
];
