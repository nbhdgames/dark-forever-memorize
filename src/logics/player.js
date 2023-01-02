/**
 * Created by tdzl2003 on 1/19/17.
 */

import {
  observable,
  toJS,
  ObservableMap,
  autorun,
  action,
  computed,
  isObservableMap,
  makeObservable,
  override,
} from 'mobx';
import world from './world';
import game from './game';
import {
  legends,
  roles,
  careers,
  goods,
  skills,
  affixes,
  maps,
} from '../../data';
import doMigrates from './migrates';
import { preSave } from '../common/utils';

const MAX_TICKET_STACK = 20;

const goodOrder = {};
Object.keys(goods).forEach((v, i) => (goodOrder[v] = i));

const DEFAULT_LEVEL = {
  stickSword: 1,
  stickWand: 1,
  woodSword: 6,
  woodWand: 6,
  dress: 2,
  skirt: 2,
  rattanArmor: 8,
  rattanShinGuard: 8,
  hardDress: 8,
  boot: 8,
  boneSword: 16,
  boneWand: 16,
  wolfTeethMace: 24,
  wolfTeethWand: 24,
  leatherArmor: 20,
  leatherTrousers: 20,
  leatherDress: 20,
  leatherSkirt: 20,
  copperSword: 32,
  copperBigSword: 36,
  copperSword2: 40,
  copperBigSword2: 44,
  copperArmor: 32,
  copperShinGuard: 32,
  zombieBoneHandyWand: 32,
  zombieBoneWand: 36,
  mithrilShortWand: 40,
  mithrilWand: 44,
  silkDress: 32,
  silkSocks: 32,
  magicBoneSword: 50,
  magicBoneBigSword: 54,
  mithrilCopperSword: 60,
  mithrilCopperBigSword: 64,
  boneArmor: 52,
  boneShinGuard: 52,
  ghostCreamShortWand: 50,
  ghostCreamStick: 50,
  mithrilStannumShortWand: 60,
  mithrilStannumWand: 64,
  mithrilDress: 52,
  mithrilSkirt: 52,
};

const DEF_CLASS_RATE = {
  cloth: 0.5, // 布甲
  lightArmor: 1, // 轻甲
  armor: 2, // 重甲
};

const DEF_POSITION_RATE = {
  plastron: 1,
  gaiter: 0.6,
};

const EQUIP_POSITION_NAMES = {
  plastron: '胸衣',
  gaiter: '护腿',
  ornament: '饰品',
  weapon: '武器',
};

export function transformEquipLevel(level) {
  if (level <= 120) {
    return Math.ceil(level / 2);
  }
  if (level <= 180) {
    return 60;
  }
  if (level <= 210) {
    return Math.ceil(level / 3);
  }
  return 70;
}

const dungeonNames = {
  'nightmare.1': '噩梦钥石I',
  'nightmare.2': '噩梦钥石II',
  'nightmare.3': '噩梦钥石III',
};
const dungeonLevel = {
  'nightmare.1': 250,
  'nightmare.2': 285,
};

export class CareerInfo {
  constructor() {
    makeObservable(this);
  }
  type = '';

  @observable exp = 0; // 经验值

  @observable level = 1;

  @observable peakExp = 0;

  @observable peakLevel = 0;

  @observable maxLevel = 60;

  @observable
  equipments = {
    weapon: new InventorySlot('equip'),
    plastron: new InventorySlot('equip'),
    gaiter: new InventorySlot('equip'),
    ornament: new InventorySlot('equip'),
  };

  @observable selectedSkills = [];

  @observable selectedEnhances = [];

  fromJS(v) {
    this.exp = v.exp || 0;
    this.level = v.level || 1;
    this.peakExp = v.peakExp || 0;
    this.peakLevel = v.peakLevel || 0;
    this.maxLevel = v.maxLevel || 60;

    if (v.equipments) {
      this.equipments.weapon.fromJS(v.equipments.weapon || {});
      this.equipments.plastron.fromJS(v.equipments.plastron || {});
      this.equipments.gaiter.fromJS(v.equipments.gaiter || {});
      this.equipments.ornament.fromJS(v.equipments.ornament || {});
    }

    if (v.selectedSkills) {
      this.selectedSkills.replace(
        v.selectedSkills.filter((v) => careers[this.type].skills[v])
      );
    }

    if (v.selectedEnhances) {
      this.selectedEnhances.replace(
        v.selectedEnhances.filter((v) => careers[this.type].enhances[v])
      );
    }
    return this;
  }

