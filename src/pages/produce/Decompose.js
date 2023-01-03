/**
 * Created by tdzl2003 on 2/3/17.
 */
import React from 'react';
import { View, ScrollView, Switch, Text } from '../../components';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { InventorySlotComp, qualityNames } from '../inventory/Inventory';
import world from '../../logics/world';
import { InventorySlot } from '../../logics/player';
import { getDecomposeMatrials } from '../../logics/goods';
import styles from './Decompose.less';
import { alert } from '../../common/message';

const noNotice = observable(false);

function decompose(v, force = false, callback) {
  const { player } = world;
  if (!force && v.quality >= 3 && !noNotice.get()) {
    // 史诗以上物品提示是否分解
    alert('提示', `该商品为${qualityNames[v.quality]}物品，是否确定分解？`, [
      {
        text: '确认',
        onPress: () => decompose(v, true, callback),
      },
      { text: '取消' },
    ]);
    return;
  }

  const materials = getDecomposeMatrials(v);
  if (!materials) {
    callback();
    return;
  }
  for (const key of Object.keys(materials)) {
    const slot = player.buildInventory.find((v) => v.key === key);
    if (slot) {
      slot.count += materials[key];
    } else {
      player.buildInventory.push(
        new InventorySlot('build').fromJS({
          key,
          count: materials[key],
        })
      );
    }
  }
  v.clear();
  if (callback) {
    callback();
  }
}

export function decomposeFromBuild(inventory, force = false) {
  const { player } = world;
  const slot = inventory[0];
  decompose(slot, force, () => {
    if (slot.empty) {
      inventory.remove(slot);
    }
  });
}

const Decompose = observer(function Decompose() {
  const { player } = world;
  const renderRow = (v, i) => (
    <InventorySlotComp onPress={() => decompose(v)} key={i} slot={v} />
  );

  return (
    <View className={styles.container}>
      <View className={styles.row}>
        <Text className={styles.container}>不提示分解高品质物品</Text>
        <Switch
          onValueChange={(value) => noNotice.set(value)}
          value={noNotice.get()}
        />
      </View>
      <ScrollView
        className={styles.container}
        contentContainerClassName={styles.content}
      >
        {player.inventory
          .filter((v) => v.isEquip && v.quality > 0 && !v.locked)
          .map(renderRow)}
      </ScrollView>
    </View>
  );
});

export default Decompose;
