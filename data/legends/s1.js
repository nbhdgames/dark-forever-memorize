/**
 * Created by tdzl2003 on 5/2/17.
 */

module.exports = [
  {
    key: 'copperRing-1',
    type: 'copperRing',
    itemName: '金色门牙',
    itemDescription: '其实是铜，中央的牙洞正好套进一个手指。',
    minLevel: 35,
    display: effect => `火焰法术伤害+30%`,
    generate(level) {
      return 0.3;
    },
    range(level) {
      return `30%`;
    },
    hooks: {
      willDamage(effect, value, to, damageType) {
        if (damageType === 'fire') {
          return value * (1 + effect);
        }
        return value;
      },
      summonerWillDamage(effect, value, from, to, damageType) {
        if (damageType === 'fire') {
          return value * (1 + effect);
        }
        return value;
      },
    },
  },
  {
    key: 'zombieHeart-1',
    type: 'zombieHeart',
    itemName: '少女之心',
    itemDescription: '柔软的少女僵尸心，非常适合放在鼠标垫上垫手腕。',
    minLevel: 35,
    display: effect => `献祭你的召唤生物时恢复40%召唤技能法力消耗`,
    generate(level) {
      return 0.4;
    },
    range(level) {
      return `40%`;
    },
    hooks: {
      onSummonExploded(effect, unit) {
        let cost = unit.summonSkill.skillData.cost.mp;
        if (typeof cost === 'function') {
          cost = cost(this);
        }
        this.mp += (effect * cost) || 0;
      }
    },
  },
  {
    key: 'mithrilRing-1',
    type: 'mithrilRing',
    itemName: '卡罗的订婚戒指',
    itemDescription: '打完这仗我就回老家结婚。',
    minLevel: 35,
    display: effect => `获得圣能时25%几率释放一次额外的破邪斩。`,
    generate(level) {
      return 0.25;
    },
    range(level) {
      return `25%`;
    },
    hooks: {
      holyCombo(effect, count) {
        if (Math.random() < effect) {
          this.useExtraSkill('knight.whirlwind');
        }
        return count;
      },
    },
  },
  {
    key: 'ironRing-1',
    type: 'ironRing',
    itemName: '阿泰尔的誓言',
    itemDescription: '为了信条',
    minLevel: 35,
    display: effect => `能量恢复速度增加30%。`,
    generate(level) {
      return 0.3;
    },
    range(level) {
      return `30%`;
    },
    hooks: {
      epRecoveryMul(effect, value) {
        return value * (1 + effect);
      },
    },
  },
  {
    key: 'mithrilStannumRing-1',
    type: 'mithrilStannumRing',
    itemName: '仇恨意志',
    itemDescription: '仇恨让我们忘记恐惧，尽情的……杀戮。',
    minLevel: 35,
    display: effect => `致死打击的冷却时间减少至3秒。`,
    generate(level) {
      return 3000;
    },
    range(level) {
      return '3';
    },
    hooks: {
      mortalStrikeCoolDown(effect, value) {
        return effect;
      }
    },
  },
  {
    key: 'mithrilCopperBigSword-1',
    type: 'mithrilCopperBigSword',
    itemName: '无锋',
    itemDescription: '重剑……无锋。',
    minLevel: 35,
    display: effect => `使你的顺劈斩系列技能造成的伤害提升100%。`,
    generate(level) {
      return 1;
    },
    range(level) {
      return '100%';
    },
    hooks: {
      cleaveDamageRate(effect, value) {
        return value * 2;
      }
    },
  },
  {
    key: 'mithrilStannumShortWand-1',
    type: 'mithrilStannumShortWand',
    itemName: '法力之源',
    itemDescription: '支持遥控，自带能量源，充一次电可以用好几个小时。',
    minLevel: 35,
    display: effect => `法力唤醒的冷却时间缩短到30秒`,
    generate(level) {
      return 30000;
    },
    range(level) {
      return `30`;
    },
    hooks: {
      awakingCoolDown(effect, value) {
        return effect;
      }
    },
  },
  {
    key: 'goldNecklace-1',
    type: 'goldNecklace',
    itemName: '大哥的金项链',
    itemDescription: '你瞅啥？瞅你怎地？',
    minLevel: 35,
    display: effect => `成为目标时为你增加20点怒气`,
    generate(level) {
      return 20;
    },
    range(level) {
      return `20`;
    },
    hooks: {
      becomeTarget(effect, value) {
        this.rp += 20;
      }
    },
  },
];