  @computed
  get maxExp() {
    if (!careers[this.type]) {
      console.warn(`Invalid career type ${this.type}`);
      return 10000000;
    }
    const { expFormula } = careers[this.type];
    return expFormula
      .map((v, i) => v * this.level ** i)
      .reduce((a, b) => a + b, 0);
  }

  @computed
  get maxPeakExp() {
    if (!careers[this.type]) {
      console.warn(`Invalid career type ${this.type}`);
      return 10000000;
    }
    const { expFormula } = careers[this.type];
    const level = this.peakLevel + 60;
    return expFormula.map((v, i) => v * level ** i).reduce((a, b) => a + b, 0);
  }
}

export class AffixInfo {
  constructor() {
    makeObservable(this);
  }
  @observable key = null;

  @observable value = 0;

  @observable rebuilded = false;

  @computed
  get affixData() {
    return affixes[this.key] || legends[this.key];
  }

  @computed
  get isLegend() {
    return !!legends[this.key];
  }

  @computed
  get display() {
    return this.affixData.display(this.value);
  }

  rangeDisplay(level) {
    return this.affixData.range(level);
  }

  @action
  fromJS(other) {
    this.key = other.key;
    this.value = other.value;
    this.rebuilded = other.rebuilded;
    return this;
  }
}

export class InventorySlot {
  position = null; // equip/inventory.

  @observable key = null;

  @observable count = 0;

  @observable level = 0;

  @observable affixes = [];

  @observable quality = 0;

  @observable enchantTimes = 0; // 重铸次数

  @observable locked = false;

  @observable legendType = null;

  @observable dungeonKey = null;

  constructor(position) {
    makeObservable(this);
    this.position = position;
  }

  @computed
  get goodData() {
    return goods[this.key];
  }

  @computed
  get isEnergyMaterial() {
    const { goodData } = this;
    return goodData && goodData.type === 'material' && !!goodData.energy;
  }

  @computed
  get legendData() {
    return this.legendType && legends[this.legendType];
  }

  @computed
  get backgroundColor() {
    const { goodData } = this;
    return goodData && goodData.backgroundColor;
  }

  @computed
  get nameColor() {
    const { goodData } = this;
    return goodData && goodData.nameColor;
  }

  @computed
  get description() {
    if (!this.key) {
      return '';
    }
    if (this.legendData) {
      return this.legendData.itemDescription;
    }
    return this.goodData && this.goodData.description;
  }

  @computed
  get name() {
    if (!this.key) {
      return '';
    }
    if (this.key === 'gold') {
      return '金币';
    }
    if (this.key === 'diamonds') {
      return '神力';
    }
    if (this.key === 'ticket') {
      return `钥石:${
        dungeonNames[this.dungeonKey] || maps[this.dungeonKey].name
      }`;
    }
    if (this.legendData) {
      return this.legendData.itemName;
    }
    return this.goodData && this.goodData.name;
  }

  @computed
  get originName() {
    if (!this.legendData) {
      return null;
    }
    return this.goodData && this.goodData.name;
  }

  @computed
  get isEquip() {
    if (!this.goodData) {
      return false;
    }
    return this.goodData.type === 'equip';
  }

  @computed
  get displayQuality() {
    if (this.isEquip) {
      return this.quality;
    } else if (this.goodData) {
      return this.goodData.quality || 0;
    }
  }

  @computed
  get empty() {
    return !this.key;
  }

  @computed
  get price() {
    if (!this.key) {
      return 0;
    }
    if (this.isEquip) {
      const { level } = this;
      return ((0.01 * level * level + 1 * level) * 2 ** this.quality) | 0;
    }
    return this.goodData.price * 2 ** this.quality;
  }

  @computed
  get totalPrice() {
    return this.price * this.count;
  }

  @computed
  get requireLevel() {
    if (!this.isEquip) {
      return 0;
    }
    return transformEquipLevel(this.level);
  }

  // 基础属性计算
  @computed
  get atkSpeed() {
    const { goodData } = this;
    if (!goodData) {
      return 0;
    }
    return goodData.atkSpeed || 0;
  }

