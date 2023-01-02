/**
 * Created by tdzl2003 on 2/3/17.
 */
import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from '../../components';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { InventorySlotComp, Button } from '../inventory/Inventory';
import world from '../../logics/world';
import { costItems, hasEnough, predefinedName } from './Produce';
import { goods } from '../../../data';
import {
  getMaterialLevel,
  materialKey,
  randomAffixValue,
} from '../../logics/goods';
import styles from './Enchants.less';

@observer
export default class Enchants extends Component {
  selectedItem = observable(null);

  @observable
  locks = [];

  @observable
  newAffixes = [];

  renderEquip(pos) {
    return this.renderRow(world.player.equipments[pos], pos);
  }

  selectItem(v) {
    this.selectedItem.set(v);
    if (v) {
      this.locks.replace(v.affixes.map((v) => false));
    } else {
      this.locks.splice(0);
    }
    this.newAffixes.splice(0);
  }

  renderRow = (v, i) => (
    <InventorySlotComp
      onPress={() => this.selectItem(v)}
      key={i}
      slot={v}
      selectedItem={this.selectedItem}
    />
  );

  doEnchants = () => {
    const slot = this.selectedItem.get();
    const { key, level } = slot;
    costItems(this.getCosts());
    const blacklist = {};
    slot.enchantTimes++;
    slot.affixes.forEach((v) => (blacklist[v.key] = true));

    // const validAffixes = Object.keys(affixes).filter(key => (affixes[key].minLevel || 0) <= level).filter(affix => isValidAffix(key, affix, level));

    this.newAffixes.replace(
      slot.affixes.map((v, i) => {
        if (this.locks[i]) {
          return v;
        }
        // if (Math.random() < 0.5) {
        return randomAffixValue(v, level);
        // }
        // return randomAffixes(validAffixes, level, blacklist);
      })
    );
  };

  saveEnchants = () => {
    if (!this.newAffixes.length) {
      return;
    }
    const slot = this.selectedItem.get();
    slot.affixes.replace(this.newAffixes);
    this.newAffixes.splice(0);
  };

  discardEnchants = () => {
    this.newAffixes.splice(0);
  };

  getCosts() {
    const slot = this.selectedItem.get();
    const { level, quality, enchantTimes } = slot;
    const ret = {};

    const lockCount = this.locks.reduce((b, a) => (a ? b + 1 : b), 0);

    ret.gold = Math.ceil(
      (0.1 * level * level + 2 * level) *
        2 ** quality *
        (1 + enchantTimes * 0.2 + enchantTimes * enchantTimes * 0.01)
    );

    if (level >= 5) {
      ret[materialKey[1][getMaterialLevel(level)]] =
        2 ** (quality - 1 - lockCount);
      if (quality - lockCount >= 2) {
        ret[materialKey[2][getMaterialLevel(level)]] =
          2 ** (quality - 2 - lockCount);
      }
    }

    if (lockCount) {
      ret.diamonds =
        1 + Math.ceil((level / 50) * (lockCount + lockCount * lockCount * 0.2));
    }

    return ret;
  }

  renderCost() {
    const slot = this.selectedItem.get();
    if (!slot || slot.quality === 0) {
      return null;
    }
    const costs = this.getCosts();
    const enough = hasEnough(costs);

    if (this.newAffixes.length) {
      // 比较中
      return (
        <View>
          <Text>请选择你要保留的属性</Text>
        </View>
      );
    }
    return (
      <View style={styles.row}>
        <ScrollView style={styles.container} horizontal>
          {Object.keys(costs).map((k, i) => (
            <Text style={styles.costItem} key={i}>
              <Text style={styles.materialName} numberOfLines={1}>
                {predefinedName[k] || goods[k].name}
              </Text>
              <Text style={styles.materialAmount} numberOfLines={1}>
                x{costs[k]}
              </Text>
            </Text>
          ))}
        </ScrollView>
        <Button onPress={this.doEnchants} disabled={!enough}>
          {slot.count > 1 && '全部'}附魔
        </Button>
        <View style={{ width: 5 }} />
      </View>
    );
  }

  renderDetail() {
    const slot = this.selectedItem.get();
    if (!slot || slot.quality === 0) {
      return <View style={styles.detailContainer} />;
    }
    return (
      <View style={styles.detailContainer}>
        <TouchableOpacity
          style={[styles.detail, styles.detail2]}
          onPress={this.discardEnchants}
        >
          {slot.affixes.map((v, i) => (
            <Text
              style={[styles.affix, v.isLegend && styles.legend]}
              key={i}
              numberOfLines={1}
            >
              {v.display}({v.rangeDisplay(slot.level)})
            </Text>
          ))}
        </TouchableOpacity>
        <View style={styles.locks}>
          {this.locks.map((v, i) => (
            <Text
              style={styles.lock}
              key={i}
              onPress={() => {
                if (
                  !this.locks[i] &&
                  this.locks.every((v, i1) => v || i1 === i)
                ) {
                  return;
                }
                this.locks[i] = !this.locks[i];
              }}
            >
              {v ? '×' : '=>'}
            </Text>
          ))}
        </View>
        <TouchableOpacity style={styles.detail} onPress={this.saveEnchants}>
          {this.newAffixes.map((v, i) => (
            <Text
              style={[styles.affix, v.isLegend && styles.legend]}
              key={i}
              numberOfLines={1}
            >
              {v.display}
            </Text>
          ))}
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { player } = world;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>{player.name}的装备</Text>
          <ScrollView contentContainerStyle={styles.rowCenter} horizontal>
            {this.renderEquip('weapon')}
            {this.renderEquip('plastron')}
            {this.renderEquip('gaiter')}
            {this.renderEquip('ornament')}
          </ScrollView>
        </View>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
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
