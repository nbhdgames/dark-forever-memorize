/**
 * Created by tdzl2003 on 2/3/17.
 */

module.exports = [
  {
    key: 'simba.comeOnFriends',
    name: '好兄弟加油',
    hooks: {
      speedRate: (value) => value * 2,
    },
  },
  {
    key: 'simba.goodFriends',
    name: '好兄弟',
    hooks: {
      willClean(value, self, world) {
        const brothers = world.units.filter(v => v !== self && v.runAttrHooks(false, 'simba.goodFriends'));

        let someAlive = false;
        for (const b of brothers) {
          if (b.camp !== 'ghost') {
            b.addBuff('simba.comeOnFriends');
            someAlive = true;
          }
        }

        if (someAlive) {
          return false;
        }
        for (const friend of brothers) {
          friend.setCleanTimer();
        }
        return value;
      }
    },
  }
];
