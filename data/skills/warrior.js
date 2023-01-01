/**
 * Created by tdzl2003 on 1/31/17.
 */

/**
 * isAttack: 是否伴随普通攻击。如果是的话，只有可以进行普通攻击的时候才可释放技能。
 */
module.exports = [
  {
    key: 'thump',
    group: 'thump',
    name: '重击',
    description: level => {
      const bonus = 1 + 0.2 * level;
      const min = 250 * bonus,
        max = 350 * bonus;
      return `造成巨额的伤害。对目标造成攻击力的${min | 0}%-${max | 0}%伤害。`;
    },
    cost: {
      rp: 25,
    },
    coolDown: 1000,
    maxExp(level) {
      return level ** 2 * 600 + level * 1800 + 1200;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk, leech = 0, critRate = 0, critBonus = 1.5 } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const val = atk * (Math.random() + 2.5) * (level / 5 + 1);
      const isCrit = self.testCrit();
      world.sendDamage(
        'melee',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * val,
        isCrit,
      );
      if (leech) {
        self.hp += leech;
      }
      target.rp += target.rpOnAttacked;
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'cleave',
    name: '顺劈斩',
    group: 'melee',
    description: (level, self) => {
      const bonus =
        (1 + 0.2 * level) * self.runAttrHooks(1, 'cleaveDamageRate');
      const min = 40 * bonus,
        max = 60 * bonus;
      return `对最多三个目标分别造成(${min | 0}%-${max | 0}%)倍攻击力伤害。`;
    },
    isAttack: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { atk, target, leech = 0, critRate = 0, critBonus = 1.5 } = self;
      const damageRate = self.runAttrHooks(1, 'cleaveDamageRate');
      const val =
        atk * (Math.random() * 0.2 + 0.4) * (level / 5 + 1) * damageRate;
      const isCrit = self.testCrit();
      world.sendDamage(
        'melee',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * val,
        isCrit,
      );

      let leechRatio = 0.4;

      const extraTargets = world.units
        .filter(v => v !== target && self.willAttack(v))
        .slice(0, 2);
      extraTargets.forEach(target => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        const val =
          atk * (Math.random() * 0.2 + 0.4) * (level / 10 + 1) * damageRate;
        leechRatio += 0.4;
        world.sendDamage(
          'melee',
          self,
          target,
          this,
          self.getCritBonus(isCrit) * val,
          isCrit,
        );
        target.runAttrHooks(self, 'attacked');
      });

      if (leech) {
        self.hp += leech * leechRatio;
      }
      self.rp += self.rpOnAttack;
      target.rp += target.rpOnAttacked;
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'whirlwind',
    group: 'thump',
    name: '旋风斩',
    description: level => {
      const bonus = 1 + 0.2 * level;
      const min = 40 * bonus,
        max = 60 * bonus;
      return `对所有目标造成${min | 0}%-${max | 0}%攻击力伤害。`;
    },
    coolDown: 800,
    cost: { rp: 15 },
    maxExp(level) {
      return level ** 2 * 600 + level * 1800 + 1200;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const atk = self.atk * (level * 0.2 + 1);

      const targets = world.units.filter(v => self.willAttack(v));
      const { critRate = 0, critBonus = 1.5, leech } = self;

      if (leech) {
        self.hp += leech;
      }

      targets.forEach(target => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        const val = atk * (Math.random() * 0.2 + 0.4);
        const isCrit = self.testCrit();
        world.sendDamage(
          'melee',
          self,
          target,
          this,
          self.getCritBonus(isCrit) * val,
          isCrit,
        );
        target.runAttrHooks(self, 'attacked');
      });
    },
  },

  {
    key: 'shout',
    name: '战斗怒吼',
    description: level =>
      `恢复50点怒气，并在未来30秒内增加所有同伴${(10 + level * 5) | 0}%护甲。`,
    coolDown: 30000,
    maxExp(level) {
      return level ** 2 * 100 + level * 300 + 200;
    },
    canUse(world, self) {
      // 在自己家不吼。
      return world.map !== 'home';
    },
    effect(world, self, level) {
      world.sendSkillUsage(self, null, this);
      const allAliens = world.units.filter(
        v => v === self || self.willAssist(v),
      );
      const value = (level + 0.5) * 0.1;
      const multiShouts = self.runAttrHooks(false, 'multiShouts');
      allAliens.forEach(target => {
        target.addBuff(
          'shout',
          30000,
          value,
          multiShouts ? undefined : 'shout',
        );
      });
      self.rp += 50;
    },
  },

  {
    key: 'mortalStrike',
    name: '致死打击',
    description: level => {
      const bonus = 1 + 0.2 * level;
      const min = 1000 * bonus,
        max = 2000 * bonus;
      return `只能对血量少于20%的目标使用。对目标造成${min | 0}%-${max |
        0}%攻击力伤害。`;
    },
    coolDown: (level, unit) => {
      return unit.runAttrHooks(8000, 'mortalStrikeCoolDown');
    },
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self, level) {
      if (!self.target) {
        return false;
      }
      return self.target.hp <= self.target.maxHp * 0.2;
    },
    effect(world, self, level) {
      const { target } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const atk = self.atk;
      const val = atk * (Math.random() * 10 + 10) * (1 + 0.2 * level);
      const isCrit = self.testCrit();
      world.sendDamage(
        'melee',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * val,
        isCrit,
      );
      target.runAttrHooks(self, 'attacked');
    },
  },

  // 技能符文
  {
    key: 'swordSkill',
    name: '狂热',
    group: 'melee',
    description: level => {
      const bonus = 1 + 0.2 * level;
      const min = 60 * bonus,
        max = 100 * bonus;
      return `对目标造成攻击力的${min | 0}%-${max |
        0}%伤害，并在接下来的${level + 1}秒内增加10%伤害，此效果可以叠加。`;
    },
    targetType: 'target',
    isAttack: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, leech = 0, atk } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const val = atk * (Math.random() * 0.4 + 0.6) * (level * 0.2 + 1);
      const { critRate = 0, critBonus = 1.5 } = self;
      const isCrit = self.testCrit();
      world.sendDamage(
        'melee',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * val,
        isCrit,
      );

      if (leech) {
        self.hp += leech;
      }
      self.addBuff('swordSkill', (level + 1) * 1000, 0.1);

      self.rp += self.rpOnAttack;
      target.rp += target.rpOnAttacked;
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'meleeForRage',
    name: '怒击',
    group: 'melee',
    description: level => {
      const bonus = 1 + 0.2 * level;
      const min = 60 * bonus,
        max = 100 * bonus;
      return `对目标造成攻击力的${min | 0}%-${max | 0}%伤害，并获得${level +
        1}点额外怒气。`;
    },
    targetType: 'target',
    isAttack: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, leech = 0, atk } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const val = atk * (Math.random() * 0.4 + 0.6) * (level * 0.2 + 1);
      const isCrit = self.testCrit();
      world.sendDamage(
        'melee',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * val,
        isCrit,
      );

      if (leech) {
        self.hp += leech;
      }

      self.rp += self.rpOnAttack + level + 1;
      target.rp += target.rpOnAttacked;
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'thumpHead',
    name: '重击·击颅',
    group: 'thump',
    description: level => {
      const bonus = 1 + 0.2 * level;
      const min = 200 * bonus,
        max = 280 * bonus;
      return `对目标造成攻击力的${min | 0}%-${max |
        0}%伤害，并使目标昏迷${level + 1}秒。`;
    },
    cost: {
      rp: 25,
    },
    coolDown: 1000,
    maxExp(level) {
      return level ** 2 * 600 + level * 1800 + 1200;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk, leech = 0, critRate = 0, critBonus = 1.5 } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const val = atk * (Math.random() * 0.8 + 2) * (1 + 0.2 * level);
      const isCrit = self.testCrit();
      world.sendDamage(
        'melee',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * val,
        isCrit,
      );

      if (leech) {
        self.hp += leech;
      }
      target.stun(level + 1);
      target.rp += target.rpOnAttacked;
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'cleaveBlast',
    name: '爆裂顺劈斩',
    group: 'melee',
    description: (level, self) => {
      const bonus =
        (1 + 0.2 * level) * self.runAttrHooks(1, 'cleaveDamageRate');
      const min = 35 * bonus,
        max = 50 * bonus;
      const addMin = 15 * bonus,
        addMax = 25 * bonus;
      return `对最多三个目标分别造成(${min | 0}%-${max |
        0}%)倍攻击力伤害。如果这一击杀死了敌人，会对所有敌人造成(${addMin |
        0}%-${addMax | 0}%)伤害。`;
    },
    isAttack: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk, leech = 0, critRate = 0, critBonus = 1.5 } = self;
      const damageRate = self.runAttrHooks(1, 'cleaveDamageRate');
      const val =
        atk * (Math.random() * 0.15 + 0.35) * (level * 0.2 + 1) * damageRate;

      let kills = 0;
      const isCrit = self.testCrit();
      world.sendDamage(
        'melee',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * val,
        isCrit,
      );

      if (target.camp === 'ghost') {
        kills++;
      }

      let leechRatio = 0.4;

      const extraTargets = world.units
        .filter(v => v !== target && self.willAttack(v))
        .slice(0, 2);
      extraTargets.forEach(target => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        const val =
          atk * (Math.random() * 0.15 + 0.35) * (level / 10 + 1) * damageRate;
        const isCrit = self.testCrit();
        leechRatio += 0.4;
        world.sendDamage(
          'melee',
          self,
          target,
          this,
          self.getCritBonus(isCrit) * val,
          isCrit,
        );
        if (target.camp === 'ghost') {
          kills++;
        }
        target.runAttrHooks(self, 'attacked');
      });

      if (kills > 0) {
        const allEnemy = world.units.filter(v => self.willAttack(v));
        allEnemy.forEach(target => {
          if (world.testDodge(self, target, this)) {
            return;
          }
          const val =
            atk * (Math.random() * 0.1 + 0.15) * (level / 10 + 1) * damageRate;
          const isCrit = self.testCrit();
          world.sendDamage(
            'melee',
            self,
            target,
            this,
            self.getCritBonus(isCrit) * val,
            isCrit,
          );
          target.runAttrHooks(self, 'attacked');
        });
      }

      if (leech) {
        self.hp += leech * leechRatio;
      }
      self.rp += self.rpOnAttack;
      if (target.camp !== 'ghost') {
        target.rp += target.rpOnAttacked;
      }
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'shoutShake',
    name: '震慑怒吼',
    description: level => {
      const rate = (1 - 1 / (1.1 + level * 0.1)) * 100;
      return `恢复50点怒气，并在未来30秒减少所有敌人${rate.toFixed(
        1,
      )}%攻击力。`;
    },
    coolDown: 30000,
    maxExp(level) {
      return level ** 2 * 100 + level * 300 + 200;
    },
    canUse(world, self) {
      // 在自己家不吼。
      return world.map !== 'home';
    },
    effect(world, self, level) {
      world.sendSkillUsage(self, null, this);
      const allEnemy = world.units.filter(v => self.willAttack(v));
      const value = 0.1 + level * 0.1;

      allEnemy.forEach(target => {
        const stunResist = target.stunResist;
        const result = 1 / (1 + value / (1 + stunResist / 100));
        target.addBuff('shoutShake', 30000, result, 'shoutShake');
      });
      self.rp += 50;
    },
  },

  {
    key: 'whirlwindBlood',
    group: 'thump',
    name: '旋风斩·集血',
    description: level => {
      const bonus = 1 + 0.2 * level;
      const min = 30 * bonus,
        max = 40 * bonus;
      return `对所有目标造成${min | 0}%-${max |
        0}%攻击力伤害，并汲取造成伤害10%的生命值。`;
    },
    coolDown: 800,
    cost: { rp: 15 },
    maxExp(level) {
      return level ** 2 * 600 + level * 1800 + 1200;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const atk = self.atk * (level * 0.2 + 1);

      const targets = world.units.filter(v => self.willAttack(v));
      const { leech = 0, critRate = 0, critBonus = 1.5 } = self;

      let totalDmg = 0;

      if (leech) {
        self.hp += leech;
      }

      targets.forEach(target => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        const val = atk * (Math.random() * 0.1 + 0.3);
        const isCrit = self.testCrit();
        totalDmg += self.getCritBonus(isCrit) * val;
        world.sendDamage(
          'melee',
          self,
          target,
          this,
          self.getCritBonus(isCrit) * val,
          isCrit,
        );
        target.runAttrHooks(self, 'attacked');
      });

      world.sendHeal(self, self, this, totalDmg / 10);
    },
  },

  {
    key: 'commandShout',
    name: '命令怒吼',
    description: level =>
      `恢复50点怒气，并在未来30秒内增加所有同伴${(10 + level * 5) |
        0}%生命上限。`,
    coolDown: 30000,
    maxExp(level) {
      return level ** 2 * 100 + level * 300 + 200;
    },
    canUse(world, self) {
      // 在自己家不吼。
      return world.map !== 'home';
    },
    effect(world, self, level) {
      world.sendSkillUsage(self, null, this);
      const allAliens = world.units.filter(
        v => v === self || self.willAssist(v),
      );
      const multiShouts = self.runAttrHooks(false, 'multiShouts');
      const value = level * 0.05 + 0.1;
      allAliens.forEach(target => {
        target.addBuff(
          'commandShout',
          30000,
          value,
          multiShouts ? undefined : 'shout',
        );
        target.hp *= 1 + value;
      });
      self.rp += 50;
    },
  },

  {
    key: 'shockWave',
    name: '震荡波',
    group: 'shockWave',
    description: level => {
      const bonus = 1 + 0.2 * level;
      const min = 60 * bonus,
        max = 100 * bonus;
      return `对全体目标造成攻击力的${min | 0}%-${max |
        0}%伤害，并使目标昏迷${level / 2 + 1}秒。`;
    },
    coolDown: level => 10000, // 这是为了防止过高的等级可以无限晕
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!world.units.find(v => self.willAttack(v));
    },
    effect(world, self, level) {
      const { atk, critRate = 0, critBonus = 1.5 } = self;
      const targets = world.units.filter(v => self.willAttack(v));

      targets.forEach(target => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        const val = atk * (Math.random() * 0.4 + 0.6) * (1 + 0.2 * level);
        const isCrit = self.testCrit();
        world.sendDamage(
          'melee',
          self,
          target,
          this,
          self.getCritBonus(isCrit) * val,
          isCrit,
        );
        target.stun(level / 2 + 1);
        target.rp += target.rpOnAttacked;
        target.runAttrHooks(self, 'attacked');
      });
    },
  },

  {
    key: 'warrior.kick',
    name: '拳击',
    description: level =>
      `用力击打敌人的下颚，打断其正在释放的技能，并阻止其5秒内释放相同的技能`,
    coolDown: level => 10000 / (1 + level * 0.1),
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      const target = world.units.find(
        v =>
          self.willAttack(v) &&
          ((v.casting !== null && !v.casting.notBreakable) ||
            (v.reading !== null &&
              v.reading.skill &&
              !v.reading.skill.notBreakable)),
      );
      return !!target;
    },
    effect(world, self, level) {
      const target = world.units.find(
        v =>
          self.willAttack(v) &&
          ((v.casting !== null && !v.casting.notBreakable) ||
            (v.reading !== null &&
              v.reading.skill &&
              !v.reading.skill.notBreakable)),
      );
      world.sendSkillUsage(self, null, this);
      target.breakCasting(5000);
    },
  },
];
