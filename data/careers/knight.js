/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'knight',
  name: '圣骑士',
  description: '圣光谦卑的仆从，谦卑，怜悯。',
  requirement: {
    role: 'Eyer',
    stories: ['chapter3-5'],
  },
  equipments: {
    weapon: 'stickSword',
  },
  expFormula: [2, 10, -4, 2, 0.3],
  attrGrow: {
    str: 1.5,
    dex: 1,
    int: 0,
    sta: 1.5,
  },
  skills: {
    'knight.melee': 1,
    'knight.thump': 2,
    'knight.glory': 4,
    'knight.cleave': 6,
    'knight.sacrifice': 8,
    'knight.holySign': 10,
    'knight.thumpHead': 12,
    'knight.whirlwind': 14,
    'knight.damageSign': 16,
    'knight.reflect': 18,
    'knight.holyShield': 20,
    'knight.pray': 22,
    'knight.melee1': 24,
    'knight.kick': 28,
    'knight.deserve': 40,
  },
  passives: {
    'atkByStr': 1,
  },
  enhances: {
    'knight.protectBelieve': 10,
    'knight.attackBelieve': 10,
    'weaponMastery': 15,
    'knight.spirit': 15,
    'knight.talking': 20,
    'knight.recharge': 20,
    'knight.absorb': 25,
    'knight.defense': 25,
  },
  availableClasses: {
    base: true,
    sword: true,    // 剑
    cloth: true,    // 布甲
    armor: true,
    ornament: true,
  },
};
