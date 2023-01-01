/**
 * Created by tdzl2003 on 3/11/17.
 */

module.exports = [
  {
    key: 'aleanor-startup',
    group: '亚莲娜的故事',
    name: '艾尔的呼唤',
    script: require('./aleanor-startup.js'),
    requirement: {
      stories: ['eyer-stories-10'],
    },
  },
  {
    key: 'aleanor-stories-1',
    group: '亚莲娜的故事',
    name: '亚莲娜的故事 - 1',
    script: require('./aleanor-stories-1'),
    requirement: {
      role: 'Aleanor',
      stories: ['aleanor-startup'],
    },
  },
  {
    key: 'aleanor-stories-2',
    group: '亚莲娜的故事',
    name: '亚莲娜的故事 - 2',
    script: require('./aleanor-stories-2'),
    requirement: {
      role: 'Aleanor',
      map: 'town.woods',
      stories: ['aleanor-stories-1'],
    },
  },
  {
    key: 'aleanor-stories-3',
    group: '亚莲娜的故事',
    name: '亚莲娜的故事 - 3',
    script: require('./aleanor-stories-3'),
    requirement: {
      role: 'Aleanor',
      map: 'town.neighbourTown',
      stories: ['aleanor-stories-2'],
    },
  },
  {
    key: 'aleanor-stories-4',
    group: '亚莲娜的故事',
    name: '亚莲娜的故事 - 4',
    script: require('./aleanor-stories-4'),
    requirement: {
      role: 'Aleanor',
      map: 'town.neighbourTown',
      stories: ['aleanor-stories-3'],
    },
    taskType: 'kill',
    enemy: 'zombies.farmer',
    killCount: 10,
  },
  {
    key: 'aleanor-stories-5',
    group: '亚莲娜的故事',
    name: '亚莲娜的故事 - 5',
    script: require('./aleanor-stories-5'),
    requirement: {
      role: 'Aleanor',
      map: 'town.neighbourTown.2',
      stories: ['aleanor-stories-4'],
    },
    taskType: 'kill',
    enemy: 'zombie.necromancer',
    killCount: 1,
  },
  {
    key: 'aleanor-stories-6',
    group: '亚莲娜的故事',
    name: '亚莲娜的故事 - 6',
    script: require('./aleanor-stories-6'),
    requirement: {
      role: 'Aleanor',
      map: 'town.neighbourTown.2',
      stories: ['aleanor-stories-5'],
    },
    taskType: 'kill',
    enemy: 'knight.leader',
    killCount: 1,
  },
];
