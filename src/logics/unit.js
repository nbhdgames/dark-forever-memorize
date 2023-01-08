/**
 * Created by tdzl2003 on 2/1/17.
 */
import {
  observable,
  computed,
  autorun,
  action,
  runInAction,
  reaction,
  ObservableMap,
  makeObservable,
  override,
} from 'mobx';
import { expr, keepAlive } from 'mobx-utils';
import camelCase from 'camelcase';
import TimeLine from './Timeline';
import {
  enemies,
  skills,
  passives,
  buffs,
  enhances,
  enemyAffixes,
  medicines,
} from '../../data';
import world from './world';
import game from './game';
import message from './message';
import { transformEquipLevel } from './player';

const RECOVERY_RATE = 0.5;

// 阵营
export const Camps = {
  ghost: 'ghost', // 不参战
  neutral: 'neutral', // 中立（但可被攻击）
  player: 'player', // 玩家（包括玩家、盟友、召唤生物）
  alien: 'alien', // 联军（盟友/召唤生物，但不可指定目标）
  enemy: 'enemy', // 敌人（野怪，敌人的召唤生物）
  story: 'story', // 剧情角色，不攻击。
  shrine: 'shrine',
};

export const CampRelation = {
  ghost: {},
  neutral: {
    player: true, // 不自动攻击，但可以攻击玩家
    alien: true,
  },
  player: {
    neutral: true, // 不自动攻击，但可以攻击中立目标
    enemy: 'hate', // 玩家自动攻击敌人
  },
  alien: {
    neutral: true, // 不自动攻击，但可以攻击中立目标
    enemy: 'hate', // 玩家自动攻击敌人
  },
  enemy: {
    player: 'hate', // 敌人自动攻击玩家
    alien: 'hate',
  },
  shrine: {},
  story: {},
};

export const IsAlien = {
  ghost: {},
  neutral: {
    neutral: true,
    enemy: true,
  },
  player: {
    player: true,
    alien: true,
  },
  alien: {
    player: true,
    alien: true,
  },
  enemy: {
    neutral: true,
    enemy: true,
  },
  shrine: {},
};

let keyGenerator = 0;

export class SkillState {
  constructor(timeline, unit, type, savedState) {
    makeObservable(this);
    this.timeline = timeline;
    this.type = type;
    this.unit = unit;

    if (savedState) {
      if (savedState.coolDown) {
        this.setupCoolDown(savedState.coolDown);
      }
    } else {
      this.setupCoolDown();
    }
  }

  @observable type = '';

  timeline = null;
  unit = null;

  coolDownTimer = null;

  @observable cooleddown = true;

  @observable coolDownAt = 0;

  getLevel() {
    return 0;
  }

  addSkillExp() {
    // Be overrided later.
  }

  reduceCoolDown(time) {
    if (!this.cooleddown) {
      this.setupCoolDown(this.coolDownAt - this.timeline.getTime() - time);
    }
  }

  @action
  setupCoolDown(cd) {
    const { skillData } = this;
    if (!skillData) {
      alert(this.type);
    }
    const coolDown =
      cd ||
      (typeof skillData.coolDown === 'function'
        ? skillData.coolDown(this.getLevel(), this.unit)
        : skillData.coolDown);
    if (this.coolDownTimer) {
      this.timeline.clearTimeout(this.coolDownTimer);
      this.coolDownTimer = null;
    }
    if (coolDown && coolDown > 0) {
      this.coolDownAt = this.timeline.getTime() + coolDown;
      this.cooleddown = false;
      this.coolDownTimer = this.timeline.setTimeout(this.onCoolDown, coolDown);
    } else {
      this.cooleddown = true;
    }
  }

  @action
  effect = () => {
    const { skillData } = this;

    skillData.effect.call(this, world, this.unit, this.getLevel());

    if (skillData.isAttack) {
      this.unit.setAttackCoolDown();
    }

    if (skillData.cost) {
      ['hp', 'mp', 'rp', 'ep', 'comboPoint'].forEach((k) => {
        let cost = skillData.cost[k];
        if (typeof cost === 'function') {
          cost = cost(this.unit);
        }
        if (cost) {
          switch (k) {
            case 'rp':
              this.unit.hp += cost * (this.unit.rpRecHp || 0);
              break;
            default:
              break;
          }
          this.unit[k] -= cost;
          this.unit.runAttrHooks(cost, camelCase('postCost' + k));
        }
      });
    }
    this.setupCoolDown();
    this.addSkillExp();
  };

  @action
  onCoolDown = () => {
    this.coolDownTimer = null;
    this.coolDownAt = 0;
    this.cooleddown = true;
  };

  @computed
  get shouldUse() {
    if (!this.canUse) {
      return false;
    }
    const { skillData } = this;
    if (skillData.shouldUse) {
      return skillData.shouldUse.call(this, world, this.unit, this.getLevel());
    }
    return true;
  }

  @computed
  get canUse() {
    if (!this.cooleddown) {
      return false;
    }
    const { skillData } = this;
    if (skillData.isAttack && !this.unit.attackCooledDown) {
      return false;
    }
    if (skillData.cost) {
      if (
        ['hp', 'mp', 'rp', 'ep', 'comboPoint'].some((k) => {
          let cost = skillData.cost[k];
          if (typeof cost === 'function') {
            cost = cost(this.unit);
          }
          return cost && cost > this.unit[k];
        })
      ) {
        return false;
      }
    }
    if (
      skillData.canUse &&
      !skillData.canUse.call(this, world, this.unit, this.getLevel())
    ) {
      return false;
    }
    return true;
  }

  @computed
  get notBreakable() {
    return this.skillData.notBreakable;
  }

  @computed
  get skillData() {
    return skills[this.type];
  }

  @computed
  get name() {
    return this.skillData.name;
  }

  dispose() {
    if (this.coolDownTimer) {
      this.timeline.clearTimeout(this.coolDownTimer);
      this.coolDownTimer = null;
    }
    for (const unit of world.units.filter((v) => v.summonSkill === this)) {
      unit.kill();
    }
  }

  dumpState() {
    const ret = {};
    if (!this.cooleddown) {
      ret.coolDown = this.coolDownTimer.at - this.timeline.getTime();
    }
    return ret;
  }

  testBreak() {
    const { antiBreak } = this.skillData;
    if (!antiBreak) {
      return true;
    }
    return Math.random() < 1 - antiBreak;
  }
}

export class BuffState {
  constructor(timeline, unit, type, time, arg, group) {
    makeObservable(this);
    this.timeline = timeline;
    this.unit = unit;
    this.type = type;
    this.arg = arg;
    this.group = group;

    if (time) {
      this.totalTime = time;
      this.expireAt = timeline.getTime() + time;
      this.timer = timeline.setTimeout(this.over, time);
    }
  }

  expireAt = null;
  timeline = null;
  unit = null;
  timer = null;
  group = null;

  hookDisposes = [];

  @observable type = '';

  @observable arg = null;

  @observable stack = 1;

