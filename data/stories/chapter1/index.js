/**
 * Created by tdzl2003 on 2/18/17.
 */

module.exports = [
  {
    key: 'eyer-stories-1',
    group: '艾尔的故事',
    name: '艾尔的故事 - 序章 - 1',
    script: require('./eyer-stories-1.js'),
    requirement: {
      role: 'Eyer',
      map: 'home',
    },
  },
  {
    key: 'eyer-stories-2',
    group: '艾尔的故事',
    name: '艾尔的故事 - 序章 - 2',
    script: require('./eyer-stories-2.js'),
    requirement: {
      role: 'Eyer',
      map: 'town.street',
      stories: ['eyer-stories-1'],
    },
  },
  {
    key: 'eyer-stories-3',
    group: '艾尔的故事',
    name: '艾尔的故事 - 序章 - 3',
    script: require('./eyer-stories-3.js'),
    requirement: {
      role: 'Eyer',
      map: 'town.street',
      stories: ['eyer-stories-2'],
    },
    taskType: 'kill',
    enemy: 'slime.minimal',
    killCount: 10,
  },
  {
    key: 'eyer-stories-4',
    group: '艾尔的故事',
    name: '艾尔的故事 - 序章 - 4',
    script: require('./eyer-stories-4.js'),
    requirement: {
      role: 'Eyer',
      map: 'town.street',
      stories: ['eyer-stories-3'],
    },
    taskType: 'kill',
    enemy: 'slime.giant',
    killCount: 1,
  },
  {
    key: 'eyer-stories-5',
    group: '艾尔的故事',
    name: '艾尔的故事 - 序章 - 5',
    script: require('./eyer-stories-5.js'),
    requirement: {
      role: 'Eyer',
      map: 'town.cave2',
      stories: ['eyer-stories-4'],
    },
  },
  {
    key: 'eyer-stories-6',
    group: '艾尔的故事',
    name: '艾尔的故事 - 序章 - 6',
    script: require('./eyer-stories-6.js'),
    requirement: {
      role: 'Eyer',
      stories: ['eyer-stories-5'],
    },
    taskType: 'kill',
    enemy: 'slime.queen',
    killCount: 1,
  },
  {
    key: 'eyer-stories-7',
    group: '艾尔的故事',
    name: '艾尔的故事 - 序章 - 7',
    script: require('./eyer-stories-7.js'),
    requirement: {
      role: 'Eyer',
      map: 'town.valley',
      stories: ['eyer-stories-6'],
    },
  },
  {
    key: 'eyer-stories-8',
    group: '艾尔的故事',
    name: '艾尔的故事 - 序章 - 8',
    script: require('./eyer-stories-8.js'),
    requirement: {
      role: 'Eyer',
      map: 'town.valley',
      stories: ['eyer-stories-7'],
    },
    taskType: 'kill',
    enemy: 'wolf.giant',
    killCount: 10,
  },
  {
    key: 'eyer-stories-9',
    group: '艾尔的故事',
    name: '艾尔的故事 - 序章 - 9',
    script: require('./eyer-stories-9.js'),
    requirement: {
      role: 'Eyer',
      map: 'town.woods',
      stories: ['eyer-stories-8'],
    },
  },
  {
    key: 'eyer-stories-10',
    group: '艾尔的故事',
    name: '艾尔的故事 - 序章 - 完结',
    script: require('./eyer-stories-10.js'),
    requirement: {
      role: 'Eyer',
      map: 'town.woods',
      stories: ['eyer-stories-9'],
    },
    taskType: 'kill',
    enemy: 'wolf.king',
    killCount: 1,
  },
  {
    key: 'advices-slime-queen',
    group: '魔王情报录',
    name: '情报: 母体史莱姆',
    script: require('./advices-slime-queen'),
    requirement: {
      stories: ['eyer-stories-5'],
    },
    taskType: 'purchase',
    price: 10,
  },
  {
    key: 'advices-wolf-king',
    group: '魔王情报录',
    name: '情报: 狼王',
    script: require('./advices-wolf-king'),
    requirement: {
      stories: ['eyer-stories-9'],
    },
    taskType: 'purchase',
    price: 20,
  },
];
