/**
 * Created by tdzl2003 on 1/19/17.
 */

import {
  observable,
  toJS,
  ObservableMap,
  computed,
  action,
  autorun,
  makeObservable,
} from 'mobx';
import { PlayerMeta, InventorySlot, getEndlessLevel } from './player';
import world from './world';
import StatusError from './StatusError';
import { stories, medicines } from '../../data';
import { Record } from 'immutable';
import { jws, b64utos } from 'jsrsasign';
import { preSave } from '../common/utils';

const SECRET = 'chapter5.woodElf';

const functions = {
  diamonds(value) {
    this.diamonds += +value * this.purchaseRate;
  },
  diamondsConst(value) {
    this.diamonds += +value;
  },
  direct(value) {
    world.player.level = Math.max(world.player.level, +value);
  },
  gold(value) {
    world.player.gold += +value;
  },
  medicine(value) {
    while (this.totalMedicineLevel < +value) {
      this.gotMedicineExp(this.maxMedicineExp);
    }
  },
  redbag(value) {
    if (world.player.inventory.filter((v) => v.empty).length < 1) {
      throw new Error('');
    }
    world.loots(
      [
        {
          key: 'year2018.redbag',
          count: [value, value],
          rate: 1,
        },
      ],
      300,
      0,
      false
    );
  },
};

const productNames = {
  diamonds(value) {
    if (this.purchaseRate > 1) {
      return `${(value * this.purchaseRate) | 0}神力`;
    }
    return `${value}神力`;
  },
  diamondsConst(value) {
    return `${value}神力`;
  },
  direct(value) {
    return `直升${+value}级`;
  },
  gold(value) {
    return `${value}金币`;
  },
  medicine(value) {
    return `药剂直升${+value}级`;
  },
  redbag(value) {
    return `红包${+value}个`;
  },
};

const SecretRecord = Record({
  diamonds: 0,
  playerSlotCount: 1,
  purchaseRate: 1,
  bowelLevel: 0,
});

class Game {
  constructor() {
    makeObservable(this);
    if (!__TEST__) {
      autorun(
        () => {
          this.save();
        },
        {
          delay: 1000,
        }
      );
    }
  }

  loaded = false;

  @observable secretRecord = new SecretRecord();

  @computed
  get diamonds() {
    return this.secretRecord.diamonds;
  }

  set diamonds(value) {
    this.secretRecord = this.secretRecord.set('diamonds', value);
  }

  @computed
  get playerSlotCount() {
    return this.secretRecord.playerSlotCount;
  }

  set playerSlotCount(value) {
    this.secretRecord = this.secretRecord.set('playerSlotCount', value);
  }

  @computed
  get purchaseRate() {
    return this.secretRecord.purchaseRate;
  }

  set purchaseRate(value) {
    this.secretRecord = this.secretRecord.set('purchaseRate', value);
  }

  @computed
  get bowelLevel() {
    return this.secretRecord.bowelLevel;
  }

  set bowelLevel(value) {
    this.secretRecord = this.secretRecord.set('bowelLevel', value);
  }

  @observable currentPlayer = null;

  @observable playerMetas = observable.map();

  @observable storiesMap = observable.map();

  @observable enemyTaskMap = observable.map();

  @observable bank = []; // 银行

  @observable iapMap = observable.map();

  @observable ticketMap = observable.map();

  @observable medicineLevel = observable.map();

  @observable medicineExp = 0;

  @observable lastVersion = null;

  @observable highestEndlessLevel = 0;

  banned = false;

  @computed
  get purchaseSlotPrice() {
    // eslint-disable-next-line no-bitwise
    return (
      400 + 500 * this.playerSlotCount ** 2 + 100 * this.playerSlotCount ** 3
    );
  }

  @computed
  get endlessTicketRate() {
    const l = this.highestEndlessLevel + 1;
    return Math.pow(0.5 / l, 1 / l);
  }

  @computed
  get totalMedicineLevel() {
    let ret = 0;
    for (const key of Object.keys(medicines)) {
      ret += this.medicineLevel.get(key) || 0;
    }
    return ret;
  }

  @computed
  get maxMedicineExp() {
    const level = this.totalMedicineLevel;
    return (
      200 * level * level * level + 400 * level * level + 800 * level + 1600
    );
  }

  @computed
  get resetMedicineCost() {
    const level = this.totalMedicineLevel - 1;
    return (
      10 * level * level * level + 100 * level * level + 1000 * level + 2000
    );
  }

  @computed
  get resetMedicineDiamondsCost() {
    const level = this.totalMedicineLevel - 1;
    return 2 * level + 20;
  }

  @computed
  get bowelEffect() {
    return Math.pow(1.5, this.bowelLevel);
  }

  @computed
  get bowelUpgradePrice() {
    return 1000 * Math.pow(2, this.bowelLevel);
  }

  @action
  purchaseSlot() {
    this.diamonds -= this.purchaseSlotPrice;
    this.playerSlotCount += 1;
  }

  @action
  gotMedicineExp(value) {
    const ret = [];
    this.medicineExp += value;
    while (this.medicineExp >= this.maxMedicineExp) {
      this.medicineExp -= this.maxMedicineExp;
      const chooses = Object.keys(medicines);
      const key = chooses[(Math.random() * chooses.length) | 0] || chooses[0];
      this.medicineLevel.set(key, (this.medicineLevel.get(key) || 0) + 1);
      ret.push(key);
    }
    return ret;
  }

