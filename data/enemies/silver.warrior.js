/**
 * Created by tdzl2003 on 10/07/2017.
 */

module.exports = [
  {
    key: 'silver.warrior.trigger.1',
    name: '坚毅试炼之座',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('科力克：年轻的战士，你是否具备足够的毅力，承担永恒无尽的责任呢？');
      return false;
    },
  },
  {
    key: 'silver.warrior.boss.1',
    name: '科力克',
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
        key: 'enemy.upgrade',
        level: 0,
      },
      {
        key: 'knight.thumpHead.enemy',
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
    key: 'silver.warrior.trigger.2',
    name: '勇气试炼之座',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('科力克：年轻的战士，我已经看到了你的决心，但你是否具备足够的勇气，面对千军万马的战斗呢？');
      return false;
    },
  },
  {
    key: 'silver.warrior.boss.2',
    name: '马道克',
    description: '远古野蛮人',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 3000000,
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
  {
    key: 'silver.warrior.trigger.3',
    name: '技巧试炼之座',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('塔里克：年轻的战士，我很欣赏你的勇气，但是如果缺乏技艺，勇气就等同于鲁莽。那么，你究竟是否准备好了呢？');
      return false;
    },
  },
  {
    key: 'silver.warrior.boss.3',
    name: '塔里克',
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
