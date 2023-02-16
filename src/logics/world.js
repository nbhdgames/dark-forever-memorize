/**
 * Created by tdzl2003 on 2/1/17.
 */
import {
  observable,
  computed,
  action,
  makeObservable,
  runInAction,
} from 'mobx';
import { EventEmitter } from 'fbemitter';

import Timeline from './Timeline';
import EnemyBorn, { DungeonState } from './EnemyBorn';
import { InventorySlot } from './player';
import { Camps, PlayerUnit, EnemyUnit } from './unit';
import message from './message';
import camelCase from 'camelcase';
import { getDecomposeMatrials, randomEquip, generateEquip } from './goods';
import { maps, enemies, legends } from '../../data';
import md5 from 'md5';
import crypt from 'crypt';
import { utf8 } from 'charenc';
import { alert } from '../common/message';
import game from './game';

const DEBUG_RATE = 1;

class World extends EventEmitter {
  timeline = new Timeline();

  logicTimeline = null;

  @observable units = [];

  @observable player = null;

  @observable playerUnit = null;

  @observable paused = false;

  @observable pendingTime = 0;

  @observable enemyBorn = null;

  updatePromise;

  updateRate = 1;

  updatedTime = 0;

  // 恢复游戏，并开始急速模式
  @action
  resumeGame() {
    this.timeline.pause();
    this.paused = true;
    this.updateRate = 1;
    this.updatedTime = 0;
    const totalDiffTime =
      Date.now() - this.player.timestamp - this.timeline.getTime();
    // console.log(totalDiffTime);
    if (totalDiffTime > 0) {
      const diffTime = Math.min(totalDiffTime, 72 * 3600 * 1000);
      const skipTime = totalDiffTime - diffTime;
      this.player.timestamp += skipTime;
      this.forward(diffTime);
    } else {
      this.timeline.resume();
    }
  }

  forward(diffTime) {
    this.timeline.pause();
    this.paused = true;
    this.pendingTime = diffTime;

    this.requestPending();
  }

  skipForward() {
    if (this.player) {
      this.player.timestamp += this.pendingTime;
    }
    this.pendingTime = 0;
  }

  @action
  pause() {
    if (this.pendingRequest) {
      cancelAnimationFrame(this.pendingRequest);
      this.pendingRequest = null;
    }
    this.timeline.pause();
    this.paused = true;
  }

  resetTimeline() {
    this.timeline = new Timeline();
    this.logicTimeline = new Timeline(this.timeline);
  }

  load(player, worldState) {
    this.player = player;
    this.resetTimeline();

    this._map = worldState.map || 'home';
    this._endlessLevel = worldState._endlessLevel || 0;

    if (worldState.pendingMaps) {
      this.pendingMaps.replace(worldState.pendingMaps);
      for (let i = 0; i < this.pendingMaps.length; i++) {
        if (typeof this.pendingMaps[i] === 'string') {
          this.pendingMaps[i] = [this.pendingMaps[i], 0];
        }
      }
    }

    if (!maps[this._map]) {
      this._map = 'home';
      this._endlessLevel = 0;
    }
    this.onMapChanged(worldState);

    // 恢复对象
    if (worldState.units) {
      for (const unit of worldState.units) {
        if (unit.type === 'player') {
          unit.unit = this.addPlayer(player, unit);
        } else if (enemies[unit.type]) {
          unit.unit = this.addEnemySaved(unit);
        }
      }

      // 恢复对象目标和召唤者（这是在所有对象本身已经恢复好之后）
      for (const unit of worldState.units) {
        if (unit.unit) {
          if (typeof unit.target === 'number') {
            const origin = worldState.units[unit.target];
            unit.unit.target = (origin && origin.unit) || null;
          }
          if (!unit.unit.target) {
            unit.unit.findTarget();
          }

          if (typeof unit.summoner === 'number') {
            const origin = worldState.units[unit.summoner];
            unit.unit.summoner = (origin && origin.unit) || null;
            if (unit.unit.summoner && typeof unit.summonSkill === 'number') {
              unit.unit.summonSkill =
                unit.unit.summoner.skills[unit.summonSkill] || null;
            }
          }

          // 这里重新给一遍hp/mp，因为召唤物可能血量受主角影响。
          unit.unit.hp = unit.hp;
          unit.unit.mp = unit.mp;
          unit.unit.rp = unit.rp;
          unit.unit.ep = unit.ep;
        }
      }
    }

    if (!this.playerUnit) {
      this.addPlayer(player);
    }

    for (const unit of this.units) {
      unit.tryUseSkill(unit.canUseSkill());
    }
  }

