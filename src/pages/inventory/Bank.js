/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, { Component } from 'react';
import { View, ScrollView } from '../../components';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import game from '../../logics/game';
import world from '../../logics/world';
import { InventorySlot } from '../../logics/player';
import { upgrades } from '../../../data';
import {
  upgradeInventory,
  GoodDetail,
  UpgradeIcon,
  InventorySlotComp,
  BigBtn,
} from './Inventory';
import { alert } from '../../common/message';
import { router } from '../../common/history';
import styles from './Bank.less';
import NavBar from '../NavBar';

const purchaseBankByDiamond = action(function purchaseInventoryByDiamond() {
  const cost = upgrades.bankByDiamonds[game.bank.length];
  if (game.diamonds < cost) {
    alert('提示', '您的神力点数不足，是否召唤创世神的力量，大量获得神力？', [
      {
        text: '确认',
        onPress: () => {
          router.navigate('/purchase');
        },
      },
      { text: '取消' },
    ]);
    return;
  }
  game.diamonds -= cost;
  game.bank.push(new InventorySlot('bank'));
});

export function upgradeBank() {
  const cost = upgrades.bankByDiamonds[game.bank.length];

  // 只能用神力升级
  alert(
    '提示',
    `是否使用神的力量扩张物品空间，继续扩张包裹消耗${cost}神力，是否继续？`,
    [{ text: '确认', onPress: () => purchaseBankByDiamond() }, { text: '取消' }]
  );
}

@observer
export default class Bank extends Component {
  selectedItem = observable(null);

  renderRow = (v, i) => (
    <InventorySlotComp
      onPress={() => this.selectedItem.set(v)}
      key={i}
      slot={v}
    />
  );

  renderEquip(pos) {
    return this.renderRow(world.player.equipments[pos], pos);
  }

  render() {
    const { player } = world;

    return (
      <NavBar title="储藏箱" back>
        <View className={styles.container}>
          <ScrollView
            className={styles.flex1}
            contentContainerClassName={styles.content}
          >
            {game.bank.map(this.renderRow)}
            {game.bank.length < upgrades.bankByDiamonds.length && (
              <UpgradeIcon onPress={() => upgradeBank(navigator)}>
                +
              </UpgradeIcon>
            )}
            <BigBtn onPress={() => player.sortInventory(game.bank)}>
              整理储藏箱
            </BigBtn>
          </ScrollView>
          <GoodDetail selected={this.selectedItem} type="bank" />
          <ScrollView
            className={styles.flex2}
            contentContainerClassName={styles.content}
          >
            {player.inventory.map(this.renderRow)}
            {player.inventoryDiamondLevel <
              upgrades.inventoryByDiamonds.length && (
              <UpgradeIcon onPress={upgradeInventory}>+</UpgradeIcon>
            )}
            <BigBtn onPress={() => player.sortInventory(player.inventory)}>
              整理包裹
            </BigBtn>
          </ScrollView>
        </View>
      </NavBar>
    );
  }
}
