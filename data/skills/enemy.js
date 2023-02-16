/**
 * Created by tdzl2003 on 2/5/17.
 */
module.exports = [
  {
    key: 'slime.swallow',
    name: '吞噬',
    description: '吞噬一个小型史莱姆，获取对方的所有生命值。',
    coolDown: 15000,
    castTime: 1000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      const target = world.units.find((v) => {
        return (
          v !== self && self.willAssist(v) && self.maxHp - self.hp > v.maxHp
        );
      });

      return !!target;
    },
    effect(world, self, level) {
      const target = world.units.find((v) => {
        return v !== self && self.willAssist(v);
      });

      world.sendSkillUsage(self, [target], this);
      const value = target.maxHp * (1 + level * 0.1);
      world.sendHeal(self, self, this, value);
      // self.hp += value;
      world.removeUnit(target);
    },
  },
  {
    key: 'wolf.heal',
    name: '舔舐伤口',
    castTime: 2000,
    description: '用心舔舐同伴的伤口，恢复100点生命值',
    coolDown: 10000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      const target = world.units.find(
        (v) => v !== self && self.willAssist(v) && v.maxHp - v.hp >= 20
      );
      return !!target;
    },
    effect(world, self, level) {
      const target = world.units
        .filter((v) => v !== self && self.willAssist(v) && v.maxHp - v.hp >= 20)
        .sort((a, b) => b.maxHp - b.hp - (a.maxHp - a.hp))[0];
      if (!target) {
        return;
      }
      world.sendSkillUsage(self, [target], this);
      target.hp += level || 100;
    },
  },
  {
    key: 'wolf.call',
    name: '召唤狼群',
    description: '召唤伙伴来共同作战',
    castTime: 500,
    coolDown: 45000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return world.units.filter((v) => v.camp === self.camp).length < 40;
    },
    effect(world, self, level) {
      world.sendSkillUsage(self, null, this);
      world.addEnemy('wolf.giant', null, 0, self);
      world.addEnemy('wolf.minimal', null, 0, self);
      world.addEnemy('wolf.minimal', null, 0, self);
    },
  },
  {
    key: 'shaman.fireball',
    name: '火球术',
    description: '造成50点火焰伤害',
    coolDown: 10000,
    castTime: 2000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      world.sendDamage('fire', self, target, this, atk * 2.5, false);
    },
  },
  {
    key: 'bomb',
    name: '爆裂',
    description: '对全体造成100点火焰伤害',
    castTime: 20000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return true;
    },
    effect(world, self, level) {
      const targets = world.units.filter((v) => self.canAttack(v));
      targets.forEach((target) => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        world.sendDamage('fire', self, target, this, self.atk, false);
      });
      self.kill();
    },
  },
  {
    key: 'candle.call',
    name: '驱散暗影',
    description: '召唤一大堆蜡烛',
    castTime: 500,
    coolDown: 40000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return world.units.filter((v) => v.camp === self.camp).length < 50;
    },
    effect(world, self, level) {
      world.sendSkillUsage(self, null, this);
      for (let i = 0; i < 8; i++) {
        world.addEnemy('kobold.candle', null, 0, self);
      }
    },
  },
  {
    key: 'fireElement.fireball',
    name: '火球术',
    description: '造成30点火焰伤害',
    castTime: 2000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const isCrit = self.testCrit();
      world.sendDamage(
        'fire',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * atk,
        isCrit
      );
    },
  },
  {
    key: 'kakarif.melee',
    name: '火焰冲击',
    group: 'melee',
    description: '造成巨额的火焰伤害',
    targetType: 'target',
    isAttack: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { atk, target } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      world.sendDamage('fire', self, target, this, atk);
    },
  },
  {
    key: 'kakarif.mad',
    name: '卡卡列夫之怒',
    description: '增加300%攻击速度，持续4秒。',
    targetType: 'target',
    castTime: 2000,
    coolDown: 30000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      self.addBuff('kakarif.mad', 4000);
    },
  },

  {
    key: 'zombie.thumpHead',
    name: '击颅',
    group: 'thump',
    description: (level) => {
      const bonus = 1 + 0.1 * level;
      const min = 200 * bonus,
        max = 280 * bonus;
      return `对目标造成攻击力的${min | 0}%-${max | 0}%伤害，并使目标昏迷${
        (level + 1) / 2
      }秒。`;
    },
    coolDown: 15000,
    maxExp(level) {
      return level ** 2 * 150 + level * 450 + 300;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk, leech = 0, critRate = 0, critBonus = 1.5 } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const val = atk * (Math.random() * 0.8 + 2);
      const isCrit = self.testCrit();
      world.sendDamage(
        'melee',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * val,
        isCrit
      );
      if (leech) {
        self.hp += leech;
      }
      target.breakCasting();
      target.stun((level + 1) / 2);
      target.rp += target.rpOnAttacked;
      target.runAttrHooks(self, 'attacked');
    },
  },

  {
    key: 'zombie.heal',
    name: '暗影治疗',
    description:
      '治疗所有盟友100点生命。每治疗一个盟友，就对所有敌人造成10点暗影伤害',
    castTime: 2000,
    coolDown: 20000,
    maxExp(level) {
      return level ** 2 * 150 + level * 450 + 300;
    },
    canUse(world, self) {
      return true;
    },
    effect(world, self, level) {
      const healTargets = world.units.filter((v) => self.willAssist(v));
      if (healTargets.length > 0) {
        for (const target of healTargets) {
          target.hp += 100;
        }
        const dmg = 10 * healTargets.length;
        const enemies = world.units.filter((v) => self.willAttack(v));
        for (const target of enemies) {
          if (world.testDodge(self, target, this)) {
            return;
          }
          world.sendDamage('dark', self, target, this, dmg, false);
        }
      }
    },
  },
  {
    key: 'zombie.hide',
    name: '驱使亡灵',
    description: '将自己的位置移动到最后，并调整所有目标为自己的敌人',
    castTime: 1000,
    coolDown: 30589,
    effect(world, self, level) {
      world.units.remove(self);
      world.units.push(self);
      world.units.forEach((v) => {
        if (v.target === self) {
          v.setTarget(null);
          v.findTarget();
        }
      });
    },
  },
  {
    key: 'shieldShock',
    name: '盾击',
    description: (level) =>
      `反制一个目标，打断其正在释放的技能，并阻止其${
        level + 5
      }秒内释放相同的技能`,
    coolDown: (level) => 10000 + level * 1000,
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      const target = world.units.find(
        (v) =>
          self.willAttack(v) &&
          ((v.casting !== null && !v.casting.notBreakable) ||
            (v.reading !== null &&
              v.reading.skill &&
              !v.reading.skill.notBreakable))
      );
      return !!target;
    },
    effect(world, self, level) {
      const target = world.units.find(
        (v) =>
          self.willAttack(v) &&
          ((v.casting !== null && !v.casting.notBreakable) ||
            (v.reading !== null &&
              v.reading.skill &&
              !v.reading.skill.notBreakable))
      );
      if (world.testDodge(self, target, this)) {
        return;
      }
      world.sendSkillUsage(self, null, this);
      target.breakCasting(5000 + level * 1000);
    },
  },
  {
    key: 'knight.heal',
    name: '圣光术',
    description: '治疗一个队友',
    castTime: 3000,
    coolDown: 30000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      const target = world.units.find(
        (v) => v !== self && self.willAssist(v) && v.maxHp - v.hp >= 100
      );
      return !!target;
    },
    effect(world, self, level) {
      const target = world.units
        .filter(
          (v) => v !== self && self.willAssist(v) && v.maxHp - v.hp >= 100
        )
        .sort((a, b) => b.maxHp - b.hp - (a.maxHp - a.hp))[0];
      if (!target) {
        return;
      }
      world.sendSkillUsage(self, [target], this);
      target.hp += self.maxHp / 2;
    },
  },
  {
    key: 'knight.shout',
    name: '战斗怒吼',
    description: (level) =>
      `在未来30秒内增加所有同伴${(10 + level * 10) | 0}%护甲。`,
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
        (v) => v === self || self.willAssist(v)
      );
      allAliens.forEach((target) => {
        target.addBuff('shout', 30000, 1, 'shout');
      });
    },
  },
  {
    key: 'necromancer.ghostShield',
    name: '幽魂护卫',
    description: '召唤伙伴来共同作战',
    coolDown: 30000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !world.units.find((v) => v.type === 'chapter3.undead.ghostShield');
    },
    effect(world, self, level) {
      world.sendSkillUsage(self, null, this);
      world.addEnemy('chapter3.undead.ghostShield', null, 0, self);
      world.addEnemy('chapter3.undead.ghostShield', null, 0, self);
      world.addEnemy('chapter3.undead.ghostShield', null, 0, self);
    },
  },
  {
    key: 'ghostShield',
    name: '幽魂护卫',
    description: '使奈布免疫所有伤害',
    castTime: 500,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!world.units.find((v) => v.type === 'chapter3.necromancer');
    },
    effect(world, self, level) {
      const target = world.units.find((v) => v.type === 'chapter3.necromancer');
      target.addBuff('ghostShield', 1000, null, 'ghostShield');
    },
  },
  {
    key: 'shaman.darkball',
    name: '暗影箭',
    description: '造成50点暗影伤害',
    coolDown: 10000,
    castTime: 2000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      world.sendDamage('dark', self, target, this, atk * 2.5, false);
    },
  },
  {
    key: 'darkElement.darkball',
    name: '暗影箭',
    description: '造成50点暗影伤害',
    castTime: 2000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      world.sendDamage('dark', self, target, this, atk, false);
    },
  },
  {
    key: 'simba.heal',
    name: '治疗波',
    description: '治疗一个队友',
    castTime: 3000,
    coolDown: 15000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      const target = world.units.find(
        (v) => self.willAssist(v) && v.maxHp - v.hp >= 5000
      );
      return !!target;
    },
    effect(world, self, level) {
      const target = world.units
        .filter((v) => self.willAssist(v) && v.maxHp - v.hp >= 5000)
        .sort((a, b) => b.maxHp - b.hp - (a.maxHp - a.hp))[0];
      if (!target) {
        return;
      }
      world.sendSkillUsage(self, [target], this);
      target.hp += 15000;
    },
  },
  {
    key: 'simba.thumpHead',
    name: '冲撞',
    group: 'thump',
    description: (level) => {
      const bonus = 1 + 0.1 * level;
      const min = 200 * bonus,
        max = 280 * bonus;
      return `对目标造成攻击力的${min | 0}%-${max | 0}%伤害，并使目标昏迷${
        (level + 5) / 2
      }秒。`;
    },
    coolDown: 15000,
    maxExp(level) {
      return level ** 2 * 150 + level * 450 + 300;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk, leech = 0, critRate = 0, critBonus = 1.5 } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const val = atk * (Math.random() * 0.8 + 2);
      const isCrit = self.testCrit();
      world.sendDamage(
        'melee',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * val,
        isCrit
      );
      if (leech) {
        self.hp += leech;
      }
      target.breakCasting();
      target.stun((level + 5) / 2);
      target.rp += target.rpOnAttacked;
      target.runAttrHooks(self, 'attacked');
    },
  },
  {
    key: 'shaman.iceball',
    name: '寒冰箭',
    description: '造成50点寒冷呢伤害',
    coolDown: 10000,
    castTime: 2000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      world.sendDamage('cold', self, target, this, atk * 2.5, false);
    },
  },
  {
    key: 'murloc.thumpHead',
    name: '鱼人大军',
    description: '召唤大量悍不畏死的小鱼人，向敌人发起冲锋',
    coolDown: 30000,
    effect(world, self, level) {
      self.startRead('murloc.thumpHead', 5001, null, this);
    },
  },
  {
    key: 'murloc.army.thumpHead',
    name: '冰霜冲锋',
    castTime: 3000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return true;
    },
    effect(world, self, level) {
      const { atk } = self;
      const targets = world.units.filter((v) => v.camp === 'player');
      const target = targets[Math.floor(Math.random() * targets.length)];
      if (!target || world.testDodge(self, target, this)) {
        self.kill();
        return;
      }
      const val = atk * (Math.random() * 0.8 + 2);
      world.sendDamage('cold', self, target, this, val, false);
      target.breakCasting();
      target.stun((level + 5) / 2);
      target.rp += target.rpOnAttacked;
      target.runAttrHooks(self, 'attacked');
      self.kill();
    },
  },
  {
    key: 'murloc.shieldShout',
    name: '水之庇护',
    description: (level) => `为所有同伴增加一个护盾，吸收3000点伤害。`,
    coolDown: 30000,
    castTime: 2000,
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
        (v) => v === self || self.willAssist(v)
      );
      allAliens.forEach((target) => {
        target.addBuff('murloc.waterShield', 30000, 3000);
      });
    },
  },

  {
    key: 'fishzilla.summonSlaves',
    name: '召唤奴隶',
    description: '召唤伙伴来共同作战',
    coolDown: 10000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return world.units.filter((v) => v.camp === self.camp).length < 20;
    },
    effect(world, self, level) {
      world.sendSkillUsage(self, null, this);
      world.addEnemy('chapter3.murloc.slaves', null, 0, self);
    },
  },

  {
    key: 'fishzilla.focus',
    name: '奥术射线',
    coolDown: 10,
    canUse(world, self) {
      return !!world.units.find((v) => v.type === 'chapter3.fishzilla');
    },
    effect(world, self, level) {
      const target = world.units.find((v) => v.type === 'chapter3.fishzilla');
      if (self.target !== target) {
        self.target = target;
      }
      self.startRead('fishzilla.focus', 100000, null, this);
    },
  },

  {
    key: 'fishzilla.bomb',
    name: '冰箭乱射',
    description: '对全体敌人造成300点冰霜伤害',
    castTime: 2000,
    coolDown: (level) => 20000 - level * 1000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return true;
    },
    effect(world, self, level) {
      const { atk, critRate = 0, critBonus = 1.5 } = self;

      const targets = world.units.filter((v) => self.willAttack(v));
      targets.forEach((target) => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        const isCrit = self.testCrit();
        world.sendDamage(
          'cold',
          self,
          target,
          this,
          self.getCritBonus(isCrit) * atk,
          isCrit
        );
      });
    },
  },
  {
    key: 'waterElement.waterArrow',
    name: '水箭术',
    description: '造成30点冰冷伤害',
    castTime: 2000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const isCrit = self.testCrit();
      world.sendDamage(
        'cold',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * atk,
        isCrit
      );
    },
  },
  {
    key: 'waterElement.waterArrow.notBreakable',
    name: '水箭术',
    description: '造成30点冰冷伤害',
    castTime: 2000,
    notBreakable: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const isCrit = self.testCrit();
      world.sendDamage(
        'cold',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * atk,
        isCrit
      );
    },
  },
  {
    key: 'azathoth.transformIce',
    name: '形态转换',
    castTime: 3000,
    notBreakable: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return self.hp < self.maxHp * 0.7;
    },
    effect(world, self, level) {
      self.transformType('chapter3.element.azathoth.ice');
    },
  },
  {
    key: 'azathoth.transformEarth',
    name: '形态转换',
    castTime: 3000,
    notBreakable: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return self.hp < self.maxHp * 0.4;
    },
    effect(world, self, level) {
      self.transformType('chapter3.element.azathoth.earth');
    },
  },
  {
    key: 'azathoth.transformDark',
    name: '形态转换',
    castTime: 3000,
    notBreakable: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return self.hp < self.maxHp * 0.2;
    },
    effect(world, self, level) {
      self.transformType('chapter3.element.azathoth.dark');
    },
  },
  {
    key: 'azathoth.explode',
    name: '同归于尽',
    castTime: 30000,
    notBreakable: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return true;
    },
    effect(world, self, level) {
      for (const target of world.units.filter((v) => self.willAttack(v))) {
        world.sendDamage('real', self, target, this, 500000, true);
      }
      self.transformType('chapter3.element.azathoth.none');
      self.kill();
    },
  },
  {
    key: 'enemy.upgrade',
    name: '愤怒',
    description: '增加10%攻击力',
    coolDown: 30000,
    effect(world, self, level) {
      self.addBuff('enemy.upgrade');
    },
  },
  {
    key: 'waterElement.waterFlow',
    name: '激流',
    description: '造成30点冰冷伤害',
    notBreakable: true,
    castTime: 4000,
    coolDown: 30000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk } = self;
      world.sendDamage('cold', self, target, this, atk * 20, false);
    },
  },

  {
    key: 'orcs.summonWolf',
    cost: {
      ep: 50,
    },
    name: '召唤狼群',
    description: '召唤伙伴来共同作战',
    castTime: 1000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return world.units.filter((v) => v.camp === self.camp).length < 20;
    },
    effect(world, self, level) {
      world.sendSkillUsage(self, null, this);
      world.addEnemy('chapter3.orcs.wolf', null, 0, self);
    },
  },

  {
    key: 'wolf.worry',
    name: '撕咬',
    coolDown: 20000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target } = self;
      world.sendSkillUsage(self, [target], this);
      target.addBuff('wolf.worry', 10000, self.atk, 'wolf.worry');
    },
  },
  {
    key: 'shaman.chainingLightning',
    name: '闪电链',
    description: '对随机5个敌人造成伤害，伤害依次减少20%',
    castTime: 1000,
    coolDown: 8000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target && self.hp <= self.maxHp * 0.6;
    },
    effect(world, self, level) {
      const targets = world.units.filter((v) => self.canAttack(v));
      let value = self.atk * 4;
      for (let i = 0; i < 5; i++) {
        if (targets.length < 1) {
          break;
        }
        const id = Math.floor(Math.random() * targets.length);
        const target = targets.splice(id, 1)[0];
        if (world.testDodge(self, target, this)) {
          continue;
        }
        world.sendDamage('lightning', self, target, this, value, false);
        value *= 0.8;
      }
    },
  },

  {
    key: 'lightningElement.chainingLightning',
    name: '闪电链',
    description: '对随机3个敌人造成伤害，伤害依次减少20%',
    castTime: 2000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { atk, critRate = 0, critBonus = 1.5 } = self;

      const isCrit = Math.random() < critRate;

      const targets = world.units.filter((v) => self.canAttack(v));
      let value = isCrit ? atk * critBonus : atk;
      for (let i = 0; i < 3; i++) {
        if (targets.length < 1) {
          break;
        }
        const id = Math.floor(Math.random() * targets.length);
        const target = targets.splice(id, 1)[0];
        if (world.testDodge(self, target, this)) {
          continue;
        }
        world.sendDamage('lightning', self, target, this, value, isCrit);
        value *= 0.8;
      }
    },
  },

  {
    key: 'lightningElement.stunAll',
    name: '乱雷',
    coolDown: 10000,
    castTime: 1000,
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { atk, critRate = 0, critBonus = 1.5 } = self;
      const targets = world.units.filter((v) => self.willAttack(v));

      targets.forEach((target) => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        const val = atk * (Math.random() * 0.4 + 0.6) * (1 + 0.2 * level);
        const isCrit = self.testCrit();
        world.sendDamage(
          'lightning',
          self,
          target,
          this,
          self.getCritBonus(isCrit) * val,
          isCrit
        );
        target.stun(level + 2);
        target.breakCasting();
        target.rp += target.rpOnAttacked;
        target.runAttrHooks(self, 'attacked');
      });
    },
  },

  {
    key: 'orcs.summonHealToken',
    name: '治疗图腾',
    description: '召唤伙伴来共同作战',
    castTime: 1000,
    coolDown: 15000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return (
        world.units.filter((v) => v.camp === self.camp).length < 20 &&
        self.hp <= self.maxHp * 0.3
      );
    },
    effect(world, self, level) {
      world.sendSkillUsage(self, null, this);
      world.addEnemy('chapter3.orcs.totem', null, 0, self);
    },
  },

  {
    key: 'totem.heal',
    name: '治愈之雨',
    description: '治疗所有盟友100点生命。',
    castTime: 1000,
    maxExp(level) {
      return level ** 2 * 150 + level * 450 + 300;
    },
    canUse(world, self) {
      return true;
    },
    effect(world, self, level) {
      const healTargets = world.units.filter(
        (v) => self !== v && self.willAssist(v)
      );
      for (const target of healTargets) {
        target.hp += 10000;
      }
    },
  },

  {
    key: 'chapter4.humans.seck.summonDarkSoul',
    name: '召唤虚空行者',
    coolDown: 1500,
    cost: {
      mp: 1000,
    },
    description: (level, self) => {
      const { int } = self;
      const dmg =
        5 *
        (self.level * UNIT_LEVEL_RATE + 1) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1);
      return `召唤一个火焰精灵，使用火球术攻击你的敌人，每次攻击造成${
        dmg | 0
      }伤害，持续15秒。`;
    },
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return (
        world.units.filter((v) => v.type === 'chapter4.humans.monster').length <
        1
      );
    },
    effect(world, self, level) {
      const unit = world.addEnemy(
        'chapter4.humans.monster',
        null,
        0,
        self,
        this
      );
      self.runAttrHooks(unit, 'summonedUnit');
    },
  },
  {
    key: 'chapter4.humans.seck.healthDrill',
    name: '生命汲取',
    castTime: 3000,
    coolDown: 18000,
    description: (level, self) => {
      const { int } = self;
      const dmg =
        10 *
        (self.level * UNIT_LEVEL_RATE + 1) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1);
      return `对目标造成${dmg | 0}伤害，为你恢复${10 + level}%生命值。`;
    },
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { atk, target } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const dmg = atk * 2;
      world.sendHeal(self, self, this, self.maxHp * (0.1 + level * 0.01));
      world.sendDamage('dark', self, target, this, dmg);
    },
  },
  {
    key: 'chapter4.humans.women.thumpHead',
    name: '魅惑',
    group: 'thump',
    description: (level) => {
      const bonus = 1 + 0.1 * level;
      const min = 200 * bonus,
        max = 280 * bonus;
      return `对目标造成攻击力的${min | 0}%-${max | 0}%伤害，并使目标昏迷${
        (level + 5) / 2
      }秒。`;
    },
    coolDown: 15000,
    maxExp(level) {
      return level ** 2 * 150 + level * 450 + 300;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      target.breakCasting();
      target.stun(5);
    },
  },
  {
    key: 'chapter4.humans.seck.summonWomen',
    name: '召唤魅魔',
    coolDown: 1500,
    cost: {
      mp: 1000,
    },
    description: (level, self) => {
      const { int } = self;
      const dmg =
        5 *
        (self.level * UNIT_LEVEL_RATE + 1) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1);
      return `召唤一个火焰精灵，使用火球术攻击你的敌人，每次攻击造成${
        dmg | 0
      }伤害，持续15秒。`;
    },
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return (
        world.units.filter((v) => v.type === 'chapter4.humans.women').length < 2
      );
    },
    effect(world, self, level) {
      const unit = world.addEnemy('chapter4.humans.women', null, 0, self, this);
      self.runAttrHooks(unit, 'summonedUnit');
    },
  },

  {
    key: 'knight.glory.enemy',
    name: '荣耀',
    description: (level) => {
      return `荣耀的力量。为自己恢复${10 + level}%生命值。需要三点圣能。`;
    },
    cost: {
      comboPoint: 3,
    },
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return true;
    },
    effect(world, self, level) {
      const target = world.units
        .filter((v) => self.willAssist(v))
        .sort((a, b) => b.maxHp - b.hp - (a.maxHp - a.hp))[0];
      if (target) {
        world.sendHeal(self, target, this, self.maxHp * (0.1 + level * 0.01));
        world.sendSkillUsage(self, null, this);
      }
    },
  },

  {
    key: 'knight.thumpHead.enemy',
    name: '制裁之锤',
    expGroup: 'knight.thumpHead',
    description: (level) => {
      return `使目标昏迷${level + 3}秒。`;
    },
    coolDown: 10000,
    maxExp(level) {
      return level ** 2 * 300 + level * 500 + 600;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target } = self;
      target.stun(level + 3);
    },
  },

  {
    key: 'enemy.fearas.summonTrigger',
    name: '召唤陷阱',
    description: (level) => {
      return `召唤一个随机品牌的地雷。当心！`;
    },
    coolDown: 2000,
    maxExp(level) {
      return level ** 2 * 300 + level * 500 + 600;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      world.sendSkillUsage(self, null, this);
      const types = [
        'chapter4.humans.trigger.5.1',
        'chapter4.humans.trigger.5.2',
        'chapter4.humans.trigger.5.3',
        'chapter4.humans.trigger.5.4',
      ];
      const type = types[Math.floor(Math.random() * types.length)];

      world.addEnemy(type, null, 0, self);

      if (type === types[3]) {
        world.sendGeneralMsg('额，拿错了。');
      } else {
        world.sendGeneralMsg('菲尔斯放置了一个地雷，快拆掉它！');
      }
    },
  },
  {
    key: 'enemy.fearas.bomb',
    name: '爆裂',
    description: '对全体造成100点火焰伤害',
    castTime: 5000,
    notBreakable: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return true;
    },
    effect(world, self, level) {
      const targets = world.units.filter((v) => self.canAttack(v));
      targets.forEach((target) => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        world.sendDamage('fire', self, target, this, self.atk, false);
      });
      self.kill();
    },
  },
  {
    key: 'enemy.fearas.bomb1',
    name: '爆裂',
    description: '对全体造成100点火焰伤害',
    castTime: 5000,
    notBreakable: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return true;
    },
    effect(world, self, level) {
      world.sendGeneralMsg('这是一颗哑炮。');
      self.kill();
    },
  },
  {
    key: 'enemy.fearas.bomb2',
    name: '损坏',
    description: '一会就坏了',
    castTime: 5000,
    notBreakable: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return true;
    },
    effect(world, self, level) {
      self.kill();
    },
  },

  {
    key: 'enemy.evil.reading1',
    name: '精神鞭笞',
    description: '造成持续的伤害',
    notBreakable: true,
    coolDown: 15000,
    effect(world, self, level) {
      self.startRead('enemy.evil.reading1', 5001, null, this);
    },
  },

  {
    key: 'enemy.evil.control',
    name: '精神控制',
    description: '造成持续的伤害',
    notBreakable: true,
    coolDown: 10000,
    castTime: 500,
    canUse(world, self) {
      return !!world.units.find(
        (unit) => unit.type === 'chapter4.humans.boss.milhous'
      );
    },
    effect(world, self, level) {
      const target = world.units.find(
        (unit) => unit.type === 'chapter4.humans.boss.milhous'
      );
      if (target) {
        target.addBuff('enemy.evil.control', null, null, 'control');
      }
      world.sendGeneralMsg('米尔豪斯晕了头！快让他恢复正常！');
    },
  },

  {
    key: 'silver.sorceress.boss.1.bolt',
    name: '奥术冲击',
    description: '造成50点火焰伤害',
    castTime: 2000,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target, atk } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      world.sendDamage('magic', self, target, this, atk * 10, false);
    },
  },
  {
    key: 'earthElement.recovery',
    name: '修复',
    coolDown: 18000,
    castTime: 2000,
    description: (level) => {
      return `荣耀的力量。为自己恢复${10 + level}%生命值。需要三点圣能。`;
    },
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return self.hp < self.maxHp;
    },
    effect(world, self, level) {
      world.sendHeal(self, self, this, self.maxHp * 0.3);
      world.sendSkillUsage(self, null, this);
    },
  },
  {
    key: 'fireElement.flameStrike',
    name: '烈焰风暴',
    maxExp(level) {
      return level ** 2 * 100 + level * 300 + 200;
    },
    castTime: 3000,
    coolDown: 25000,
    canUse(world, self) {
      return !!self.target;
    },
    description: (level, self) => {
      const { atk } = self;
      return `对所有敌人造成${atk}点伤害。`;
    },
    effect(world, self, level) {
      const { atk, critRate, critBonus } = self;
      const targets = world.units.filter((v) => self.willAttack(v));

      targets.forEach((target) => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        const isCrit = self.testCrit();
        world.sendDamage(
          'fire',
          self,
          target,
          this,
          self.getCritBonus(isCrit) * atk,
          isCrit
        );
      });
    },
  },
  {
    key: 'shamansa.spew',
    name: '呕吐',
    maxExp(level) {
      return 1e20;
    },
    coolDown: 25000,
    notBreakable: true,
    canUse(world, self) {
      return !!self.target;
    },
    description: '将刚吃下去的吐出来',
    effect(world, self, level) {
      self.startRead('shamansa.spew', 5001, null, this);
    },
  },
  {
    key: 'rosa.sleepy',
    name: '昏昏欲睡',
    description: (level) => {
      const bonus = 1 + 0.1 * level;
      const min = 200 * bonus,
        max = 280 * bonus;
      return `对目标造成攻击力的${min | 0}%-${max | 0}%伤害，并使目标昏迷${
        (level + 5) / 2
      }秒。`;
    },
    coolDown: 15000,
    maxExp(level) {
      return level ** 2 * 150 + level * 450 + 300;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const targets = world.units.filter((v) => self.canAttack(v));

      for (const target of targets) {
        target.breakCasting();
        target.stun(5);
      }
    },
  },
  {
    key: 'rosa.angry',
    name: '起床气',
    description: '增加300%攻击速度，持续4秒。',
    targetType: 'target',
    castTime: 3000,
    coolDown: 30000,
    notBreakable: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      self.addBuff('rosa.angry', 5000);
    },
  },

  {
    key: 'chapter5.daughter.monster2',
    name: '幽闭',
    description: (level) => {
      return `使目标昏迷${level + 3}秒。`;
    },
    coolDown: 10000,
    castTime: 3000,
    maxExp(level) {
      return level ** 2 * 300 + level * 500 + 600;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { target } = self;
      target.breakCasting();
      target.stun(5);
    },
  },

  {
    key: 'chapter5.daughter.monster4',
    name: '惊慌失措',
    description: '增加300%攻击速度，持续4秒。',
    targetType: 'target',
    castTime: 3000,
    coolDown: 30000,
    notBreakable: true,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      self.addBuff('rosa.angry', 5000);
    },
  },
];
