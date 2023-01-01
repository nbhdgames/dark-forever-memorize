const { define, extend } = require('../util');

define('buffs', 'year2018.yearBeastWeapon-1-Buff', {
  name: '蓄能',
  description: '蓄能3次后的下一次技能增加100%暴击几率和伤害',
});

define('buffs', 'year2018.yearBeastWeapon-1-Buff2', {
  name: '充能完毕',
  description: '下一次技能增加100%暴击几率和伤害',
  hooks: {
    critRate: val => val + 1,
    critBonus: val => val + 1,
    postSkillEffect() {
      const { unit } = this;
      unit.removeBuff(this);
    },
  },
});

define('legends', 'year2018.yearBeastWeapon-1', {
  type: 'boneWand',
  itemName: '年兽的小腿骨',
  itemDescription: '上面的肉去哪儿了？',
  special: true,
  minLevel: 1,
  display: effect =>
    '每释放三个技能，使你下一个技能的暴击几率和暴击伤害增加100%',
  generate(level) {
    return 1;
  },
  range(level) {
    return 1;
  },
  hooks: {
    postSkillEffect() {
      const buffs = this.buffs.filter(
        v => v.type === 'year2018.yearBeastWeapon-1-Buff',
      );
      if (buffs.length >= 2) {
        // 第三个技能
        for (const buff of buffs) {
          this.removeBuff(buff);
        }
        this.addBuff('year2018.yearBeastWeapon-1-Buff2');
      } else {
        this.addBuff('year2018.yearBeastWeapon-1-Buff');
      }
    },
  },
});

define('legends', 'year2018.yearBeastWeapon-2', {
  type: 'boneDagger',
  itemName: '年兽的利齿',
  itemDescription: '闪着锋利的寒光',
  minLevel: 1,
  special: true,
  display: effect => '额外增加100%暴击率',
  generate(level) {
    return 1;
  },
  range(level) {
    return 1;
  },
  hooks: {
    critRate: (_, v) => v + 1,
  },
});

define('legends', 'year2018.yearBeastWeapon-3', {
  type: 'wolfTeethMace',
  itemName: '年兽的大腿骨',
  itemDescription: '上面的肉去哪儿了？嗝儿……',
  minLevel: 1,
  display: effect => '每层暴击使你接下来5秒内伤害增加10%。',
  special: true,
  generate(level) {
    return 1;
  },
  range(level) {
    return 1;
  },
  hooks: {
    testCrit(_, v) {
      if (v > 0) {
        this.addBuff('swordSkill', 5000, 0.1 * v);
      }
      return v;
    },
  },
});

define('legends', 'year2018.yearBeastPlastron-1', {
  type: 'leatherArmor',
  itemName: '年兽的厚皮',
  itemDescription: '散发着硝烟的气息。',
  minLevel: 1,
  display: effect => '所有法术吸收+30%。',
  special: true,
  generate(level) {
    return 1;
  },
  range(level) {
    return 1;
  },
  hooks: {
    fireAbsorb: (_, v) => v + 0.3,
    darkAbsorb: (_, v) => v + 0.3,
    coldAbsorb: (_, v) => v + 0.3,
    lightningAbsorb: (_, v) => v + 0.3,
  },
});

define('legends', 'year2018.yearBeastTrousers-1', {
  type: 'leatherTrousers',
  itemName: '年兽的皮裤',
  itemDescription: '再胖的人都穿得上。',
  minLevel: 1,
  display: effect => '所有法术吸收+20%。',
  special: true,
  generate(level) {
    return 1;
  },
  range(level) {
    return 1;
  },
  hooks: {
    fireAbsorb: (_, v) => v + 0.2,
    darkAbsorb: (_, v) => v + 0.2,
    coldAbsorb: (_, v) => v + 0.2,
    lightningAbsorb: (_, v) => v + 0.2,
  },
});

define('legends', 'year2018.yearBeastPlastron-2', {
  type: 'leatherDress',
  itemName: '年兽的毛衣',
  itemDescription: '散发着硝烟的气息。',
  minLevel: 1,
  display: effect => '物理伤害吸收+30%。',
  special: true,
  generate(level) {
    return 1;
  },
  range(level) {
    return 1;
  },
  hooks: {
    meleeAbsorb: (_, v) => v + 0.3,
  },
});

define('legends', 'year2018.yearBeastTrousers-2', {
  type: 'leatherSkirt',
  itemName: '年兽的毛裤',
  itemDescription: '再胖的人都穿得上。',
  minLevel: 1,
  display: effect => '物理伤害吸收+20%。',
  special: true,
  generate(level) {
    return 1;
  },
  range(level) {
    return 1;
  },
  hooks: {
    meleeAbsorb: (_, v) => v + 0.2,
  },
});

define('legends', 'year2018.yearBeastHeart', {
  type: 'zombieHeart',
  itemName: '年兽的心脏',
  itemDescription: '蕴含着时间的力量。',
  minLevel: 1,
  display: effect => '所有行动速度增加20%。',
  special: true,
  generate(level) {
    return 1;
  },
  range(level) {
    return 1;
  },
  hooks: {
    speedRateMul: (_, v) => v * 1.2,
  },
});