  resetTimer(time) {
    const { timeline } = this;
    if (this.timer) {
      timeline.clearTimeout(this.timer);
    }
    if (time) {
      this.expireAt = timeline.getTime() + time;
      this.timer = timeline.setTimeout(this.over, time);
    } else {
      this.expireAt = null;
    }
  }

  effect = () => {
    this.effectTimer = this.timeline.setTimeout(
      this.effect,
      this.effectInterval
    );
    runInAction(() => {
      this.buffData.effect.call(this, world);
    });
  };

  over = () => {
    this.timer = null;
    this.unit.removeBuff(this);
  };

  @computed
  get buffData() {
    return buffs[this.type];
  }

  @computed
  get effectInterval() {
    const { effectInterval } = this.buffData;
    if (typeof effectInterval === 'function') {
      return effectInterval.call(this);
    }
    return effectInterval;
  }

  dispose() {
    this.didRemove();
  }

  runAttrHook(val, key) {
    const {
      buffData: { hooks },
    } = this;
    if (hooks && hooks[key]) {
      return hooks[key].call(this, val);
    }
    return val;
  }

  willAppear() {
    const { willAppear } = this.buffData;
    if (willAppear) {
      return willAppear.call(this);
    }
    return true;
  }

  didAppear() {
    const {
      timeline,
      unit,
      buffData: { didAppear, hooks },
      effectInterval,
    } = this;

    if (effectInterval) {
      this.effectTimer = timeline.setTimeout(this.effect, effectInterval);
    }

    if (hooks) {
      for (const key of Object.keys(hooks)) {
        this.hookDisposes.push(unit.addAttrHook(key, hooks[key].bind(this)));
      }
    }
    if (didAppear) {
      didAppear.call(this);
    }
  }

  willRemove() {
    const { willRemove } = this.buffData;
    if (willRemove) {
      willRemove.call(this, world);
    }
  }

  didRemove() {
    const { didRemove } = this.buffData;
    if (didRemove) {
      didRemove.call(this, world);
    }
    if (this.timer) {
      this.timeline.clearTimeout(this.timer);
    }
    if (this.effectTimer) {
      this.timeline.clearTimeout(this.effectTimer);
      this.effectTimer = null;
    }
    const { buffData } = this;
    if (buffData.onOver) {
      buffData.onOver.call(this, world);
    }
    if (this.hookDisposes) {
      this.hookDisposes.forEach((v) => v());
      this.hookDisposes = null;
    }
    if (this.unit.reading === this) {
      this.unit.reading = null;
    }
  }

  dumpState() {
    if (this.buffData.notSave) {
      return;
    }
    const ret = {
      type: this.type,
      group: this.group,
      arg: this.arg,
    };
    if (this.expireAt) {
      ret.time = this.expireAt - this.timeline.getTime();
    }
    return ret;
  }
}

let globalCounter = 0;

export class Unit {
  constructor(timeline, savedState) {
    makeObservable(this);
    this.timeline = new TimeLine(timeline);
    this.disposeUseSkill = reaction(this.canUseSkill, this.tryUseSkill);
    this.disposeSpeed = autorun(() => {
      this.timeline.setRate(this.speedRate);
    });
    this.autoDisposes.push(
      autorun(() => {
        const { target } = this;
        if (target && target.camp === Camps.ghost) {
          this.findTarget();
        }
      })
    );

    this.key = keyGenerator += 1;
  }

  initKeepAlives() {
    [keepAlive(this, 'maxHp')].forEach((v) => this.keepAlives.push(v));
  }

  key = 0;

  timeline = null;

  keepAlives = [];

  autoDisposes = [];

  @observable _hp = 0;

  get hp() {
    return this._hp;
  }

  set hp(value) {
    this._hp = Math.max(0, Math.min(value, this.maxHp));
  }

  @observable _mp = 0;

  get mp() {
    return this._mp;
  }

  set mp(value) {
    this._mp = Math.max(0, Math.min(value, this.maxMp));
  }

  @observable _rp = 0;

  get rp() {
    return this._rp;
  }

  set rp(value) {
    this._rp = Math.max(0, Math.min(value, this.maxRp));
  }

  @observable _ep = 0;

  get ep() {
    return this._ep;
  }

  set ep(value) {
    this._ep = Math.max(0, Math.min(value, this.maxEp));
  }

  @observable comboPoint = 0;

  // 阵营
  @observable camp = Camps.ghost;

  // 攻击目标
  @observable target = null;

  @action
  setTarget(unit) {
    this.target = unit;
    if (unit) {
      unit.runAttrHooks(this, 'becomeTarget');
    }
  }

  @observable skills = [];

  @observable buffs = [];

  @observable combos = [];

  hooks = observable.map();

  // 自动恢复计时器
  recoveryTimer = null;

  @computed
  get targetDisplayName() {
    if (!this.target) {
      return '';
    }
    return this.target.displayName;
  }

