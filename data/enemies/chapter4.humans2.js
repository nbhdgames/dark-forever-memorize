/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = [
  {
    key: 'chapter4.humans.trigger.1',
    name: '神秘的把手',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('机关被触动了。一阵令人牙酸的声音之后，下水道的入口显现了出来。');
      return false;
    },
  },
  {
    key: 'chapter4.humans.trigger.2',
    name: '下水道',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      return false;
    },
  },
  {
    key: 'chapter4.humans.trigger.3.1',
    name: '未知的机关',
    description: '真正通过的机关。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      for (const unit of world.units) {
        if (unit.type && unit.type.indexOf('chapter4.humans.trigger.3') >= 0) {
          unit.kill(false);
        }
      }
      world.sendGeneralMsg('你触发了一个看起来很危险的机关，所有其它的机关都消失了。');
      return false;
    },
  },
  {
    key: 'chapter4.humans.trigger.3.2',
    name: '未知的机关',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill();
      world.sendGeneralMsg('这个机关看起来没有任何作用。');
      return false;
    },
  },
  {
    key: 'chapter4.humans.trigger.3.3',
    name: '未知的机关',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill();
      for (const unit of world.units) {
        if (unit.type && unit.type.indexOf('chapter4.humans.trigger') >= 0) {
          continue
        }
        world.sendDamage('real', this, unit, {name: '爆炸'}, unit.maxHp * 0.7)
      }
      return false;
    },
  },
  {
    key: 'chapter4.humans.trigger.3.4',
    name: '未知的机关',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',
    maxHp: 400000,

    onPress(world) {
      this.transformType('chapter4.humans.trigger.4');
      return false;
    },
  },
  {
    key: 'chapter4.humans.trigger.4',
    name: '活动的机关',
    description: '',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 400000,
    atk: 6000,
    atkSpeed: 1.5,
    level: 156,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
    ],
  },
  {
    key: 'chapter4.humans.boss.fearas',
    name: '菲尔斯男爵',
    description: '地精刺客',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 5000000,
    exp: 1800,
    atk: 6000,
    level: 160,
    atkSpeed: 1.0,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'enemy.fearas.summonTrigger',
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
    key: 'chapter4.humans.trigger.5.1',
    name: '安全牌地雷',
    description: '将在3秒后爆炸。',
    camp: 'neutral',
    race: 'unknown',
    career: 'melee',
    atk: 1000,

    skills: [
      {
        key: 'enemy.fearas.bomb',
        level: 0,
      }
    ],

    onPress(world) {
      for (const unit of world.units) {
        if (this.canAttack(unit)) {
          world.sendDamage('fire', this, unit, {name: '爆炸'}, 10000)
        }
      }
      this.kill(false);
      world.sendGeneralMsg('你试图解除安全牌地雷的时候，地雷反而爆炸的更厉害了。');
      return false;
    },
  },
  {
    key: 'chapter4.humans.trigger.5.2',
    name: '哑炮牌地雷',
    description: '将在3秒后爆炸。',
    camp: 'neutral',
    race: 'unknown',
    career: 'melee',

    atk: 10000,

    skills: [
      {
        key: 'enemy.fearas.bomb1',
        level: 0,
      }
    ],

    onPress(world) {
      for (const unit of world.units) {
        if (this.canAttack(unit)) {
          unit.breakCasting();
          unit.stun(3, 'stunned');
        }
      }
      this.kill(false);
      world.sendGeneralMsg('哑炮牌地雷释放了一阵烟雾，你一时动弹不得。');
      return false;
    },
  },
  {
    key: 'chapter4.humans.trigger.5.3',
    name: '科学牌地雷',
    description: '将在3秒后爆炸。',
    camp: 'neutral',
    race: 'unknown',
    career: 'melee',
    atk: 6000,

    skills: [
      {
        key: 'enemy.fearas.bomb',
        level: 0,
      }
    ],

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('科学牌地雷被解除后，很科学的停止了工作。');
      return false;
    },
  },
  {
    key: 'chapter4.humans.trigger.5.4',
    name: '机械松鼠',
    description: '额，拿错了。',
    camp: 'alien',
    race: 'unknown',
    career: 'melee',

    skills: [
      {
        key: 'enemy.fearas.bomb2',
        level: 0,
      }
    ],
  },
  {
    key: 'chapter4.humans.trigger.6',
    name: '牢笼控制台',
    description: '真正通过的机关。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      return false;
    },
  },

  {
    key: 'chapter4.humans.boss.milhous',
    name: '米尔豪斯·法力风暴',
    description: '侏儒法师',
    camp: 'alien',
    race: 'unknown',
    career: 'melee',
    maxHp: 1000000,
    exp: 1800,
    atk: 5000,
    level: 160,
    maxMp: 5000,
    mpRecovery: 100,
    atkSpeed: 1.0,
    skills: [
      {
        key: 'fireBall',
        level: 0,
      },
      {
        key: 'iceArrow',
        level: 0,
      },
      {
        key: 'windBlade',
        level: 10,
      },
      {
        key: 'burning',
        level: 0,
      },
      {
        key: 'iceNova',
        level: 0,
      },
      {
        key: 'iceLance',
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
    onPress(world) {
      const buff = this.buffs.find(v=>v.type === 'enemy.evil.control');
      if (buff) {
        this.removeBuff(buff);
      }
    }
  },
  {
    key: 'chapter4.humans.boss.evil',
    name: '上古邪恶',
    description: '地精刺客',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 10000000,
    exp: 1800,
    atk: 10000,
    level: 160,
    atkSpeed: 0.6,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'shaman.darkball',
        level: 0,
      },
      {
        key: 'enemy.evil.reading1',
        level: 0,
      },
      {
        key: 'enemy.evil.control',
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
