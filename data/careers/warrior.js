/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'warrior',
  name: '战士',
  description: '好用的炮灰(?)职业，用肌肉来解决问题。',
  requirement: {
    role: 'Eyer',
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
    melee: 1,
    thump: 2,
    meleeForRage: 4,
    cleave: 6,
    thumpHead: 8,
    shout: 10,
    cleaveBlast: 12,
    whirlwind: 14,
    swordSkill: 16,
    shoutShake: 18,
    mortalStrike: 20,
    whirlwindBlood: 22,
    commandShout: 24,
    shockWave: 26,
    'warrior.kick': 28,
  },
  passives: {
    atkByStr: 1,
    rage: 2,
  },
  enhances: {
    weaponMastery: 10,
    rageForHp: 10,
    ragingAttack: 15,
    ironBody: 15,
    rageFromHeart: 20,
    strengthBelieve: 20,
    keepingRage: 25,
    phoenixHeart: 25,
    pugnacity: 30,
  },
  availableClasses: {
    base: true,
    sword: true, // 剑
    cloth: true, // 布甲
    armor: true,
    ornament: true,
  },
};
