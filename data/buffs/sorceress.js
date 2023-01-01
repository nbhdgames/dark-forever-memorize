/**
 * Created by tdzl2003 on 3/4/17.
 */

function addColdAir(target) {
  const buff = target.buffs.find(v => v.group === 'coldAir');
  if (buff) {
    buff.arg = Math.min(buff.arg + 0.01, 0.99);
  } else {
    target.addBuff('coldAir', null, 0.01, 'coldAir');
  }
}

module.exports = [
  {
    key: 'cold',
    name: '寒冷',
    description: '所有行动减缓20%。',
    hooks: {
      cold(val) {
        return true;
      },
      speedRateMul: val => val * 0.8,
    },
  },
  {
    key: 'coldAir',
    name: '冻气',
    description: '所有行动减缓。',
    hooks: {
      cold(val) {
        return true;
      },
      speedRateMul(val) {
        return val * (1 - (this.arg || 0));
      },
    },
  },
  {
    key: 'freezed',
    name: '冻结',
    description: '不能行动',
    hooks: {
      freezed(val) {
        return this;
      },
    },
    willRemove() {
      this.unit.timeline.resume();
      this.unit.tryUseSkill(this.unit.canUseSkill());
    },
    didAppear() {
      this.unit.timeline.pause();
    }
  },
  {
    key: 'magicShield',
    name: '魔法盾',
    description() {
      return '消耗魔法并吸收伤害';
    },
    hooks: {
      haveMagicShield(){
        return true;
      },
      absorbed(val) {
        const { unit } = this;
        const rate = this.arg[0];
        const total = this.arg[1];
        const absorb = Math.min(val, total, rate * unit.mp);
        const cost = absorb/rate;
        unit.mp -= cost;
        unit.runAttrHooks(cost, 'postCostMp');
        this.arg[1] -= absorb;
        if (this.arg[1] <= 0.001) {
          // 伤害吸收完毕
          this.over();
        }
        return val - absorb;
      },
    },
  },
  {
    key: 'iceShield',
    name: '冰霜护盾',
    description() {
      return '冰冻攻击者';
    },
    hooks: {
      def(value) {
        return value + this.arg;
      },
      attacked(from) {
        const { unit } = this;
        if (Math.random() < unit.runAttrHooks(false, 'soCold')) {
          if (!from.stun(3, 'freezed')) {
            // 冻结被抵抗，依然减速。
            from.addBuff('cold', 3000, null, 'cold');
          }
        } else {
          from.addBuff('cold', 3000, null, 'cold');
        }
        if (unit.runAttrHooks(false, 'coldAir')) {
          addColdAir(from);
        }
        return from;
      },
    },
  },
  {
    key: 'transform',
    name: '变形术',
    description: '变形',
    hooks: {
      transformed(val) {
        return true;
      },
      displayName(val) {
        return `[${this.arg}]${val}`;
      },
      damaged(val) {
        if (val > 0) {
          this.over();
        }
        return val;
      }
    },
    willRemove() {
      this.unit.timeline.resume();
      this.unit.tryUseSkill(this.unit.canUseSkill());
    },
    didAppear() {
      this.unit.timeline.pause();
    }
  },
  {
    key: 'fireShield',
    name: '烈焰护盾',
    description() {
      return '增加暴击几率和暴击伤害';
    },
    hooks: {
      critRate(value) {
        return value + 0.2;
      },
      critBonus(value) {
        return value + this.arg;
      },
    },
  },
  {
    key: 'flaming',
    name: '燃尽',
    hidden: true,
    description() {
      return '造成持续的火焰伤害';
    },
    effectInterval: 1000,
    effect(world){
      world.sendDamage('fire', null, this.unit, null, this.arg, 0);
    },
  },
  {
    key: 'awaking',
    name: '唤醒',
    hidden: true,
    hooks: {
      mpRecovery(value) {
        return value + this.arg;
      }
    }
  },
  {
    key: 'magicState',
    name: '法力共鸣',
    hidden: true,
    description() {
      return '下一个不同系的法术将使你的攻击力上升10%，持续5秒';
    },
  },
  {
    key: 'magicArtist',
    name: '法力交织',
    description: '伤害增加百分比',
    hooks: {
      dmgAdd(value){
        return this.arg + value;
      },
    },
  },
  {
    key: 'manaShield',
    name: '法力护盾',
    description() {
      return '吸收伤害';
    },
    hooks: {
      absorbed(val) {
        const { unit } = this;
        const total = this.arg;
        const absorb = Math.min(val, total);
        this.arg -= absorb;
        if (this.arg <= 0.001) {
          // 伤害吸收完毕
          this.over();
        }
        return val - absorb;
      },
    },
  },
];
