/**
 * Created by tdzl2003 on 5/6/17.
 */
module.exports = [
  {
    key: 'shrine.heal',
    name: '生命圣殿',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      for (const unit of world.units.filter(v => v.camp === 'player' || v.camp === 'alien')) {
        unit.hp += unit.maxHp * 0.6;
      }
      this.kill();
      return false;
    },
  },

  {
    key: 'shrine.energy',
    name: '能量圣殿',
    description: '增加怒气、能量、法力恢复速度30秒。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      for (const unit of world.units.filter(v => v.camp === 'player' || v.camp === 'alien')) {
        unit.addBuff('shrine.energy', 30000);
      }
      this.kill();
      return false;
    },
  },

  {
    key: 'shrine.power',
    name: '威能圣殿',
    description: '增加所有造成的伤害30秒。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      for (const unit of world.units.filter(v => v.camp === 'player' || v.camp === 'alien')) {
        unit.addBuff('shrine.power', 30000);
      }
      this.kill();
      return false;
    },
  },
];
