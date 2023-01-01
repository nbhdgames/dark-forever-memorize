/**
 * Created by tdzl2003 on 10/07/2017.
 */

module.exports = [
  {
    key: 'silver.knight.trigger.1',
    name: '祷告台',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('卡罗兰：年轻的骑士，我感觉到了你内心深处的迷惘。不要躲避它，勇敢的面对。');
      return false;
    },
  },
  {
    key: 'silver.knight.boss.1',
    name: '你内心的迷惘',
    description: '远古野蛮人',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 3000000,
    exp: 1800,
    atk: 15000,
    level: 160,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'enemy.upgrade',
        level: 0,
      },
      {
        key: 'shaman.darkball',
        level: 0,
      },
    ],
    stunResist: 4000,
    affixes: {
      stronger: 1,
    },
    loots: [
      {
        key: 'gold',
        count: [500, 1000],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 1,
        mfRate: 2,
      },
    ],
  },
  {
    key: 'silver.knight.trigger.2',
    name: '祷告台',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('卡罗兰：年轻的骑士，我知道你的迷惘来自何处了。在你年幼的时候，你的家乡曾经被铁蹄践踏，整个村子的人都被屠杀一尽，只有前往森林砍柴的你幸免于难，后来你是怎么做的呢？');
      return false;
    },
  },
  {
    key: 'silver.knight.boss.2',
    name: '面容模糊的敌人',
    description: '远古野蛮人',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 3000000,
    exp: 1800,
    atk: 10000,
    level: 160,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'enemy.upgrade',
        level: 0,
      },
    ],
    stunResist: 4000,
    affixes: {
      stronger: 1,
    },
    loots: [
      {
        key: 'gold',
        count: [500, 1000],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 1,
        mfRate: 2,
      },
    ],
  },
  {
    key: 'silver.knight.trigger.3',
    name: '祷告台',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('卡罗兰：是的，你的刀刃染上了敌人的鲜血，当敌人在你面前惨叫、哭嚎时，你突然开始怀疑，你的所作所为是否是正确的，你是否已经成为了你自己曾经最痛恨的人了呢……？');
      return false;
    },
  },
  {
    key: 'silver.knight.boss.3',
    name: '心中的邪念',
    description: '远古野蛮人',
    camp: 'enemy',
    race: 'unknown',
    career: 'melee',
    maxHp: 5000000,
    def: 100,
    exp: 1800,
    atk: 10000,
    level: 160,
    atkSpeed: 0.4,
    skills: [
      {
        key: 'melee',
        level: 0,
      },
      {
        key: 'enemy.upgrade',
        level: 0,
      },
    ],
    stunResist: 4000,
    affixes: {
      stronger: 1,
    },
    loots: [
      {
        key: 'gold',
        count: [500, 1000],
        rate: 1,
      },
      {
        type: 'equip',
        rate: 1,
        mfRate: 2,
      },
    ],
  },
  {
    key: 'silver.knight.trigger.4',
    name: '祷告台',
    description: '生命圣殿。',
    camp: 'shrine',
    race: 'unknown',
    career: 'melee',

    onPress(world) {
      this.kill(false);
      world.sendGeneralMsg('卡罗兰：年轻的骑士，我想你已经认清了正义和邪恶的区别，坚定了自己内心的信念。如果你再一次感到迷茫，请再来找我，我会为你指明方向。');
      return false;
    },
  },
];
