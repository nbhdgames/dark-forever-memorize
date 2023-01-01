/**
 * Created by tdzl2003 on 27/08/2017.
 */

function arrayToMap(arr) {
  const ret = {};
  for (const item of arr) {
    ret[item.key] = item;
  }
  return ret;
}

module.exports = {
  careers: arrayToMap(require('./careers')),
  roles: arrayToMap(require('./roles')),
  maps: arrayToMap(require('./maps')),
  enemies: arrayToMap(require('./enemies')),
  skills: arrayToMap(require('./skills')),
  goods: arrayToMap(require('./goods')),
  passives: arrayToMap(require('./passives')),
  enhances: arrayToMap(require('./enhances')),
  buffs: arrayToMap(require('./buffs')),
  affixes: arrayToMap(require('./affixes')),
  enemyAffixes: arrayToMap(require('./enemyAffixes')),
  stories: arrayToMap(require('./stories')),
  legends: arrayToMap(require('./legends')),
  producers: require('./producers'),
  upgrades: require('./upgrades'),
  medicines: arrayToMap(require('./medicines')),
};

