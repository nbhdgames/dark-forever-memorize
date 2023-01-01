/**
 * Created by tdzl2003 on 3/7/17.
 */

module.exports = [
  {
    key: 'thinking',
    name: '冥思',
    description: '每5秒恢复2.5%的生命值和法力值。',
    hooks: {
      hpRecovery(world, value) {
        return value + this.maxHp * 0.005;
      },
      mpRecovery(world, value) {
        return value + this.maxMp * 0.005;
      },
    },
  },
  {
    key: 'soCold',
    name: '急冻',
    description: '你造成的寒冷效果有20%几率变为冻结效果。',
    hooks: {
      soCold: () => 0.2,
    },
  },
  {
    key: 'flaming',
    name: '燃尽',
    description: '你的火焰法术造成的暴击伤害可以在接下来10秒内造成同等的持续伤害。新的燃尽效果会刷新旧效果的持续时间。',
    hooks: {
      flaming: () => true,
    },
  },
  {
    key: 'magicArtist',
    name: '法力交织',
    description: '每释放一个和上次技能不同系的技能，就增加10%的伤害，持续5秒',
    hooks: {
      magicArtist: () => true,
    },
  },
  {
    key: 'coldWeaken',
    name: '寒冷弱点',
    description: '对冰冷目标造成的伤害增加20%，对冻结目标造成的伤害增加40%。',
    hooks: {
      willDamage(world, value, target) {
        if (target.runAttrHooks(false, 'freezed')) {
          return value * 1.4;
        } else if (target.runAttrHooks(false, 'cold')) {
          return value * 1.2;
        }
        return value;
      },
    },
  },
  {
    key: 'fireFrenzy',
    name: '烈焰狂热',
    description: '火球术可使你所有火焰法术的技能冷却减少1秒',
    hooks: {
      fireFrenzy: () => true,
    },
  },
  {
    key: 'manaExchange',
    name: '法力转化',
    description: '每当你消耗法力值，就为你创建一个可吸收相同数值伤害的护盾。护盾的总数额不会超过你的生命值上限。',
    hooks: {
      postCostMp(world, value) {
        const buff = this.buffs.find(v => v.group === 'manaShield');
        const result = value;
        if (buff) {
          buff.arg = Math.min(buff.arg + result, this.maxHp);
        } else {
          this.addBuff('manaShield', null, result, 'manaShield');
        }
        return value;
      }
    },
  },
  {
    key: 'coldAir',
    name: '冻气',
    description: '你的冰冷法术和效果将使敌人永久减速1%，最多叠加90层。',
    hooks: {
      coldAir: () => true,
    },
  },
  {
    key: 'fireRunner',
    name: '烈焰行者',
    description: '遇敌速度增加100%。',
  },
  {
    key: 'lifeExchange',
    name: '生命转化',
    description: '每损失1%生命值，就为你恢复1%法力值。',
  },
];
