/**
 * Created by tdzl2003 on 27/08/2017.
 */

const registry = require('../base');

function define(type, key, info) {
  info.key = key;
  registry[type][key] = info;
}
exports.define = define;

function mergeObject(origin, updates) {
  const ret = {...origin};
  for (const key of Object.keys(updates)) {
    if (typeof(updates[key]) === 'object' && !Array.isArray(updates[key])) {
      ret[key] = mergeObject(ret[key], updates[key]);
    } else if (typeof(updates[key]) === 'function') {
      ret[key] = updates[key](ret[key], ret);
    } else ret[key] = updates[key];
  }
  return ret;
}

exports.extend = function(type, key, origin, info) {
  define(type, key, mergeObject(registry[type][origin], info));
};