  @computed
  get rpRecHp() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'rpRecHp');
    return ret;
  }

  @observable attackCooledDown = false;

  attackCoolDownTimer = null;

  @observable casting = null;

  castingTimer = null;

  @observable reading = null;

  @computed
  get castingName() {
    return (
      (this.casting && this.casting.skillData.name) ||
      (this.reading && this.reading.buffData.name)
    );
  }

  @computed
  get castingTime() {
    if (this.casting) {
      return this.casting.skillData.castTime;
    }
    if (this.reading) {
      return this.reading.totalTime;
    }

    return 1;
  }

  @action
  setCamp(camp) {
    this.camp = camp;
    this.target = null;
    this.findTarget();
    for (const unit of world.units) {
      if (unit.target === this && !unit.canAttack(this)) {
        unit.target = null;
        unit.findTarget();
      }
    }
  }

  @computed
  get castingRest() {
    if (this.casting) {
      return this.castingTime + this.timeline.now - this.castingTimer.at;
    }
    if (this.reading) {
      return this.reading.expireAt - this.timeline.now;
    }
    return 0;
  }

  @action
  startRead(type, time, arg, skill) {
    if (this.camp === Camps.ghost) {
      return;
    }

    // 不同于buff使用世界时间轴，读条技能使用角色时间轴。
    const buff = new BuffState(this.timeline, this, type, time, arg);
    buff.skill = skill;
    buff.willAppear();
    message.sendBuff(this, type);
    this.buffs.push(buff);
    buff.didAppear();
    this.reading = buff;
  }

  @computed
  get speedRate() {
    let ret = 1;
    ret = this.runAttrHooks(ret, 'speedRate');
    ret = this.runAttrHooks(ret, 'speedRateMul');
    return ret;
  }

  @action
  setAttackCoolDown() {
    this.attackCooledDown = false;
    this.attackCoolDownTimer = this.timeline.setTimeout(
      this.onAttackCoolDown,
      1000 / this.atkSpeed
    );
  }

  canUseSkill = () => {
    if (this.camp === Camps.ghost) {
      return null;
    }
    if (this.casting || this.reading) {
      return null;
    }
    if (this.timeline.paused) {
      return null;
    }
    if (this.runAttrHooks(false, 'stunned')) {
      return null;
    }
    const ret = this.skills.find((v) => v.shouldUse);
    return ret;
  };

  @action
  breakCasting(coolDown, force = false) {
    const { casting, reading } = this;
    if (casting && !casting.notBreakable && !force) {
      if (!force && !casting.testBreak()) {
        return;
      }
      message.sendBreakCasting(this, casting);
      this.timeline.clearTimeout(this.castingTimer);
      this.castingTimer = null;
      this.casting = null;
      if (coolDown) {
        casting.setupCoolDown(coolDown);
      }
    }
    if (reading && reading.skill && !reading.skill.notBreakable && !force) {
      if (!force && !reading.skill.testBreak()) {
        return;
      }
      message.sendBreakCasting(this, reading);
      this.reading = null;
      this.removeBuff(reading);
      if (coolDown && reading.skill) {
        reading.skill.setupCoolDown(coolDown);
      }
    }
  }

  @action
  tryUseSkill = (skill) => {
    this.runAttrHooks(skill, 'preskill', world);

    if (!this.casting && skill && skill.canUse) {
      const { castTime } = skill.skillData;
      if (castTime) {
        this.castingTimer = this.timeline.setTimeout(
          action(() => {
            if (skill.canUse) {
              this.runAttrHooks(null, 'preSkillEffect');
              skill.effect();
              this.runAttrHooks(null, 'postSkillEffect');
            }

            this.castingTimer = null;
            this.casting = null;
          }),
          castTime
        );
        this.casting = skill;
      } else {
        this.runAttrHooks(null, 'preSkillEffect');
        skill.effect();
        this.runAttrHooks(null, 'postSkillEffect');
      }
    }
  };

  @action
  onAttackCoolDown = () => {
    this.attackCoolDownTimer = null;
    this.attackCooledDown = true;
  };

  @computed
  get noDodgeRate() {
    return this.runAttrHooks(0.95, 'noDodgeRate');
  }

  @computed
  get dodgeRate() {
    return 1 - this.noDodgeRate;
  }

  @computed
  get stunResist() {
    return this.runAttrHooks(0, 'stunResist');
  }

  testDodge() {
    const { noDodgeRate } = this;
    return Math.random() > noDodgeRate;
  }

  @action
  damage(type, from, v) {
    if (this.camp === Camps.ghost) {
      return false;
    }
    this.hp -= v;
    if (this.hp <= 0) {
      this.kill();
    } else if (from && this.target === null && this.canAttack(from)) {
      // 无目标时受到攻击，则进入战斗。
      this.setTarget(from);
    }
    return true;
  }

  @action
  kill() {
    this.camp = Camps.ghost;
    this.target = null;
    this.rp = 0;
    this.mp = 0;
    this.ep = 0;
    this.comboPoint = 0;
    if (this.casting) {
      this.timeline.clearTimeout(this.castingTimer);
      this.casting = null;
      this.castingTimer = null;
    }
    if (this.recoveryTimer) {
      this.timeline.parent.clearTimeout(this.recoveryTimer);
      this.recoveryTimer = null;
    }
    for (const buff of this.buffs.slice(0)) {
      this.removeBuff(buff);
    }
  }

  @action
  findTarget() {
    const targets = world.units.filter((v) => this.willAttack(v));
    const target = targets[Math.floor(Math.random() * targets.length)];
    this.setTarget(target || null);
  }

  willAttack(target) {
    const rela = CampRelation[this.camp][target.camp];
    return this.runAttrHooks(rela === 'hate', 'willAttack', target);
  }

  canAttack(target) {
    return !!CampRelation[this.camp][target.camp];
  }

  willAssist(target) {
    return !!IsAlien[this.camp][target.camp];
  }

  @action
  addSkill(type, saved) {
    this.skills.unshift(new SkillState(this.timeline, this, type, saved));
  }

  @action
  removeSkill(type) {
    const id = this.skills.findIndex((v) => v.type === type);
    const state = this.skills.splice(id, 1);
    state[0].dispose();
  }

  startRecovery() {
    if (!this.recoveryTimer) {
      this.recoveryTimer = this.timeline.parent.setTimeout(
        this.recovery,
        (1000 * RECOVERY_RATE) / this.speedRate
      );
    }
  }

  @action
  recovery = () => {
    if (this.camp === Camps.ghost) {
      this.recoveryTimer = null;
      return;
    }
    if (this.hpRecovery) {
      this.hp += (this.hpRecovery || 0) * RECOVERY_RATE;
    }
    if (this.mpRecovery) {
      this.mp += (this.mpRecovery || 0) * RECOVERY_RATE;
    }
    if (this.rpRecovery) {
      this.rp += (this.rpRecovery || 0) * RECOVERY_RATE;
    }
    if (this.epRecovery) {
      this.ep += (this.epRecovery || 0) * RECOVERY_RATE;
    }
    this.recoveryTimer = null;
    this.startRecovery();
  };

  @action
  addAttrHook(key, replace) {
    let hooks = this.hooks.get(key);
    if (!hooks) {
      hooks = observable.map();
      this.hooks.set(key, hooks);
    }
    let id = ++globalCounter;
    if (globalCounter >= 100000) {
      globalCounter = 0;
    }
    while (hooks.has(id)) {
      id = ++globalCounter;
      if (globalCounter >= 100000) {
        globalCounter = 0;
      }
    }

    hooks.set(id, replace);

    return action(() => {
      hooks.delete(id);
    });
  }

  runAttrHooks(value, key, ...args) {
    let ret = value;
    // ret = this.buffs.reduce((v, buff) => buff.runAttrHook(v, key), ret);
    const hooks = this.hooks.get(key);
    if (hooks) {
      for (const v of hooks.values()) {
        ret = v(ret, ...args);
      }
    }
    return ret;
  }

  dispose() {
    this.disposeUseSkill();
    this.disposeSpeed();
    this.keepAlives.forEach((v) => v());
    this.keepAlives = [];
    this.skills.forEach((v) => v.dispose());
    this.skills.clear();

    const { casting, reading } = this;
    if (casting) {
      this.timeline.clearTimeout(this.castingTimer);
      this.castingTimer = null;
      this.casting = null;
    }
    if (reading) {
      this.reading = null;
      this.removeBuff(reading);
    }

    if (this.attackCoolDownTimer) {
      this.timeline.clearTimeout(this.attackCoolDownTimer);
      this.attackCoolDownTimer = null;
    }

    if (this.recoveryTimer) {
      this.timeline.clearTimeout(this.recoveryTimer);
      this.recoveryTimer = null;
    }
    this.timeline.dispose();

    for (const dispose of this.autoDisposes.splice(0)) {
      dispose();
    }
  }

  @action
  addBuff(type, time, arg, group, maxStack = 1) {
    if (this.camp === Camps.ghost) {
      return;
    }
    // 没有group：无限叠加buff
    // 有group, maxStack不提供：单次叠加BUFF
    // 有group，提供maxStack：指定最大叠加次数的BUFF
    if (group) {
      // 有限叠加BUFF，移除超出的多余buff
      const groupBuffs = this.buffs
        .filter((v) => v.group === group)
        .sort((a, b) => {
          let v = 0;
          if (a.buffData.compBuff) {
            v = a.buffData.compBuff(a, b);
          }
          if (!v) {
            return a.expireAt - b.expireAt;
          }
        });
      const removeBuffs = groupBuffs.slice(0, groupBuffs.length - maxStack + 1);
      const replaceBuff = removeBuffs.shift();
      if (replaceBuff) {
        if (replaceBuff.type === type) {
          replaceBuff.arg = arg;
          replaceBuff.resetTimer(time);
          return replaceBuff;
        }
      }
      const buff = new BuffState(
        this.timeline.parent,
        this,
        type,
        time,
        arg,
        group
      );
      if (!buff.willAppear()) {
        return;
      }
      if (replaceBuff) {
        this.removeBuff(replaceBuff);
      }
      removeBuffs.forEach((v) => this.removeBuff(v));
      message.sendBuff(this, type);
      this.buffs.push(buff);
      buff.didAppear();
      return buff;
    }

    const buff = new BuffState(
      this.timeline.parent,
      this,
      type,
      time,
      arg,
      group
    );
    if (!buff.willAppear()) {
      return;
    }
    message.sendBuff(this, type);
    this.buffs.push(buff);
    buff.didAppear();
    return buff;
  }

  @action
  removeBuff(buff) {
    const idx = this.buffs.indexOf(buff);
    if (idx < 0) {
      return;
    }
    message.sendBuffOff(this, buff.type);
    buff.willRemove();
    this.buffs.splice(idx, 1);
    buff.didRemove();
  }

  dumpState() {
    const skills = {};
    for (const skill of this.skills) {
      skills[skill.type] = skill.dumpState();
    }
    return {
      camp: this.camp,
      hp: this.hp,
      rp: this.rp,
      ep: this.ep,
      mp: this.mp,
      target: this.target && world.units.indexOf(this.target),
      skills: skills,
      buffs: this.buffs.map((v) => v.dumpState()),
      casting: this.casting && this.skills.indexOf(this.casting),
      castingTimer:
        this.casting && this.castingTimer.at - this.timeline.getTime(),
      reading: this.reading && this.buffs.indexOf(this.reading),
    };
  }

  @action
  stun(power, type = 'stunned', force = false) {
    const { casting, reading } = this;
    if (casting && casting.notBreakable && !force) {
      return false;
    }
    if (reading && reading.skill && !reading.skill.notBreakable && force) {
      return false;
    }
    const { stunResist } = this;
    const dur = force ? power : power / (1 + stunResist / 100);
    let base = Math.floor(dur);
    const rest = dur - base;
    if (Math.random() < rest) {
      base += 1;
    }
    if (base > 0) {
      this.breakCasting(null, true);
      this.addBuff(type, base * 1000);
      return true;
    }
    return false;
  }

  testCrit(critRate = null) {
    if (critRate === null) {
      critRate = this.critRate;
    }
    let base = Math.floor(critRate);
    const rest = critRate - base;
    if (Math.random() < rest) {
      ++base;
    }
    this.runAttrHooks('testCrit', base);
    return base;
  }

  getCritBonus(rate, baseBonus = null) {
    if (baseBonus === null) {
      baseBonus = this.critBonus;
    }
    return 1 + baseBonus * rate;
  }
}

