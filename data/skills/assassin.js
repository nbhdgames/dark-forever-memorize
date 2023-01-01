/**
 * Created by tdzl2003 on 4/9/17.
 */

function addCombo(target, combo) {
  target.combos.push(combo);
  if (target.combos.length > 20) {
    target.combos.shift();
  }
}

function comboCount(target) {
  if (target) {
    return target.combos.length;
  }
  return 0;
}

function clearCombo(world, self, target, limit, finalAttack) {
  let combos;
  if (limit) {
    combos = target.combos.splice(0, limit);
  } else {
    combos = target.combos.splice(0);
  }
  combos.forEach(v => {
    v.effect(world, self, finalAttack);
  });
  finalAttack.isCrit = self.testCrit(finalAttack.critRate);
  combos.forEach(v => {
    v.postEffect(world, self, finalAttack);
  })
}

class Combo {
  value;
  constructor(value) {
    this.value = value;
  }

  effect(world, self, finalAttack) {

  }
  postEffect(world, self, finalAttack) {
  }
}

class MeleeCombo extends Combo {
  effect(world, self, finalAttack) {
    finalAttack.dmg += this.value;
  }
}

class EnergyCombo extends Combo {
  effect(world, self, finalAttack) {
    finalAttack.critRate += this.value;
  }
}

class BloodCombo extends Combo {
  postEffect(world, self, finalAttack) {
    self.hp += self.getCritBonus(finalAttack.isCrit, finalAttack.critBonus) * this.value;
  }
}

