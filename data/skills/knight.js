/**
 * Created by tdzl2003 on 1/31/17.
 */

function addCombo(self, count = 1) {
  const max = self.runAttrHooks(3, 'maxComboPoint');
  self.runAttrHooks(count, 'holyCombo');
  self.comboPoint = Math.min(max, self.comboPoint + count);
}

function useCombo(self, count) {
  self.runAttrHooks(count, 'postCostComboPoint');
  self.comboPoint -= count;
}

/**
 * isAttack: 是否伴随普通攻击。如果是的话，只有可以进行普通攻击的时候才可释放技能。
 */
module.exports = [
  {
    key: 'knight.melee',
    name: '攻击',
    group: 'melee',
    expGroup: 'melee',
    description: level => {
      const bonus = (1+0.2*level);
      const min = 0.75*bonus*100, max = 1.25* bonus*100;
      return `正义的一击。对目标造成攻击力的${min|0}%-${max|0}%伤害，产生一点圣能。`
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
      const val = atk * (Math.random() * 0.5 + 0.75) * (level * 0.2 + 1);
      const isCrit = self.testCrit();
      world.sendDamage('melee', self, target, this, self.getCritBonus(isCrit) * val, isCrit);

      if (leech) {
        self.hp += leech;
      }
      addCombo(self);
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'knight.thump',
    group: 'thump',
    name: '重击',
    expGroup: 'thump',
    description: level => {
      const bonus = (1+0.2*level);
      const min = 250 * bonus, max = 350 * bonus;
      return `审判的一击。造成巨额的伤害。对目标造成攻击力的${min|0}%-${max|0}%伤害。需要三点圣能。`
    },
    cost: {
      comboPoint: 3,
    },
    coolDown: 500,
    maxExp(level) {
      return level**2 * 600 + level * 1800 + 1200;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk, leech = 0, critRate = 0, critBonus = 1.5 } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const val = atk * (Math.random() + 2.5) * (level/5 + 1);
      const isCrit = self.testCrit();
      world.sendDamage('melee', self, target, this, self.getCritBonus(isCrit) * val, isCrit);
      if (leech) {
        self.hp += leech;
      }
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'knight.cleave',
    name: '顺劈斩',
    group: 'melee',
    description: (level, self) => {
      const bonus = (1+0.2*level) * self.runAttrHooks(1, 'cleaveDamageRate');
      const min = 30 * bonus, max = 42 * bonus;
      return `制裁的一击。对最多三个目标分别造成(${min|0}%-${max|0}%)倍攻击力伤害，产生一点圣能。`
    },
    isAttack: true,
    maxExp(level) {
      return level**2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { atk, target, leech = 0 } = self;
      const damageRate = self.runAttrHooks(1, 'cleaveDamageRate');
      const val = atk * (Math.random()* 0.12 + 0.3) * (level / 5 + 1) * damageRate;
      const isCrit = self.testCrit();
      world.sendDamage('melee', self, target, this, self.getCritBonus(isCrit) * val, isCrit);

      let leechRatio = 0.4;

      const extraTargets = world.units.filter(v => v !== target && self.willAttack(v)).slice(0, 2);
      extraTargets.forEach( target => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        const val = atk * (Math.random()* 0.12 + 0.3) * (level / 10 + 1);
        leechRatio += 0.4;
        world.sendDamage('melee', self, target, this, self.getCritBonus(isCrit) * val, isCrit);
        target.runAttrHooks(self, 'attacked');
      });

      if (leech) {
        self.hp += leech * leechRatio;
      }
      addCombo(self);
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'knight.whirlwind',
    name: '破邪斩',
    description: level => {
      const bonus = (1+0.2*level);
      const min = 60 * bonus, max = 80 * bonus;
      return `荣耀的一击。对全体目标造成造成攻击力的${min|0}%-${max|0}%伤害。需要三点圣能。`
    },
    coolDown: 800,
    cost: {
      comboPoint: 3,
    },
    maxExp(level) {
      return level**2 * 600 + level * 1800 + 1200;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const atk = self.atk * (level*0.2 + 1);

      const targets = world.units.filter(v => self.willAttack(v));
      const { critRate = 0, critBonus = 1.5, leech } = self;

      if (leech) {
        self.hp += leech;
      }

      targets.forEach( target => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        const val = atk * (Math.random()* 0.2 + 0.6) ;
        const isCrit = self.testCrit();
        world.sendDamage('melee', self, target, this, self.getCritBonus(isCrit) * val, isCrit);
        target.runAttrHooks(self, 'attacked');
      });
    },
  },

  {
    key: 'knight.holySign',
    name: '圣光圣印',
    group: 'sign',
    coolDown: 8000,
    description: level => {
      const bonus = 10 + 2 * level;
      return `在目标身上印上光明的圣印，每个伤害目标的人恢复其造成伤害的${bonus}%生命值，持续10秒。`;
    },
    maxExp(level) {
      return level**2 * 200 + level*600 + 400;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const bonus = 0.1 + 0.02 * level;
      const { target } = self;
      target.addBuff('knight.holySign', 10000, bonus, 'knight.sign');
    }
  },

  {
    key: 'knight.damageSign',
    name: '审判圣印',
    group: 'sign',
    coolDown: 8000,
    description: level => {
      const bonus = (1+0.2*level) * 100 * 0.4;
      return `在目标身上印上审判的圣印，当其攻击或释放技能时对周围所有你的敌人造成你攻击力的${bonus | 0}%伤害，持续10秒。`;
    },
    maxExp(level) {
      return level**2 * 200 + level*600 + 400;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const bonus = (1+0.2*level) * 0.4;
      const { target } = self;
      target.addBuff('knight.damageSign', 10000, bonus, 'knight.sign');
    }
  },

  {
    key: 'knight.thumpHead',
    name: '制裁之锤',
    expGroup: 'knight.thumpHead',
    description: level => {
      return `使目标昏迷${level+5}秒。`
    },
    coolDown: 10000,
    maxExp(level) {
      return level**2 * 300 + level * 500 + 600;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target } = self;
      target.stun(level+5);
    },
  },

  {
    key: 'knight.sacrifice',
    name: '牺牲',
    group: 'melee',
    expGroup: 'sacrifice',
    description: level => {
      const bonus = (1+0.2*level);
      const min = 1*bonus*100, max = 1.75* bonus*100;
      return `绝望的一击。对目标造成攻击力的${min|0}%-${max|0}%伤害，你自己受到${(15/bonus).toFixed(1)}%的总伤害，产生一点圣能。`
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
      let val = atk * (Math.random() * 0.75 + 1);
      const isCrit = self.testCrit();
      world.sendDamage('melee', self, self, this, self.getCritBonus(isCrit) * val * 0.15, isCrit);
      val *= (level * 0.2 + 1);
      world.sendDamage('melee', self, target, this, self.getCritBonus(isCrit) * val, isCrit);

      if (leech) {
        self.hp += leech;
      }
      addCombo(self);
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'knight.glory',
    name: '荣耀',
    description: level => {
      return `荣耀的力量。为自己恢复${10+level}%生命值。需要三点圣能。`
    },
    coolDown: 10000,
    cost: {
      comboPoint: (unit) => unit.runAttrHooks(false, 'cheapGlory') ? 0 :3,
    },
    maxExp(level) {
      return level**2 * 200 + level * 600 + 400;
    },
    effect(world, self, level) {
      world.sendHeal(self, self, this, self.maxHp * (0.1 + level * 0.01));
      world.sendSkillUsage(self, null, this);
    },
  },
  {
    key: 'knight.reflect',
    name: '盾牌反射',
    description: level => {
      const rate = 20 + level*4;
      return `受到法术伤害时，抵挡其伤害，并对伤害来源造成${rate}%的伤害，持续${level + 5}秒。`;
    },
    maxExp(level) {
      return level**2 * 200 + level * 600 + 400;
    },
    castTime: 2000,
    coolDown: level => 20000 + level * 2000,
    effect(world, self, level) {
      self.addBuff('knight.shieldReflect', (level + 5) * 1000, 0.2 + level * 0.04);
    },
  },
  {
    key: 'knight.holyShield',
    name: '保护祝福',
    description: level => {
      return `在未来${level+3}秒内，免疫所有的物理伤害。只会在生命值小于50%时使用。同时获得三点圣能。`;
    },
    maxExp(level) {
      return level**2 * 200 + level * 600 + 400;
    },
    coolDown: level => 30000 + level * 2000,
    shouldUse(world, self) {
      return self.hp < self.maxHp / 2;
    },
    effect(world, self, level) {
      self.addBuff('holyShield', (level + 3) * 1000);
      addCombo(self, 3);
    },
  },

  {
    key: 'knight.kick',
    name: '盾击',
    description: (level) => `用盾牌冲撞敌人，打断其正在释放的技能，并阻止其5秒内释放相同的技能`,
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
    key: 'knight.pray',
    name: '祈祷',
    coolDown: 20000,
    description: (level) => {
      const interval = 5 / (1 + level * 0.2);
      return `在战斗的同时念诵祈祷的颂词，在接下来10秒内每${interval.toFixed(1)}秒获得一点圣能`;
    },
    maxExp(level) {
      return level**2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      self.addBuff('knight.pray', 10005, 5000/(1 + level * 0.2), 'knight.pray');
    }
  },

  {
    key: 'knight.melee1',
    name: '驱邪术',
    coolDown: 3000,
    description: level => {
      const bonus = (1+0.2*level);
      const min = 1*bonus*100, max = 1.5* bonus*100;
      return `用圣光的力量驱散邪恶。对目标造成攻击力的${min|0}%-${max|0}%伤害。`
    },
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
      const val = atk * (Math.random() * 0.5 + 1) * (level * 0.2 + 1);
      const { critRate = 0, critBonus = 1.5 } = self;
      const isCrit = self.testCrit();
      world.sendDamage('melee', self, target, this, self.getCritBonus(isCrit) * val, isCrit);

      if (leech) {
        self.hp += leech;
      }
      target.runAttrHooks(self, 'attacked');
    },
  },
  {
    key: 'knight.deserve',
    name: '奉献',
    coolDown: 10000,
    description: (level) => {
      const bonus = (1+0.2*level);
      const min = bonus*30, max = bonus*50;
      return `将圣光灌注到脚下的土地，在接下来的8秒内每2秒对所有敌人造成攻击力的${min|0}%-${max|0}%伤害。`;
    },
    maxExp(level) {
      return level**2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      self.addBuff('knight.deserve', 10005, level, 'knight.deserve');
    }
  },
];
