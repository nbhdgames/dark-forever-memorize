/**
 * Created by tdzl2003 on 2/3/17.
 */

import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from '../../components';
import { ScrollableTabView } from '../../components/tabview';
import { observable } from 'mobx';
import { expr } from 'mobx-utils';
import { observer } from 'mobx-react';
import world from '../../logics/world';
import game from '../../logics/game';
import { InventorySlotComp, GoodDetail } from '../inventory/Inventory';
import Decompose, { decomposeFromBuild } from './Decompose';
import Enchants from './Enchants';
import Rebuild from './Rebuild';
import Medicine from './Medicine';
import styles from './Produce.less';

export function hasEnough({ diamonds, gold, ...materials }) {
  const { player } = world;
  if (diamonds && game.diamonds < diamonds) {
    return false;
  }
  if (gold && player.gold < gold) {
    return false;
  }
  for (const key of Object.keys(materials)) {
    if (player.countGood(key) < materials[key]) {
      return false;
    }
  }
  return true;
}

export function costItems({ diamonds, gold, ...materials }) {
  const { player } = world;
  if (diamonds) {
    game.diamonds -= diamonds;
  }
  if (gold) {
    player.gold -= gold;
  }
  for (const key of Object.keys(materials)) {
    player.costGood(key, materials[key]);
  }
}

export const predefinedName = {
  diamonds: '神力',
  gold: '金币',
};

export const BuildInventory = observer(function BuildInventory({
  style,
  inventory,
  selected,
}) {
  const { player } = world;
  const length = inventory.length;
  const isEquip = expr(() => length > 0 && inventory[0].isEquip);
  const haveSelect = expr(() => selected && selected.get() !== null);

  return (
    <View className={style}>
      {haveSelect && <GoodDetail selected={selected} />}
      <View className={styles.row}>
        <ScrollView horizontal className={styles.inventory}>
          {inventory.map((slot, i) => (
            <InventorySlotComp
              slot={slot}
              key={i}
              onPress={() => selected.set(slot)}
            />
          ))}
        </ScrollView>
        {isEquip && (
          <TouchableOpacity
            className={styles.inventoryButton}
            onPress={() => decomposeFromBuild(inventory)}
          >
            <Text>分解</Text>
          </TouchableOpacity>
        )}
        {length > 0 && (
          <TouchableOpacity
            className={styles.inventoryButton}
            onPress={() => {
              player.getInventory(inventory);
              selected.set(null);
            }}
          >
            <Text>领取</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

@observer
export default class Produces extends Component {
  static title = '生产';

  selectedItem = observable(null);

  render() {
    const { player } = world;

    return (
      <View className={styles.container}>
        <ScrollableTabView className={styles.container}>
          <Enchants tabLabel="附魔" />
          <Rebuild tabLabel="重铸" />
          <Medicine tabLabel="炼金" />
          <Decompose tabLabel="分解" />
        </ScrollableTabView>
        <BuildInventory
          selected={this.selectedItem}
          inventory={player.buildInventory}
        />
      </View>
    );
  }
}
