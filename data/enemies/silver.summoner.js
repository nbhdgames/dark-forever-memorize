/**
 * Created by tdzl2003 on 10/07/2017.
 */

module.exports = [
  {
    key: 'silver.summoner.trigger.1',
    name: '火位面之门',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('小亚的声音：亚莲娜，元素生物在艾希大陆被创造之前就已经存在的古老生物，其中的火元素，代表了毁灭，是世界的基石之一。');
      return false;
    },
  },
  {
    key: 'silver.summoner.boss.1',
    name: '暴躁的火元素',
    description: '远古野蛮人',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    fireAbsorb: 1,
    maxHp: 3000000,
    exp: 1800,
    atk: 10000,
    level: 160,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'kakarif.melee',
        level: 0,
      },
      {
        key: 'fireElement.fireball',
        level: 0,
      },
    ],
    stunResist: 4000,
    affixes: {
      stronger: 1,
    },
    loots: [
      {
        key: 'gold',
        count: [500, 1000],
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
    key: 'silver.summoner.trigger.2',
    name: '水位面之门',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('小亚的声音：水元素大都在大海中活动，所以在陆地上看起来很笨拙。但是它的危险程度却一点都不低！');
      return false;
    },
  },
  {
    key: 'silver.summoner.boss.2',
    name: '流动的水元素',
    description: '远古野蛮人',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 3000000,
    coldAbsorb: 1,
    exp: 1800,
    atk: 10000,
    level: 160,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'waterElement.waterArrow.notBreakable',
        level: 0,
      },
      {
        key: 'fishzilla.bomb',
        level: 0,
      },
      {
        key: 'iceNova',
        level: 0,
      },
    ],
    stunResist: 4000,
    affixes: {
      stronger: 1,
    },
    loots: [
      {
        key: 'gold',
        count: [500, 1000],
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
    key: 'silver.summoner.trigger.3',
    name: '土位面之门',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('小亚的声音：火位面和水位面都不适合生存，但土位面也没有好到哪里去……漫天的沙尘不知不觉的侵蚀你的心肺，呆久了甚至会被土元素同化。');
      return false;
    },
  },
  {
    key: 'silver.summoner.boss.3',
    name: '沉重的土元素',
    description: '远古野蛮人',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 5000000,
    def: 100,
    exp: 1800,
    atk: 15000,
    level: 160,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'enemy.upgrade',
        level: 0,
      },
    ],
    stunResist: 4000,
    affixes: {
      stronger: 1,
    },
    loots: [
      {
        key: 'gold',
        count: [500, 1000],
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
