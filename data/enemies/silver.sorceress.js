/**
 * Created by tdzl2003 on 10/07/2017.
 */

module.exports = [
  {
    key: 'silver.sorceress.trigger.1',
    name: '奥术能量核心',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('麦迪文的回响：魔法的奥秘无穷无尽，但也蕴含着无穷的危险。你是否能面对并掌控这种危险呢？');
      return false;
    },
  },
  {
    key: 'silver.sorceress.boss.1',
    name: '奥术能量核心',
    description: '远古野蛮人',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 3000000,
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
        key: 'silver.sorceress.boss.1.bolt',
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
    key: 'silver.sorceress.trigger.2',
    name: '书架',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('麦迪文的回响：知识蕴含着无穷的力量，却也成为了无数法师的牢笼。面对知识的困境，你会如何处理呢？');
      return false;
    },
  },
  {
    key: 'silver.sorceress.boss.2',
    name: '飞舞的书籍',
    description: '远古野蛮人',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 500000,
    fireResist: -40,
    exp: 180,
    atk: 5000,
    level: 160,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
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
        count: [50, 100],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 0.1,
        mfRate: 2,
      },
    ],
  },
  {
    key: 'silver.sorceress.trigger.3',
    name: '法阵',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('麦迪文的回响：哦？聪明的办法。但是真正的战斗没有捷径可言。面对真正的敌人吧！');
      return false;
    },
  },
  {
    key: 'silver.sorceress.boss.3',
    name: '恐怖的怪物',
    description: '远古野蛮人',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 5000000,
    def: 100,
    exp: 1800,
    atk: 10000,
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
