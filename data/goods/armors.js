/**
 * Created by tdzl2003 on 4/8/17.
 */

module.exports = [

  // 等级1-5
  {
    key: 'dress',
    type: 'equip',
    position: 'plastron',
    class: 'cloth',
    name: '布衣',
    description: '普通的村民装束，满是补丁和破洞。',

    minLevel: 1,
    maxLevel: 10,
  },
  {
    key: 'skirt',
    type: 'equip',
    position: 'gaiter',
    class: 'cloth',
    name: '布裙',
    description: '普通的村民装束，不太适合男性。',

    minLevel: 1,
    maxLevel: 10,
  },

  // 等级4-15
  {
    key: 'rattanArmor',
    type: 'equip',
    position: 'plastron',
    class: 'armor',
    name: '藤甲',
    description: '将木条绑在一起组成的护甲，稍微能起到一点防御作用。',

    minLevel: 8,
    maxLevel: 30,
  },
  {
    key: 'rattanShinGuard',
    type: 'equip',
    position: 'gaiter',
    class: 'armor',
    name: '藤护胫',
    description: '将木条绑在一起组成的护腿，稍微能起到一点防御作用。',

    minLevel: 8,
    maxLevel: 30,
  },
  {
    key: 'hardDress',
    type: 'equip',
    position: 'plastron',
    class: 'cloth',
    name: '硬布甲',
    description: '少许木板贴合布料缝制成的护甲。对魔力很亲和。',
    level: 8,

    minLevel: 8,
    maxLevel: 30,
  },
  {
    key: 'boot',
    type: 'equip',
    position: 'gaiter',
    class: 'cloth',
    name: '长靴',
    description: '将木条绑在一起组成的长靴，居然还非常的好看。',
    level: 8,

    minLevel: 8,
    maxLevel: 30,
  },

  // 等级10-25
  {
    key: 'leatherArmor',
    type: 'equip',
    position: 'plastron',
    class: 'armor',
    name: '皮甲',
    description: '一块完整的狼皮做成的皮甲，可以Cosplay德鲁伊。',

    minLevel: 20,
    maxLevel: 50,
  },
  {
    key: 'leatherTrousers',
    type: 'equip',
    position: 'gaiter',
    class: 'armor',
    name: '皮裤',
    description: '不知道为什么穿它的时候，想着它曾经属于一只野兽，就感觉有点悲风。',

    minLevel: 20,
    maxLevel: 50,
  },
  {
    key: 'leatherDress',
    type: 'equip',
    position: 'plastron',
    class: 'cloth',
    name: '短皮甲',
    description: '这短皮甲是露脐的。再收集皮鞭和蜡烛可以组成套装。',

    minLevel: 20,
    maxLevel: 50,
  },
  {
    key: 'leatherSkirt',
    type: 'equip',
    position: 'gaiter',
    class: 'cloth',
    name: '短皮裙',
    description: '穿起来非常凉爽，也很养眼。',

    minLevel: 20,
    maxLevel: 50,
  },

  // 等级20-35
  {
    key: 'copperArmor',
    type: 'equip',
    position: 'plastron',
    class: 'armor',
    name: '锁子甲',
    description: '铜环串联而成的胸甲，远远看去像身上挂满了铜钱，很是炫富。',

    minLevel: 40,
    maxLevel: 70,
  },
  {
    key: 'copperShinGuard',
    type: 'equip',
    position: 'gaiter',
    class: 'armor',
    name: '锁链靴',
    description: '木质的鞋底，铜环串联而成鞋面，防御力很不错。',

    minLevel: 40,
    maxLevel: 70,
  },
  {
    key: 'silkDress',
    type: 'equip',
    position: 'plastron',
    class: 'cloth',
    name: '丝衣',
    description: '很漂亮的丝衣，袖子很长，像是戏服。',

    minLevel: 40,
    maxLevel: 70,
  },
  {
    key: 'silkSocks',
    type: 'equip',
    position: 'gaiter',
    class: 'cloth',
    name: '丝袜',
    description: '性感的丝袜，特别显得腿细。',

    minLevel: 40,
    maxLevel: 70,
  },

  // 等级30-45
  {
    key: 'boneArmor',
    type: 'equip',
    position: 'plastron',
    class: 'armor',
    name: '骨甲',
    description: '烧焦的人骨紧密排列，不但防御良好而且轻便，但是敢穿的人真不多……',

    minLevel: 60,
  },
  {
    key: 'boneShinGuard',
    type: 'equip',
    position: 'gaiter',
    class: 'armor',
    name: '骨靴',
    description: '用骨片雕琢而成的靴子，已经看不出骨头来自哪个部位了。',

    minLevel: 60,
  },

  {
    key: 'mithrilDress',
    type: 'equip',
    position: 'plastron',
    class: 'cloth',
    name: '秘银衬衫',
    description: '布料掺杂秘银制造的衬衫，不过到处是镂空，不知道是为了美观还是为了节约成本。',

    minLevel: 60,
  },
  {
    key: 'mithrilPlastron',
    type: 'equip',
    position: 'plastron',
    class: 'armor',
    name: '秘银胸甲',
    description: '布料掺杂秘银制造的衬衫，不过到处是镂空，不知道是为了美观还是为了节约成本。',

    minLevel: 60,
  },
  {
    key: 'mithrilSkirt',
    type: 'equip',
    position: 'gaiter',
    class: 'cloth',
    name: '秘银短裙',
    description: '一层布料一层秘银叠加而成的褶裙，自带防走光被动。',

    minLevel: 60,
  },
];