  async load() {
    try {
      const loaded = localStorage.getItem('game');
      if (loaded) {
        if (loaded[0] === '{') {
          this.fromJS(JSON.parse(loaded));
        } else if (loaded[0] === 'e') {
          if (
            jws.JWS.verifyJWT(loaded, SECRET, {
              alg: ['HS256'],
            })
          ) {
            this.fromJS(
              jws.JWS.readSafeJSONString(b64utos(loaded.split('.')[1]))
            );
          }
        } else if (loaded[0] === 's') {
          this.fromJS(world.start(loaded));
        }
      }
      console.log('Game info loaded.');
      this.loaded = true;
    } catch (err) {
      if (__DEV__) {
        console.error(err.stack);
      }
    }
  }

  @action
  fromJS(v) {
    if (v.secretRecord) {
      this.secretRecord = this.secretRecord.merge(v.secretRecord);
    } else {
      this.diamonds = v.diamonds || 0;
      this.playerSlotCount = v.playerSlotCount || 1;
      this.purchaseRate = v.purchaseRate || 1;
    }

    if (v.bowelLevel) {
      this.bowelLevel = v.bowelLevel;
    }
    if (v.highestEndlessLevel) {
      this.highestEndlessLevel = v.highestEndlessLevel;
    }

    this.currentPlayer = v.currentPlayer || null;
    this.playerMetas.clear();
    for (const key of Object.keys(v.playerMetas || {})) {
      this.playerMetas.set(key, new PlayerMeta(key).fromJS(v.playerMetas[key]));
    }
    this.storiesMap.clear();
    for (const key of Object.keys(v.storiesMap || {})) {
      this.storiesMap.set(key, v.storiesMap[key]);
    }
    this.enemyTaskMap.clear();
    for (const key of Object.keys(v.enemyTaskMap || {})) {
      this.enemyTaskMap.set(key, observable.map(v.enemyTaskMap[key]));
    }
    this.iapMap.clear();
    for (const key of Object.keys(v.iapMap || {})) {
      this.iapMap.set(key, v.iapMap[key]);
    }
    this.ticketMap.clear();
    for (const key of Object.keys(v.ticketMap || {})) {
      this.ticketMap.set(key, v.ticketMap[key]);
    }
    this.bank.clear();
    for (let i = 0; v.bank && i < v.bank.length; i++) {
      this.bank.push(new InventorySlot('bank').fromJS(v.bank[i] || {}));
      const { key, dungeonKey } = this.bank[i];
      if (key === 'ticket' && dungeonKey) {
        const lvl = getEndlessLevel(dungeonKey);
        if (lvl && lvl > this.highestEndlessLevel) {
          this.highestEndlessLevel = lvl;
        }
      }
    }
    this.medicineLevel.clear();
    for (const key of Object.keys(medicines)) {
      this.medicineLevel.set(
        key,
        (v.medicineLevel && v.medicineLevel[key]) || 0
      );
    }
    this.medicineExp = v.medicineExp || 0;
    this.lastVersion = v.lastVersion || null;
    this.banned = v.banned;

    if (this.playerSlotCount < Object.keys(v.playerMetas).length) {
      this.playerSlotCount = Object.keys(v.playerMetas).length;
    }

    return this;
  }

  save() {
    if (!this.loaded) {
      return;
    }

    if (__DEV__) {
      localStorage.setItem('game', JSON.stringify(preSave(this.toJS())));
    } else {
      localStorage.setItem(
        'game',
        jws.JWS.sign(
          null,
          {
            alg: 'HS256',
            typ: 'JWT',
          },
          preSave(this.toJS()),
          SECRET
        )
      );
    }
    if (__DEV__) {
      console.log('Game info saved.');
    }
  }

  toJS() {
    const ret = toJS(this, false);
    ret.secretRecord = this.secretRecord.toJS();
    return ret;
  }

  checkCanCreate() {
    if (this.playerSlotCount <= this.playerMetas.size) {
      StatusError.forbidden();
    }
  }

  removePlayer(key) {
    this.playerMetas.delete(key);
    this.save();
    localStorage.removeItem(`player-${key}`);
  }

  addKillTask(story, enemy, amount) {
    let m;
    if (this.enemyTaskMap.has(enemy)) {
      m = this.enemyTaskMap.get(enemy);
    } else {
      m = observable.map();
      this.enemyTaskMap.set(enemy, m);
    }
    m.set(story, amount);
  }

  @action
  onEnemyKilled(type, amount = 1, role = null) {
    const m = this.enemyTaskMap.get(type);
    if (!m) {
      return;
    }
    for (const key of m.keys()) {
      const story = stories[key];
      if (
        !story.requirement ||
        !story.requirement.role ||
        story.requirement.role === role
      ) {
        const rest = m.get(key);
        m.set(key, rest - amount);
      }
    }
  }

  async refreshIap(slient = false) {
    // removed
  }

  runProduct(productId, withRate = false) {
    const product = productId.split('.');

    let f = functions;
    while (f && typeof f === 'object') {
      const field = product.shift();
      f = f[field];
    }
    product.push(withRate);

    if (typeof f === 'function') {
      try {
        f.apply(this, product);
      } catch (e) {
        console.warn(e.stack);
        return false;
      }
      return true;
    }
  }

  getProductName(productId) {
    const product = productId.split('.');

    let f = productNames;
    while (f && typeof f === 'object') {
      const field = product.shift();
      f = f[field];
    }

    if (typeof f === 'function') {
      return f.apply(this, product);
    }
    return '商品';
  }
}

const game = new Game();
export default game;