  @computed
  get atk() {
    const { level, atkSpeed } = this;
    if (!atkSpeed) {
      return 0;
    }
    return (level / 3 + 2) / atkSpeed;
  }

  @computed
  get def() {
    const { level, defRate, goodData } = this;
    const rate =
      DEF_CLASS_RATE[goodData.class] * DEF_POSITION_RATE[goodData.position] ||
      0;
    return (4 + level) * rate;
  }

  @computed
  get equipPositionName() {
    const { position } = this.goodData;
    return EQUIP_POSITION_NAMES[position];
  }

  @computed
  get maxHp() {
    const { level, goodData } = this;
    if (goodData.class !== 'ornament') {
      return 0;
    }
    return 10 + level * 2;
  }

  @computed
  get mpRecovery() {
    const { level, goodData } = this;
    if (!goodData || !goodData.mpRecovery) {
      return 0;
    }
    return ((level * 1.5 + 9) * goodData.mpRecovery) / 5;
  }

  @computed
  get mpFromKill() {
    const { level, goodData } = this;
    if (!goodData || !goodData.mpFromKill) {
      return 0;
    }
    return (level * 1.5 + 9) * goodData.mpFromKill;
  }

  @action
  swap(other) {
    const temp = toJS(this);
    this.fromJS(other);
    other.fromJS(temp);
  }

  @action
  clear() {
    this.key = null;
    this.count = 0;
    this.quality = 0;
    this.level = 0;
    this.enchantTimes = 0;
    this.legendType = null;
    this.dungeonKey = null;
    this.affixes.clear();
  }

  @action
  fromJS(v) {
    this.locked = v.locked || 0;
    this.key = v.key || null;
    this.count = v.count ? Math.ceil(v.count) : null;
    this.quality = v.quality || 0;
    this.level = v.level || 0;
    this.enchantTimes = v.enchantTimes || 0;
    this.legendType = v.legendType || null;
    this.dungeonKey = v.dungeonKey || null;
    if (this.isEquip && !this.level) {
      this.level = DEFAULT_LEVEL[this.key] || 1;
    }
    this.affixes.replace(
      (v.affixes || []).map((affix) => new AffixInfo().fromJS(affix))
    );
    if (!this.key || this.count === 0) {
      this.clear();
    }
    if (this.key === 'ticket' && !this.dungeonKey) {
      this.clear();
    }
    return this;
  }
}

export class PlayerMeta {
  constructor(key) {
    this.key = key;
    makeObservable(this);
  }

  key = null;

  @observable role = 'Eyer'; // 角色

  @observable currentCareer = null;

  @observable currentCareerLevel = 0;

  @computed
  get roleData() {
    return roles[this.role];
  }

  @computed
  get name() {
    return this.roleData.name;
  }

  @computed
  get careerData() {
    return careers[this.currentCareer];
  }

  @computed
  get careerName() {
    return this.careerData && this.careerData.name;
  }

  @action
  fromJS(v) {
    this.role = v.role || 'Eyer';
    this.currentCareer = v.currentCareer || this.roleData.defaultCareer;
    this.currentCareerLevel = v.currentCareerLevel || 0;
    return this;
  }
}

export default class Player extends PlayerMeta {
  constructor(key) {
    super(key);
    makeObservable(this);

    if (!__TEST__) {
      this.disposeAutoSave = autorun(
        () => {
          this.save();
        },
        {
          delay: 30000,
        }
      );
    }
  }

  @action
  static async load(key, noWorldState = false) {
    const json = localStorage.getItem(`player-${key}`);
    const ret = new Player(key);
    let timestamp;
    if (json) {
      let other;
      if (json[0] === '{') {
        other = JSON.parse(json);
      } else if (json[0] === 's') {
        other = world.start(json);
      }
      timestamp = other.timestamp;
      doMigrates(other);
      ret.fromJS(other);
      if (noWorldState) {
        other.worldState = null;
        other.map = null;
      }
      world.load(
        ret,
        other.worldState || {
          map: other.map || 'home',
        }
      );
    }
    game.currentPlayer = key;
    return ret;
  }