  dumpState() {
    return {
      map: this._map,
      pendingMaps: this.pendingMaps,
      enemyBorn: this.enemyBorn && this.enemyBorn.dumpState(),
      units: this.units.map((v) => v && v.dumpState()),
    };
  }

  // 迭代急速模式
  requestPending() {
    this.pendingRequest = requestAnimationFrame(() => {
      const { updateRate } = this;
      const ratedPending = this.pendingTime / updateRate;
      const ratedRest = this.timeline.stepPaused(ratedPending);
      runInAction(() => {
        this.pendingTime = ratedRest * updateRate;
        this.player.timestamp += (ratedPending - ratedRest) * (updateRate - 1);

        if (!this.mapData.isDungeon) {
          this.updatedTime += ratedPending - ratedRest;
          if (this.updatedTime > 60 * 1000) {
            this.updateRate *= 1.05;
            this.updatedTime -= 60 * 1000;
          }
        }

        if (this.pendingTime <= 0) {
          this.updatedTime = 0;
          this.updateRate = 1;
          this.timeline.resume();
          this.paused = false;
          this.pendingRequest = null;
        } else {
          this.requestPending();
        }
      });
    });
  }

  constructor() {
    super();
    makeObservable(this);
    if (__DEV__) {
      this.timeline.setRate(DEBUG_RATE);
    }
  }

  @action
  dispose() {
    while (this.units.length > 0) {
      this.removeUnit(this.units[this.units.length - 1]);
    }

    if (this.enemyBorn) {
      this.enemyBorn.dispose();
      this.enemyBorn = null;
    }
    if (this.pendingRequest) {
      cancelAnimationFrame(this.pendingRequest);
      this.pendingRequest = null;
    }

    this.player = null;
    this.playerUnit = null;
    this.pause();
    this.updatePromise = null;
  }

  addUnit(unit, randomPosition) {
    if (randomPosition) {
      const pos = Math.floor(Math.random() * (this.units.length + 1));
      this.units.splice(pos, 0, unit);
    } else {
      this.units.push(unit);
    }
    unit.runAttrHooks(null, 'appeared');
  }

  addPlayer(player, savedState) {
    this.player = this.player || player;

    if (__DEV__) {
      this.logicTimeline.setRate(DEBUG_RATE);
    } else if (player.isBanned) {
      this.logicTimeline.setRate(0.001);
    }
    const unit = new PlayerUnit(this.logicTimeline, player, savedState);
    unit.initKeepAlives();
    this.playerUnit = unit;
    this.addUnit(unit);

    return unit;
  }

  @action
  addEnemy(type, borner, quality, summoner, skillState) {
    const unit = new EnemyUnit(this.logicTimeline, type, quality);
    unit.initKeepAlives();
    unit.borner = borner;
    unit.summoner = summoner;
    unit.summonSkill = skillState;
    unit.hp = unit.maxHp;
    unit.mp = unit.maxMp;

    message.sendEnemyAppear(unit, summoner);
    this.addUnit(unit, borner && borner.config.randomPosition);

    this.units.forEach((v) => {
      if (v.target === null && v.willAttack(unit)) {
        v.setTarget(unit);
      }
    });
    unit.findTarget();
    unit.tryUseSkill(unit.canUseSkill());
    return unit;
  }

