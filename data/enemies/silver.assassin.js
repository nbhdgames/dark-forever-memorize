/**
 * Created by tdzl2003 on 10/07/2017.
 */

module.exports = [
  {
    key: 'silver.assassin.trigger.1',
    name: '隐秘的记号',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('白鲸，请刺杀目标人物。比目鱼。');
      return false;
    },
  },
  {
    key: 'silver.assassin.boss.1',
    name: '体态优雅的贵族',
    description: '远古野蛮人',
    camp: 'neutral',
    race: 'unknown',
    career: 'melee',
    maxHp: 200000,
    exp: 1800,
    atk: 15000,
    level: 160,
    atkSpeed: 0.4,
    skills: [
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
    key: 'silver.assassin.boss.1.summon',
    name: '保镖',
    description: '远古野蛮人',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 20000000,
    exp: 1800,
    atk: 1000000,
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
    key: 'silver.assassin.trigger.2',
    name: '奇怪的门',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('当心！');
      const skill = {
        name: '射出的弩箭',
      };
      for (let i = 0; i < 3; i++) {
        if (!world.testDodge(this, world.playerUnit, skill)) {
          world.sendDamage('real', this, world.playerUnit, skill, 100000);
        }
      }
      return false;
    },
  },
  {
    key: 'silver.assassin.trigger.3',
    name: '通道',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('寇马克：刺客！你逃不掉了！');
      return false;
    },
  },
  {
    key: 'silver.assassin.boss.3',
    name: '寇马克',
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
