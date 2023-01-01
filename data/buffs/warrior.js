/**
 * Created by tdzl2003 on 2/3/17.
 */

module.exports = [
  {
    key: 'swordSkill',
    name: '狂热',
    description: '伤害增加百分比',
    hooks: {
      atkAdd(value){
        return this.arg + value;
      },
    },
  },
  {
    key: 'shout',
    name: '战斗怒吼',
    description: '护甲增加百分比',
    hooks: {
      defAdd(value){
        return this.arg + value;
      },
    },
  },
  {
    key: 'commandShout',
    name: '命令怒吼',
    description: '生命上限增加百分比',
    hooks: {
      maxHpAdd(value){
        return this.arg + value;
      },
    },
  },
  {
    key: 'shoutShake',
    name: '震慑怒吼',
    description: '伤害增加百分比',
    hooks: {
      atkMul(value){
        return this.arg * value;
      },
    },
  },
  {
    key: 'stunned',
    name: '昏迷',
    description: '不能行动',
    didRemove() {
      this.unit.timeline.resume();
      this.unit.tryUseSkill(this.unit.canUseSkill());
    },
    didAppear() {
      this.unit.timeline.pause();
    },
    hooks: {
      stunned(val) {
        return true;
      },
    },
  },
];