  @action
  addEnemySaved(saved) {
    const unit = new EnemyUnit(
      this.logicTimeline,
      saved.type,
      saved.quality,
      saved
    );
    unit.initKeepAlives();
    this.addUnit(unit);
    return unit;
  }

  @action
  removeUnit(unit) {
    const id = this.units.indexOf(unit);
    if (id < 0) {
      return;
    }
    this.units.splice(id, 1);
    unit.dispose();

    this.units.forEach((v) => {
      if (v.target === unit) {
        v.setTarget(null);
        v.findTarget();
      }
    });
  }

  @observable _map = 'home';

  @observable _endlessLevel = 0;

  @observable pendingMaps = [];

  get map() {
    return this._map;
  }

  set map(map) {
    this._map = map;
    this.onMapChanged();
  }

  @computed
  get mapData() {
    return maps[this.map];
  }

  onMapChanged(mapState) {
    // 改变敌人生成器
    if (this.enemyBorn) {
      this.enemyBorn.dispose();
      this.enemyBorn = null;
    }

    // 移除所有敌人
    for (;;) {
      const willRemove = this.units.find((v) => {
        for (; v; v = v.summoner) {
          if (v === this.playerUnit) {
            return false;
          }
        }
        return true;
      });
      if (!willRemove) {
        break;
      }
      this.removeUnit(willRemove);
    }

    message.sendEnterMap(this.map);

    if (this.mapData.isDungeon) {
      this.enemyBorn = new DungeonState(
        this.logicTimeline,
        this.map,
        mapState && mapState.enemyBorn
      );
    } else {
      this.enemyBorn = new EnemyBorn(
        this.logicTimeline,
        this.map,
        mapState && mapState.enemyBorn
      );
    }
  }

  @action
  focusEnemy(target) {
    if (target.enemyData && target.enemyData.onPress) {
      if (target.camp === Camps.ghost) {
        return;
      }
      if (!target.enemyData.onPress.call(target, this)) {
        return;
      }
    }
    this.units.forEach((v) => {
      if (v.camp === Camps.player && v.canAttack(target)) {
        v.setTarget(target);
      }
    });
  }

  testDodge(from, to, skill) {
    if (to.testDodge()) {
      message.sendDodge(from, to, skill);
      return true;
    }
  }

  @action
  sendDamage(damageType, from, to, skill, v, isCrit) {
    let value = v;
    let absorbed = 0;
    const reflectRate = to.runAttrHooks(false, 'shieldReflect', damageType);
    if (from && from !== to && reflectRate) {
      if (this.testDodge(from, from, skill)) {
        return 0;
      }
      return this.sendDamage(
        damageType,
        from,
        from,
        skill,
        v * reflectRate,
        isCrit
      );
    }
    value = from
      ? from.runAttrHooks(value, 'willDamage', to, damageType)
      : value;
    value = to.runAttrHooks(value, 'willDamaged', from, damageType);

    absorbed = value * (to[camelCase(damageType + '-absorb')] || 0);

    switch (damageType) {
      case 'melee':
        value = (value - absorbed) / (1 + to.def / 200);
        break;
      default: {
        value =
          (value - absorbed) /
          (1 + (to[camelCase(damageType + '-resist')] || 0) / 200);
        break;
      }
    }
    // 计算护盾吸收量
    const realValue = to.runAttrHooks(value, 'absorbed', damageType);
    absorbed += value - realValue;
    value = realValue;

    value = to.runAttrHooks(value, 'damaged', from);
    message.sendDamage(damageType, from, to, skill, value, isCrit, absorbed);
    to.damage(damageType, from, value);
    return value;
  }

  @action
  sendHeal(from, to, skill, value) {
    message.sendHeal(from, to, skill, value);
    to.hp += value;
  }

  @action
  gotExp(exp, level) {
    const receivers = this.units.filter((v) => v.canGetExp);
    if (receivers.length > 0) {
      let avgexp = (exp * this.updateRate) / receivers.length;
      receivers.forEach((v) => v.gotExp(avgexp, level));
    }
  }

