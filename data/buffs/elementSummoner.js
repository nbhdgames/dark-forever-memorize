/**
 * Created by tdzl2003 on 3/4/17.
 */


module.exports = [
  {
    key: 'summoned',
    name: '召唤生物',
    hidden: true,
    description: '到点就挂',
    hooks: {
      getSummonedBuff(value) {
        return this;
      }
    },
    willRemove() {
      if (this.unit.camp !== 'ghost' && !this.stopped) {
        this.unit.kill();
      }
    },
  },
  {
    key: 'summon.upgraded',
    name: '升级',
    description: '升级了',
    notRemoveWhenTransform: true,
    hooks: {
      atkMul(val) {
        return val * (this.arg / 100 + 1);
      },
      maxHpMul(val) {
        return val * (this.arg / 100 + 1);
      },
      'summon.upgraded': function() {
        return true;
      }
    }
  },
  {
    key: 'legend-wand-1',
    name: '鞭笞',
    description: '攻击速度增加100%',
    hooks: {
      speedRateMul(value) {
        return value * 2;
      }
    },
  },
];
