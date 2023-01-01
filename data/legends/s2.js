/**
 * Created by tdzl2003 on 5/2/17.
 */

module.exports = [
  {
    key: 'ornament-1',
    type: 'ornament',
    itemName: '沉思的鲱鱼干',
    itemDescription: '作为一条鱼干，人生的大部分就是找个地方挂着……',
    minLevel: 35,
    display: effect => `所有经验值增加50%`,
    generate(level) {
      return 0.5;
    },
    range(level) {
      return `50%`;
    },
    hooks: {
      expMul(effect, value) {
        return value * 1.5;
      },
    },
  },
  {
    key: 'skirt-1',
    type: 'skirt',
    itemName: '爆款小短裙',
    itemDescription: '当季爆款小短裙，卖家秀看起来特别美。穿在你身上就……',
    minLevel: 5,
    display: effect => '使攻击者昏迷2秒',
    generate(level) {
      return 3;
    },
    range(level) {
      return '3';
    },
    hooks: {
      attacked(effect, from) {
        from.stun(2, 'stunned');
        return from;
      },
    }
  },
  {
    key: 'leatherArmor-1',
    type: 'leatherArmor',
    itemName: '鱼皮甲',
    itemDescription: '滑溜溜的，表面全是黏液。',
    minLevel: 50,
    display: effect => '闪避几率 +30%',
    generate(level) {
      return 0.3;
    },
    range(level) {
      return '30%';
    },
    hooks: {
      noDodgeRate(effect, value) {
        return value * 0.7;
      }
    },
  },
  {
    key: 'wand-1',
    type: 'wand',
    itemName: '皮鞭',
    itemDescription: '只缺蜡烛了。',
    minLevel: 35,
    display: effect => `召唤的生物减少30%初始血量，但在5秒内攻击速度增加100%`,
    generate(level) {
      return 1;
    },
    range(level) {
      return `100%`;
    },
    hooks: {
      summonedUnit(effect, unit) {
        unit.hp -= unit.maxHp * 0.3;
        unit.addBuff('legend-wand-1', 5000);
        return unit;
      },
    },
  },
  {
    key: 'rattanArmor-2',
    type: 'rattanArmor',
    itemName: '布尔凯索的装甲',
    itemDescription: '北方高地野蛮人的遗物，穿上后让人忍不住呐喊。',
    minLevel: 70,
    display: effect => `你的战斗怒吼和命令怒吼可以同时生效`,
    generate(level) {
      return 1;
    },
    range(level) {
      return `1`;
    },
    hooks: {
      multiShouts(effect, value) {
        return true;
      }
    },
  },
  {
    key: 'mithrilDress-2',
    type: 'mithrilPlastron',
    itemName: '白银之手装甲',
    itemDescription: '愿圣光与你同在。',
    minLevel: 70,
    display: effect => '使你的荣耀不再消耗圣能',
    generate(level) {
      return 1;
    },
    range(level) {
      return `1`;
    },
    hooks: {
      cheapGlory(effect, value) {
        return true;
      }
    },
  },
  {
    key: 'silkDress-2',
    type: 'silkDress',
    itemName: '魔法制服',
    itemDescription: '预言者之手。艾莲娜，我们在未来见。',
    minLevel: 70,
    display: effect => '你的变形术会将目标变成一个随机动物，持续时间延长50%',
    generate(level) {
      return 1;
    },
    range(level) {
      return `1`;
    },
    hooks: {
      randomTransform(effect, value) {
        return true;
      }
    },
  },
  {
    key: 'copperDagger2-2',
    type: 'copperDagger2',
    itemName: '荆轲之刃',
    itemDescription: '曾经属于一个伟大的刺客。',
    minLevel: 70,
    display: effect => '使你伏击的暴击几率提升50%',
    generate(level) {
      return 0.5;
    },
    range(level) {
      return `50%`;
    },
    hooks: {
      ambushCritRate(effect, value) {
        return effect + value;
      }
    },
  },
];
