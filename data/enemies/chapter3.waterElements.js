/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'chapter3.waterElement.nagaHero',
    name: '娜迦勇士',
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
    maxHp: 60000,
    def: 150,
    atk: 1000,
    atkSpeed: 0.4,
    exp: 220,
    level: 114,
    affixes: {
      stronger: 2,
      faster: 1,
      recover: 0.5,
    },
    loots: [
      {
        key: 'gold',
        count: [20, 50],
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
    key: 'chapter3.waterElement',
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
    maxHp: 60000,
    def: 150,
    atk: 700,
    coldAbsorb: 0.6,
    atkSpeed: 0.4,
    exp: 220,
    level: 114,
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
    key: 'chapter3.waterElement.giants',
    name: '深海巨人',
    description: '一团跳动的火焰',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    skills: [
      {
        key: 'cleave',
        level: 0,
      },
    ],
    maxHp: 150000,
    def: 250,
    atk: 1400,
    atkSpeed: 0.4,
    exp: 450,
    level: 116,
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
        rate: 0.005,
        dungeons: {
          'chapter3.tower2': 2,
          'chapter3.auran4': 1,
        },
      },
    ],
  },
  {
    key: 'chapter3.waterElement.Nynnroth',
    name: '奈因洛斯的分身',
    description: '一团跳动的水元素',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    skills: [
      {
        key: 'waterElement.waterArrow',
        level: 0,
      },
      {
        key: 'waterElement.waterFlow',
        level: 0,
      },
      {
        key: 'enemy.upgrade',
        level: 0,
      },
    ],
    stunResist: 3000,
    maxHp: 1600000,
    coldAbsorb: 0.4,
    def: 150,
    atk: 2000,
    atkSpeed: 0.4,
    exp: 10000,
    level: 120,
    loots: [
      {
        key: 'gold',
        count: [400, 600],
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
    key: 'shrine.nynnroth.shield',
    name: '定海圣殿',
    description: '增加怒气、能量、法力恢复速度3秒。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      for (const unit of world.units.filter(v => v.camp === 'player' || v.camp === 'alien')) {
        unit.addBuff('nynnroth.shield', 5000);
      }
      this.kill();
      return false;
    },
  },
];
