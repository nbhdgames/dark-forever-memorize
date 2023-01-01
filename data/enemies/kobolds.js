/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'kobold.miner',
    name: '狗头人矿工',
    description: '狗头人居然长这么多的胡子，有点萌。\u{1F60A}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 350,
    atk: 10,
    atkSpeed: 0.4,
    exp: 20,
    level: 36,
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
        rate: 0.2,
      },
      {
        type: 'equip',
        rate: 0.1,
        mfRate: 1,
      },
    ],
  },
  {
    key: 'kobold.shaman',
    name: '狗头人萨满',
    description: '会玩火的狗头人，还是好萌。\u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 500,
    exp: 40,
    atk: 10,
    level: 38,
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
        count: [5, 10],
        rate: 0.2,
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
          'town.woods': 4,
          'town.mine.2': 2,
          'town.mine.3': 1,
        },
      },
    ],
  },
  {
    key: 'kobold.candle',
    name: '安全牌蜡烛',
    description: '一根蜡烛。',
    camp: 'neutral',
    race: 'unknown',
    career: 'melee',
    maxHp: 10,
    exp: 0,
    atk: 100,
    level: 1,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'bomb',
        level: 0,
      },
    ],
    onPress(world) {
      this.kill();
      return false;
    },
    affixes: {
      stronger: 2,
    },
    loots: [
    ],
  },
  {
    key: 'kobold.goldteeth',
    name: '金牙',
    description: '狗头人的大王，最萌了~ \u{1F525}',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 4000,
    hpRecovery: 15,
    exp: 800,
    atk: 50,
    level: 42,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'candle.call',
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
        count: [5, 100],
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
