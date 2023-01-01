/**
 * 快捷键处理（主要用于PC）
 */
export const isMac = window.navigator.platform.indexOf('Mac') >= 0;

const AccKeyAlias = {
  CmdOrCtrl: isMac ? 'Meta' : 'Ctrl',
  Control: 'Ctrl',
  Win: 'Meta',
};

for (const a of 'abcdefghijklmnopqrstuvwxyz') {
  AccKeyAlias[a] = a.toUpperCase();
}

const KeySort = {
  Shift: -10,
  Ctrl: -9,
  Alt: -8,
  Meta: -7,
};

export function getCombKeyName(e) {
  const pieces = [];
  if (e.shiftKey) {
    pieces.push('Shift');
  }
  if (e.ctrlKey) {
    pieces.push('Ctrl');
  }
  if (e.metaKey) {
    pieces.push('Meta');
  }
  if (e.altKey) {
    pieces.push('Alt');
  }
  pieces.push(AccKeyAlias[e.key] || e.key);

  return Array.from(new Set(pieces))
    .sort((a, b) => (KeySort[a] || 0) - (KeySort[b] || 0))
    .join('+');
}
