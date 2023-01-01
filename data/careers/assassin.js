/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'assassin',
  name: '刺客',
  description: '擅长从阴影中伏击敌人。',
  requirement: {
    role: 'Eyer',
    stories: ['chapter3-5'],
  },
  equipments: {
    weapon: 'stickDagger',
  },
  expFormula: [2, 10, -4, 2, 0.3],
  attrGrow: {
    str: 1,
    dex: 1.5,
    int: 0,
    sta: 1.5,
  },
  skills: {
    'assassin.melee': 1,   // 攻击
    'assassin.thump': 2,   // 剔骨
    'assassin.blood': 4,   // 血债血偿
    'assassin.kick': 6,      // 刀扇
    'assassin.daggerFan': 8,      // 刀扇
    'assassin.ambush': 10,       // 伏击
    'assassin.cutting': 12,        // 切割
    'mortalStrike': 14,    // 致死打击
    'assassin.coherentExtrapolated': 16,              // 连贯意志
    'assassin.swordSkill': 18,     // 狂热
    'assassin.summonPuppet': 20,
    'assassin.thumpHead': 22,    // 击颅 应该22
  },
  passives: {
    'atkByDex': 1,
    'energy': 4,
  },
  enhances: {
    // 机敏： +25%闪避
    // 迅捷： +25%能量恢复速度
    'assassin.sharp': 10,
    'assassin.speed': 10,
    'weaponMastery': 15,
    'assassin.dexBeleive': 15,
    'assassin.protect': 20,
    'assassin.atkFromStr': 20,
  },
  availableClasses: {
    base: true,
    sword: true,    // 剑
    dagger: true,
    cloth: true,    // 布甲
    armor: true,
    ornament: true,
  },
};