  @action
  lootGood(slot, showToast) {
    // 通过刷怪而获得物品
    message.sendLoot(this.player, slot, showToast);
    this.player.loot(slot);
    if (slot.count === 0) {
      slot.key = null;
    }
  }

  @action
  lootGoods(slots, showToast) {
    const ret = [];
    for (const slot of slots) {
      this.lootGood(slot, showToast);
      if (!slot.empty) {
        ret.push(slot);
      }
    }
    return ret;
  }

  getLootRule(clazz, quality, level) {
    const rule = this.player.lootRule.get(clazz);
    const value = rule && rule[quality];
    const ret = value || 0;
    if (ret) {
      return ret;
    }
    if (level < this.player.minLootLevel) {
      if (quality === 0) {
        return 1; // 出售
      }
      return 2; // 分解
    }
    return ret;
  }

  @action
  loots(loots, level, quality, showToast = false, noUpdateRate = false) {
    const slots = [];
    const qualityRate = 1 << quality;
    if (!this.player || !this.playerUnit) {
      return;
    }
    const updateRate = noUpdateRate ? 1 : this.updateRate;

    if (this._endlessLevel) {
      level += 35 * (this._endlessLevel - 1);
    }

    for (const {
      key,
      type,
      count: [min, max] = [],
      rate,
      mfRate = 1,
      dungeons,
      value,
      position,
      items,
    } of loots) {
      const count =
        type === 'maxLevel' ? 1 : Math.ceil(rate * updateRate - Math.random());
      for (let i = 0; i < count; i++) {
        if (type === 'ticket') {
          if (dungeons) {
            const keys = Object.keys(dungeons);
            const totalWeight = keys.reduce((v, key) => v + dungeons[key], 0);
            let dice = Math.random() * totalWeight;
            const result = keys.find((key) => {
              const weight = dungeons[key];
              if (dice < weight) {
                return true;
              }
              dice -= weight;
              return false;
            });
            const slot = new InventorySlot('loot');
            slot.key = 'ticket';
            slot.dungeonKey = result;
            slot.count = 1;
            slots.push(slot);
          }
        } else if (type === 'equip' || type === 'specialEquip') {
          const minLevel = Math.max(1, Math.min(level - 15, level * 0.8));
          const eLevel = Math.ceil(
            minLevel + Math.random() * (level - minLevel)
          );
          let slot;

          if (type === 'specialEquip') {
            const legendType = items[Math.floor(Math.random() * items.length)];
            slot = generateEquip(
              legends[legendType].type,
              eLevel,
              4,
              legendType
            );
          } else {
            const mf = this.playerUnit ? this.playerUnit.mf : 1;
            slot = randomEquip(eLevel, mfRate * mf * qualityRate, position);
          }
          const rule = this.getLootRule(
            slot.goodData.class,
            slot.quality,
            slot.level
          );

          switch (rule) {
            case 1:
              slots.push(
                new InventorySlot('loot').fromJS({
                  key: 'gold',
                  count: slot.price,
                })
              );
              break;
            case 2:
              {
                const materials = getDecomposeMatrials(slot);
                for (const key of Object.keys(materials)) {
                  slots.push(
                    new InventorySlot('build').fromJS({
                      key,
                      count: materials[key],
                    })
                  );
                }
              }
              break;
            case 0:
            default:
              slots.push(slot);
              break;
          }
        } else if (type === 'maxLevel') {
          // 最高等级提升。
          if (this.player.maxLevel < value) {
            this.player.maxLevel = value;
            alert(`${this.player.name}的最大等级提升到了${value}`);
          }
        } else if (key) {
          let total = (Math.random() * (max - min + 1) + min) * count;
          if (key === 'gold') {
            total *= this.playerUnit.gf;
            total *= this._endlessLevel ? Math.pow(1.5, this._endlessLevel) : 1;
          }
          const slot = new InventorySlot('loot');
          slot.key = key;
          slot.count = total | 0;
          slots.push(slot);
          i = count; // 避免多次发送
        }
      }
    }

    return this.lootGoods(slots, showToast);
  }

