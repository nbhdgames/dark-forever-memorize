/**
 * Created by tdzl2003 on 4/26/17.
 */

function getLevelBonus(level) {
  if (level <= 60) {
    return level * 0.3 + 1;
  }
  if (level <= 70) {
    return level * 0.5 + 1 - 6;
  }
}

const elements = [
  {
    key: 'summon.element.fire',
    name: '火焰精灵',
    description: '一团跳动的火焰',
    camp: 'player',
    race: 'unknown',
    career: 'melee',
    maxHp: 10,
    fireAbsorb: 1.2,
    skills: [
      {
        key: 'fireElement.fireball',
        level: 0,
      },
    ],
    v2Skills: [
      {
        key: 'fireElement.flameStrike',
        level: 0,
      },
    ],
    hooks: {
      speedRateMul(world, value, target) {
        if (!this.summoner) {
          return value;
        }
        return this.summoner.runAttrHooks(value, 'speedRateMul');
      },
      willAttack(world, value, target) {
        return value && target.fireAbsorb < 1;
      },
      willDamage(world, value, to, damageType) {
        if (!this.summoner) {
          return value;
        }
        return this.summoner.runAttrHooks(
          value,
          'summonerWillDamage',
          this,
          to,
          damageType
        );
      },
      elementType(world, value) {
        return 'fire';
      },
      maxHp(world, value) {
        if (!this.summoner) {
          return 0;
        }
        const { player } = this.summoner;
        const level = player.getSkillLevel('summonFire');
        return this.summoner.maxHp * 0.2 * (1 + level / 10);
      },
      critRate(world, value) {
        if (!this.summoner) {
          return 0;
        }
        return this.summoner.critRate;
      },
      critBonus(world, value) {
        if (!this.summoner) {
          return 0;
        }
        return this.summoner.critBonus;
      },
      atk(world, value) {
        if (!this.summoner) {
          return 0;
        }
        const { player } = this.summoner;
        const level = player.getSkillLevel('summonFire');
        return (
          5 *
          getLevelBonus(player.level) *
          (this.summoner.int * 0.01 + 1) *
          (level * 0.3 + 1) *
          this.summoner.dmgAdd
        );
      },
      def(world, value) {
        return this.summoner.def;
      },
    },
  },
  {
    key: 'summon.element.water',
    name: '水元素',
    description: '一团滚动的水元素',
    camp: 'player',
    race: 'unknown',
    career: 'melee',
    maxHp: 10,
    iceAbsorb: 1.2,
    skills: [
      {
        key: 'waterElement.waterArrow',
        level: 0,
      },
      {
        key: 'iceNova',
        level: 0,
      },
    ],
    v2Skills: [
      {
        key: 'fishzilla.bomb',
        level: 0,
      },
    ],
    hooks: {
      speedRateMul(world, value, target) {
        if (!this.summoner) {
          return value;
        }
        return this.summoner.runAttrHooks(value, 'speedRateMul');
      },
      willAttack(world, value, target) {
        return value && target.coldAbsorb < 1;
      },
      willDamage(effect, value, to, damageType) {
        if (!this.summoner) {
          return value;
        }
        return this.summoner.runAttrHooks(
          value,
          'summonerWillDamage',
          this,
          to,
          damageType
        );
      },
      elementType(world, value) {
        return 'water';
      },
      maxHp(world, value) {
        if (!this.summoner) {
          return 0;
        }
        const { player } = this.summoner;
        const level = player.getSkillLevel('summonWater');
        return this.summoner.maxHp * 0.2 * (1 + level / 10);
      },
      critRate(world, value) {
        if (!this.summoner) {
          return 0;
        }
        return this.summoner.critRate;
      },
      critBonus(world, value) {
        if (!this.summoner) {
          return 0;
        }
        return this.summoner.critBonus;
      },
      atk(world, value) {
        if (!this.summoner) {
          return 0;
        }
        const { player } = this.summoner;
        const level = player.getSkillLevel('summonWater');
        return (
          4 *
          getLevelBonus(player.level) *
          (this.summoner.int * 0.01 + 1) *
          (level * 0.3 + 1) *
          this.summoner.dmgAdd
        );
      },
      def(world, value) {
        if (!this.summoner) {
          return 0;
        }
        return this.summoner.def * 2;
      },
    },
  },
  {
    key: 'summon.element.earth',
    name: '岩石傀儡',
    description: '坚固的岩石傀儡',
    camp: 'player',
    race: 'unknown',
    career: 'melee',
    maxHp: 10,
    atkSpeed: 0.666,
    def: 100,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'summon.earth.comeToMe',
        level: 0,
      },
    ],
    v2Skills: [
      {
        key: 'earthElement.recovery',
        level: 0,
      },
      {
        key: 'summon.puppet.comeToMe',
        level: 0,
      },
    ],

    hooks: {
      speedRateMul(world, value, target) {
        if (!this.summoner) {
          return value;
        }
        return this.summoner.runAttrHooks(value, 'speedRateMul');
      },
      willDamage(effect, value, to, damageType) {
        if (!this.summoner) {
          return value;
        }
        return this.summoner.runAttrHooks(
          value,
          'summonerWillDamage',
          this,
          to,
          damageType
        );
      },
      elementType(world, value) {
        return 'melee';
      },
      maxHp(world, value) {
        if (!this.summoner) {
          return 0;
        }
        const { player } = this.summoner;
        const level = player.getSkillLevel('summonEarth');
        return this.summoner.maxHp * 0.4 * (1 + level / 10);
      },
      critRate(world, value) {
        if (!this.summoner) {
          return 0;
        }
        return this.summoner.critRate;
      },
      critBonus(world, value) {
        if (!this.summoner) {
          return 0;
        }
        return this.summoner.critBonus;
      },
      atk(world, value) {
        if (!this.summoner) {
          return 0;
        }
        const { player } = this.summoner;
        const level = player.getSkillLevel('summonEarth');
        return (
          6 *
          getLevelBonus(player.level) *
          (this.summoner.int * 0.01 + 1) *
          (level * 0.3 + 1) *
          this.summoner.dmgAdd
        );
      },
      def(world, value) {
        if (!this.summoner) {
          return 0;
        }
        return this.summoner.def * 5;
      },
    },
  },
  {
    key: 'summon.element.lightning',
    name: '闪电风暴',
    description: '一团跳动的闪电',
    camp: 'player',
    race: 'unknown',
    career: 'melee',
    maxHp: 10,
    lightningAbsorb: 1.2,
    skills: [
      {
        key: 'lightningElement.chainingLightning',
        level: 0,
      },
    ],
    v2Skills: [
      {
        key: 'lightningElement.stunAll',
        level: 0,
      },
    ],
    hooks: {
      speedRateMul(world, value, target) {
        if (!this.summoner) {
          return value;
        }
        return this.summoner.runAttrHooks(value, 'speedRateMul');
      },
      willAttack(world, value, target) {
        return value && target.lightningAbsorb < 0.5;
      },
      willDamage(world, value, to, damageType) {
        if (!this.summoner) {
          return value;
        }
        return this.summoner.runAttrHooks(
          value,
          'summonerWillDamage',
          this,
          to,
          damageType
        );
      },
      elementType(world, value) {
        return 'lightning';
      },
      maxHp(world, value) {
        if (!this.summoner) {
          return 0;
        }
        const { player } = this.summoner;
        const level = player.getSkillLevel('summonLightning');
        return this.summoner.maxHp * 0.2 * (1 + level / 10);
      },
      critRate(world, value) {
        if (!this.summoner) {
          return 0;
        }
        return this.summoner.critRate;
      },
      critBonus(world, value) {
        if (!this.summoner) {
          return 0;
        }
        return this.summoner.critBonus;
      },
      atk(world, value) {
        if (!this.summoner) {
          return 0;
        }
        const { player } = this.summoner;
        const level = player.getSkillLevel('summonLightning');
        return (
          5 *
          getLevelBonus(player.level) *
          (this.summoner.int * 0.01 + 1) *
          (level * 0.3 + 1) *
          this.summoner.dmgAdd
        );
      },
      def(world, value) {
        return this.summoner.def * 2;
      },
    },
  },
];

const elementV2 = elements.map((v) => ({
  ...v,
  key: v.key + '.2',
  name: 'II型' + v.name,
  skills: [...v.skills, ...v.v2Skills],
}));

module.exports = [...elements, ...elementV2];