  @action
  static async create(meta, i = 0) {
    game.checkCanCreate();

    const key = `${Date.now()}-${i}`;
    if (game.playerMetas.has(key)) {
      // 防止key重复
      return Player.create(meta, i + 1);
    }
    meta.key = key;
    game.playerMetas.set(key, meta);
    const player = new Player(key);
    game.currentPlayer = key;
    player.fromJS(meta);
    player.postCreate();

    player.save(true);
    game.save();

    return player;
  }

  @observable timestamp = 0;

  timelineId = null;

  banned = false;

  get isBanned() {
    return this.banned || game.banned;
  }

  @observable careers = observable.map();

  @observable gold = 0; // 金币

  @observable inventory = []; // 背包

  @observable inventoryDiamondLevel = 0; // 通过神力升级背包的次数

  @observable skillExp = observable.map(); // Map<key => { level, exp }>

  @observable buildInventory = []; // 锻造/分解空格

  @observable awardInventory = []; // 任务/剧情奖励空格

  // @observable
  // map = 'home';   // 所在地图

  @observable migrateMap = observable.map();

  @observable lootRule = observable.map();

  @observable minLootLevel = 0;

  @observable dungeonTickets = observable.map();

  @computed
  get careerInfo() {
    return this.careers.get(this.currentCareer);
  }

  @computed
  get level() {
    if (!this.careerInfo) {
      return 0;
    }
    return this.careerInfo.level;
  }

  set level(value) {
    this.careerInfo.level = value;
    this.currentCareerLevel = value;
  }

  @computed
  get maxLevel() {
    if (!this.careerInfo) {
      return 0;
    }
    return this.careerInfo.maxLevel;
  }

  set maxLevel(value) {
    if (this.careerInfo) {
      this.careerInfo.maxLevel = value;
    }
  }

  @computed
  get peakLevel() {
    if (!this.careerInfo) {
      return 0;
    }
    return this.careerInfo.peakLevel;
  }

  set peakLevel(value) {
    this.careerInfo.peakLevel = value;
  }

  @computed
  get exp() {
    return this.careerInfo.exp;
  }

  @computed
  get peakExp() {
    return this.careerInfo.peakExp;
  }

  set exp(value) {
    this.careerInfo.exp = value;
  }

  set peakExp(value) {
    this.careerInfo.peakExp = value;
  }

  @computed
  get equipments() {
    return this.careerInfo.equipments;
  }

  // 升级所需经验
  @computed
  get maxExp() {
    return this.careerInfo.maxExp;
  }

  @computed
  get maxPeakExp() {
    return this.careerInfo.maxPeakExp;
  }

  @computed
  get maxSkillCount() {
    const { level } = this;
    if (level >= 60) {
      return 6;
    } else if (level >= 40) {
      return 5;
    } else if (level >= 20) {
      return 4;
    } else if (level >= 10) {
      return 3;
    }
    return 2;
  }

  @computed
  get nextSkillUnlockLevel() {
    const { level } = this;
    if (level >= 60) {
      return null;
    } else if (level >= 40) {
      return 60;
    } else if (level >= 20) {
      return 40;
    } else if (level >= 10) {
      return 20;
    }
    return 10;
  }

  @computed
  get maxEnhanceCount() {
    const { level } = this;
    if (level >= 60) {
      return 4;
    } else if (level >= 30) {
      return 3;
    } else if (level >= 20) {
      return 2;
    } else if (level >= 10) {
      return 1;
    }
    return 0;
  }

  @computed
  get nextEnhanceUnlockLevel() {
    const { level } = this;
    if (level >= 60) {
      return null;
    } else if (level >= 30) {
      return 60;
    } else if (level >= 20) {
      return 30;
    } else if (level >= 10) {
      return 20;
    }
    return 10;
  }

