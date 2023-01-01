/**
 * Created by tdzl2003 on 2/3/17.
 */

/*
抗性和吸收规则：
首先计算吸收百分比，剩余伤害计算抗性减乘，最后减去吸收数值，为剩余伤害。
例如：100点火焰伤害，吸收20%， 抗性100
那么计算吸收20点生命，受到80/(100+100)*100 = 40点伤害，最后总计受到20点伤害。
*/


module.exports = [
  {
    key: 'fireResist',
    display: effect => `火焰抗性 +${Math.round(effect)}`,
    minLevel: 40,
    maxLevel: 180,
    validPositions: ['plastron', 'gaiter'],
    generate(level) {
      // 1 + 每装备等级1-2点抗性
      return (Math.random() * 1 + 1) * level + 1;
    },
    range(level) {
      return `${Math.round(1*level + 1)}~${Math.round((2*level + 1))}`;
    },
    hooks: {
      fireResist: (effect, value) => value + effect,
    },
  },
  {
    key: 'fireAbsorb',
    display: effect => `火焰吸收 +${Math.round(effect*100)}%`,
    minLevel: 40,
    weight: 0.2,
    validPositions: ['plastron', 'gaiter', 'ornament'],
    generate(level) {
      // 0.5% + 每装备等级0.1-0.2% 吸收
      return (Math.random() * 0.001 + 0.001) * level + 0.005;
    },
    range(level) {
      return `${Math.round(0.1*level + 0.5)}%~${Math.round(0.2*level + 0.5)}%`;
    },
    hooks: {
      fireAbsorb: (effect, value) => value + effect,
    },
  },
  {
    key: 'darkResist',
    display: effect => `暗影抗性 +${Math.round(effect)}`,
    minLevel: 40,
    maxLevel: 180,
    validPositions: ['plastron', 'gaiter'],
    generate(level) {
      // 1 + 每装备等级1-2点抗性
      return (Math.random() * 1 + 1) * level + 1;
    },
    range(level) {
      return `${Math.round(1*level + 1)}~${Math.round((2*level + 1))}`;
    },
    hooks: {
      darkResist: (effect, value) => value + effect,
    },
  },
  {
    key: 'darkAbsorb',
    display: effect => `暗影吸收 +${Math.round(effect*100)}%`,
    minLevel: 40,
    weight: 0.2,
    validPositions: ['plastron', 'gaiter', 'ornament'],
    generate(level) {
      // 0.5% + 每装备等级0.1-0.2% 吸收
      return (Math.random() * 0.001 + 0.001) * level + 0.005;
    },
    range(level) {
      return `${Math.round(0.1*level + 0.5)}%~${Math.round(0.2*level + 0.5)}%`;
    },
    hooks: {
      darkAbsorb: (effect, value) => value + effect,
    },
  },
  {
    key: 'coldResist',
    display: effect => `寒冷抗性 +${Math.round(effect)}`,
    minLevel: 40,
    maxLevel: 180,
    validPositions: ['plastron', 'gaiter'],
    generate(level) {
      // 1 + 每装备等级1-2点抗性
      return (Math.random() * 1 + 1) * level + 1;
    },
    range(level) {
      return `${Math.round(1*level + 1)}~${Math.round((2*level + 1))}`;
    },
    hooks: {
      coldResist: (effect, value) => value + effect,
    },
  },
  {
    key: 'coldAbsorb',
    display: effect => `寒冷吸收 +${Math.round(effect*100)}%`,
    minLevel: 40,
    weight: 0.2,
    validPositions: ['plastron', 'gaiter', 'ornament'],
    generate(level) {
      // 0.5% + 每装备等级0.1-0.2% 吸收
      return (Math.random() * 0.001 + 0.001) * level + 0.005;
    },
    range(level) {
      return `${Math.round(0.1*level + 0.5)}%~${Math.round(0.2*level + 0.5)}%`;
    },
    hooks: {
      coldAbsorb: (effect, value) => value + effect,
    },
  },
  {
    key: 'lightningResist',
    display: effect => `闪电抗性 +${Math.round(effect)}`,
    minLevel: 40,
    maxLevel: 180,
    validPositions: ['plastron', 'gaiter'],
    generate(level) {
      // 1 + 每装备等级1-2点抗性
      return (Math.random() * 1 + 1) * level + 1;
    },
    range(level) {
      return `${Math.round(1*level + 1)}~${Math.round((2*level + 1))}`;
    },
    hooks: {
      lightningResist: (effect, value) => value + effect,
    },
  },
  {
    key: 'lightningAbsorb',
    display: effect => `闪电吸收 +${Math.round(effect*100)}%`,
    minLevel: 40,
    weight: 0.2,
    validPositions: ['plastron', 'gaiter', 'ornament'],
    generate(level) {
      // 0.5% + 每装备等级0.1-0.2% 吸收
      return (Math.random() * 0.001 + 0.001) * level + 0.005;
    },
    range(level) {
      return `${Math.round(0.1*level + 0.5)}%~${Math.round(0.2*level + 0.5)}%`;
    },
    hooks: {
      lightningAbsorb: (effect, value) => value + effect,
    },
  },

  {
    key: 'allResist',
    display: effect => `所有抗性 +${Math.round(effect)}`,
    minLevel: 40,
    validPositions: ['plastron', 'gaiter'],
    generate(level) {
      // 1 + 每装备等级1-2点抗性
      return (Math.random() * 0.5 + 0.75) * level + 1;
    },
    range(level) {
      return `${Math.round(0.75*level + 1)}~${Math.round((1.25*level + 1))}`;
    },
    hooks: {
      allResist: (effect, value) => value + effect,
    },
  },
  {
    key: 'hpFromKill',
    display: effect => `击杀回血 ${Math.round(effect)}`,
    minLevel: 40,
    validPositions: ['weapon'],
    generate(level) {
      return ((Math.random() * 0.2 + 0.1) * level + 0.5) * (1 + level * 0.2);
    },
    range(level) {
      return `${Math.round((0.1*level+0.5)*(1+level*0.2))}~${Math.round((0.3*level+0.5)*(1+level*0.2))}`;
    },
    hooks: {
      hpFromKill: (effect, value) => value + effect,
    },
  },
  {
    key: 'mpFromKill',
    display: effect => `击杀回蓝 ${Math.round(effect)}`,
    minLevel: 40,
    validClasses: ['wand'],
    generate(level) {
      return ((Math.random() * 0.75) * level + 5) ;
    },
    range(level) {
      return `${Math.round(5)}~${Math.round((0.75*level+5))}`;
    },
    hooks: {
      mpFromKill: (effect, value) => value + effect,
    },
  },
  {
    key: 'lucky',
    display: effect => `运气 +${effect | 0}`,
    minLevel: 60,
    weight: 0.1,
    validPositions: ['plastron', 'gaiter', 'ornament'],
    generate(level) {
      return (Math.random() * 0.5 + 0.25) * level + 1;
    },
    range(level) {
      return `${Math.round(0.25 * level + 1)}~${Math.round((0.75 * level+1))}`;
    },
    hooks: {
      mf: (effect, value) => value + effect / 100,
      gf: (effect, value) => value + effect / 100,
    },
  },
];