module.exports = [
  {
    key: 'assassin.melee',
    name: '攻击',
    group: 'melee',
    expGroup: 'melee',
    description: level => {
      const bonus = (1+0.2*level);
      const min = 0.6*bonus*100, max = 1* bonus*100;
      const extra = 0.4 * bonus * 100;
      return `普普通通的一击。对目标造成攻击力的${min|0}%-${max|0}%伤害。连击：在最终一击时额外造成${extra | 0}%武器伤害。`
    },
    isAttack: true,
    maxExp(level) {
      return level**2 * 1000 + level*3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, leech = 0, atk } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const rate = (level * 0.2 + 1);
      const val = atk * (Math.random() * 0.4 + 0.6) * rate;
      const isCrit = self.testCrit();
      const critBonus = self.getCritBonus(isCrit);
      world.sendDamage('melee', self, target, this, val * critBonus, isCrit);

      if (leech) {
        self.hp += leech;
      }

      addCombo(target, new MeleeCombo(atk * 0.4 * rate));
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'assassin.thump',
    group: 'finalAttack',
    name: '剔骨',
    description: level => {
      const bonus = (1+0.2*level);
      const min = 150 * bonus, max = 250 * bonus;
      return `造成巨额的伤害。对目标造成武器每秒伤害的${min|0}%-${max|0}%伤害。最终一击：需要三个连击效果。`
    },
    coolDown: 1000,
    maxExp(level) {
      return level**2 * 600 + level * 1800 + 1200;
    },
    canUse(world, self) {
      return comboCount(self.target) >= 3;
    },
    effect(world, self, level) {
      const { target, atk, atkSpeed, leech = 0, critRate = 0, critBonus = 1.5 } = self;
      const val = atk * (Math.random() + 1.5) * (level/5 + 1) * atkSpeed;

      const atkInfo = {
        dmg: val,
        critRate,
        critBonus,
      };

      clearCombo(world, self, target, 3, atkInfo);
      if (world.testDodge(self, target, this)) {
        return;
      }

      world.sendDamage('melee', self, target, this, self.getCritBonus(atkInfo.isCrit, atkInfo.critBonus) * atkInfo.dmg, atkInfo.isCrit);
      if (leech) {
        self.hp += leech;
      }
      target.rp += target.rpOnAttacked;
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'assassin.blood',
    name: '血债血偿',
    coolDown: 1500,
    cost: {
      ep: 20,
    },
    description: level => {
      const bonus = (1+0.2*level);
      const min = 1*bonus*100, max = 1.5 * bonus*100;
      const extra = 0.2 * bonus * 100;
      return `用仇恨引导你的攻击，对目标造成武器每秒伤害的${min|0}%-${max|0}%伤害。连击：在最终一击时恢复武器每秒伤害的${extra.toFixed(1)}%生命。`
    },
    maxExp(level) {
      return level**2 * 1000 + level*3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, leech = 0, atk, atkSpeed } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const rate = (level * 0.2 + 1);
      const val = atk * (Math.random() * 0.5 + 1) * rate * atkSpeed;
      const isCrit = self.testCrit();
      world.sendDamage('melee', self, target, this, val * self.getCritBonus(isCrit), isCrit);

      if (leech) {
        self.hp += leech;
      }

      addCombo(target, new BloodCombo(atk * 0.2 * rate * atkSpeed));
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'assassin.coherentExtrapolated',
    name: '集中意志',
    coolDown: 1500,
    cost: {
      ep: 20,
    },
    description: level => {
      const bonus = (1+0.2*level);
      const min = 1*bonus*100, max = 1.5 * bonus*100;
      return `用意志引导你的攻击，对目标造成武器每秒伤害的${min|0}%-${max|0}%伤害。连击：使你的最终一击暴击几率提升5%。`
    },
    maxExp(level) {
      return level**2 * 1000 + level*3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, leech = 0, atk, atkSpeed } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const rate = (level * 0.2 + 1);
      const val = atk * (Math.random() * 0.5 + 1) * rate * atkSpeed;
      const isCrit = self.testCrit();
      world.sendDamage('melee', self, target, this, self.getCritBonus(isCrit) * val, isCrit);

      if (leech) {
        self.hp += leech;
      }

      addCombo(target, new EnergyCombo(0.05));
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'assassin.cutting',
    group: 'finalAttack',
    name: '切割',
    coolDown: 1000,
    description: level => {
      const bonus = (1+0.2*level) * 15;
      return `并增加${bonus | 0}%攻击速度和能量恢复速度，持续5秒。最终一击：需要至少五个连击效果，消耗并触发所有剩余连击效果。`
    },
    maxExp(level) {
      return level**2 * 600 + level * 1800 + 1200;
    },
    canUse(world, self) {
      return comboCount(self.target) >= 5;
    },
    effect(world, self, level) {
      const { target, leech = 0, critRate = 0, critBonus = 1.5 } = self;
      const atkInfo = {
        dmg: 0,
        critRate,
        critBonus,
      };
      clearCombo(world, self, target, 0, atkInfo);
      if (world.testDodge(self, target, this)) {
        return;
      }

      const bonus = (1+0.2*level) * 0.15 + 1;

      // 增加buff
      self.addBuff('assassin.cutting', 5000, bonus, 'assassin.cutting');

      // 触发连击的攻击效果
      if (atkInfo.dmg > 0) {
        world.sendDamage('melee', self, target, this, self.getCritBonus(atkInfo.isCrit, atkInfo.critBonus) * atkInfo.dmg, atkInfo.isCrit);
        if (leech) {
          self.hp += leech;
        }
        target.rp += target.rpOnAttacked;
        target.runAttrHooks(self, 'attacked');
      }
    },
  },

  {
    key: 'assassin.ambush',
    name: '伏击',
    description: level => {
      const bonus = (1+0.2*level);
      const min = 400 * bonus, max = 600 * bonus;
      return `对目标造成${min|0}%-${max|0}%攻击力伤害，30秒内不能对相同的目标再次使用。连击：再次造成相同的伤害值。`
    },
    coolDown: level => 5000 / (1 + level / 10),
    maxExp(level) {
      return level**2 * 200 + level * 600 + 400;
    },
    canUse(world, self, level) {
      if (!self.target) {
        return false;
      }
      return !self.target.runAttrHooks(false, 'isAmbushed');
    },
    effect(world, self, level) {
      const { target, critRate = 0, critBonus = 1.5  } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const isCrit = self.testCrit(self.runAttrHooks(critRate, 'ambushCritRate'));

      const atk = self.atk;
      const val = atk * (Math.random()*2 + 4) * (1+0.2*level);
      world.sendDamage('melee', self, target, this, self.getCritBonus(isCrit) * val, isCrit);
      addCombo(target, new MeleeCombo(val));
      target.addBuff('assassin.Ambush', 30000);
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'assassin.daggerFan',
    name: '刀扇',
    coolDown: 1500,
    cost: {
      ep: 30,
    },
    description: level => {
      const bonus = (1+0.2*level);
      const min = 0.6*bonus*100, max = 1 * bonus*100;
      const extra = 0.1 * bonus * 100;
      return `对所有敌人造成武器每秒伤害的${min|0}%-${max|0}%伤害。连击：在最终一击时再次造成武器每秒伤害的${extra.toFixed(1)}%伤害。`
    },
    maxExp(level) {
      return level**2 * 1000 + level*3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { leech = 0, atk, atkSpeed } = self;
      const rate = (level * 0.2 + 1);
      const val = atk * (Math.random() * 0.4 + 0.6) * rate * atkSpeed;

      let haveTarget = false;
      for (const target of world.units.filter(v => self.willAttack(v))) {
        if (world.testDodge(self, target, this)) {
          continue;
        }
        haveTarget = true;
        const isCrit = self.testCrit();
        world.sendDamage('melee', self, target, this, self.getCritBonus(isCrit) * val, isCrit);
        addCombo(target, new MeleeCombo(atk * 0.1 * rate * atkSpeed));
      }

      if (haveTarget && leech) {
        self.hp += leech;
      }
    },
  },

  {
    key: 'assassin.kick',
    name: '脚踢',
    description: (level) => `用力踢飞一个目标，打断其正在释放的技能，并阻止其5秒内释放相同的技能`,
    coolDown: level => 10000 / (1 + level * 0.1),
    maxExp(level) {
      return level**2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      const target = world.units.find(v => self.willAttack(v) && (
        (v.casting !== null && !v.casting.notBreakable) ||
        (v.reading !== null && v.reading.skill &&!v.reading.skill.notBreakable)));
      return !!target;
    },
    effect(world, self, level) {
      const target = world.units.find(v => self.willAttack(v) && (
        (v.casting !== null && !v.casting.notBreakable) ||
        (v.reading !== null && v.reading.skill && !v.reading.skill.notBreakable)));
      world.sendSkillUsage(self, null, this);
      target.breakCasting(5000);
    },
  },

  {
    key: 'assassin.swordSkill',
    name: '狂热',
    group: 'melee',
    expGroup: 'swordSkill',
    description: level => {
      const bonus = (1+0.2*level);
      const min = 60 * bonus, max = 100 * bonus;
      return `对目标造成攻击力的${min|0}%-${max|0}%伤害。连击：使最终一击和接下来的${level+1}秒内增加10%伤害。`
    },
    targetType: 'target',
    isAttack: true,
    maxExp(level) {
      return level**2 * 1000 + level*3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, leech = 0, atk } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const val = atk * (Math.random() * 0.4 + 0.6) * (level*0.2 + 1);
      const isCrit = self.testCrit();
      world.sendDamage('melee', self, target, this, self.getCritBonus(isCrit) * val, isCrit);

      if (leech) {
        self.hp += leech;
      }

      const combo = new Combo();

      combo.effect = (world, self, finalAttack) => {
        finalAttack.atkAdd = finalAttack.atkAdd || 1;
        finalAttack.atkAdd += 0.1;
      };
      combo.postEffect = (world, self, finalAttack) => {
        finalAttack.dmg *= finalAttack.atkAdd || 1;
        finalAttack.atkAdd = null;
        self.addBuff('swordSkill', (level + 1) * 1000, 0.1);
      };
      addCombo(target, combo);

      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'assassin.thumpHead',
    group: 'finalAttack',
    name: '击颅',
    description: level => {
      const bonus = (1+0.2*level);
      return `使目标昏迷${(level+1)/2}秒。最终一击：需要四个连击效果。`
    },
    coolDown: 1000,
    maxExp(level) {
      return level**2 * 600 + level * 1800 + 1200;
    },
    canUse(world, self) {
      return comboCount(self.target) >= 3;
    },
    effect(world, self, level) {
      const { target, leech = 0, critRate = 0, critBonus = 1.5 } = self;
      const atkInfo = {
        dmg: 0,
        critRate,
        critBonus,
      };

      clearCombo(world, self, target, 0, atkInfo);
      if (world.testDodge(self, target, this)) {
        return;
      }

      // 增加buff
      target.stun((level+1)/2);

      // 触发连击的攻击效果
      if (atkInfo.dmg > 0) {
        world.sendDamage('melee', self, target, this, self.getCritBonus(atkInfo.isCrit, atkInfo.critBonus) * atkInfo.dmg, atkInfo.isCrit);
        if (leech) {
          self.hp += leech;
        }
        target.rp += target.rpOnAttacked;
        target.runAttrHooks(self, 'attacked');
      }
    },
  },

  {
    key: 'assassin.summonPuppet',
    name: '影分身',
    coolDown: level => 30000 / (1 + level / 10),
    description: level => {
      return `召唤一个拥有你50%生命值的分身，分散敌人的注意力。同时最多存在3个分身。升级减少此技能的冷却时间。`
    },
    maxExp(level) {
      return level**2 * 100 + level*300 + 200;
    },
    canUse(world, self) {
      return world.map !== 'home' && world.units.filter(v =>
        v.summoner === self && v.type === 'summon.assassin.puppet' && v.camp !== 'ghost'
      ).length < 3;
    },
    effect(world, self, level) {
      world.addEnemy('summon.assassin.puppet', null, 0, self, this);
    },
  },
  {
    key: 'summon.puppet.comeToMe',
    name: '来打我啊',
    castTime: 1500,
    coolDown: 10000,
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      for (const target of world.units.filter(v => self.willAttack(v))) {
        target.target = self;
      }
    }
  },
];
