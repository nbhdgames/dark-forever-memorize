/**
 * Created by tdzl2003 on 2/3/17.
 */
import React, { Component } from 'react';
import { View, ScrollView, Text } from '../../components';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { InventorySlotComp, Button } from '../inventory/Inventory';
import world from '../../logics/world';
import { medicines } from '../../../data';
import game from '../../logics/game';
import styles from './Medicine.less';
import { alert, prompt } from '../../common/message';

@observer
export default class Medicine extends Component {
  renderMedicine = (key) => {
    const data = medicines[key];
    const level = game.medicineLevel.get(key) || 0;
    const restLevel = game.totalMedicineLevel - level;

    return (
      <View className={styles.medicine} key={key}>
        <View className={styles.flex}>
          <View className={styles.medicineMain}>
            <Text className={styles.medicineName}>{data.name}</Text>
            <Text className={styles.textMargin}>等级：{level}</Text>
          </View>
          <Text>{data.description(level)}</Text>
          <Text>下一级：{data.description(level + 1)}</Text>
        </View>
        <Button
          onPress={() => this.upgradeMedicine(key)}
          disabled={restLevel <= 0}
        >
          升级
        </Button>
        <Button
          onPress={() => this.downgradeMedicine(key)}
          disabled={level <= 0}
        >
          降级
        </Button>
      </View>
    );
  };

  @action
  doUpgradeMedicine(key, costDiamond = false) {
    const cost = game.resetMedicineCost;
    const diamondsCost = game.resetMedicineDiamondsCost;

    const { player } = world;
    if (costDiamond) {
      if (game.diamonds < diamondsCost) {
        alert(
          '提示',
          '您的神力点数不足，是否召唤创世神的力量，大量获得神力？',
          [
            {
              text: '确认',
              onPress: () => {
                this.context.navigator.push({
                  location: '/purchase',
                });
              },
            },
            { text: '取消' },
          ]
        );
        return;
      }
    } else {
      if (player.gold < cost) {
        alert('提示', '您的金币不足');
        return;
      }
    }
    const chooses = Object.keys(medicines).filter(
      (k) => k !== key && game.medicineLevel.get(k) > 0
    );
    const outKey = chooses[(Math.random() * chooses.length) | 0] || chooses[0];

    if (!outKey) {
      alert('提示', '没有可选的药剂');
      return;
    }

    if (costDiamond) {
      game.diamonds -= diamondsCost;
    } else {
      player.gold -= cost;
    }
    game.medicineLevel.set(key, game.medicineLevel.get(key) + 1);
    game.medicineLevel.set(outKey, game.medicineLevel.get(outKey) - 1);
  }

  @action
  doDowngradeMedicine(key, costDiamond = false) {
    const cost = Math.floor(game.resetMedicineCost / 10);
    const diamondsCost = Math.floor(game.resetMedicineDiamondsCost / 10);

    const { player } = world;
    if (costDiamond) {
      if (game.diamonds < diamondsCost) {
        alert(
          '提示',
          '您的神力点数不足，是否召唤创世神的力量，大量获得神力？',
          [
            {
              text: '确认',
              onPress: () => {
                this.context.navigator.push({
                  location: '/purchase',
                });
              },
            },
            { text: '取消' },
          ]
        );
        return;
      }
    } else {
      if (player.gold < cost) {
        alert('提示', '您的金币不足');
        return;
      }
    }
    const chooses = Object.keys(medicines).filter((k) => k !== key);
    const outKey = chooses[(Math.random() * chooses.length) | 0] || chooses[0];

    if (!outKey) {
      alert('提示', '没有可选的药剂');
      return;
    }

    if (costDiamond) {
      game.diamonds -= diamondsCost;
    } else {
      player.gold -= cost;
    }
    game.medicineLevel.set(key, game.medicineLevel.get(key) - 1);
    game.medicineLevel.set(outKey, game.medicineLevel.get(outKey) + 1);
  }

