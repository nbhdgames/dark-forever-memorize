/**
 * Created by tdzl2003 on 2/1/17.
 */

import { EventEmitter } from 'fbemitter';
import world from './world';

class Message extends EventEmitter {
  send(message) {
    if (world.paused) {
      return;
    }
    this.emit('message', message);
  }

  sendGeneral(message) {
    this.send({
      type: 'general',
      message,
    });
  }

  sendSystem(subType, options) {
    this.send({
      type: 'other.system',
      subType,
      options,
    });
  }

  sendDodge(from, to, skill) {
    this.send({
      type: 'battle.dodge',
      from,
      to,
      skill,
    });
  }

  sendDamage(damageType, from, to, skill, value, isCrit, absorbed) {
    if (!skill) {
      return;
    }
    this.send({
      type: 'battle.damage',
      damageType,
      from,
      to,
      skill,
      value,
      isCrit,
      absorbed,
    });
  }

  sendHeal(from, to, skill, value) {
    this.send({
      type: 'battle.heal',
      from,
      to,
      skill,
      value,
    });
  }

  sendPlayerDeath(who, rebornIn) {
    this.send({
      type: 'player.death',
      who,
      rebornIn,
    });
  }

  sendDeath(who, rebornIn) {
    this.send({
      type: 'battle.death',
      who,
      rebornIn,
    });
  }

  sendEnterMap(map) {
    this.send({
      type: 'map.enter',
      map,
    });
  }

  sendEnemyAppear(enemy, summoner) {
    this.send({
      type: 'enemy.appear',
      enemy,
      summoner,
    });
  }

  sendGotExp(who, value) {
    this.send({
      type: 'player.gotExp',
      who,
      value,
    });
  }

  sendLoot(who, what, showToast) {
    this.send({
      type: 'player.loot',
      who,
      what,
      showToast,
    });
  }

  sendSkillUsage(from, targets, skill) {
    this.send({
      type: 'battle.skill',
      from,
      targets,
      skill,
    });
  }

  sendBuff(who, what) {
    this.send({
      type: 'battle.buff',
      who,
      what,
    });
  }

  sendBuffOff(who, what) {
    this.send({
      type: 'battle.buffOff',
      who,
      what,
    });
  }

  sendBreakCasting(who, what) {
    this.send({
      type: 'battle.breakCasting',
      who,
      what,
    });
  }
}

export default new Message();
