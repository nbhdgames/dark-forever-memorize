/**
 * Created by tdzl2003 on 2/3/17.
 */
import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from '../../components';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { InventorySlotComp, qualityStyles } from '../inventory/Inventory';
import world from '../../logics/world';
import { costItems, hasEnough, predefinedName } from './Produce';
import { goods, affixes } from '../../../data';
import { isValidAffix, randomAffixes } from '../../logics/goods';
import game from '../../logics/game';
import styles from './Rebuild.less';

@observer
export default class Rebuild extends Component {
  selectedItem = observable(null);

  lastUsedAt = 0;

  renderEquip(pos) {
    return this.renderRow(world.player.equipments[pos], pos);
  }

  @action
  selectItem(v) {
    this.selectedItem.set(v);
  }

  renderRow = (v, i) => (
    <InventorySlotComp
      onPress={() => this.selectItem(v)}
      key={i}
      slot={v}
      selectedItem={this.selectedItem}
    />
  );

  getCosts() {
    const slot = this.selectedItem.get();
    if (!slot) {
      return {};
    }

    const { level, quality } = slot;
    const ret = {};

    ret.diamonds = 1 + Math.ceil((level / 25) * (1 << quality));

    return ret;
  }

  renderCost() {
    const slot = this.selectedItem.get();
    if (!slot || slot.quality === 0) {
      return null;
    }
    const costs = this.getCosts();

    return (
      <View>
        <View className={styles.row}>
          {Object.keys(costs).map((k, i) => (
            <Text className={styles.costItem} key={i}>
              <Text className={styles.materialName} numberOfLines={1}>
                消耗{predefinedName[k] || goods[k].name}
              </Text>
              <Text className={styles.materialAmount} numberOfLines={1}>
                {costs[k]}/{game.diamonds}
              </Text>
            </Text>
          ))}
          <View className={styles.container} />
          <Text>点击属性重铸</Text>
        </View>
      </View>
    );
  }

  @action
  rebuild(i) {
    const now = Date.now();
    if (now - this.lastUsedAt < 1000) {
      return;
    }
    this.lastUsedAt = now;

    const slot = this.selectedItem.get();
    const { key, level } = slot;
    costItems(this.getCosts());
    const blacklist = {};

    const validAffixes = Object.keys(affixes)
      .filter((key) => (affixes[key].minLevel || 0) <= level)
      .filter((affix) => isValidAffix(key, affix, level));

    slot.affixes.forEach((v) => (blacklist[v.key] = true));
    slot.affixes[i] = randomAffixes(validAffixes, level, blacklist);
    slot.affixes[i].rebuilded = true;
  }

  renderAffix(affix, i, haveRebuilded) {
    if (!affix) {
      return <View className={[styles.detailAffix, styles.detailAffixEmpty]} />;
    }

    const disabled = (haveRebuilded && !affix.rebuilded) || affix.isLegend;
    return (
      <TouchableOpacity
        className={[styles.detailAffix, disabled && styles.detailAffixDisabled]}
        onPress={() => this.rebuild(i)}
        disabled={disabled || !hasEnough(this.getCosts())}
      >
        <Text
          className={[styles.affix, affix.isLegend && styles.legendAffix]}
          key={i}
          numberOfLines={1}
        >
          {affix.display} {affix.rebuilded ? '[重铸]' : ''}
        </Text>
      </TouchableOpacity>
    );
  }

  renderDetail() {
    const slot = this.selectedItem.get();
    if (!slot || slot.quality === 0) {
      return <View className={styles.detailContainer} />;
    }
    const haveRebuilded = slot.affixes.some((v) => v.rebuilded);

    return (
      <View className={styles.detailContainer}>
        <View className={[styles.detail, qualityStyles[slot.quality]]}>
          <View className={styles.detailRow}>
            {this.renderAffix(
              slot.affixes.length > 0 && slot.affixes[0],
              0,
              haveRebuilded
            )}
            {this.renderAffix(
              slot.affixes.length > 1 && slot.affixes[1],
              1,
              haveRebuilded
            )}
          </View>
          <View className={styles.detailRow}>
            {this.renderAffix(
              slot.affixes.length > 2 && slot.affixes[2],
              2,
              haveRebuilded
            )}
            {this.renderAffix(
              slot.affixes.length > 3 && slot.affixes[3],
              3,
              haveRebuilded
            )}
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { player } = world;

    return (
      <View className={styles.container}>
        <View className={styles.row}>
          <Text>{player.name}的装备</Text>
          <ScrollView contentContainerClassName={styles.rowCenter} horizontal>
            {this.renderEquip('weapon')}
            {this.renderEquip('plastron')}
            {this.renderEquip('gaiter')}
            {this.renderEquip('ornament')}
          </ScrollView>
        </View>
        <ScrollView
          className={styles.container}
          contentContainerClassName={styles.content}
        >
          {player.inventory
            .filter((v) => v.isEquip && v.quality > 0)
            .map(this.renderRow)}
        </ScrollView>
        {this.renderCost()}
        {this.renderDetail()}
      </View>
    );
  }
}
