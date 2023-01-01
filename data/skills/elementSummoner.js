/**
 * Created by tdzl2003 on 3/4/17.
 */

function getLevelBonus(level) {
  if (level <= 60) {
    return level * 0.3 + 1;
  }
  if (level <= 70) {
    return level * 0.5 + 1 - 6;
  }
  return level * 0.5 + 1 - 6;
}

module.exports = [
  {
    key: 'summonWindBlade',
    name: '召唤奥术球',
    expGroup: 'windBlade',
    element: 'wind',
    description: (level, self) => {
      const { int } = self;
      const dmg =
        1 * getLevelBonus(self.level) * (int * 0.01 + 1) * self.dmgAdd;
      return `召唤${level + 3}个奥术球，每个对目标造成${dmg |
        0}点秘法伤害。奥术球有80%几率攻击你当前的目标。`;
    },
    coolDown: 1500,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { int, target: currentTarget } = self;
      const dmg =
        1 * getLevelBonus(self.level) * (int * 0.01 + 1) * self.dmgAdd;
      const validTargets = world.units.filter(
        v => v !== currentTarget && self.willAttack(v),
      );

      for (let i = 0; i < level + 3; i++) {
        let target = currentTarget;
        if (world.testDodge(self, target, this)) {
          return;
        }
        const isCrit = self.testCrit();
        // 如果self.target为空，是当前目标已死亡，有其它目标的情况下，剩下的秘法球都去打随机目标。
        if (validTargets.length > 0 && (!self.target || Math.random() < 0.2)) {
          // 更换目标
          target =
            validTargets[Math.floor(Math.random() * validTargets.length)];
        }
        world.sendDamage(
          'magic',
          self,
          target,
          this,
          self.getCritBonus(isCrit) * dmg,
          isCrit,
        );
      }
    },
  },
  {
    key: 'summonFire',
    name: '召唤火焰精灵',
    coolDown: 1500,
    cost: {
      mp: self => 25 * (self.level * 0.2 + 1),
    },
    description: (level, self) => {
      const { int } = self;
      const dmg =
        5 * getLevelBonus(self.level) * (int * 0.01 + 1) * (level * 0.3 + 1);
      return `召唤一个火焰精灵，使用火球术攻击你的敌人，每次攻击造成${dmg |
        0}伤害，持续15秒。`;
    },
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return (
        world.map !== 'home' &&
        world.units.filter(
          v =>
            v.summoner === self &&
            v.type.indexOf('summon.element.fire') >= 0 &&
            v.camp !== 'ghost',
        ).length < self.runAttrHooks(1, 'summonCount')
      );
    },
    effect(world, self, level) {
      const unit = world.addEnemy('summon.element.fire', null, 0, self, this);
      unit.addBuff('summoned', self.runAttrHooks(15000, 'summonTime'));
      self.runAttrHooks(unit, 'summonedUnit');
    },
  },
  {
    key: 'summonWater',
    name: '召唤水元素',
    coolDown: 1500,
    cost: {
      mp: self => 20 * (self.level * 0.2 + 1),
    },
    description: (level, self) => {
      const { int } = self;
      const dmg =
        4 * getLevelBonus(self.level) * (int * 0.01 + 1) * (level * 0.3 + 1);
      return `召唤一个水元素，使用水箭术攻击你的敌人，每次攻击造成${dmg |
        0}伤害，持续15秒。`;
    },
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return (
        world.map !== 'home' &&
        world.units.filter(
          v =>
            v.summoner === self &&
            v.type.indexOf('summon.element.water') >= 0 &&
            v.camp !== 'ghost',
        ).length < self.runAttrHooks(1, 'summonCount')
      );
    },
    effect(world, self, level) {
      const unit = world.addEnemy('summon.element.water', null, 0, self, this);
      unit.addBuff('summoned', self.runAttrHooks(15000, 'summonTime'));
      self.runAttrHooks(unit, 'summonedUnit');
    },
  },
  {
    key: 'healthDrill',
    name: '生命汲取',
    castTime: 1500,
    coolDown: 10000,
    description: (level, self) => {
      const { int } = self;
      const dmg =
        10 * getLevelBonus(self.level) * (int * 0.01 + 1) * (level * 0.3 + 1);
      return `对目标造成${dmg | 0}伤害，为你恢复${10 + level}%生命值。`;
    },
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { critRate, critBonus, target, int } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const isCrit = self.testCrit();
      const dmg =
        10 *
        getLevelBonus(self.level) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1) *
        self.dmgAdd;
      world.sendHeal(self, self, this, self.maxHp * (0.1 + level * 0.01));
      world.sendDamage(
        'magic',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * dmg,
        isCrit,
      );
    },
  },
  {
    key: 'explodeSummons',
    name: '献祭',
    castTime: 1500,
    coolDown: level => 10000,
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    description: (level, self) => {
      const { int } = self;
      // const dmg = (level * 0.3 + 1);
      return `摧毁你的一个召唤物，对所有目标造成相当于召唤物生命上限的伤害。伤害类型取决于召唤物的类型。`;
    },
    canUse(world, self) {
      return !!world.units.find(v => v.summoner === self && v.target);
    },
    effect(world, self, level) {
      const summoners = world.units.filter(
        v => v.summoner === self && v.target,
      );
      const summoner = summoners[Math.floor(Math.random() * summoners.length)];

      const dmgType = summoner.runAttrHooks('magic', 'elementType');

      const dmg = summoner.maxHp * (1 + level * 0.2);
      for (const target of world.units.filter(v => self.willAttack(v))) {
        const isCrit = self.testCrit();
        world.sendDamage(
          dmgType,
          summoner,
          target,
          this,
          self.getCritBonus(isCrit) * dmg,
          isCrit,
        );
      }

      self.runAttrHooks(summoner, 'onSummonExploded');
      summoner.kill();
    },
  },
  {
    key: 'summonEarth',
    name: '召唤岩石傀儡',
    coolDown: 1500,
    cost: {
      mp: self => 30 * (self.level * 0.2 + 1),
    },
    description: (level, self) => {
      const { int } = self;
      const dmg =
        6 * getLevelBonus(self.level) * (int * 0.01 + 1) * (level * 0.3 + 1);
      return `召唤一个岩石傀儡，每次攻击造成${dmg | 0}物理伤害，持续15秒。`;
    },
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return (
        world.map !== 'home' &&
        world.units.filter(
          v =>
            v.summoner === self &&
            v.type.indexOf('summon.element.earth') >= 0 &&
            v.camp !== 'ghost',
        ).length < self.runAttrHooks(1, 'summonCount')
      );
    },
    effect(world, self, level) {
      const unit = world.addEnemy('summon.element.earth', null, 0, self, this);
      unit.addBuff('summoned', self.runAttrHooks(15000, 'summonTime'));
      self.runAttrHooks(unit, 'summonedUnit');
    },
  },
  {
    key: 'summonLightning',
    name: '召唤闪电风暴',
    coolDown: 1500,
    cost: {
      mp: self => 30 * (self.level * 0.2 + 1),
    },
    description: (level, self) => {
      const { int } = self;
      const dmg =
        6 * getLevelBonus(self.level) * (int * 0.01 + 1) * (level * 0.3 + 1);
      return `召唤一团变幻莫测的闪电风暴，每次攻击造成${dmg |
        0}闪电伤害，持续15秒。`;
    },
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return (
        world.map !== 'home' &&
        world.units.filter(
          v =>
            v.summoner === self &&
            v.type.indexOf('summon.element.lightning') >= 0 &&
            v.camp !== 'ghost',
        ).length < self.runAttrHooks(1, 'summonCount')
      );
    },
    effect(world, self, level) {
      const unit = world.addEnemy(
        'summon.element.lightning',
        null,
        0,
        self,
        this,
      );
      unit.addBuff('summoned', self.runAttrHooks(15000, 'summonTime'));
      self.runAttrHooks(unit, 'summonedUnit');
    },
  },
  {
    key: 'summon.earth.comeToMe',
    name: '嘲讽',
    castTime: 500,
    coolDown: 5000,
    canUse(world, self) {
      return !!self.target && self.target.target !== self;
    },
    effect(world, self, level) {
      self.target.target = self;
    },
  },
  {
    key: 'summon.disappear',
    name: '隐身术',
    description:
      '让所有以你为目标的敌人重新选择目标。升级可以减少此技能的冷却时间',
    coolDown: level => (20000 / (level + 10)) * 10,
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    effect(world, self, level) {
      world.units.forEach(v => {
        if (v.target === self) {
          v.setTarget(null);
          v.findTarget();
        }
      });
    },
  },
  {
    key: 'summon.upgrade',
    name: '升级',
    description: level =>
      `升级你的一个召唤物，使其永久存在，提升${level}%生命值和伤害并获得一个新的技能。每种元素最多升级一个。`,
    castTime: 1000,
    coolDown: level => 20000,
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      const summons = world.units.filter(
        v => v.summoner === self && v.camp !== 'ghost',
      );
      const upgrades = summons.filter(v =>
        v.runAttrHooks(false, 'summon.upgraded'),
      );
      const map = {};
      for (const v of upgrades) {
        map[v.runAttrHooks('magic', 'elementType')] = true;
      }
      for (const s of summons) {
        if (!map[s.runAttrHooks('magic', 'elementType')]) {
          return true;
        }
      }
      return false;
    },
    effect(world, self, level) {
      const summons = world.units.filter(
        v => v.summoner === self && v.camp !== 'ghost',
      );
      const upgrades = summons.filter(v =>
        v.runAttrHooks(false, 'summon.upgraded'),
      );
      const map = {};
      for (const v of upgrades) {
        map[v.runAttrHooks('magic', 'elementType')] = true;
      }
      const validSummons = summons.filter(
        v => !map[v.runAttrHooks('magic', 'elementType')],
      );
      if (!validSummons.length) {
        return;
      }
      const target =
        validSummons[Math.floor(Math.random() * validSummons.length)];
      world.sendSkillUsage(self, [target], this);
      const summmonedBuff = target.runAttrHooks(null, 'getSummonedBuff');
      if (summmonedBuff) {
        summmonedBuff.stopped = true;
        target.removeBuff(summmonedBuff);
      }
      target.transformType(target.type + '.2');
      target.addBuff('summon.upgraded', null, level, 'summon.upgraded');
    },
  },
];
