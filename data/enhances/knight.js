/**
 * Created by tdzl2003 on 2/2/17.
 */

function addCombo(self, count = 1) {
  const max = self.runAttrHooks(3, 'maxComboPoint');
  for (let i = 0; i < count; i++) {
    self.runAttrHooks(null, 'holyCombo');
  }
  self.comboPoint = Math.min(max, self.comboPoint + count);
}

module.exports = [
  {
    key: 'knight.protectBelieve',
    name: '守护信仰',
    description: '每有一点圣能，增加20%护甲',
    hooks: {
      defAdd(world, value) {
        return value + (this.comboPoint || 0) * 0.2;
      },
    },
  },
  {
    key: 'knight.attackBelieve',
    name: '惩戒信仰',
    description: '每有一点圣能，增加15%伤害',
    hooks: {
      atkAdd(world, value) {
        return value + (this.comboPoint || 0)* 0.15;
      },
    },
  },
  {
    key: 'knight.spirit',
    name: '骑士精神',
    description: '增加2点圣能上限',
    hooks: {
      maxComboPoint(world, value) {
        return value + 2;
      },
    },
  },
  {
    key: 'knight.talking',
    name: '坐而论道',
    description: '每获得1点圣能，减少所有技能1秒冷却时间。',
    hooks: {
      holyCombo(world, value) {
        for (const skillState of this.skills) {
          if (skillState !== this) {
            skillState.reduceCoolDown(value * 1000);
          }
        }
        return value;
      }
    },
  },
  {
    key: 'knight.recharge',
    name: '信仰灌注',
    description: '每消耗1点圣能，有15%几率为你补充3点圣能',
    hooks: {
      postCostComboPoint(world, value)  {
        if (Math.random() < 0.15 * value) {
          addCombo(this, 3);
        }
        return value;
      },
    },
  },
  {
    key: 'knight.absorb',
    name: '巫师克星',
    description: '受到所有法术伤害减少40%',
    hooks: {
      fireAbsorb: (world, value) => value + 0.4,
      coldAbsorb: (world, value) => value + 0.4,
      darkAbsorb: (world, value) => value + 0.4,
      lightningAbsorb: (world, value) => value + 0.4,
    },
  },
  {
    key: 'knight.defense',
    name: '背水一战',
    description: '血量每损失1%，提升1%护甲',
    hooks: {
      defMul(world, value){
        return value * (2 - (this.hp / this.maxHp));
      }
    },
  },
];
