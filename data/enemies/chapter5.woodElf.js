/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'chapter5.woodElf.crazy',
    name: '发疯的木灵',
    description: '',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 350000,
    atk: 2400,
    atkSpeed: 0.4,
    allResist: 50,
    exp: 550,
    level: 194,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'simba.thumpHead',
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
        count: [150, 200],
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
    key: 'chapter5.woodElf.sad',
    name: '悲痛过度的木灵',
    description: '会玩火的狗头人，还是好萌。\u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 500000,
    def: 50,
    exp: 650,
    atk: 3000,
    level: 196,
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
        count: [150, 300],
        rate: 1,
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
          'chapter4.westRolan2': 2,
          'chapter5.byer2': 2,
          'chapter5.byer4': 1,
        },
      },
    ],
  },

  {
    key: 'chapter5.woodElf.shamansa',
    name: '暴食的萨曼莎',
    description: '狗头人的大王，最萌了~ \u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 5000000,
    hpRecovery: 2500,
    exp: 2400,
    atk: 15000,
    level: 200,
    atkSpeed: 0.6,
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
        key: 'shamansa.spew',
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
  {
    key: 'chapter5.woodElf.arms',
    name: '恐怖的残肢',
    description: '',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 150000,
    atk: 2400,
    atkSpeed: 0.4,
    allResist: 50,
    level: 194,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
    ],
  },
  {
    key: 'chapter5.woodElf.rosa',
    name: '懒惰的罗莎',
    description: '狗头人的大王，最萌了~ \u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 8000000,
    hpRecovery: 2500,
    exp: 2400,
    atk: 18000,
    level: 200,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'rosa.sleepy',
        level: 0,
      },
      {
        key: 'rosa.angry',
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
