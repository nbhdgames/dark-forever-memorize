/**
 * Created by tdzl2003 on 2/2/17.
 */

module.exports = [
  {
    key: 'weaponMastery',
    name: '武器大师',
    description: '增加5%暴击几率，25%暴击伤害',
    hooks: {
      critRate: (world, value) => value + 0.05,
      critBonus: (world, value) => value + 0.25,
    },
  },
  {
    key: 'rageForHp',
    name: '怒气灌注',
    description: '每消耗1点怒气，回复0.2%生命值',
    hooks: {
      rpRecHp(world, value) {
        return value + this.maxHp*0.002;
      },
    },
  },
  {
    key: 'ragingAttack',
    name: '狂战盛怒',
    description: '每点怒气额外增加0.25%暴击几率',
    hooks: {
      critRate(world, value) {
        return  value + this.rp*0.0025;
      },
    },
  },
  {
    key: 'ironBody',
    name: '钢铁之躯',
    description: '增加25%护甲',
    hooks: {
      defMul: (world, value) => value * 1.25,
    },
  },
  {
    key: 'rageFromHeart',
    name: '怒意高涨',
    description: '怒气生成速度增加10%，怒气上限增加20点。',
    hooks: {
      maxRp: (world, value) => value + 20,
      rpReceiveMul: (world, value) => {
        return value * 1.1;
      },
    },
  },
  {
    key: 'keepingRage',
    name: '怒不可遏',
    description: '你的怒气不再衰竭，相反，它以每秒2点的速度增加。',
    hooks: {
      rpRecovery: (world, value) => {
        return value + 3;
      },
    },
  },
  {
    key: 'phoenixHeart',
    name: '火凤之心',
    description: '每损失100点生命值，增加每5秒15点生命恢复速度。',
    hooks: {
      hpRecovery(world, value) {
        return value + (this.maxHp - this.hp)/100*3;
      },
    },
  },
  {
    key: 'strengthBelieve',
    name: '力量信仰',
    description: '当你受到非物理伤害时，可以获得5点怒气',
    hooks: {
      rpFromNonPhy: (world, val) => {
        return val + 5;
      },
    },
  },
  {
    key: 'pugnacity',
    name: '好斗勇者',
    description: '面对3个以上敌人时，攻击力增加20%',
    hooks: {
      atkMul(world, val) {
        const count = world.units.filter(v => this.willAttack(v)).length;
        return count >= 3 ? val*1.2 : val;
      },
    },
  },
];