  lootEndless(showToast = false) {
    if (this._endlessLevel > 0) {
      if (Math.random() < game.endlessTicketRate) {
        const slots = [];
        const slot = new InventorySlot('loot');
        slot.key = 'ticket';
        slot.dungeonKey = 'nightmare.' + (this._endlessLevel + 1);
        slot.count = 1;
        slots.push(slot);

        return this.lootGoods(slots, showToast);
      }
    }
  }

  @action
  selectSkill(skill) {
    this.player.careerInfo.selectedSkills.unshift(skill);
    this.playerUnit.addSkill(skill);
  }

  @action
  unselectSkill(skill) {
    this.player.careerInfo.selectedSkills.remove(skill);
    this.playerUnit.removeSkill(skill);
  }

  @action
  selectEnhance(skill) {
    this.player.careerInfo.selectedEnhances.unshift(skill);
  }

  @action
  unselectEnhance(skill) {
    this.player.careerInfo.selectedEnhances.remove(skill);
  }

  sendSkillUsage(from, targets, skill) {
    message.sendSkillUsage(from, targets, skill);
  }

  sendGeneralMsg(msg) {
    message.sendGeneral(msg);
  }

  start(encrypted) {
    // 解密存档
    const splitSize = 16;
    const data = crypt.base64ToBytes(encrypted.slice(4));
    const secret = data.splice(0, 16);

    const splits = [];
    for (let i = 0; i * (splitSize + 16) < data.length; i++) {
      const piece = data.slice(
        i * (splitSize + 16) + 16,
        (i + 1) * (splitSize + 16)
      );
      splits.push(piece);
      const m = data.slice(i * (splitSize + 16), i * (splitSize + 16) + 16);
      if (
        md5([...piece, ...secret], { asBytes: true }).some((v, i) => v !== m[i])
      ) {
        throw Error('Invalid data');
      }
    }
    const json = [].concat(...splits);
    json.forEach((v, i) => {
      json[i] = v ^ (i & 0xff) ^ 0x27;
    });
    return JSON.parse(utf8.bytesToString(json));
  }

  stop(data) {
    // 加密存档
    const secret = md5(Date.now() + '.' + Math.random(), { asBytes: true });
    const json = utf8.stringToBytes(
      JSON.stringify({ random: Math.random(), ...data })
    );

    json.forEach((v, i) => {
      json[i] = v ^ (i & 0xff) ^ 0x27;
    });

    const splitSize = 16;

    const splits = [secret];

    for (let i = 0; i * splitSize < json.length; i++) {
      const data = json.slice(i * splitSize, (i + 1) * splitSize);
      splits.push(md5([...data, ...secret], { asBytes: true }));
      splits.push(data);
    }
    return 'save' + crypt.bytesToBase64([].concat(...splits));
  }

  @action
  usePackage(slot) {
    const { player } = this;
    const { goodData } = slot;
    if (
      player.inventory.filter((v) => v.empty).length < goodData.requireInventory
    ) {
      alert(
        `包裹空间不足！至少保留${goodData.requireInventory}个空位才能打开${goodData.name}`
      );
      return;
    }
    slot.count -= 1;
    if (slot.count === 0) {
      slot.clear();
    }
    let lootLevel = goodData.lootLevel;
    if (!lootLevel) {
      if (player.level < 60) {
        lootLevel = player.level * 2;
      } else if (player.level < 70) {
        lootLevel = player.level * 3;
      } else {
        lootLevel = 280;
      }
    } else if (Array.isArray(lootLevel)) {
      const p = Math.random();
      lootLevel = p * lootLevel[0] + (1 - p) * lootLevel[1];
    }
    this.loots(goodData.loots, lootLevel, 0, true, true);
  }
}

export default new World();
