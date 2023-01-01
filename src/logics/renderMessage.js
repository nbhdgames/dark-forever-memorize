/**
 * Created by tdzl2003 on 2/1/17.
 */

import React from 'react';
import { observable, action } from 'mobx';
import camelCase from 'camelcase';
import message from './message';
import { qualityStyles } from '../pages/inventory/Inventory';
import { maps, goods, buffs } from '../../data';
import { toast } from '../common/toast';
import styles from './renderMessage.less';
import { Text } from '../components';

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

export const dungeonNames = {
  'nightmare.1': '噩梦钥石I',
  'nightmare.2': '噩梦钥石II',
  'nightmare.3': '噩梦钥石III',
};

class MessageDisplay {
  constructor() {
    message.addListener('message', this.onMessage);
  }

  keyGenerator = 0;

  @observable rendered = [];

  @action
  dispose() {
    this.rendered.clear();
  }

  @action
  onMessage = (msg) => {
    const renderer = this[camelCase('render', msg.type)];
    if (!renderer) {
      console.warn(`No renderer for message ${msg.type}`);
      return;
    }
    const jsx = renderer.call(this, msg);
    if (!jsx) {
      return;
    }
    const key = (this.keyGenerator += 1);
    if (this.keyGenerator > 100000) {
      this.keyGenerator = 0;
    }
    this.rendered.push({
      type: msg.type,
      jsx: React.cloneElement(jsx, {
        key,
      }),
    });
    if (this.rendered.length > 1000) {
      this.rendered.shift();
    }
  };

  renderGeneral({ message }) {
    return <Text>{message}</Text>;
  }

  renderBattleDodge({ from, to, skill }) {
    if (!skill) {
      return (
        <Text>
          {from.displayName}造成的伤害被{to.displayName}躲闪了。
        </Text>
      );
    }
    return (
      <Text>
        {from.displayName}的{skill.name}被{to.displayName}躲闪了。
      </Text>
    );
  }

  renderBattleDamage({ damageType, from, to, skill, value, isCrit, absorbed }) {
    if (!from) {
      return (
        <Text>
          {!!isCrit && (
            <Text className={styles.crit}>
              暴击{isCrit > 1 && `x${isCrit}`}！
            </Text>
          )}
          {to.displayName}受到了<Text>{Math.round(value)}</Text>点
          {DAMAGE_TYPES[damageType]}伤害。
          {absorbed ? `(${absorbed | 0}点已吸收)` : ''}
        </Text>
      );
    }
    return (
      <Text>
        {!!isCrit && (
          <Text className={styles.crit}>
            暴击{isCrit > 1 && `x${isCrit}`}！
          </Text>
        )}
        {from.displayName}的{skill.name}对{to.displayName}造成了
        <Text
          className={
            from.camp === 'player' ? styles.campPlayer : styles.campOther
          }
        >
          {Math.round(value)}
        </Text>
        点{DAMAGE_TYPES[damageType]}伤害。
        {absorbed ? `(${absorbed | 0}点已吸收)` : ''}
      </Text>
    );
  }

  renderBattleHeal({ from, to, skill, value }) {
    return (
      <Text>
        {from.displayName}的{skill.name}为{to.displayName}回复了
        <Text className={styles.recovery}>{Math.round(value)}</Text>点生命。
      </Text>
    );
  }

  renderBattleSkill({ from, targets, skill }) {
    if (!targets) {
      return (
        <Text>
          {from.displayName}释放了{skill.name}。
        </Text>
      );
    }
    return (
      <Text>
        {from.displayName}对{targets.map((v) => v.displayName).join(',')}释放了
        {skill.name}。
      </Text>
    );
  }

  renderPlayerDeath({ who, rebornIn }) {
    return (
      <Text>
        {who.displayName}陷入了昏迷，将在
        <Text className={styles.rebornIn}>{Math.round(rebornIn)}</Text>
        秒后恢复。
      </Text>
    );
  }

  renderBattleDeath({ who }) {
    return <Text>{who.displayName}死亡了。</Text>;
  }

  renderMapEnter({ map }) {
    return <Text>来到了{maps[map].name}。</Text>;
  }

  renderEnemyAppear({ enemy, summoner }) {
    if (summoner) {
      return (
        <Text>
          {summoner.displayName}召唤了一只{enemy.displayName}。
        </Text>
      );
    }
    return <Text>遭遇了一只{enemy.displayName}。</Text>;
  }

  renderPlayerGotExp({ who, value }) {
    return (
      <Text>
        {who.displayName}获得了{Math.round(value)}点经验。
      </Text>
    );
  }

  renderPlayerLoot({ who, what, showToast }) {
    const { count, key, dungeonKey } = what;
    const qualityId = goods[key] && goods[key].quality;
    let name = predefinedGoodName[key];
    let nameStr = name;
    if (key === 'ticket') {
      name = (
        <Text className={qualityStyles[5]}>
          钥石：{dungeonNames[dungeonKey] || maps[dungeonKey].name}
        </Text>
      );
      nameStr = `钥石：${dungeonNames[dungeonKey] || maps[dungeonKey].name}`;
    } else if (!name) {
      name = (
        <Text className={qualityStyles[qualityId]}>{goods[key].name}</Text>
      );
      nameStr = goods[key].name;
    }

    if (count && count > 1) {
      if (showToast) {
        toast(`获得了${count}个${nameStr}。`);
      }
      return (
        <Text>
          {who.name}拾取了{count}个{name}。
        </Text>
      );
    }
    if (showToast) {
      toast(`获得了${nameStr}。`);
    }
    return (
      <Text>
        {who.name}拾取了{name}。
      </Text>
    );
  }

  renderBattleBuff({ who, what }) {
    if (buffs[what].hidden) {
      return null;
    }
    return (
      <Text>
        {who.displayName}受到了{buffs[what].name}效果的影响。
      </Text>
    );
  }

  renderBattleBuffOff({ who, what }) {
    if (buffs[what].hidden) {
      return null;
    }
    return (
      <Text>
        {who.displayName}的{buffs[what].name}效果消失了。
      </Text>
    );
  }

  renderBattleBreakCasting({ who, what }) {
    return (
      <Text>
        {who.displayName}的{what.name}被打断了。
      </Text>
    );
  }
}

export default new MessageDisplay();