export class PlayerUnit extends Unit {
  constructor(timeline, player, savedState) {
    super(timeline, savedState);
    makeObservable(this);

    runInAction(() => {
      this.player = player;
      // 装备词缀加成
      // 这里不计算装备的基础属性，因为尤其是武器的属性 有特别之处。
      // 装备的基础属性在对应的属性入口计算，每个位置有哪些基础属性确定不会更改。
      ['weapon', 'plastron', 'gaiter', 'ornament'].forEach((position) => {
        let hookDispose = [];

        this.autoDisposes.push(
          autorun(() => {
            const slot = this.player.equipments[position];
            for (const dispose of hookDispose.splice(0)) {
              dispose();
            }
            if (!slot.empty) {
              for (const affixInfo of slot.affixes) {
                const { hooks } = affixInfo.affixData;
                for (const key of Object.keys(hooks)) {
                  hookDispose.push(
                    this.addAttrHook(
                      key,
                      hooks[key].bind(this, affixInfo.value)
                    )
                  );
                }
              }
            }
          })
        );
      });

      // 被动技能加成
      {
        let hookDispose = [];
        this.autoDisposes.push(
          autorun(() => {
            for (const dispose of hookDispose.splice(0)) {
              dispose();
            }
            Object.keys(this.player.careerData.passives).forEach((passive) => {
              const active = expr(
                () =>
                  this.player.careerData.passives[passive] <= this.player.level
              );
              if (active) {
                const passiveData = passives[passive];
                const { hooks } = passiveData;
                if (hooks) {
                  for (const key of Object.keys(hooks)) {
                    hookDispose.push(
                      this.addAttrHook(key, hooks[key].bind(this, world))
                    );
                  }
                }
              }
            });
          })
        );
      }

      // 强化技能加成
      {
        let hookDispose = [];
        this.autoDisposes.push(
          autorun(() => {
            for (const dispose of hookDispose.splice(0)) {
              dispose();
            }

            this.player.careerInfo.selectedEnhances.forEach((v) => {
              const { hooks } = enhances[v];
              if (hooks) {
                for (const key of Object.keys(hooks)) {
                  hookDispose.push(
                    this.addAttrHook(key, hooks[key].bind(this, world))
                  );
                }
              }
            });
          })
        );
      }

      // 药剂加成
      {
        for (const type of Object.keys(medicines)) {
          const { hooks } = medicines[type];
          if (hooks) {
            for (const key of Object.keys(hooks)) {
              this.addAttrHook(key, (...args) => {
                return hooks[key].apply(this, [
                  game.medicineLevel.get(type) || 0,
                  ...args,
                ]);
              });
            }
          }
        }
      }
    });

    const selectedSkills = this.player.careerInfo.selectedSkills;
    const skills = savedState && savedState.skills;
    for (let i = selectedSkills.length - 1; i >= 0; i--) {
      this.addSkill(selectedSkills[i], skills && skills[selectedSkills[i]]);
    }

    if (savedState) {
      this.camp = savedState.camp;

      if (savedState.rebornTimer) {
        message.sendPlayerDeath(
          this,
          (savedState.rebornTimer / 1000).toFixed(1)
        );
        this.timeline.parent.setTimeout(this.reborn, savedState.rebornTimer);
      } else if (this.camp === Camps.ghost) {
        const rebornIn = 10 + this.player.level * 0.5;
        message.sendPlayerDeath(this, rebornIn);
        this.rebornTimer = this.timeline.parent.setTimeout(
          this.reborn,
          rebornIn * 1000
        );
      }

      if (savedState.buffs) {
        for (const buff of savedState.buffs) {
          // 这里不检查buff叠加情况
          if (buff && buff.time > 0) {
            buff.buff = this.addBuff(
              buff.type,
              buff.time,
              buff.arg,
              buff.group,
              99999
            );
          }
        }
      }

      this.hp = savedState.hp;
      this.mp = savedState.mp;
      this.rp = savedState.rp;
      this.ep = savedState.ep;

      if (typeof savedState.reading === 'number') {
        this.reading = this.buffs[savedState.reading];
      } else if (typeof savedState.casting === 'number') {
        const skill = this.skills[savedState.casting];
        const castTime = savedState.castingTimer;
        if (skill) {
          this.castingTimer = this.timeline.setTimeout(() => {
            skill.canUse && skill.effect();

            this.castingTimer = null;
            this.casting = null;
          }, castTime);
          this.casting = skill;
        }
      }
    } else {
      this.hp = this.maxHp;
      this.mp = this.maxMp;
      this.camp = Camps.player;
    }

    this.setAttackCoolDown();

    this.startRecovery();
  }