  upgradeMedicine(key) {
    const cost = game.resetMedicineCost;
    const diamondsCost = game.resetMedicineDiamondsCost;

    alert('提示', `使用${cost}金币升级该药剂，并降级一个随机药剂？`, [
      {
        text: '确认',
        onPress: () => {
          this.doUpgradeMedicine(key);
        },
      },
      {
        text: `使用${diamondsCost}神力替代`,
        onPress: () => {
          this.doUpgradeMedicine(key, true);
        },
      },
      { text: '取消' },
    ]);
  }

  downgradeMedicine(key) {
    const cost = Math.floor(game.resetMedicineCost / 10);
    const diamondsCost = Math.ceil(game.resetMedicineDiamondsCost / 10);

    alert('提示', `使用${cost}金币降级该药剂，并升级一个随机药剂？`, [
      {
        text: '确认',
        onPress: () => {
          this.doDowngradeMedicine(key);
        },
      },
      {
        text: `使用${diamondsCost}神力替代`,
        onPress: () => {
          this.doDowngradeMedicine(key, true);
        },
      },
      { text: '取消' },
    ]);
  }

  doUpgradeBowel = () => {
    const costDiamond = game.bowelUpgradePrice;
    if (game.diamonds < costDiamond) {
      alert('提示', '您的神力点数不足，是否召唤创世神的力量，大量获得神力？', [
        {
          text: '确认',
          onPress: () => {
            this.context.navigator.push({
              location: '/purchase',
            });
          },
        },
        { text: '取消' },
      ]);
      return;
    }
    game.diamonds -= costDiamond;
    game.bowelLevel++;
  };

  upgradeBowel = () => {
    const costDiamond = game.bowelUpgradePrice;
    const effect = game.bowelEffect * 50;

    alert(
      '提示',
      `使用${costDiamond}神力锻炼熔炉，永久提升${effect.toFixed()}%效果，是否继续？`,
      [{ text: '确认', onPress: () => this.doUpgradeBowel() }, { text: '取消' }]
    );
    return;
  };

  doThrow(slot, count) {
    const energyPerItem = slot.goodData.energy * game.bowelEffect;
    if (slot.count === count) {
      slot.clear();
    } else {
      slot.count -= count;
    }
    const items = game.gotMedicineExp(energyPerItem * count);
    for (const item of items) {
      alert('提示', `您的${medicines[item].name}等级提升了！`);
    }
  }

  async throw(slot) {
    const energyPerItem = slot.goodData.energy * game.bowelEffect;

    const v = await prompt(
      '请输入要投入熔炉的数量',
      `每个[${slot.name}]提升${energyPerItem.toFixed()}点熔炉能量`,
      `${slot.count}`
    );
    if (!v) {
      return;
    }
    const { count } = slot;
    const tmp = v | 0;
    if (tmp <= 0) {
      alert('别逗我啦。');
      return false;
    }
    if (count === tmp) {
      this.doThrow(slot, tmp);
    } else if (count > tmp) {
      this.doThrow(slot, tmp);
    } else if (count < tmp) {
      alert('别逗我啦。');
      return false;
    }
  }

  render() {
    const { player } = world;

    const energyItems = player.inventory.filter((v) => v.isEnergyMaterial);

    return (
      <View className={styles.flex}>
        <View className={styles.info}>
          <View className={styles.flex}>
            <Text>
              坩埚等级：{game.bowelLevel}级 效果：
              {(game.bowelEffect * 100).toFixed()}%
            </Text>
            <Text>药剂等级：{game.totalMedicineLevel}级</Text>
            <Text>
              当前能量：{game.medicineExp.toFixed()}/{game.maxMedicineExp}
            </Text>
          </View>
          <Button onPress={this.upgradeBowel}>升级</Button>
        </View>
        <ScrollView className={styles.flex}>
          {Object.keys(medicines).map(this.renderMedicine)}
        </ScrollView>
        <View className={styles.itemGroup}>
          {energyItems.map((slot, i) => (
            <InventorySlotComp
              slot={slot}
              key={i}
              onPress={() => this.throw(slot)}
            />
          ))}
          {energyItems.length === 0 && (
            <Text className={styles.noItemHint}>
              您的包裹里现在没有任何可以投入的材料
            </Text>
          )}
        </View>
      </View>
    );
  }
}