  @override
  fromJS(v) {
    super.fromJS(v);

    this.timestamp = v.timestamp || Date.now();
    this.timelineId = v.timelineId;
    this.minLootLevel = v.minLootLevel;

    this.gold = v.gold || 0;
    this.inventoryDiamondLevel = v.inventoryDiamondLevel || 0;
    this.inventory.clear();

    this.skillExp.clear();
    if (isObservableMap(v.skillExp)) {
      for (const key of v.skillExp.keys()) {
        const tmp = toJS(v.skillExp.get(key));
        tmp.level = Math.min(tmp.level, 70);
        this.skillExp.set(key, observable(tmp));
      }
    } else {
      for (const key of Object.keys(v.skillExp || {})) {
        const tmp = v.skillExp[key];
        tmp.level = Math.min(tmp.level, 70);
        this.skillExp.set(key, observable(tmp));
      }
    }

    for (let i = 0; v.inventory && i < v.inventory.length; i++) {
      this.inventory.push(
        new InventorySlot('inventory').fromJS(v.inventory[i] || {})
      );
    }

    for (let i = 0; v.buildInventory && i < v.buildInventory.length; i++) {
      const slot = new InventorySlot('build').fromJS(v.buildInventory[i] || {});
      if (!slot.empty) {
        this.buildInventory.push(slot);
      }
    }

    for (let i = 0; v.awardInventory && i < v.awardInventory.length; i++) {
      const slot = new InventorySlot('award').fromJS(v.awardInventory[i] || {});
      if (!slot.empty) {
        this.awardInventory.push(slot);
      }
    }

    this.careers.clear();
    if (isObservableMap(v.careers)) {
      for (const key of v.careers.keys()) {
        const cInfo = new CareerInfo();
        cInfo.type = key;
        cInfo.fromJS(v.careers.get(key));
        this.careers.set(key, cInfo);
      }
    } else {
      for (const key of Object.keys(v.careers || {})) {
        const cInfo = new CareerInfo();
        cInfo.type = key;
        cInfo.fromJS(v.careers[key]);
        this.careers.set(key, cInfo);
      }
    }

    this.migrateMap.clear();
    if (isObservableMap(v.migrateMap)) {
      for (const key of v.migrateMap.keys()) {
        this.migrateMap.set(key, 1);
      }
    } else {
      for (const key of Object.keys(v.migrateMap || {})) {
        this.migrateMap.set(key, 1);
      }
    }

    this.lootRule.clear();
    if (isObservableMap(v.lootRule)) {
      for (const key of v.lootRule.keys()) {
        this.lootRule.set(key, v.lootRule.get(key));
      }
    } else {
      for (const key of Object.keys(v.lootRule || {})) {
        this.lootRule.set(key, v.lootRule[key]);
      }
    }

    this.dungeonTickets.clear();
    if (isObservableMap(v.dungeonTickets)) {
      for (const key of Object.keys(maps)) {
        if (maps[key].isDungeon) {
          const defaultTickets =
            typeof maps[key].defaultTicketCount === 'number'
              ? maps[key].defaultTicketCount
              : 1;
          const ticketKey = maps[key].group || key;
          this.dungeonTickets.set(
            ticketKey,
            v.dungeonTickets &&
              v.dungeonTickets.has(ticketKey) &&
              v.dungeonTickets.get(ticketKey) !== undefined
              ? v.dungeonTickets.get(key)
              : defaultTickets
          );
        }
      }
    } else {
      for (const key of Object.keys(maps)) {
        if (maps[key].isDungeon) {
          const defaultTickets =
            typeof maps[key].defaultTicketCount === 'number'
              ? maps[key].defaultTicketCount
              : 1;
          const ticketKey = maps[key].group || key;
          this.dungeonTickets.set(
            ticketKey,
            v.dungeonTickets && v.dungeonTickets[ticketKey] !== undefined
              ? v.dungeonTickets[ticketKey]
              : defaultTickets
          );
        }
      }
    }

    return this;
  }

  @action
  postCreate() {
    this.selectCareer(this.roleData.defaultCareer);
    while (this.inventory.length < 4) {
      this.inventory.push(new InventorySlot('inventory'));
    }

    const { startup } = this.roleData;

    for (const key of Object.keys(startup || {})) {
      if (typeof startup[key] === 'number') {
        // 材料
        const slot = this.awardInventory.find((v) => v.key === key);
        if (slot) {
          slot.count += startup[key];
        } else {
          this.awardInventory.push(
            new InventorySlot('award').fromJS({
              key,
              count: startup[key],
            })
          );
        }
      } else {
        // 装备
        const { quality, affixes } = startup[key];
        this.awardInventory.push(
          new InventorySlot('award').fromJS({
            key,
            count: 1,
            quality,
            affixes,
          })
        );
      }
    }
  }

  @action
  postLoad() {
    this.selectCareer(this.currentCareer);
    while (this.inventory.length < 4) {
      this.inventory.push(new InventorySlot('inventory'));
    }
  }

