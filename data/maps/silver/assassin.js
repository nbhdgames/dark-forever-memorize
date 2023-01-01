/**
 * Created by tdzl2003 on 2/1/17.
 */

module.exports = {
  key: 'silver.assassin',
  name: '白银试炼 - 刺客',
  hint: '小湖边的镇子，到处都是鱼人。',
  isDungeon: true,
  outside: 'chapter4.sanAnthony',
  requirement: {
    career: 'assassin',
    level: 60,
    atMostMaxLevel: 60,
  },
  phases: [
    {
      description: '进行刺杀试炼。',
      monsters: [
        {
          type: 'silver.assassin.trigger.1',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '在保镖赶到前刺杀目标一号。',
      monsters: [
        {
          type: 'silver.assassin.boss.1',
          max: 1,
          delay: 5000,
          total: 1,
        },
        {
          type: 'silver.assassin.boss.1.summon',
          max: 1,
          warmup: 30000,
        },
        {
          type: 'silver.assassin.boss.1.summon',
          max: 1,
          warmup: 30000,
        },
        {
          type: 'silver.assassin.boss.1.summon',
          max: 1,
          warmup: 30000,
        },
        {
          type: 'silver.assassin.boss.1.summon',
          max: 1,
          warmup: 30000,
        },
        {
          type: 'silver.assassin.boss.1.summon',
          max: 1,
          warmup: 30000,
        },
      ],
    },
    {
      description: '进行闪避试炼。',
      monsters: [
        {
          type: 'silver.assassin.trigger.2',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '进行战斗试炼。',
      monsters: [
        {
          type: 'silver.assassin.trigger.3',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
    {
      description: '击败寇马克。',
      monsters: [
        {
          type: 'silver.assassin.boss.3',
          max: 1,
          delay: 5000,
          total: 1,
        },
      ],
    },
  ],
  monsters: [
  ],
  resetPrice: -1,
  level: 180,
  loots: [
    {
      type: 'maxLevel',
      value: 70,
    },
  ],
};