  initKeepAlives() {
    super.initKeepAlives();
    [
      keepAlive(this, 'maxMp'),
      keepAlive(this, 'maxRp'),
      keepAlive(this, 'maxEp'),
      keepAlive(this, 'atk'),
      keepAlive(this, 'atkSpeed'),
      keepAlive(this, 'def'),
      keepAlive(this, 'hpRecovery'),
      keepAlive(this, 'mpRecovery'),
      keepAlive(this, 'rpRecovery'),
      keepAlive(this, 'epRecovery'),
      keepAlive(this, 'rpOnAttack'),
      keepAlive(this, 'rpOnAttacked'),
      keepAlive(this, 'critRate'),
      keepAlive(this, 'critBonus'),
      keepAlive(this, 'leech'),
      keepAlive(this, 'meleeAbsorb'),
      keepAlive(this, 'fireResist'),
      keepAlive(this, 'fireAbsorb'),
      keepAlive(this, 'darkResist'),
      keepAlive(this, 'darkAbsorb'),
      keepAlive(this, 'coldResist'),
      keepAlive(this, 'coldAbsorb'),
      keepAlive(this, 'lightningResist'),
      keepAlive(this, 'lightningAbsorb'),
      keepAlive(this, 'mf'),
      keepAlive(this, 'gf'),
    ].forEach((v) => this.keepAlives.push(v));
  }

  selectCareer(career) {
    for (const state of this.skills.splice(0)) {
      state.dispose();
    }
    this.player.selectCareer(career);
    const selectedSkills = this.player.careerInfo.selectedSkills;
    for (let i = selectedSkills.length - 1; i >= 0; i--) {
      this.addSkill(selectedSkills[i]);
    }
  }

  @observable player = null;

  @computed
  get name() {
    if (!this.player) {
      return '';
    }
    return this.player.name;
  }

  @computed
  get displayName() {
    return this.runAttrHooks(this.name, 'displayName');
  }

  // 力量
  @computed
  get str() {
    let ret = 0;
    if (this.player) {
      ret += this.player.roleData.attrBase.str;
      ret +=
        this.player.careerData.attrGrow.str *
        (this.player.level + this.player.peakLevel);
    }
    ret = this.runAttrHooks(ret, 'str');
    return ret;
  }

  // 敏捷
  @computed
  get dex() {
    let ret = 0;
    if (this.player) {
      ret += this.player.roleData.attrBase.dex;
      ret +=
        this.player.careerData.attrGrow.dex *
        (this.player.level + this.player.peakLevel);
    }
    ret = this.runAttrHooks(ret, 'dex');
    return ret;
  }

  // 智力
  @computed
  get int() {
    let ret = 0;
    if (this.player) {
      ret += this.player.roleData.attrBase.int;
      ret +=
        this.player.careerData.attrGrow.int *
        (this.player.level + this.player.peakLevel);
    }
    ret = this.runAttrHooks(ret, 'int');
    return ret;
  }

  // 耐力
  @computed
  get sta() {
    let ret = 0;
    if (this.player) {
      ret += this.player.roleData.attrBase.sta;
      ret +=
        this.player.careerData.attrGrow.sta *
        (this.player.level + this.player.peakLevel);
    }
    ret = this.runAttrHooks(ret, 'sta');
    return ret;
  }

  @computed
  get maxHp() {
    let ret = 50 + this.level * 10;
    // 耐力加成
    const { ornament } = this.player.equipments;
    if (!ornament.empty) {
      ret += ornament.maxHp;
    }
    ret = this.runAttrHooks(ret, 'maxHp');
    ret = this.runAttrHooks(ret, 'maxHpMul');
    ret *= this.sta / 100 + 1;
    ret *= this.runAttrHooks(1, 'maxHpAdd');

    return ret;
  }