  @action
  selectCareer(career) {
    this.currentCareer = career;
    if (!this.careers.has(career)) {
      const careerData = careers[career];

      const info = new CareerInfo();
      info.type = career;
      info.selectedSkills.replace(
        Object.keys(careerData.skills).filter((v) => careerData.skills[v] <= 1)
      );
      if (careerData.equipments) {
        if (careerData.equipments.weapon) {
          info.equipments.weapon.fromJS({
            key: careerData.equipments.weapon,
            count: 1,
          });
        }
      }
      this.careers.set(career, info);
    }
    this.currentCareerLevel = this.level;
    Object.keys(this.careerData.skills).forEach((key) => {
      const group = skills[key].expGroup || key;
      if (!this.skillExp.has(group)) {
        this.skillExp.set(group, {
          level: 0,
          exp: 0,
        });
      }
    });
  }

  // TODO: 背包处理的函数可以拿到公共地方去。

  emptySlot(target) {
    for (let i = 0; i < target.length; i++) {
      if (!target[i].key) {
        return i;
      }
    }
    return -1;
  }

  notFullSlot(target, key, stack, dungeonKey) {
    for (let i = 0; i < target.length; i++) {
      const slot = target[i];
      if (
        slot &&
        slot.key === key &&
        (key !== 'ticket' || dungeonKey === slot.dungeonKey) &&
        slot.count < stack
      ) {
        return i;
      }
    }
    const ret = this.emptySlot(target);
    if (ret >= 0) {
      target[ret].key = key;
      if (key === 'ticket') {
        target[ret].dungeonKey = dungeonKey;
      }
    }
    return ret;
  }

  @action
  loot(good, _target) {
    const target = _target || this.inventory;
    const { key } = good;

    if (good.empty) {
      return;
    }
    if (key === 'gold') {
      this.gold += good.count;
      good.clear();
      return;
    }
    if (key === 'diamonds') {
      game.diamonds += good.count;
      good.clear();
      return;
    }
    const limit = key === 'ticket' ? MAX_TICKET_STACK : goods[key].stack;
    if (!limit) {
      // 不可堆叠物品
      const index = this.emptySlot(target);
      if (index < 0) {
        return;
      }
      target[index].fromJS(good);
      good.clear();
      return;
    }

    // 可以堆叠物品
    while (good.count > 0) {
      const index = this.notFullSlot(target, key, limit, good.dungeonKey);
      if (index < 0) {
        // 没有获取完毕。
        return;
      }
      const canPlace = Math.min(good.count, limit - target[index].count);
      target[index].count += canPlace;
      good.count -= canPlace;
    }
    good.clear();
  }

  async save(withoutWorldState) {
    try {
      if (!this.key) {
        return;
      }
      // 保存关键信息到全局存储中,便于在人物选择时展示
      const meta = game.playerMetas.get(this.key);
      if (!meta) {
        console.warn('可能角色已经被删除。不再保存。');
        return;
      }
      meta.fromJS(this);

      // 保存详细存档
      const js = preSave(this.toJS());

      if (!withoutWorldState) {
        js.worldState = world.dumpState();
      }
      js.timestamp = Date.now() - world.pendingTime;
      localStorage.setItem(
        `player-${this.key}`,
        __DEV__ ? JSON.stringify(js) : world.stop(js)
      );
      if (__DEV__) {
        console.log(`Player ${this.roleData.name} saved.`);
      }
    } catch (err) {
      console.error(err.stack);
      alert('保存失败，请将以下信息发送给作者：' + err.stack);
    }
  }

  toJS() {
    return toJS(this, false);
  }

  @action
  sellItem(slot, count) {
    if (slot.key === null) {
      return;
    }
    this.gold += slot.price * count;
    if (slot.position === 'build') {
      this.buildInventory.remove(slot);
    } else if (slot.position === 'award') {
      this.awardInventory.remove(slot);
    } else {
      slot.count -= count;
      if (slot.count === 0) {
        slot.clear();
      }
    }
  }

  countTicket(dungeonKey) {
    let count = 0;
    count += this.dungeonTickets.get(dungeonKey);
    count += this.inventory.reduce(
      (v, slot) =>
        slot.key === 'ticket' && slot.dungeonKey === dungeonKey
          ? v + slot.count
          : v,
      0
    );
    count += game.bank.reduce(
      (v, slot) =>
        slot.key === 'ticket' && slot.dungeonKey === dungeonKey
          ? v + slot.count
          : v,
      0
    );
    return count;
  }

