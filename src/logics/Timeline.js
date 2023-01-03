/**
 * Created by tdzl2003 on 2/1/17.
 */

import { makeObservable, observable } from 'mobx';
import { now } from 'mobx-utils';
import PrivQueue from './PrivQueue';

const globalTimeline = {
  setTimeout: (v, t) => window.setTimeout(v, t),
  clearTimeout: (v) => window.clearTimeout(v),
  getTime: () => Date.now(),
  tryUpdate: () => {},

  get now() {
    return now('frame');
  },
};

let id = 0;
// 无累加误差、可集体倍率加速的setTimeout/clearTimeout实现
export default class TimeLine {
  @observable
  rate = 1;

  @observable
  paused = false;

  constructor(parent = globalTimeline) {
    makeObservable(this);
    this.tree = new PrivQueue((a, b) => a.at < b.at);

    this.parent = parent;
    this.parentCurrent = parent.getTime();

    this.isUpdating = false;
    this.timer = null;
    this.current = 0;

    this.onTimer = () => {
      this.timer = null;
      this.update();
      this.resetTimer();
    };
  }

  get now() {
    if (this.paused) {
      return this.current;
    }
    return (this.parent.now - this.parentCurrent) * this.rate + this.current;
  }

  dispose() {
    this.clearTimer();
  }

  getTime() {
    return this.current;
  }

  tryUpdate() {
    if (this.isUpdating || this.paused) {
      return;
    }
    this.parent.tryUpdate();
    this.update();
  }

  setTimeout(func, delay) {
    if (isNaN(delay)) {
      throw new Error('Invalid delay.');
    }
    this.tryUpdate();
    const timer = {
      id: ++id,
      at: this.current + delay,
      func,
    };
    if (this.tree.add(timer) === 0) {
      if (!this.isUpdating && !this.paused) {
        this.clearTimer();
        this.resetTimer();
      }
    }
    return timer;
  }

  clearTimeout(timer) {
    timer.removed = true;
  }

  pause() {
    if (this.paused) {
      return;
    }
    if (!this.isUpdating) {
      this.clearTimer();
      this.tryUpdate();
    }
    this.paused = true;
  }

  resume() {
    if (!this.paused) {
      return;
    }
    this.paused = false;
    this.parentCurrent = this.parent.getTime();
    if (!this.isUpdating) {
      this.tryUpdate();
      this.resetTimer();
    }
  }

  setRate(rate) {
    if (this.rate === rate) {
      return;
    }
    if (!this.isUpdating) {
      this.clearTimer();
      this.update();
    }
    this.rate = rate;
    if (!this.isUpdating) {
      this.resetTimer();
    }
  }

  clearTimer() {
    if (this.timer) {
      this.parent.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  resetTimer() {
    if (this.paused) {
      return;
    }
    const min = this.tree.minimum();
    if (!min) {
      return;
    }
    this.timer = this.parent.setTimeout(
      this.onTimer,
      (min.at - this.current) / this.rate + 0.01
    );
  }

  update() {
    this.isUpdating = true;
    const parentEnd = this.parent.getTime();
    const end = this.current + (parentEnd - this.parentCurrent) * this.rate;

    for (;;) {
      const min = this.tree.minimum();
      if (!min || min.at > end) {
        break;
      }
      this.current = min.at;
      this.tree.removeMin();
      if (!min.removed) {
        min.removed = true;
        min.func();
      }
    }

    this.current = end;
    this.parentCurrent = parentEnd;
    this.isUpdating = false;
  }

  lastEnd = Date.now();

  stepPaused(rest) {
    if (__DEV__ && !this.paused) {
      throw new Error('Must pause game first');
    }
    this.isUpdating = true;

    const start = this.lastEnd;
    const end = this.current + rest;

    let c = 0;

    for (;;) {
      const min = this.tree.minimum();
      if (!min || min.at > end) {
        this.current = end;
        this.parentCurrent = this.parent.getTime();
        this.savedCurrent = end;
        this.isUpdating = false;
        return 0;
      }
      this.current = min.at;
      this.tree.removeMin();
      if (!min.removed) {
        min.removed = true;
        min.func();
      }

      c += 1;
      if (c % 100 === 0) {
        if (Date.now() - start >= 48) {
          // wait for next frame.
          this.lastEnd = Date.now();
          break;
        }
      }
    }

    this.isUpdating = false;
    return end - this.current;
  }
}
