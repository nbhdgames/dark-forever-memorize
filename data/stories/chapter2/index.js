/**
 * Created by tdzl2003 on 2/26/17.
 */

module.exports = [
  {
    key: 'eyer-grow-1',
    group: '艾尔的启程',
    name: '狗头人是人类最好的朋友 - 1',
    requirement: {
      role: 'Eyer',
      map: 'town.mine.1',
      stories: ['eyer-stories-10'],
    },
    script: require('./eyer-grow-1.js'),
  },
  {
    key: 'eyer-grow-2',
    group: '艾尔的启程',
    name: '狗头人是人类最好的朋友 - 2',
    requirement: {
      role: 'Eyer',
      map: 'town.mine.1',
      stories: ['eyer-grow-1'],
    },
    script: require('./eyer-grow-2.js'),
    taskType: 'kill',
    enemy: 'kobold.miner',
    killCount: 10,
  },
  {
    key: 'eyer-grow-3',
    group: '艾尔的启程',
    name: '金牙是人类最好的朋友',
    requirement: {
      role: 'Eyer',
      map: 'town.mine.2',
      stories: ['eyer-grow-2'],
    },
    script: require('./eyer-grow-3.js'),
  },
  {
    key: 'eyer-grow-4',
    group: '艾尔的启程',
    name: '金牙召唤了金牙最好的朋友',
    requirement: {
      role: 'Eyer',
      map: 'town.mine.2',
      stories: ['eyer-grow-3'],
    },
    script: require('./eyer-grow-4.js'),
    taskType: 'kill',
    enemy: 'kobold.goldteeth',
    killCount: 1,
  },
  {
    key: 'eyer-grow-5',
    group: '艾尔的启程',
    name: '艾尔最好的朋友找回了艾尔',
    requirement: {
      role: 'Eyer',
      map: 'town.mine.3',
      stories: ['eyer-grow-4'],
    },
    script: require('./eyer-grow-5.js'),
    taskType: 'kill',
    enemy: 'kakarif.illusion',
    killCount: 1,
  },
];