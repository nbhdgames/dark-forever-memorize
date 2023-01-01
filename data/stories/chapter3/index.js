/**
 * Created by tdzl2003 on 2/26/17.
 */

module.exports = [
  {
    key: 'chapter3-1',
    group: '无人之境',
    name: '无人之境 - 1',
    requirement: {
      $or: [
        {
          stories: ['eyer-grow-5'],
        },
        {
          stories: ['aleanor-stories-6'],
        },
      ],
    },
    script: require('./chapter3-1'),
  },
  {
    key: 'chapter3-2',
    group: '无人之境',
    name: '无人之境 - 2',
    requirement: {
      stories: ['chapter3-1'],
      map: 'chapter3.road',
    },
    script: require('./chapter3-2'),
  },
  {
    key: 'chapter3-3',
    group: '无人之境',
    name: '无人之境 - 3',
    requirement: {
      stories: ['chapter3-2'],
      map: 'chapter3.road',
    },
    script: require('./chapter3-3'),
    taskType: 'kill',
    enemy: 'chapter3.undead.zombie',
    killCount: 10,
  },
  {
    key: 'chapter3-4',
    group: '无人之境',
    name: '无人之境 - 4',
    requirement: {
      stories: ['chapter3-3'],
      map: 'chapter3.shelter773',
    },
    script: require('./chapter3-4'),
  },
  {
    key: 'chapter3-5',
    group: '无人之境',
    name: '无人之境 - 5',
    requirement: {
      stories: ['chapter3-4'],
      map: 'chapter3.shelter773',
    },
    script: require('./chapter3-5'),
    taskType: 'kill',
    enemy: 'chapter3.necromancer',
    killCount: 1,
  },
  {
    key: 'chapter3-6',
    group: '前往奥兰',
    name: '前往奥兰 - 1',
    requirement: {
      stories: ['chapter3-5'],
      map: 'chapter3.wood',
    },
    script: require('./chapter3-6'),
    taskType: 'kill',
    enemy: 'chapter3.beast.lion',
    killCount: 10,
  },
  {
    key: 'chapter3-7',
    group: '前往奥兰',
    name: '前往奥兰 - 2',
    requirement: {
      stories: ['chapter3-5'],
      map: 'chapter3.wood',
    },
    script: require('./chapter3-7'),
    taskType: 'kill',
    enemy: 'chapter3.beast.simba',
    killCount: 1,
  },
];
