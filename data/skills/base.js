/**
 * Created by tdzl2003 on 1/31/17.
 */

/**
 * isAttack: 是否伴随普通攻击。如果是的话，只有可以进行普通攻击的时候才可释放技能。
 */
module.exports = [
  {
    key: 'melee',
    name: '攻击',
    group: 'melee',
    description: level => {
      const bonus = (1+0.2*level);
      const min = 0.75*bonus*100, max = 1.25* bonus*100;
      return `普普通通的一击。对目标造成攻击力的${min|0}%-${max|0}%伤害。`
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

      self.rp += self.rpOnAttack;
      target.rp += target.rpOnAttacked;

      target.runAttrHooks(self, 'attacked');
    },
  },
  {
    key: 'melee.aoe',
    name: '炮击',
    group: 'melee',
    castTime: 500,
    description: level => {
      const bonus = (1+0.2*level);
      const min = 0.75*bonus*100, max = 1.25* bonus*100;
      return `普普通通的一击。对目标造成攻击力的${min|0}%-${max|0}%伤害。`
    },
    isAttack: true,
    maxExp(level) {
      return level**2 * 1000 + level*3000 + 2000;
    },
    canUse(world, self) {
      return !!self.target;
    },
    effect(world, self, level) {
      const { leech = 0, atk } = self;
      const val = atk * (Math.random() * 0.5 + 0.75) * (level * 0.2 + 1);

      for (const target of world.units.filter(v => self.willAttack(v))) {
        if (world.testDodge(self, target, this)) {
          return;
        }
        const isCrit = self.testCrit();
        world.sendDamage('melee', self, target, this, self.getCritBonus(isCrit) * val, isCrit);

        target.rp += target.rpOnAttacked;

        target.runAttrHooks(self, 'attacked');
      }


      if (leech) {
        self.hp += leech;
      }

      self.rp += self.rpOnAttack;
    },
  },
];
