/**
 * Created by tdzl2003 on 2/3/17.
 */

function addCombo(self, count = 1) {
  const max = self.runAttrHooks(3, 'maxComboPoint');
  self.runAttrHooks(count, 'holyCombo');
  self.comboPoint = Math.min(max, self.comboPoint + count);
}

module.exports = [
  {
    key: 'knight.holySign',
    name: '圣光圣印',
    description: '恢复攻击者的生命值',
    hooks: {
      damaged(value, from) {
        from.hp += value * this.arg;
      },
    },
  },
  {
    key: 'knight.damageSign',
    name: '审判圣印',
    description: '恢复攻击者的生命值',
    hooks: {
      preskill(skill, world) {
        const bonus = this.arg;
        const { playerUnit } = world;
        if (!playerUnit) {
          return;
        }
        const { atk } = playerUnit;
        const targets = world.units.filter(v=>playerUnit.willAttack(v));
        for (const target of targets) {
          if (world.testDodge(playerUnit, target, this)) {
            return;
          }
          const val = atk * bonus ;
          const crit = playerUnit.testCrit();
          const critBonus = playerUnit.getCritBonus(crit);
          world.sendDamage('holy', playerUnit, target, {name: '审判圣印'}, val * critBonus, crit);
        }
      },
    },
  },
  {
    key: 'knight.shieldReflect',
    name: '盾牌反射',
    description: '反射所有法术伤害',
    hooks: {
      shieldReflect(v, type) {
        return type !== 'melee' && type !== 'real' ? this.arg : 0;
      },
    },
  },
  {
    key: 'holyShield',
    name: '圣盾术',
    hooks: {
      absorbed(val, type) {
        // 吸收全部伤害
        if (type === 'melee') {
          return 0;
        }
        return val;
      },
    },
  },
  {
    key: 'knight.pray',
    name: '祈祷',
    effectInterval() {
      return this.arg;
    },
    effect(world) {
      const { unit } = this;
      if (unit) {
        addCombo(unit);
      }
    },
  },
  {
    key: 'knight.deserve',
    name: '奉献',
    effectInterval: 2000,
    effect(world) {
      const { unit : self, arg: level } = this;
      if (!self) {
        return;
      }
      const atk = self.atk * (level*0.2 + 1);

      const targets = world.units.filter(v => self.willAttack(v));
      const { critRate = 0, critBonus = 1.5 } = self;

      targets.forEach( target => {
        if (world.testDodge(self, target, this)) {
          return;
        }
        const val = atk * (Math.random()* 0.2 + 0.3) ;
        const crit = self.testCrit();
        const critBonus = self.getCritBonus(crit);
        world.sendDamage('melee', self, target, this.skill, val * critBonus, crit);
        target.runAttrHooks(self, 'attacked');
      });
    },
  },
];
