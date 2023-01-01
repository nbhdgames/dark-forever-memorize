/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'elementSommoner',
  name: '元素召唤师',
  description: '与精灵签订契约就职魔法少女，掌握超自然的力量以击败魔族。',
  requirement: {
    role: 'Aleanor',
    stories: ['chapter3-5'],
  },
  equipments: {
    weapon: 'stickWand',
  },
  expFormula: [2, 10, -4, 2, 0.3],
  skills: {
    summonWindBlade: 1,
    summonFire: 2,
    summonWater: 4,
    explodeSummons: 6,
    burning: 8,
    summonEarth: 10,
    counterSpelling: 12,
    healthDrill: 14,
    iceLance: 16,
    awaking: 18,
    'summon.disappear': 20,
    summonLightning: 22,
    transform: 24,
    'summon.upgrade': 30,
  },
  passives: {
    magic: 2,
  },
  enhances: {
    thinking: 10,
    longLive: 10,
    summonCount: 15,
    // summonBack: 15,
    manaExchange: 25,
  },
  availableClasses: {
    base: true,
    wand: true,    // 法杖
    cloth: true,    // 布甲
    ornament: true,
  },
  attrGrow: {
    str: 0,
    dex: 1,
    int: 2,
    sta: 1,
  },
};
