/**
 * Created by tdzl2003 on 2/1/17.
 */

import React from 'react';
import camelCase from 'camelcase';
import message from './message';
import { maps, goods, buffs } from '../../data';
import world from './world';

// 这里保存最近的10000条消息。
// 在界面上则只显示筛选后的最新1000条。

const DAMAGE_TYPES = {
  melee: '物理',
  magic: '魔法',
  fire: '火焰',
  cold: '寒冷',
  real: '真实',
};

const predefinedGoodName = {
  diamonds: '神力',
  gold: '金币',
};

class MessageDisplay {
  constructor() {
    message.addListener('message', this.onMessage);
  }

  keyGenerator = 0;

  onMessage = (msg) => {
    const renderer = this[camelCase('render-' + msg.type)];
    if (!renderer) {
      console.warn(`No renderer for message ${msg.type}`);
      return;
    }
    renderer.call(this, msg);
  };

  renderBattleDodge({ from, to, skill }) {
    console.log(
      `${from.displayName}的${skill.name}被${to.displayName}躲闪了。`
    );
  }

  renderBattleDamage({ damageType, from, to, skill, value, isCrit, absorbed }) {
    console.log(
      `${isCrit ? '暴击！' : ''}${from.displayName}的${skill.name}对${
        to.displayName
      }造成了${Math.round(value)}点${DAMAGE_TYPES[damageType]}伤害。${
        absorbed ? `(${absorbed | 0}点已吸收)` : ''
      }`
    );
  }

  renderBattleHeal({ from, to, skill, value }) {
    console.log(
      `${from.displayName}的${skill.name}为${to.displayName}回复了${Math.round(
        value
      )}点生命。`
    );
  }

  renderBattleSkill({ from, targets, skill }) {
    if (!targets) {
      console.log(`${from.displayName}释放了${skill.name}。`);
    } else {
      console.log(
        `${from.displayName}对${targets
          .map((v) => v.displayName)
          .join(',')}释放了${skill.name}。`
      );
    }
  }

  renderPlayerDeath({ who, rebornIn }) {
    console.log(
      `${who.displayName}陷入了昏迷，将在${Math.round(rebornIn)}秒后恢复。`
    );
  }

  renderBattleDeath({ who }) {
    console.log(`${who.displayName}死亡了。`);
  }

  renderMapEnter({ map }) {
    console.log(`来到了${maps[map].name}。`);
  }

  renderEnemyAppear({ enemy, summoner }) {
    if (summoner) {
      console.log(`${summoner.displayName}召唤了一只${enemy.displayName}。`);
    } else {
      console.log(`遭遇了一只${enemy.displayName}。`);
    }
  }

  renderPlayerGotExp({ who, value }) {
    console.log(`${who.displayName}获得了${Math.round(value)}点经验`);
  }

  renderPlayerLoot({ who, what }) {
    const { count, key } = what;
    const qualityId = goods[key] && goods[key].quality;
    if (count && count > 1) {
      console.log(
        `${who.name}拾取了${count}个${
          predefinedGoodName[key] || goods[key].name
        }。`
      );
    } else {
      console.log(
        `${who.name}拾取了${predefinedGoodName[key] || goods[key].name}。`
      );
    }
  }

  renderBattleBuff({ who, what }) {
    if (buffs[what].hidden) {
      return null;
    }
    console.log(`${who.displayName}受到了${buffs[what].name}效果的影响。`);
  }

  renderBattleBuffOff({ who, what }) {
    if (buffs[what].hidden) {
      return null;
    }
    console.log(`${who.displayName}的${buffs[what].name}效果消失了。`);
  }

  renderBattleBreakCasting({ who, what }) {
    console.log(`${who.displayName}的${what.name}被打断了。`);
  }
}

export default new MessageDisplay();