  @computed
  get maxCombo() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'maxCombo');
    return ret;
  }

  @computed
  get hpRecovery() {
    let ret = 0;
    // 自宅回血，正常30秒回满
    if (world.map === 'home') {
      ret += this.maxHp / 30;
    }
    ret = this.runAttrHooks(ret, 'hpRecovery');
    return ret;
  }

  @computed
  get maxMp() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'maxMp');
    ret = this.runAttrHooks(ret, 'maxMpMul');

    // 每点智力增加1%法力上限
    ret *= 1 + this.int * 0.01;
    return ret;
  }

  @computed
  get mpRecovery() {
    let ret = 0;
    // 自宅回蓝，正常20秒回满
    if (world.map === 'home') {
      ret += this.maxMp / 20;
    }
    const { weapon } = this.player.equipments;
    if (!weapon.empty) {
      ret += weapon.mpRecovery || 0;
    }
    ret = this.runAttrHooks(ret, 'mpRecovery');
    return ret;
  }

  @computed
  get mpFromKill() {
    let ret = 0;
    const { weapon } = this.player.equipments;
    if (!weapon.empty) {
      ret += weapon.mpFromKill || 0;
    }
    ret = this.runAttrHooks(ret, 'mpFromKill');
    return ret;
  }

  @computed
  get hpFromKill() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'hpFromKill');
    return ret;
  }

  // 最大怒气
  @computed
  get maxRp() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'maxRp');
    ret = this.runAttrHooks(ret, 'maxRpMul');
    return ret;
  }

  @computed
  get rpRecovery() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'rpRecovery');
    ret = this.runAttrHooks(ret, 'rpReceiveMul');
    ret -= 1; // 固定每秒衰竭1点怒气
    return ret;
  }

  @computed
  get maxEp() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'maxEp');
    ret = this.runAttrHooks(ret, 'maxEpMul');
    return ret;
  }

  @computed
  get epRecovery() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'epRecovery');
    ret = this.runAttrHooks(ret, 'epRecoveryMul');
    return ret;
  }

  @computed
  get rpOnAttack() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'rpOnAttack');
    ret = this.runAttrHooks(ret, 'rpReceiveMul');
    return ret;
  }

  @computed
  get rpOnAttacked() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'rpOnAttacked');
    ret = this.runAttrHooks(ret, 'rpReceiveMul');
    return ret;
  }

  @computed
  get exp() {
    if (this.player.level >= this.player.maxLevel) {
      return this.player.peakExp;
    }
    return this.player.exp;
  }

  @computed
  get maxExp() {
    if (this.player.level >= this.player.maxLevel) {
      return this.player.maxPeakExp;
    }
    return this.player.maxExp;
  }

  @computed
  get atk() {
    let ret;
    const { weapon } = this.player.equipments;
    if (!weapon.empty) {
      ret = weapon.atk;
    } else {
      ret = this.player.roleData.atk || 0;
    }
    ret = this.runAttrHooks(ret, 'atk');
    ret *= this.runAttrHooks(1, 'atkAdd');
    ret *= this.runAttrHooks(1, 'atkMulAttr');
    ret = this.runAttrHooks(ret, 'atkMul');
    return ret;
  }

  @computed
  get critRate() {
    let ret = 0.05;
    ret = this.runAttrHooks(ret, 'critRate');
    return ret;
  }

  @computed
  get critBonus() {
    let ret = 1.5;
    ret = this.runAttrHooks(ret, 'critBonus');
    return ret;
  }

  @computed
  get leech() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'leech');
    return ret;
  }

  @computed
  get def() {
    let ret = 0;
    const { plastron, gaiter } = this.player.equipments;
    // 来自装备的属性
    if (!plastron.empty) {
      ret += plastron.def;
    }
    if (!gaiter.empty) {
      ret += gaiter.def;
    }
    // 来自力量的属性
    ret += this.str;
    ret = this.runAttrHooks(ret, 'def');
    ret *= this.runAttrHooks(1, 'defAdd');
    ret = this.runAttrHooks(ret, 'defMul');
    return ret;
  }

  @override
  get noDodgeRate() {
    let ret = 300 / (300 + this.dex);
    ret = this.runAttrHooks(ret, 'noDodgeRate');
    return ret;
  }

  @computed
  get allResist() {
    let ret = this.int;
    ret = this.runAttrHooks(ret, 'allResist');
    return ret;
  }

  @computed
  get meleeAbsorb() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'meleeAbsorb');
    return ret;
  }

  @computed
  get fireAbsorb() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'fireAbsorb');
    return ret;
  }

  @computed
  get fireResist() {
    let ret = this.allResist;
    ret = this.runAttrHooks(ret, 'fireResist');
    return ret;
  }

  @computed
  get darkAbsorb() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'darkAbsorb');
    return ret;
  }

  @computed
  get darkResist() {
    let ret = this.allResist;
    ret = this.runAttrHooks(ret, 'darkResist');
    return ret;
  }

  @computed
  get coldAbsorb() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'coldAbsorb');
    return ret;
  }

  @computed
  get coldResist() {
    let ret = this.allResist;
    ret = this.runAttrHooks(ret, 'coldResist');
    return ret;
  }

  @computed
  get lightningAbsorb() {
    let ret = 0;
    ret = this.runAttrHooks(ret, 'lightningAbsorb');
    return ret;
  }

  @computed
  get lightningResist() {
    let ret = this.allResist;
    ret = this.runAttrHooks(ret, 'lightningResist');
    return ret;
  }

  @computed
  get atkSpeed() {
    let ret;
    const weapon = this.player.equipments.weapon;
    if (!weapon.empty) {
      ret = weapon.atkSpeed || 0.01;
    } else {
      ret = this.player.roleData.atkSpeed || 0.01;
    }
    ret = this.runAttrHooks(ret, 'atkSpeed');
    ret *= this.runAttrHooks(1, 'atkSpeedAdd');

    return ret;
  }

  @override
  damage(type, from, v) {
    if (!super.damage(type, from, v)) {
      return;
    }
    if (type !== 'melee') {
      const tmp = this.runAttrHooks(0, 'rpFromNonPhy');
      this.rp += tmp;
    }
  }

  @computed
  get skillExpInc() {
    let value = 1;
    value = this.runAttrHooks(value, 'skillExpInc');
    value = this.runAttrHooks(value, 'skillExpMul');
    return value;
  }

  @override
  addSkill(type) {
    const state = new SkillState(this.timeline, this, type);
    state.getLevel = () => this.player.getSkillLevel(type);
    state.addSkillExp = () => this.player.addSkillExp(type, this.skillExpInc);
    this.skills.unshift(state);
  }

  @computed
  get canGetExp() {
    // 活着才能收经验
    return this.camp === Camps.player;
  }

  @computed
  get level() {
    return this.player.level;
  }

  @computed
  get mf() {
    let ret = 1 + this.player.peakLevel * 0.03;
    ret = this.runAttrHooks(ret, 'mf');
    return ret;
  }

  @computed
  get gf() {
    let ret = 1 + this.player.peakLevel * 0.03;
    ret = this.runAttrHooks(ret, 'gf');
    return ret;
  }

  // 法师系职业的伤害加成
  @computed
  get dmgAdd() {
    let ret = 1;
    ret = this.runAttrHooks(ret, 'dmgAdd');
    ret = this.runAttrHooks(ret, 'dmgMul');
    return ret;
  }

  @computed
  get expInc() {
    let value = 1;
    value *= this.runAttrHooks(1, 'expInc');
    value *= this.runAttrHooks(1, 'expMul');
    return value;
  }

  @action
  gotExp(v, level) {
    let value = v;
    // 计算击杀回复
    const { mpFromKill, hpFromKill } = this;
    this.hp += hpFromKill;
    this.mp += mpFromKill;

    // 根据等级差计算经验值衰减
    const dis = Math.min(this.level, 70) - level;
    if (dis >= 10) {
      return;
    } else if (dis > 0) {
      value *= 1 - dis / 10;
    }
    value *= this.runAttrHooks(1, 'expInc');
    value *= this.runAttrHooks(1, 'expMul');
    message.sendGotExp(this, value);

    if (this.player.level >= this.player.maxLevel) {
      this.player.peakExp += value;
      if (this.player.peakExp >= this.player.maxPeakExp) {
        this.levelUpPeak();
      }
    } else {
      this.player.exp += value;
      if (this.player.exp >= this.player.maxExp) {
        this.levelUp();
        if (this.player.level >= this.player.maxLevel) {
          // 经验累加到巅峰等级上
          this.player.peakExp += this.player.exp;
          this.player.exp = 0;
        }
      }
    }
  }

  @action
  levelUp() {
    this.player.exp -= this.player.maxExp;
    this.player.level += 1;
  }

  @action
  levelUpPeak() {
    this.player.peakExp -= this.player.maxPeakExp;
    this.player.peakLevel += 1;
  }

  @action
  reborn = () => {
    this.rebornTimer = null;
    this.camp = Camps.player;
    this.hp = this.maxHp / 5;
    this.mp = this.maxMp / 5;
    this.startRecovery();

    for (const unit of world.units) {
      if (unit.target === null && unit.willAttack(this)) {
        unit.setTarget(this);
      }
    }
    this.findTarget();
  };

  @override
  kill() {
    super.kill();
    world.enemyBorn && world.enemyBorn.onPlayerDeath();
    const rebornIn = 10 + this.player.level * 0.5;
    message.sendPlayerDeath(this, rebornIn);

    this.rebornTimer = this.timeline.parent.setTimeout(
      action(this.reborn),
      rebornIn * 1000
    );
  }

  canEquip(slot) {
    const { goodData, level } = slot;
    if (!goodData || goodData.type !== 'equip') {
      return false;
    }
    // 装备需求（等级、属性）检查。
    if (this.level < transformEquipLevel(level)) {
      return false;
    }

    // 职业检查
    if (!this.player.careerData.availableClasses[goodData.class]) {
      return false;
    }
    return true;
  }

  dispose() {
    super.dispose();
    if (this.rebornTimer) {
      this.timeline.parent.clearTimeout(this.rebornTimer);
    }

    this.player.dispose();
    this.player.key = null;
  }

  dumpState() {
    const ret = super.dumpState();
    ret.type = 'player';
    if (this.rebornTimer) {
      ret.rebornTimer = this.rebornTimer.at - this.timeline.parent.getTime();
    }
    return ret;
  }

  useExtraSkill(key) {
    const skillData = skills[key];
    skillData.effect.call(
      new SkillState(this.timeline, this, key, {}),
      world,
      this,
      this.player.getSkillLevel(key)
    );
  }
}

