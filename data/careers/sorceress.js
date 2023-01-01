/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'sorceress',
  name: '魔法少女',
  description: '与精灵签订契约就职魔法少女，掌握超自然的力量以击败魔族。',
  requirement: {
    role: 'Aleanor',
  },
  equipments: {
    weapon: 'stickWand',
  },
  expFormula: [2, 10, -4, 2, 0.3],
  skills: {
    windBlade: 1,
    fireBall: 2,
    iceArrow: 4,
    magicShield: 6,
    flameStrike: 8,
    iceNova: 10,
    counterSpelling: 12,
    burning: 14,
    iceLance: 16,
    awaking: 18,
    fireShield: 20,
    iceShield: 22,
    transform: 24,
    dragonFlame: 26,
  },
  passives: {
    magic: 2,
  },
  enhances: {
    thinking: 10,
    coldWeaken: 10,
    fireFrenzy: 15,
    magicArtist: 15,
    soCold: 20,
    flaming: 20,
    manaExchange: 25,
    coldAir: 25,
    // fireRunner: 30,
    // lifeExchange: 30,
  },
  availableClasses: {
    base: true,
    wand: true, // 法杖
    cloth: true, // 布甲
    ornament: true,
  },
  attrGrow: {
    str: 0,
    dex: 1,
    int: 2.5,
    sta: 0.5,
  },
};
