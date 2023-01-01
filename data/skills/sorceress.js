/**
 * Created by tdzl2003 on 3/4/17.
 */

function addFlaming(self, target, value) {
  if (self.runAttrHooks(false, 'flaming')) {
    const buff = target.buffs.find(v => v.group === 'flaming');
    if (buff) {
      buff.arg += value / 10;
      buff.resetTimer(10000);
    } else {
      target.addBuff('flaming', 10000, value / 10, 'flaming');
    }
  }
}

function magicArtist(self, type) {
  const isMagicArtist = self.runAttrHooks(false, 'magicArtist');
  const buff = self.buffs.find(v => v.group === 'magicState');
  if (isMagicArtist) {
    if (!buff) {
      self.addBuff('magicState', null, type, 'magicState');
    } else if (buff.arg !== type) {
      buff.arg = type;
      self.addBuff('magicArtist', 5000, 0.1);
    }
  } else if (buff) {
    self.removeBuff(buff);
  }
}

function addColdAir(target) {
  const buff = target.buffs.find(v => v.group === 'coldAir');
  if (buff) {
    buff.arg = Math.min(buff.arg + 0.01, 0.99);
  } else {
    target.addBuff('coldAir', null, 0.01, 'coldAir');
  }
}

function getLevelBonus(level) {
  if (level <= 60) {
    return level * 0.3 + 1;
  }
  if (level <= 70) {
    return level * 0.5 + 1 - 6;
  }
  return level * 0.5 + 1 - 6;
}

const TRANFORM_TYPES = [
  '羊',
  '鸡',
  '猪',
  '乌龟',
  '大象',
  '牛',
  '鼠',
  '兔',
  '蛇',
  '蛋',
];

