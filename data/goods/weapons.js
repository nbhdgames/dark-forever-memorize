/**
 * Created by tdzl2003 on 4/8/17.
 */

module.exports = [
  {
    key: 'wand',
    type: 'equip',
    class: 'wand',
    position: 'weapon',
    name: '法杖',
    description: '就是普通的法杖。',

    mpFromKill: 0.5,
    mpRecovery: 0.5,
    minLevel: 999999,   //这样就不会直接掉落了。
  },

  // 等级1-5
  {
    key: 'stickSword',
    type: 'equip',
    class: 'sword',
    position: 'weapon',
    name: '细木剑',
    description: '手工制的细木剑，比起玩具更像是工艺品。',

    minLevel: 1,
    maxLevel: 10,
    atkSpeed: 0.4,
  },
  {
    key: 'stickWand',
    type: 'equip',
    class: 'wand',
    position: 'weapon',
    name: '细木法杖',
    description: '也就是削平了的树枝，想要凤凰羽毛什么的是没有的。',

    minLevel: 1,
    maxLevel: 10,
    mpFromKill: 1,
  },
  {
    key: 'stickDagger',
    type: 'equip',
    class: 'dagger',
    position: 'weapon',
    name: '细木匕首',
    description: '磨光的细木，戳在身上有点疼。',

    minLevel: 1,
    maxLevel: 10,
    atkSpeed: 0.7,
  },

  // 等级3-10
  {
    key: 'woodSword',
    type: 'equip',
    class: 'sword',
    position: 'weapon',
    name: '木剑',
    description: '手工制的木剑，比起武器更像是玩具。',

    minLevel: 6,
    maxLevel: 20,
    atkSpeed: 0.5,
  },
  {
    key: 'woodWand',
    type: 'equip',
    class: 'wand',
    position: 'weapon',
    name: '木杖',
    description: '老爷爷们人手一个的东西，居然能用来施法？',

    minLevel: 6,
    maxLevel: 20,
    mpFromKill: 1,
  },
  {
    key: 'woodDagger',
    type: 'equip',
    class: 'dagger',
    position: 'weapon',
    name: '木匕首',
    description: '木头削成的匕首，表面很锋利。',

    minLevel: 6,
    maxLevel: 20,
    atkSpeed: 0.9,
  },

  // 等级8-15
  {
    key: 'boneSword',
    type: 'equip',
    class: 'sword',
    position: 'weapon',
    name: '骨剑',
    description: '骨头磨成的剑，看起来就很瘆人。',

    minLevel: 16,
    maxLevel: 30,
    atkSpeed: 0.6,
  },
  {
    key: 'boneWand',
    type: 'equip',
    class: 'wand',
    position: 'weapon',
    name: '骨杖',
    description: '看起来很适合兽人酋长。',

    minLevel: 16,
    maxLevel: 30,
    mpFromKill: 1,
  },
  {
    key: 'boneDagger',
    type: 'equip',
    class: 'dagger',
    position: 'weapon',
    name: '骨刺',
    description: '骨头上尖利的部位，十分完整。',

    minLevel: 16,
    maxLevel: 30,
    atkSpeed: 0.8,
  },

  // 等级12-20
  {
    key: 'wolfTeethMace',
    type: 'equip',
    class: 'sword',
    position: 'weapon',
    name: '狼牙棒',
    description: '狼牙棒是狼牙造的？逗我呢？',

    minLevel: 24,
    maxLevel: 40,
    atkSpeed: 0.4,
  },
  {
    key: 'wolfTeethWand',
    type: 'equip',
    class: 'wand',
    position: 'weapon',
    name: '狼牙巫杖',
    description: '塔子金够~',

    minLevel: 24,
    maxLevel: 40,
    mpFromKill: 1,
  },
  {
    key: 'wolfTeethDagger',
    type: 'equip',
    class: 'dagger',
    position: 'weapon',
    name: '狼牙匕',
    description: '完整的狼牙，加上了小块木柄。',

    minLevel: 24,
    maxLevel: 40,
    atkSpeed: 0.9,
  },

  // 等级16-25
  {
    key: 'copperSword',
    type: 'equip',
    class: 'sword',
    position: 'weapon',
    name: '铜剑',
    description: '红彤彤的金属剑，并不坚固。',
    minLevel: 32,
    maxLevel: 50,
    atkSpeed: 0.6,
  },
  {
    key: 'copperBigSword',
    type: 'equip',
    class: 'sword',
    position: 'weapon',
    name: '铜巨剑',
    description: '巨大的铜剑。因为铜的韧性不够所以有些破损了。',
    minLevel: 32,
    maxLevel: 50,
    atkSpeed: 0.4,
  },
  {
    key: 'copperDagger',
    type: 'equip',
    class: 'dagger',
    position: 'weapon',
    name: '铜匕首',
    description: '通体由红铜打制，很是美观。',

    minLevel: 32,
    maxLevel: 50,
    atkSpeed: 0.8,
  },

  {
    key: 'zombieBoneHandyWand',
    type: 'equip',
    class: 'wand',
    position: 'weapon',
    name: '魔骨手杖',
    description: '这是一个手杖。"手"杖的意思是上面还粘着一只没有处理掉的僵尸手。',

    minLevel: 32,
    maxLevel: 50,
    mpFromKill: 1,
  },
  {
    key: 'zombieBoneWand',
    type: 'equip',
    class: 'wand',
    position: 'weapon',
    name: '魔骨巨杖',
    description: '感受一下吧，手持僵尸火腿战斗的感觉。',

    minLevel: 32,
    maxLevel: 50,
    mpFromKill: 0.5,
    mpRecovery: 0.5,
  },

  // 等级20-30
  {
    key: 'copperSword2',
    type: 'equip',
    class: 'sword',
    position: 'weapon',
    name: '青铜剑',
    description: '青铜制成的剑，相当坚固。',

    minLevel: 40,
    maxLevel: 60,
    atkSpeed: 0.6,
  },
  {
    key: 'copperBigSword2',
    type: 'equip',
    class: 'sword',
    position: 'weapon',
    name: '青铜巨剑',
    description: '巨大的青铜剑。看起来非常沉重。',

    minLevel: 40,
    maxLevel: 60,
    atkSpeed: 0.4,
  },
  {
    key: 'copperDagger2',
    type: 'equip',
    class: 'dagger',
    position: 'weapon',
    name: '青铜匕首',
    description: '青铜造的匕首，像是从古墓中发掘出来的。',

    minLevel: 40,
    maxLevel: 60,
    atkSpeed: 0.9,
  },
  {
    key: 'mithrilShortWand',
    type: 'equip',
    class: 'wand',
    position: 'weapon',
    name: '秘银短杖',
    description: '通体秘银打制的短杖，导魔性能非常好。',

    minLevel: 40,
    maxLevel: 60,
    mpFromKill: 1,
  },
  {
    key: 'mithrilWand',
    type: 'equip',
    class: 'wand',
    position: 'weapon',
    name: '秘银巨杖',
    description: '不要被名字糊弄了。其实是木质杖体，镀了一层秘银。',

    minLevel: 40,
    maxLevel: 60,
    mpFromKill: 0.5,
    mpRecovery: 0.5,
  },

  // 等级25-35
  {
    key: 'magicBoneSword',
    type: 'equip',
    class: 'sword',
    position: 'weapon',
    name: '魔骨短剑',
    description: '磨尖的骨头做成的短剑，非常吓人。',

    minLevel: 50,
    maxLevel: 70,
    atkSpeed: 0.6,
  },
  {
    key: 'magicBoneBigSword',
    type: 'equip',
    class: 'sword',
    position: 'weapon',
    name: '魔骨巨剑',
    description: '磨尖的大腿骨，还有幽魂缠绕，非常吓人。',

    minLevel: 50,
    maxLevel: 70,
    atkSpeed: 0.4,
  },
  {
    key: 'magicBoneDagger2',
    type: 'equip',
    class: 'dagger',
    position: 'weapon',
    name: '魔骨匕首',
    description: '带有魔力的尖利骨头。',

    minLevel: 50,
    maxLevel: 70,
    atkSpeed: 0.9,
  },

  {
    key: 'ghostCreamShortWand',
    type: 'equip',
    class: 'wand',
    position: 'weapon',
    name: '幽魂魔杖',
    description: '你能听到魔杖发出阵阵呻吟。',

    minLevel: 50,
    maxLevel: 70,
    mpFromKill: 1,
  },
  {
    key: 'ghostCreamStick',
    type: 'equip',
    class: 'wand',
    position: 'weapon',
    name: '幽魂长棍',
    description: '一大段连接而成的长骨，缠绕着很多幽魂。',

    minLevel: 50,
    maxLevel: 70,
    mpFromKill: 0.5,
    mpRecovery: 0.5,
  },

  // 等级30-40
  {
    key: 'mithrilCopperSword',
    type: 'equip',
    class: 'sword',
    position: 'weapon',
    name: '秘银青铜剑',
    description: '掺了秘银的青铜剑，坚固且轻巧。',

    minLevel: 60,
    atkSpeed: 0.6,
  },
  {
    key: 'mithrilCopperBigSword',
    type: 'equip',
    class: 'sword',
    position: 'weapon',
    name: '秘银青铜巨剑',
    description: '掺了秘银的巨大青铜剑，难得如此轻巧。',

    minLevel: 60,
    atkSpeed: 0.4,
  },
  {
    key: 'mithrilCopperDagger2',
    type: 'equip',
    class: 'dagger',
    position: 'weapon',
    name: '秘银匕首',
    description: '华丽的匕首，极其轻便。',

    minLevel: 60,
    atkSpeed: 1.0,
  },
  {
    key: 'mithrilStannumShortWand',
    type: 'equip',
    class: 'wand',
    position: 'weapon',
    name: '合金锡杖',
    description: '秘银和锡合金的短杖，导魔性能非常好。',

    minLevel: 60,
    mpFromKill: 1,
  },
  {
    key: 'mithrilStannumWand',
    type: 'equip',
    class: 'wand',
    position: 'weapon',
    name: '合金巨杖',
    description: '秘银和锡的合金组成的巨大长棍，表面非常光滑。',

    minLevel: 60,
    mpFromKill: 0.5,
    mpRecovery: 0.5,
  },
];
