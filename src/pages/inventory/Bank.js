/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react/native';
import route from '../../utils/routerDecorator';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flex1: {
    flexGrow: 1,
  },
  flex2: {
    flexGrow: 2,
  },
});

const purchaseBankByDiamond = action(function purchaseInventoryByDiamond(
  navigator
) {
  const cost = upgrades.bankByDiamonds[game.bank.length];
  if (game.diamonds < cost) {
    Alert.alert(
      '提示',
      '您的神力点数不足，是否召唤创世神的力量，大量获得神力？',
      [
        {
          text: '确认',
          onPress: () => {
            navigator.push({
              location: '/purchase',
            });
          },
        },
        { text: '取消' },
      ]
    );
    return;
  }
  game.diamonds -= cost;
  game.bank.push(new InventorySlot('bank'));
});

export function upgradeBank(navigator) {
  const { player } = world;
  const cost = upgrades.bankByDiamonds[game.bank.length];

  // 只能用神力升级
  Alert.alert(
    '提示',
    `是否使用神的力量扩张物品空间，继续扩张包裹消耗${cost}神力，是否继续？`,
    [
      { text: '确认', onPress: () => purchaseBankByDiamond(navigator) },
      { text: '取消' },
    ]
  );
}

@route('bank')
@observer
export default class Bank extends Component {
  static title = '储藏箱';
  static contextTypes = {
    navigator: PropTypes.object,
  };

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
    const { navigator } = this.context;
    const { player } = world;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.flex1} contentContainerStyle={styles.content}>
          {game.bank.map(this.renderRow)}
          {game.bank.length < upgrades.bankByDiamonds.length && (
            <UpgradeIcon onPress={() => upgradeBank(navigator)}>+</UpgradeIcon>
          )}
          <BigBtn onPress={() => player.sortInventory(game.bank)}>
            整理储藏箱
          </BigBtn>
        </ScrollView>
        <GoodDetail selected={this.selectedItem} type="bank" />
        <ScrollView style={styles.flex2} contentContainerStyle={styles.content}>
          {player.inventory.map(this.renderRow)}
          {player.inventoryDiamondLevel <
            upgrades.inventoryByDiamonds.length && (
            <UpgradeIcon onPress={() => upgradeInventory(navigator)}>
              +
            </UpgradeIcon>
          )}
          <BigBtn onPress={() => player.sortInventory(player.inventory)}>
            整理包裹
          </BigBtn>
        </ScrollView>
      </View>
    );
  }
}
