import { computed } from 'mobx';

export function boxObjectField(obj, key) {
  return computed(() => obj[key], {
    set(v) {
      obj[key] = v;
    },
  });
}

// convert Map to object
export function preSave(js) {
  if (Array.isArray(js)) {
    return js.map(preSave);
  }
  if (js instanceof Map) {
    const ret = {};
    for (const [key, value] of js.entries()) {
      ret[key] = preSave(value);
    }
    return ret;
  }
  if (js && typeof js == 'object') {
    const ret = {};
    for (const key of Object.keys(js)) {
      ret[key] = preSave(js[key]);
    }
    return ret;
  }
  return js;
}