  costTicket(key) {
    const mapCount = this.dungeonTickets.get(key);
    if (mapCount > 0) {
      this.dungeonTickets.set(key, mapCount - 1);
      return;
    }
    const finalSlot =
      this.inventory.find(
        (slot) => slot.key === 'ticket' && slot.dungeonKey === key
      ) ||
      game.bank.find(
        (slot) => slot.key === 'ticket' && slot.dungeonKey === key
      );
    if (finalSlot) {
      finalSlot.count--;
      if (finalSlot.count === 0) {
        finalSlot.clear();
      }
    }
  }

  countGood(key) {
    return this.inventory.reduce(
      (v, slot) => (slot.key === key ? v + slot.count : v),
      0
    );
  }

  costGood(key, count) {
    let rest = count;
    for (let i = this.inventory.length - 1; i >= 0; i--) {
      const slot = this.inventory[i];
      if (slot.key === key) {
        const dec = Math.min(rest, slot.count);

        slot.count -= dec;
        if (slot.count <= 0) {
          slot.clear();
        }
        rest -= dec;
        if (rest <= 0) {
          return 0;
        }
      }
    }
    return rest;
  }

  // 从生产/奖励包裹里领取所有物品（如包裹已满，剩余的会保留在对应的包裹里。
  getInventory(target) {
    target.replace(world.lootGoods(target));
  }

  getSkillLevel(key) {
    const record = this.skillExp.get(skills[key].expGroup || key);
    return record ? record.level : 0;
  }

  @action
  addSkillExp(key, value) {
    const record = this.skillExp.get(skills[key].expGroup || key);
    if (record.level > this.currentCareerLevel) {
      return;
    }

    const skillData = skills[key];
    const maxExp = skillData.maxExp(record.level);
    record.exp += world.updateRate * value;
    if (record.exp >= maxExp) {
      // TODO: 技能升级提示
      record.exp -= maxExp;
      record.level += 1;
    }
  }

  equip(slot) {
    const { goodData } = slot;
    if (!goodData || goodData.type !== 'equip') {
      return;
    }
    this.equipments[goodData.position].swap(slot);
  }

  unequip(slot) {
    const empty = this.emptySlot(this.inventory);
    if (empty >= 0) {
      this.inventory[empty].swap(slot);
    }
  }

  sortInventory(target = this.inventory) {
    const tmp = target
      .filter((v) => v.key)
      .map((v) => new InventorySlot('inventory').fromJS(v));

    function compMap(a, b, map) {
      return map[a] - map[b];
    }

    tmp.sort((a, b) => {
      const atype = a.goodData ? a.goodData.type : a.key;
      const btype = b.goodData ? b.goodData.type : b.key;
      if (atype !== btype) {
        return compMap(atype, btype, {
          junk: 0,
          package: 1,
          material: 2,
          ticket: 3,
          equip: 4,
        });
      }
      if (atype === 'ticket' && a.dungeonKey !== b.dungeonKey) {
        // 地图的话，比较地图等级和key
        const mapData1 = maps[a.dungeonKey];
        const mapData2 = maps[b.dungeonKey];
        const level1 =
          dungeonLevel[a.dungeonKey] || (mapData1 && mapData1.level) || 0;
        const level2 =
          dungeonLevel[b.dungeonKey] || (mapData1 && mapData2.level) || 0;
        if (level1 !== level2) {
          return level1 - level2;
        }
        if (a.dungeonKey < b.dungeonKey) {
          return -1;
        }
        return 1;
      }
      if (a.displayQuality !== b.displayQuality) {
        return a.displayQuality - b.displayQuality;
      }
      return compMap(a.key, b.key, goodOrder);
    });
    target.forEach((v) => v.clear());
    for (const slot of tmp) {
      this.loot(slot, target);
    }
  }

  getCareerLevel(key) {
    const data = this.careers.get(key);
    if (!data) {
      return 0;
    }
    return data.level;
  }

  dispose() {
    if (this.disposeAutoSave) {
      this.disposeAutoSave();
      this.disposeAutoSave = null;
    }
  }
}
