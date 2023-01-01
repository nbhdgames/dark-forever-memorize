/**
 * Created by tdzl2003 on 2/3/17.
 */

module.exports = [
  {
    key: 'maxHp',
    display: effect => `生命值 +${Math.round(effect)}`,
    validPositions: ['plastron', 'gaiter'],
    generate(level) {
      // 1 + 每装备等级1-3点生命
      return (Math.random() * 2 + 1) * level + 1;
    },
    range(level) {
      return `${level + 1}~${3 * level + 1}`
    },
    hooks: {
      maxHp: (effect, value) => value + effect,
    },
  },
  {
    key: 'maxMp',
    display: effect => `法力值 +${Math.round(effect)}`,
    validClasses: ['cloth', 'ornament'],
    generate(level) {
      // 1 + 每装备等级1-2点法力
      return (Math.random() * 1 + 1) * level + 1;
    },
    range(level) {
      return `${level + 1}~${2 * level + 1}`
    },
    hooks: {
      maxMp: (effect, value) => value + effect,
    },
  },
  {
    key: 'hpRecovery',
    display: effect => `5秒回血${Math.round(effect*5)}点`,
    validPositions: ['plastron', 'gaiter', 'ornament'],
    generate(level) {
      // (0.5+每装备等级0.125-0.375点生命回复)*(1+每装备等级*0.1)
      return ((Math.random() * 0.05 + 0.025) * level + 0.1) * (1+level*0.2);
    },
    range(level) {
      return `${Math.round((0.025*level + 0.1)*(1+level*0.2) * 5)}~${Math.round((0.075*level + 0.1)*(1+level*0.2) * 5)}`
    },
    hooks: {
      hpRecovery: (effect, value) => value + effect,
    },
  },
  {
    key: 'mpRecovery',
    display: effect => `5秒回蓝${Math.round(effect*5)}点`,
    validClasses: ['cloth', 'wand', 'ornament'],
    generate(level) {
      // 2+每装备等级0-0.2点法力回复
      return (Math.random() * 0.15) * level + 1;
    },
    range(level) {
      return `${Math.round(1*5)}~${Math.round((0.15*level+1)*5)}`
    },
    hooks: {
      mpRecovery: (effect, value) => value + effect,
    },
  },
  {
    key: 'atk',
    display: effect => `攻击力 +${Math.round(effect)}`,
    weight: 2,
    validClasses: ['sword', 'dagger'],
    generate(level) {
      // 0.5+每装备等级0.125-0.375点攻击力
      return (Math.random() * 0.25 + 0.125) * level + 0.5;
    },
    range(level) {
      return `${Math.round(0.125*level+0.5)}~${Math.round((0.375*level + 0.5))}`;
    },
    hooks: {
      atk: (effect, value) => value + effect,
    },
  },
  {
    key: 'critRate',
    display: effect => `暴击几率 +${Math.round(effect*100)}%`,
    weight: 0.6,
    minLevel: 20,
    generate(level) {
      // 1%+每装备等级0.125%-0.375%暴击几率
      return (Math.random() * 0.00125 + 0.00125) * level + 0.01;
    },
    range(level) {
      return `${Math.round(0.125*level+1)}%~${Math.round((0.25*level + 1))}%`;
    },
    hooks: {
      critRate: (effect, value) => value + effect,
    },
  },
  {
    key: 'critBonus',
    display: effect => `暴击伤害 +${Math.round(effect*100)}%`,
    weight: 0.6,
    minLevel: 20,
    generate(level) {
      // 5%+每装备等级0.5%-1.0%暴击伤害
      return (Math.random() * 0.005 + 0.005) * level + 0.05;
    },
    range(level) {
      return `${Math.round(0.5*level + 5)}%~${Math.round((1*level + 5))}%`;
    },
    hooks: {
      critBonus: (effect, value) => value + effect,
    },
  },
  {
    key: 'leech',
    display: effect => `吸血 +${Math.round(effect)}`,
    validClasses: ['sword', 'dagger', 'ornament'],
    generate(level) {
      // 1+每装备等级0.2-0.6击回
      return ((Math.random() * 0.1 + 0.05) * level + 0.2) * (1+level*0.2);
    },
    range(level) {
      return `${Math.round((0.05*level+0.2)*(1+level*0.2))}~${Math.round((0.15*level+0.2)*(1+level*0.2))}`;
    },
    hooks: {
      leech: (effect, value) => value + effect,
    },
  },
  {
    key: 'atkMul',
    display: effect => `攻击力 +${Math.round(effect*100)}%`,
    validClasses: ['sword', 'dagger'],
    weight: 0.4,
    generate(level) {
      // 3%+每级0.15-0.25%攻击力
      return (Math.random() * 0.0025 + 0.0025) * level + 0.03;
    },
    range(level) {
      return `${Math.round(0.25*level + 3)}%~${Math.round((0.5*level + 3))}%`;
    },
    hooks: {
      atkMulAttr: (effect, value) => value * (1 + effect),
    },
  },
  {
    key: 'atkSpeedAdd',
    display: effect => `攻击速度 +${Math.round(effect*100)}%`,
    validClasses: ['sword', 'dagger'],
    generate(level) {
      // 5%+每装备等级0.15%-0.25%攻击速度
      return (Math.random() * 0.0015 + 0.0015) * level + 0.05;
    },
    range(level) {
      return `${Math.round(0.15*level + 5)}%~${Math.round((0.3*level + 5))}%`;
    },
    hooks: {
      atkSpeedAdd: (effect, value) => value + effect,
    },
  },
  {
    key: 'def',
    display: effect => `护甲 +${Math.round(effect)}`,
    validPositions: ['plastron', 'gaiter'],
    generate(level) {
      // 3 + 每装备等级0.5-1.5属性
      return (Math.random() * 1 + 0.5) * level + 3;
    },
    range(level) {
      return `${Math.round(0.5*level + 3)}~${Math.round((1.5*level + 3))}`;
    },
    hooks: {
      def: (effect, value) => value + effect,
    },
  },
  {
    key: 'str',
    display: effect => `力量 +${Math.round(effect)}`,
    generate(level) {
      // 1 + 每装备等级0.5-1.5属性
      return (Math.random() * 1 + 0.5) * level + 1;
    },
    range(level) {
      return `${Math.round(0.5*level + 1)}~${Math.round((1.5*level + 1))}`;
    },
    hooks: {
      str: (effect, value) => value + effect,
    },
  },
  {
    key: 'dex',
    display: effect => `敏捷 +${Math.round(effect)}`,
    generate(level) {
      // 1 + 每装备等级0.5-1.5属性
      return (Math.random() * 1 + 0.5) * level + 1;
    },
    range(level) {
      return `${Math.round(0.5*level + 1)}~${Math.round((1.5*level + 1))}`;
    },
    hooks: {
      dex: (effect, value) => value + effect,
    },
  },
  {
    key: 'int',
    display: effect => `智力 +${Math.round(effect)}`,
    generate(level) {
      // 1 + 每装备等级0.5-1.5属性
      return (Math.random() * 1 + 0.5) * level + 1;
    },
    range(level) {
      return `${Math.round(0.5*level + 1)}~${Math.round((1.5*level + 1))}`;
    },
    hooks: {
      int: (effect, value) => value + effect,
    },
  },
  {
    key: 'sta',
    display: effect => `耐力 +${Math.round(effect)}`,
    generate(level) {
      // 1 + 每装备等级0.5-1.5属性
      return (Math.random() * 1 + 0.5) * level + 1;
    },
    range(level) {
      return `${Math.round(0.5*level + 1)}~${Math.round((1.5*level + 1))}`;
    },
    hooks: {
      sta: (effect, value) => value + effect,
    },
  },
];
