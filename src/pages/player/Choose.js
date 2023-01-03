/**
 * Created by tdzl2003 on 12/18/16.
 */

import React, { Component, createRef } from 'react';
import { View, Text, TouchableOpacity, ListView } from '../../components';
import { action, autorun, observable } from 'mobx';
import { observer } from 'mobx-react';

import game from '../../logics/game';
import Player from '../../logics/player';
import world from '../../logics/world';
import NavBar from '../NavBar';
import styles from './Choose.less';
import { alert } from '../../common/message';
import { router } from '../../common/history';

const ChooseItem = observer(function ChooseItem(
  { meta, id, editing, entering },
  context
) {
  const choosePlayer = async (noWorldState) => {
    if (entering.get()) {
      return;
    }
    entering.set(true);
    const { navigator } = context;
    try {
      const player = await Player.load(id, noWorldState);
      player.postLoad();
      // world.addPlayer(player);
      // world.onMapChanged();
      world.resumeGame();
      router.navigate('/home');
    } catch (err) {
      world.dispose();
      if (__DEV__) {
        console.warn(err.stack);
      } else {
        mgn.debug(err.message);
        mgn.debug(err.stack);
      }
      alert(
        '错误',
        '加载游戏失败，请耐心等待更新，或者先选择其它角色进入游戏。' +
          err.message
      );
    }
  };
  function deletePlayer() {
    alert(
      '提示',
      '您确定要删除该角色吗？\n删除角色你将会失去：金币，经验，职业等级、包裹物品、装备。\n你将不会失去：神力、银行、剧情、成就',
      [
        { text: '确认', onPress: () => game.removePlayer(meta.key) },
        { text: '取消' },
      ]
    );
  }
  function recoveryPlayer() {
    alert(
      '提示',
      '如果您无法正常进入游戏，可以尝试从错误中恢复，但您可能会失去相应的离线收益，是否继续？',
      [{ text: '确认', onPress: () => choosePlayer(true) }, { text: '取消' }]
    );
  }
  if (editing.get()) {
    return (
      <View className={styles.row}>
        <View className={[styles.item, styles.flex]}>
          <Text>
            {meta.roleData.name} {meta.currentCareerLevel}级{meta.careerName}
          </Text>
        </View>
        <TouchableOpacity className={styles.button} onPress={recoveryPlayer}>
          <Text className={styles.buttonLabel}>修复异常</Text>
        </TouchableOpacity>
        <TouchableOpacity className={styles.button} onPress={deletePlayer}>
          <Text className={styles.buttonLabel}>删除</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <TouchableOpacity
      className={styles.item}
      onPress={() => choosePlayer(false)}
    >
      <Text>
        {meta.roleData.name} {meta.currentCareerLevel}级{meta.careerName}
      </Text>
    </TouchableOpacity>
  );
});

function Footer({ children, onPress }) {
  return (
    <TouchableOpacity className={styles.footer} onPress={onPress}>
      <Text className={styles.footerLabel}>{children}</Text>
    </TouchableOpacity>
  );
}

@observer
export default class PlayerChoose extends Component {
  refNavBar = createRef();

  editing = observable.box(false);

  entering = observable.box(false);

  onRightPressed = action(() => {
    if (this.editing.get()) {
      this.editing.set(false);
    } else {
      this.editing.set(true);
    }
  });

  ds = new ListView.DataSource({
    // 只比较对象,剩下的让ChooseItem自己去管
    rowHasChanged: (v1, v2) => v1[0] !== v2[0],
  });

  goCreate = () => {
    router.navigate('/player/create');
  };

  purchaseSlot = () => {
    if (game.diamonds >= game.purchaseSlotPrice) {
      alert(
        '提示',
        `您是否确认消耗${game.purchaseSlotPrice}神力点数，开启一个新的角色栏位？`,
        [{ text: '确认', onPress: () => game.purchaseSlot() }, { text: '取消' }]
      );
    } else {
      alert(
        '提示',
        `您需要消耗${game.purchaseSlotPrice}神力点数才能开启一个新的角色栏位，现有${game.diamonds}神力，是否召唤创世神的力量，大量获得神力？`,
        [
          {
            text: '确认',
            onPress: () => {
              router.navigate('/purchase');
            },
          },
          { text: '取消' },
        ]
      );
    }
  };

  renderRow = ([key, value], _, rowId) => (
    <ChooseItem
      entering={this.entering}
      key={key}
      id={key}
      meta={value}
      editing={this.editing}
      rowId={rowId}
    />
  );

  renderFooter = () => <Footer onPress={this.goCreate}>新游戏</Footer>;

  renderPurchase = () => (
    <Footer onPress={this.purchaseSlot}>
      购买新栏位(消耗{game.purchaseSlotPrice}神力，现有{game.diamonds}神力)
    </Footer>
  );

  render() {
    return (
      <NavBar
        title="选择存档"
        rightNavTitle={this.editing.get() ? '完成' : '编辑'}
        ref={this.refNavBar}
        onRightPressed={this.onRightPressed}
      >
        <ListView
          enableEmptySections
          className={styles.container}
          dataSource={this.ds.cloneWithRows(game.playerMetas.entries())}
          renderRow={this.renderRow}
          renderFooter={
            game.playerMetas.size < game.playerSlotCount
              ? this.renderFooter
              : this.renderPurchase
          }
        />
      </NavBar>
    );
  }
}