module.exports = [
  {
    key: 'iceArrow',
    name: '寒冰箭',
    element: 'ice',
    description: (level, self) => {
      const { int } = self;
      const dmg =
        10 *
        getLevelBonus(self.level) *
        (int * 0.01 + 1) *
        getLevelBonus(level) *
        self.dmgAdd;
      return `对目标造成${dmg | 0}点寒冷伤害，并使目标未来3秒所有行动减缓20%`;
    },
    castTime: 1500,
    cost: {
      mp: self => 8 * (self.level * 0.2 + 1),
    },
    maxExp(level) {
      return level ** 2 * 600 + level * 1800 + 1200;
    },
    canUse(world, self) {
      return !!self.target && self.target.coldAbsorb < 0.5;
    },
    effect(world, self, level) {
      const { critRate, critBonus, target, int = 0 } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const dmg =
        10 *
        getLevelBonus(self.level) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1) *
        self.dmgAdd;
      if (Math.random() < self.runAttrHooks(false, 'soCold')) {
        target.stun(3, 'freezed');
      } else {
        target.addBuff('cold', 3000, null, 'cold');
      }
      if (self.runAttrHooks(false, 'coldAir')) {
        addColdAir(target);
      }
      const isCrit = self.testCrit();
      world.sendDamage(
        'cold',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * dmg,
        isCrit,
      );

      magicArtist(self, 'ice');
    },
  },
  {
    key: 'fireBall',
    name: '火球术',
    element: 'fire',
    description: (level, self) => {
      const { int } = self;
      const dmg =
        15 *
        getLevelBonus(self.level) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1) *
        self.dmgAdd;
      return `对目标造成${dmg | 0}点火焰伤害`;
    },
    castTime: 2000,
    cost: {
      mp: self => 10 * (self.level * 0.2 + 1),
    },
    maxExp(level) {
      return level ** 2 * 600 + level * 1800 + 1200;
    },
    canUse(world, self) {
      return !!self.target && self.target.fireAbsorb < 0.5;
    },
    effect(world, self, level) {
      const { critRate, critBonus, target, int = 0 } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const dmg =
        15 *
        getLevelBonus(self.level) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1) *
        self.dmgAdd;
      const isCrit = self.testCrit();
      world.sendDamage(
        'fire',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * dmg,
        isCrit,
      );
      if (isCrit) {
        addFlaming(self, target, self.getCritBonus(isCrit) * dmg);
      }
      magicArtist(self, 'fire');

      // 烈焰狂热处理
      if (self.runAttrHooks(false, 'fireFrenzy')) {
        for (const skillState of self.skills) {
          if (skillState !== this && skillState.skillData.element === 'fire') {
            skillState.reduceCoolDown(1000);
          }
        }
      }
    },
  },
  {
    key: 'windBlade',
    name: '奥术飞弹',
    element: 'wind',
    description: (level, self) => {
      const { int } = self;
      const dmg =
        1 * getLevelBonus(self.level) * (int * 0.01 + 1) * self.dmgAdd;
      return `释放${level + 3}个飞弹，每个对目标造成${dmg |
        0}点秘法伤害。每个飞弹有20%的几率攻击随机的目标。`;
    },
    coolDown: 1500,
    maxExp(level) {
      return level ** 2 * 1000 + level * 3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { critRate, critBonus, int = 0, target: currentTarget } = self;
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
        // 如果self.target为空，是当前目标已死亡，有其它目标的情况下，剩下的秘法球都去打随机目标。
        if (validTargets.length > 0 && (!self.target || Math.random() < 0.2)) {
          // 更换目标
          target =
            validTargets[Math.floor(Math.random() * validTargets.length)];
        }
        const isCrit = self.testCrit();
        world.sendDamage(
          'magic',
          self,
          target,
          this,
          self.getCritBonus(isCrit) * dmg,
          isCrit,
        );
      }
      magicArtist(self, 'wind');
    },
  },
  {
    key: 'burning',
    name: '灼烧',
    element: 'fire',
    description: (level, self) => {
      const { int } = self;
      const dmg =
        15 *
        getLevelBonus(self.level) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1) *
        self.dmgAdd;
      return `对目标造成${dmg | 0}点火焰伤害`;
    },
    coolDown: 8000,
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return !!self.target && self.target.fireAbsorb < 0.5;
    },
    effect(world, self, level) {
      const { target, int = 0 } = self;
      if (world.testDodge(self, target, this)) {
        return;
      }
      const dmg =
        15 *
        getLevelBonus(self.level) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1) *
        self.dmgAdd;
      const isCrit = self.testCrit();
      world.sendDamage(
        'fire',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * dmg,
        isCrit,
      );
      if (isCrit) {
        addFlaming(self, target, self.getCritBonus(isCrit) * dmg);
      }
      magicArtist(self, 'fire');
    },
  },
  {
    key: 'iceNova',
    name: '霜之新星',
    element: 'ice',
    description: (level, self) => {
      return `冻结全体目标${level / 2 + 1}秒。`;
    },
    castTime: 500,
    coolDown: level => 10000,
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return !!world.units.find(v => self.willAttack(v));
    },
    effect(world, self, level) {
      const targets = world.units.filter(v => self.willAttack(v));
      const coldAir = self.runAttrHooks(false, 'coldAir');

      targets.forEach(target => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        target.stun(level / 2 + 1, 'freezed');
        if (coldAir) {
          addColdAir(target);
        }
      });
      magicArtist(self, 'ice');
    },
  },
  {
    key: 'magicShield',
    name: '魔法盾',
    element: 'wind',
    maxExp(level) {
      return level ** 2 * 100 + level * 300 + 200;
    },
    canUse(world, self) {
      if (self.runAttrHooks(false, 'haveMagicShield')) {
        return false;
      }
      // 在自己家不吼。
      return world.map !== 'home';
    },
    description: (level, self) => {
      const { int } = self;
      const rate = ((int * 0.01 + 1) * (level * 0.2 + 1)) / 3; // 每点法力抵挡伤害。
      const total = rate * getLevelBonus(self.level) * 50; // 最多吸收伤害
      return `消耗法力值以吸收伤害，每点法力值吸收${rate.toFixed(
        1,
      )}点伤害，最多吸收${total | 0}点伤害`;
    },
    coolDown: 10000,
    effect(world, self, level) {
      const { int = 0 } = self;
      const rate = ((int * 0.01 + 1) * (level * 0.2 + 1)) / 3; // 每点法力抵挡伤害。
      const total = rate * getLevelBonus(self.level) * 50; // 最多吸收伤害
      self.addBuff('magicShield', 60000, [rate, total]);
      magicArtist(self, 'wind');
    },
  },
  {
    key: 'flameStrike',
    name: '烈焰风暴',
    element: 'fire',
    maxExp(level) {
      return level ** 2 * 100 + level * 300 + 200;
    },
    castTime: 3000,
    coolDown: 25000,
    canUse(world, self) {
      return !!self.target;
    },
    description: (level, self) => {
      const { int } = self;
      const dmg =
        15 *
        getLevelBonus(self.level) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1) *
        self.dmgAdd;
      return `对所有敌人造成${dmg | 0}点伤害。`;
    },
    effect(world, self, level) {
      const { critRate, critBonus, int = 0 } = self;
      const dmg =
        15 *
        getLevelBonus(self.level) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1) *
        self.dmgAdd;
      const targets = world.units.filter(v => self.willAttack(v));

      targets.forEach(target => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        const isCrit = self.testCrit();
        world.sendDamage(
          'fire',
          self,
          target,
          this,
          self.getCritBonus(isCrit) * dmg,
          isCrit,
        );
        if (isCrit) {
          addFlaming(self, target, self.getCritBonus(isCrit) * dmg);
        }
      });
      magicArtist(self, 'fire');
    },
  },
  {
    key: 'iceShield',
    name: '冰霜护盾',
    group: 'shield',
    element: 'ice',
    maxExp(level) {
      return level ** 2 * 100 + level * 300 + 200;
    },
    canUse(world, self) {
      // 在自己家不吼。
      return world.map !== 'home';
    },
    description: (level, self) => {
      const { int } = self;
      const def =
        (int * 0.01 + 1) * (level * 0.2 + 1) * getLevelBonus(self.level) * 3;
      return `增加${def | 0}点护甲，并使所有攻击者减速20%`;
    },
    coolDown: 30000,
    effect(world, self, level) {
      const { int } = self;
      const def =
        (int * 0.01 + 1) * (level * 0.2 + 1) * getLevelBonus(self.level) * 3;
      self.addBuff('iceShield', 60000, def, 'shield');
      magicArtist(self, 'ice');
    },
  },
  {
    key: 'transform',
    name: '变形术',
    element: 'wind',
    description: (level, self) => {
      let time = 5 + level;
      if (self.runAttrHooks(false, 'randomTransform')) {
        time *= 1.5;
      }
      return `变形一个随机的目标，使其不再攻击，持续${time |
        0}秒。变形期间不能进行任何攻击或施法。受到任何伤害均会解除此效果。`;
    },
    castTime: 1000,
    coolDown: 10000,
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      return !!world.units.find(
        v =>
          v !== self.target &&
          self.willAttack(v) &&
          v.runAttrHooks(false, 'transformed') === false,
      );
    },
    effect(world, self, level) {
      const targets = world.units.filter(
        v =>
          v !== self.target &&
          self.willAttack(v) &&
          v.runAttrHooks(false, 'transformed') === false,
      );
      const target = targets[Math.floor(Math.random() * targets.length)];
      if (world.testDodge(self, target, this)) {
        return;
      }
      let type = '羊';
      let time = 5000 + level * 1000;
      if (self.runAttrHooks(false, 'randomTransform')) {
        type =
          TRANFORM_TYPES[Math.floor(Math.random() * TRANFORM_TYPES.length)];
        time *= 1.5;
      }
      target.addBuff('transform', time, type, 'transform');
      magicArtist(self, 'wind');
    },
  },
  {
    key: 'fireShield',
    name: '烈焰护盾',
    group: 'shield',
    element: 'fire',
    maxExp(level) {
      return level ** 2 * 100 + level * 300 + 200;
    },
    canUse(world, self) {
      // 在自己家不吼。
      return world.map !== 'home';
    },
    description: (level, self) => {
      const val = (level * 0.2 + 1) * 10;
      return `增加${val | 0}%暴击伤害，以及20%暴击几率`;
    },
    coolDown: 30000,
    effect(world, self, level) {
      const val = (level * 0.2 + 1) / 10;
      self.addBuff('fireShield', 60000, val, 'shield');
      magicArtist(self, 'fire');
    },
  },
  {
    key: 'iceLance',
    name: '冰枪术',
    element: 'ice',
    description: (level, self) => {
      const { int } = self;
      const dmg =
        15 *
        getLevelBonus(self.level) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1) *
        self.dmgAdd;
      return `对一个已被冻结的敌人造成${dmg | 0}点冰霜伤害，并解除冻结效果`;
    },
    coolDown: 800,
    maxExp(level) {
      return level ** 2 * 600 + level * 1800 + 1200;
    },
    canUse(world, self) {
      const target = world.units.find(
        v =>
          self.willAttack(v) &&
          v.runAttrHooks(false, 'freezed') &&
          v.coldAbsorb < 0.5,
      );
      return !!target;
    },
    effect(world, self, level) {
      const { critRate, critBonus, int = 0 } = self;
      let target;
      let freezed =
        self.target &&
        self.target.coldAbsorb < 0.5 &&
        self.target.runAttrHooks(false, 'freezed');
      if (self.target && freezed) {
        target = self.target;
      } else {
        target = world.units.find(
          v =>
            self.willAttack(v) &&
            v.runAttrHooks(false, 'freezed') &&
            v.coldAbsorb < 0.5,
        );
        freezed = target && target.runAttrHooks(false, 'freezed');
      }
      if (!target) {
        return;
      }
      if (world.testDodge(self, target, this)) {
        return;
      }
      const dmg =
        15 *
        getLevelBonus(self.level) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1) *
        self.dmgAdd;
      const isCrit = self.testCrit();
      world.sendDamage(
        'cold',
        self,
        target,
        this,
        self.getCritBonus(isCrit) * dmg,
        isCrit,
      );
      target.removeBuff(freezed);
      if (self.runAttrHooks(false, 'coldAir')) {
        addColdAir(target);
      }

      magicArtist(self, 'ice');
    },
  },
  {
    key: 'awaking',
    name: '法力唤醒',
    element: 'wind',
    description: (level, self) => {
      const result = 30 + level;
      return `在3秒内恢复${result | 0}%法力值`;
    },
    // castTime: 3000,
    coolDown: (level, unit) => unit.runAttrHooks(60000, 'awakingCoolDown'),
    maxExp(level) {
      return level ** 2 * 100 + level * 300 + 200;
    },
    shouldUse(world, self, level) {
      const used = 1 - self.mp / self.maxMp;
      return used >= 0.3 + level * 0.01;
    },
    effect(world, self, level) {
      // const rate = 0.3 + level * 0.01;
      // self.mp += self.maxMp * rate;
      self.startRead(
        'awaking',
        3000,
        ((0.3 + level * 0.01) * self.maxMp) / 3,
        this,
      );
      magicArtist(self, 'wind');
    },
  },
  {
    key: 'counterSpelling',
    name: '法术反制',
    element: 'wind',
    description: level =>
      `反制一个目标，打断其正在释放的技能，并阻止其5秒内释放相同的技能`,
    coolDown: level => 10000 / (1 + level * 0.1),
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 400;
    },
    canUse(world, self) {
      const target = world.units.find(
        v =>
          self.willAttack(v) &&
          ((v.casting !== null && !v.casting.notBreakable) ||
            (v.reading !== null && !v.reading.notBreakable)),
      );
      return !!target;
    },
    effect(world, self, level) {
      const target = world.units.find(
        v =>
          self.willAttack(v) &&
          ((v.casting !== null && !v.casting.notBreakable) ||
            (v.reading !== null && !v.reading.notBreakable)),
      );
      world.sendSkillUsage(self, null, this);
      target.breakCasting(5000);
      magicArtist(self, 'wind');
    },
  },
  {
    key: 'dragonFlame',
    name: '龙息术',
    element: 'fire',
    maxExp(level) {
      return level ** 2 * 200 + level * 600 + 500;
    },
    coolDown: 10000,
    canUse(world, self) {
      return !!self.target;
    },
    description: (level, self) => {
      const { int } = self;
      const dmg =
        12 *
        getLevelBonus(self.level) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1) *
        self.dmgAdd;
      return `对最近的5个敌人造成${dmg | 0}点伤害，并使它们眩晕${level / 2 +
        1}秒。`;
    },
    effect(world, self, level) {
      const { critRate, critBonus, int = 0 } = self;
      const dmg =
        12 *
        getLevelBonus(self.level) *
        (int * 0.01 + 1) *
        (level * 0.3 + 1) *
        self.dmgAdd;
      const targets = world.units.filter(v => self.willAttack(v));

      targets.slice(0, 4).forEach(target => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        const isCrit = self.testCrit();
        world.sendDamage(
          'fire',
          self,
          target,
          this,
          self.getCritBonus(isCrit) * dmg,
          isCrit,
        );
        target.stun(level / 2 + 1);
        if (isCrit) {
          addFlaming(self, target, self.getCritBonus(isCrit) * dmg);
        }
      });
      magicArtist(self, 'fire');
    },
  },
];
