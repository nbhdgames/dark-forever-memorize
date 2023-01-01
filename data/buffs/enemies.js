/**
 * Created by tdzl2003 on 2/3/17.
 */

module.exports = [
  {
    key: 'kakarif.mad',
    name: '狂热',
    description: '增加卡卡列夫攻击速度',
    hooks: {
      atkSpeedMul(value){
        return value * 4;
      },
    },
  },
  {
    key: 'shieldReflect',
    name: '盾牌反射',
    description: '反射所有法术伤害',
    hooks: {
      shieldReflect: (v, type) => {
        return type !== 'melee' ? 0.2 : undefined;
      },
    },
  },
  {
    key: 'ghostShield',
    name: '幽魂护盾',
    hooks: {
      absorbed(val) {
        // 吸收全部伤害
        return 0;
      },
    },
  },
  {
    key: 'murloc.thumpHead',
    name: '鱼人大军',
    effectInterval: 500,
    effect(world){
      world.addEnemy('chapter3.murloc.army', null, 0, this.unit);
    },
  },
  {
    key: 'murloc.waterShield',
    name: '水泡护盾',
    description() {
      return '吸收伤害';
    },
    hooks: {
      absorbed(val) {
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
  {
    key: 'fishzilla.focus',
    name: '奥术射线',
    hidden: true,
    description() {
      return '使目标受到的所有伤害提升100%';
    },
    didAppear() {
      if (this.unit.target) {
        this.targetBuff = this.unit.target.addBuff('fishzilla.focused');
      }
    },
    willRemove() {
      if (this.targetBuff) {
        this.targetBuff.unit.removeBuff(this.targetBuff);
        this.targetBuff = null;
      }
    }
  },
  {
    key: 'fishzilla.focused',
    name: '奥术射线',
    notSave: true,
    description() {
      return '使目标受到的所有伤害提升100%';
    },
    hooks: {
      willDamaged(val, from) {
        return val * 2;
      },
    }
  },
  {
    key: 'nynnroth.shield',
    name: '定海',
    description: '减少所受的90%冰冷伤害',
    hooks: {
      willDamaged(value, to, damageType){
        if (damageType === 'cold') {
          return value / 10;
        }
        return value;
      },
    },
  },
  {
    key: 'enemy.upgrade',
    name: '愤怒',
    description: '增加攻击力',
    hooks: {
      atkAdd(value) {
        return value + 0.1;
      },
    },
  },
  {
    key: 'wolf.worry',
    name: '撕咬',
    effectInterval: 2000,
    effect(world){
      world.sendDamage('melee', null, this.unit, null, this.arg, false);
    },
  },
  {
    key: 'enemy.evil.reading1',
    name: '精神鞭笞',
    effectInterval: 500,
    effect(world){
      const self = this.unit;
      const { target } = self;
      if (!target) {
        self.removeBuff(this);
        return;
      }
      world.sendDamage('dark', self, target, this.skill, self.atk * 0.2, false);
    },
  },

  {
    key: 'enemy.evil.control',
    name: '精神控制',
    didAppear() {
      this.unit.setCamp('enemy');
    },
    willRemove() {
      this.unit.setCamp('alien');
    },
  },

  {
    key: 'shamansa.spew',
    name: '呕吐',
    effectInterval: 500,
    effect(world){
      world.addEnemy('chapter5.woodElf.arms', null, 0, this.unit);
    },
  },

  {
    key: 'rosa.angry',
    name: '狂热',
    description: '增加卡卡列夫攻击速度',
    hooks: {
      atkSpeedMul(value){
        return value * 4;
      },
    },
  },
];
