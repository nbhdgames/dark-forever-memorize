/**
 * Created by tdzl2003 on 2/3/17.
 */

module.exports = [
  {
    key: 'assassin.cutting',
    name: '切割',
    description: '增加攻击速度和能量恢复速度',
    hooks: {
      atkSpeed(value){
        return this.arg * value;
      },
      epRecoveryMul(value) {
        return this.arg * value;
      },
    },
  },
  {
    key: 'assassin.Ambush',
    name: '伏击',
    notRemoveWhenTransform: true,
    description: '不能再次被伏击',
    hooks: {
      isAmbushed(value){
        return true;
      },
    },
  },
];