export class EnemyUnit extends Unit {
  constructor(timeline, type, quality, savedState) {
    super(timeline, savedState);
    makeObservable(this);

    this.type = type;
    this.quality = quality;

    const skills = savedState && savedState.skills;

    if (this.enemyData.skills) {
      this.enemyData.skills.forEach(({ key, level }) => {
        this.addSkill(key, level, skills && skills[key]);
      });
    }

    for (let i = 0; i < quality; i++) {
      const { affixes } = this.enemyData;
      const keys = Object.keys(affixes);
      const sum = keys.reduce((a, key) => a + affixes[key], 0);
      let dice = Math.random() * sum;
      this.affixes.push(
        keys.find((key) => {
          dice -= affixes[key];
          if (dice <= 0) {
            return true;
          }
          return false;
        })
      );
    }

    this.hookRecords = [];
    if (this.enemyData.hooks) {
      for (const key in this.enemyData.hooks) {
        this.hookRecords.push(
          this.addAttrHook(key, this.enemyData.hooks[key].bind(this, world))
        );
      }
    }

    // test affixes.
    for (const affix of this.affixes) {
      const { hooks } = enemyAffixes[affix];
      for (const key in hooks) {
        this.addAttrHook(key, hooks[key].bind(this, world));
      }
    }

    if (savedState) {
      this.camp = savedState.camp;

      if (savedState.cleanTimer) {
        this.timeline.parent.setTimeout(this.clean, savedState.cleanTimer);
      } else if (this.camp === 'ghost') {
        this.timeline.parent.setTimeout(this.clean, 3000);
      }
      if (typeof savedState.borner === 'number') {
        this.borner = world.enemyBorn.borns[savedState.borner];
      } else if (typeof savedState.phaseBorn === 'number') {
        this.borner = world.enemyBorn.phaseBorn[savedState.phaseBorn];
      }

      if (this.borner) {
        this.borner.count++;
        this.borner.testTimer();
      }
      if (savedState.buffs) {
        for (const buff of savedState.buffs) {
          // 这里不检查buff叠加情况
          if (buff) {
            if (buffs[buff.type]) {
              buff.buff = this.addBuff(
                buff.type,
                buff.time,
                buff.arg,
                buff.group,
                99999
              );
            }
          }
        }
      }

      this.hp = savedState.hp;
      this.mp = savedState.mp;
      this.rp = savedState.rp;
      this.ep = savedState.ep;

      if (typeof savedState.reading === 'number') {
        this.reading = this.buffs[savedState.reading];
      } else if (typeof savedState.casting === 'number') {
        const skill = this.skills[savedState.casting];
        if (skill) {
          const castTime = savedState.castingTimer;
          this.castingTimer = this.timeline.setTimeout(() => {
            skill.canUse && skill.effect();

            this.castingTimer = null;
            this.casting = null;
          }, castTime);
          this.casting = skill;
        }
      }
    } else {
      this.camp = this.enemyData.camp;

      if (this.enemyData.buffs) {
        for (const buff of this.enemyData.buffs) {
          this.addBuff(buff.type, buff.time, buff.arg);
        }
      }

      this.hp = this.maxHp;
      this.mp = this.maxMp;
      this.ep = this.maxEp;
    }

    this.setAttackCoolDown();

    this.startRecovery();
  }

  transformType(type) {
    // 变形成另一种生物。
    this.type = type;
    for (const skill of this.skills.splice(0)) {
      skill.dispose();
    }
    for (const hook of this.hookRecords.splice(0)) {
      hook();
    }
    for (const buff of this.buffs.slice(0)) {
      if (!buff.buffData.notRemoveWhenTransform) {
        this.removeBuff(buff);
      }
    }
    this.enemyData.skills.forEach(({ key, level }) => {
      this.addSkill(key, level);
    });
    if (this.enemyData.hooks) {
      for (const key in this.enemyData.hooks) {
        this.hookRecords.push(
          this.addAttrHook(key, this.enemyData.hooks[key].bind(this, world))
        );
      }
    }
    if (this.enemyData.buffs) {
      for (const buff of this.enemyData.buffs) {
        this.addBuff(buff.type, buff.time, buff.arg);
      }
    }
    this.camp = this.enemyData.camp;
    this.findTarget();
    world.units.forEach((v) => {
      if (v.target === null && v.willAttack(this)) {
        v.setTarget(this);
      }
    });
    this.setAttackCoolDown();
  }

  @observable type = null;

  @observable quality = 0;

  @observable affixes = [];

  @observable summoner = null;

  @observable summonSkill = null;

  borner = null; // 刷怪器，用于判断刷怪上限

  @computed
  get enemyData() {
    return enemies[this.type] || {};
  }

  @computed
  get name() {
    return this.enemyData.name || '';
  }

  @computed
  get displayName() {
    const temp = this.affixes.map((v) => enemyAffixes[v].name);
    temp.push(this.name);
    return this.runAttrHooks(temp.join(''), 'displayName');
  }

  @computed
  get maxHp() {
    let ret = this.enemyData.maxHp;
    ret = this.runAttrHooks(ret, 'maxHp');
    // 品质提升100%生命值
    ret *= 2 ** this.quality;
    ret = this.runAttrHooks(ret, 'maxHpMul');
    return ret;
  }

  @computed
  get maxMp() {
    let ret = this.enemyData.maxMp || 0;
    return ret;
  }

  @computed
  get mpRecovery() {
    let ret = this.enemyData.mpRecovery || 0;
    return ret;
  }

  @computed
  get maxRp() {
    let ret = this.enemyData.maxRp || 0;
    return ret;
  }

  @computed
  get rpRecovery() {
    let ret = this.enemyData.rpRecovery || -1;
    return ret;
  }

  @computed
  get maxEp() {
    let ret = this.enemyData.maxEp || 0;
    return ret;
  }

  @computed
  get epRecovery() {
    let ret = this.enemyData.epRecovery || -1;
    return ret;
  }

  @computed
  get rpOnAttack() {
    let ret = this.enemyData.rpOnAttack || 0;
    return ret;
  }

