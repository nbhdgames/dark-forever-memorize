/**
 * Created by tdzl2003 on 2/1/17.
 */
import { action, observable, autorun, computed, makeObservable } from 'mobx';
import { maps } from '../../data';
import world from './world';
import { transformEquipLevel } from './player';
import { toast } from '../common/toast';

function randomType(types) {
  const keys = Object.keys(types);
  const total = keys.reduce((a, s) => types[s] + a, 0);
  let dice = Math.random() * total;

  for (let i = 0; i < keys.length; i++) {
    if (dice < types[keys[i]]) {
      return keys[i];
    }
    dice -= types[keys[i]];
  }
  return keys[0];
}

class Born {
  constructor(timeline, config, savedState) {
    makeObservable(this);
    this.timeline = timeline;
    this.config = config;

    if (savedState) {
      this.over = savedState.over;
      this.total = savedState.total;
      this.setTimer(savedState.timer);
    } else {
      this.setTimer(true);
    }
  }

  testTimer() {
    // 看看count是否已经达到，是否要取消timer.
    if (this.config.max && this.count >= this.config.max && this.timer) {
      this.timeline.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  setTimer(startup = false) {
    if (
      (this.config.max && this.count >= this.config.max) ||
      (this.config.total && this.total >= this.config.total)
    ) {
      return;
    }
    if (typeof startup === 'number') {
      this.timer = this.timeline.setTimeout(this.onTimer, startup);
      return;
    }
    if (!this.timer && !this.disposed) {
      const delay = startup
        ? this.config.warmup || 0
        : this.config.delay && this.config.delay + Math.random() * 1000 - 500;
      if (!startup && !delay) {
        return;
      }
      this.timer = this.timeline.setTimeout(this.onTimer, delay);
    }
  }

  dispose() {
    this.disposed = true;
    if (this.timer) {
      this.timeline.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  onTimer = () => {
    this.timer = null;
    if (
      (this.config.max && this.count >= this.config.max) ||
      (this.config.total && this.total >= this.config.total)
    ) {
      return;
    }

    let quality = 0;
    if (this.config.quality) {
      const sum = this.config.quality.reduce((a, b) => a + b, 0);
      let dice = Math.random() * sum;
      quality = this.config.quality.findIndex((v) => {
        if (dice < v) {
          return true;
        }
        dice -= v;
        return false;
      });
    }
    const { type, types } = this.config;
    world.addEnemy(type || randomType(types), this, quality);
    this.count += 1;
    this.total += 1;
    this.setTimer();
  };

  onEnemyKilled() {
    this.count -= 1;
    if (this.total >= this.config.total && this.count <= 0) {
      // 所有敌人已经击毙
      this.over = true;
    } else {
      this.setTimer();
    }
  }

  dumpState() {
    return {
      over: this.over,
      total: this.total,
      timer: this.timer && this.timer.at - this.timeline.getTime(),
    };
  }

  @observable
  over = false;

  count = 0;
  total = 0;

  config = null;
  timeline = null;
  timer = null;
  disposed = false;
}

export default class EnemyBorn {
  constructor(timeline, map, savedState) {
    this.timeline = timeline;
    this.map = map;
    const { monsters } = this.mapData;
    this.borns =
      monsters &&
      monsters.map((config, i) => {
        return (
          config &&
          new Born(
            timeline,
            config,
            savedState && savedState.borns && savedState.borns[i]
          )
        );
      });
  }

  dispose() {
    if (this.borns) {
      this.borns.forEach((v) => v.dispose());
      this.borns = null;
    }
  }

  timeline;
  borns = null;

  @observable
  map = null;

  @computed
  get mapData() {
    return maps[this.map];
  }

  dumpState() {
    return {
      borns: this.borns && this.borns.map((v) => v && v.dumpState()),
    };
  }

  onPlayerDeath() {}
}

export class DungeonState extends EnemyBorn {
  constructor(timeline, map, savedState) {
    super(timeline, map, savedState);

    makeObservable(this);
    this.switchToPhase(
      savedState ? savedState.currentPhase : 0,
      savedState && savedState.phaseBorn
    );

    this.autoDispose = autorun(() => {
      const { phaseBorn, disposed } = this;
      if (
        !disposed &&
        phaseBorn &&
        phaseBorn.every((v) => !v || !v.config.total || v.over)
      ) {
        this.switchToPhase(this.currentPhase + 1);
      }
    });
  }

  @observable
  phaseBorn = null;

  @observable
  currentPhase = 0;

  @computed
  get phaseData() {
    return this.mapData.phases[this.currentPhase];
  }

  @action
  switchToPhase(phase, phaseBorn) {
    this.currentPhase = phase;
    if (this.phaseBorn) {
      this.phaseBorn.forEach((v) => v.dispose());
      this.phaseBorn = null;
    }

    const { phaseData } = this;
    if (!phaseData) {
      // I'm over!

      const { player } = world;
      const ticketType = world._endlessLevel
        ? 'nightmare.' + world._endlessLevel
        : this.mapData.group || this.map;

      const ticketCount = player.countTicket(ticketType);

      if (ticketCount > 0) {
        toast(`战胜了${this.mapData.name}中的敌人，获得了大量奖励。`);
        const { exp = 0, level, loots } = this.mapData;
        world.gotExp(exp, transformEquipLevel(level));
        world.loots(loots, level, 0);
        world.lootEndless();

        // player.dungeonTickets.set(this.mapData.group || this.map, ticketCount - 1);
        player.costTicket(ticketType);
      } else {
        toast(
          `战胜了${this.mapData.name}中的敌人。\n您的钥石不足，因此不能获得奖励。`
        );
      }
      this.currentPhase = null;
      if (world.pendingMaps.length > 0) {
        const [map, lvl] = world.pendingMaps.shift();
        world._map = map;
        world._endlessLevel = lvl;
        world.onMapChanged();
      } else {
        world.map = this.mapData.outside || 'home';
      }
      return;
    }
    this.phaseBorn =
      phaseData.monsters &&
      phaseData.monsters.map(
        (config, i) =>
          new Born(this.timeline, config, phaseBorn && phaseBorn[i])
      );
  }

  dispose() {
    this.disposed = true;
    if (this.autoDispose) {
      this.autoDispose();
    }
    if (this.borns) {
      this.borns.forEach((v) => v.dispose());
    }
    if (this.phaseBorn) {
      this.phaseBorn.forEach((v) => v.dispose());
    }
  }

  dumpState() {
    const ret = super.dumpState();
    ret.phaseBorn =
      this.phaseBorn && this.phaseBorn.map((v) => v && v.dumpState());
    ret.currentPhase = this.currentPhase;
    return ret;
  }

  onPlayerDeath() {
    // Failed!
    toast(`在${this.mapData.name}的冒险以失败告终。`);
    this.currentPhase = null;
    world.map = world.pendingMaps.shift() || this.mapData.outside;
  }
}
