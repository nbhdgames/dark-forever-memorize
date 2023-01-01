/**
 * Created by tdzl2003 on 2/2/17.
 */

module.exports = [
  {
    key: 'magic',
    name: '法力',
    description: '增加20点法力值，每角色等级额外增加4点法力值。每5秒回复1点法力值，每角色等级额外回复0.2法力值',
    hooks: {
      maxMp(world, value) {
        return value + 50 + this.level * 10;
      },
      mpRecovery(world, value)  {
        return value + 0.2 + this.level * 0.04;
      },
    },
  },
];