  @computed
  get rpOnAttacked() {
    let ret = this.enemyData.rpOnAttacked || 0;
    return ret;
  }

  @computed
  get atkSpeed() {
    let ret = this.enemyData.atkSpeed || 0;
    ret = this.runAttrHooks(ret, 'atkSpeed');
    ret = this.runAttrHooks(ret, 'atkSpeedMul');
    return ret;
  }

  @computed
  get hpRecovery() {
    let ret = this.enemyData.hpRecovery || 0;
    ret = this.runAttrHooks(ret, 'hpRecovery');
    return ret;
  }

  @computed
  get atk() {
    let ret = this.enemyData.atk || 0;
    ret = this.runAttrHooks(ret, 'atk');
    ret *= this.runAttrHooks(1, 'atkAdd');
    ret *= this.runAttrHooks(1, 'atkMulAttr');
    ret = this.runAttrHooks(ret, 'atkMul');
    return ret;
  }

  @computed
  get critRate() {
    let ret = this.enemyData.critRate || 0;
    ret = this.runAttrHooks(ret, 'critRate');
    return ret;
  }

  @computed
  get critBonus() {
    let ret = this.enemyData.critBonus || 1.5;
    ret = this.runAttrHooks(ret, 'critBonus');
    return ret;
  }

  @computed
  get leech() {
    let ret = this.enemyData.leech || 0;
    ret = this.runAttrHooks(ret, 'leech');
    return ret;
  }

  @computed
  get def() {
    let ret = this.enemyData.def || 0;
    ret = this.runAttrHooks(ret, 'def');
    ret = this.runAttrHooks(ret, 'defMul');
    ret *= this.runAttrHooks(1, 'defAdd');
    return ret;
  }

  @computed
  get fireAbsorb() {
    let ret = this.enemyData.fireAbsorb || 0;
    ret = this.runAttrHooks(ret, 'fireAbsorb');
    return ret;
  }

  @computed
  get fireResist() {
    let ret = this.enemyData.fireResist || 0;
    ret += this.enemyData.allResist || 0;
    ret = this.runAttrHooks(ret, 'fireResist');
    return ret;
  }

  @computed
  get darkAbsorb() {
    let ret = this.enemyData.darkAbsorb || 0;
    ret = this.runAttrHooks(ret, 'darkAbsorb');
    return ret;
  }

  @computed
  get darkResist() {
    let ret = this.enemyData.darkResist || 0;
    ret += this.enemyData.allResist || 0;
    ret = this.runAttrHooks(ret, 'darkResist');
    return ret;
  }

  @computed
  get coldAbsorb() {
    let ret = this.enemyData.coldAbsorb || 0;
    ret = this.runAttrHooks(ret, 'coldAbsorb');
    return ret;
  }

  @computed
  get coldResist() {
    let ret = this.enemyData.coldResist || 0;
    ret += this.enemyData.allResist || 0;
    ret = this.runAttrHooks(ret, 'coldResist');
    return ret;
  }

  @computed
  get lightningAbsorb() {
    let ret = this.enemyData.lightningAbsorb || 0;
    ret = this.runAttrHooks(ret, 'lightningAbsorb');
    return ret;
  }

  @computed
  get lightningResist() {
    let ret = this.enemyData.lightningResist || 0;
    ret += this.enemyData.allResist || 0;
    ret = this.runAttrHooks(ret, 'lightningResist');
    return ret;
  }

  @computed
  get exp() {
    let ret = (this.enemyData.exp || 0) * 2 ** this.quality;
    return ret;
  }

  @computed
  get level() {
    // 每个词缀视作提升了4怪物等级
    let ret = (this.enemyData.level || 0) + this.quality * 4;
    return ret;
  }

  // 法师系职业的伤害加成
  @computed
  get dmgAdd() {
    let ret = this.enemyData.dmgAdd || 1;
    ret = this.runAttrHooks(ret, 'dmgAdd');
    ret = this.runAttrHooks(ret, 'dmgMul');
    return ret;
  }

  @override
  get speedRate() {
    let ret = this.enemyData.speedRate || 1;
    ret = this.runAttrHooks(ret, 'speedRate');
    ret = this.runAttrHooks(ret, 'speedRateMul');
    return ret;
  }

  @override
  get stunResist() {
    const realLevel = transformEquipLevel(this.level);
    return this.runAttrHooks(
      this.enemyData.stunResist || realLevel * 10,
      'stunResist'
    );
  }

  @override
  addSkill(type, level, saved) {
    const state = new SkillState(this.timeline, this, type, saved);
    state.getLevel = () => level;
    this.skills.unshift(state);
  }

  @override
  kill(shouldWait = true) {
    if (this.runAttrHooks(true, 'willClean', this, world)) {
      this.setCleanTimer(shouldWait ? 3000 : 0);
    }

    super.kill();

    if (this.summoner) {
      this.summoner.runAttrHooks(this, 'onSummonDeath');
    }

    message.sendDeath(this);
    if (this.exp) {
      world.gotExp(this.exp, transformEquipLevel(this.level));
    }
  }

  @action
  clean = () => {
    if (this.enemyData.loots) {
      const rest = world.loots(this.enemyData.loots, this.level, this.quality);
      // TODO: 包裹已满丢弃物品
    }
    if (world.player) {
      game.onEnemyKilled(this.type, 1, world.player.role);
    }
    world.removeUnit(this);
  };

  setCleanTimer(time = 3000) {
    if (!this.cleanTimer) {
      this.cleanTimer = this.timeline.parent.setTimeout(this.clean, time);
    }
  }

  @override
  setTarget(target) {
    super.setTarget(target);
    if (this.enemyData.camp === Camps.neutral) {
      this.camp = target ? Camps.enemy : Camps.neutral;
    }
  }

  dispose() {
    super.dispose();
    if (this.cleanTimer) {
      this.timeline.clearTimeout(this.cleanTimer);
      this.cleanTimer = null;
    }

    if (this.borner) {
      this.borner.onEnemyKilled();
    }
  }

  dumpState() {
    const ret = super.dumpState();
    ret.type = this.type;
    ret.quality = this.quality;
    ret.affixes = this.affixes;
    if (this.cleanTimer) {
      ret.cleanTimer = this.cleanTimer.at - this.timeline.parent.getTime();
    }
    if (this.borner) {
      const { borns, phaseBorn } = world.enemyBorn;
      if (borns && borns.indexOf(this.borner) >= 0) {
        ret.borner = borns.indexOf(this.borner);
      } else if (phaseBorn && phaseBorn.indexOf(this.borner) >= 0) {
        ret.phaseBorn = phaseBorn.indexOf(this.borner);
      }
    }
    if (this.summoner) {
      const summoner = world.units.indexOf(this.summoner);
      if (summoner > -1) {
        ret.summoner = summoner;
        if (this.summonSkill) {
          const skill = this.summoner.skills.indexOf(this.summonSkill);
          if (skill > -1) {
            ret.summonSkill = skill;
          }
        }
      }
    }
    return ret;
  }
}
