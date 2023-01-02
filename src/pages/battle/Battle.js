/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, { Component } from 'react';
import { View, Text } from '../../components';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import message from '../../logics/message';
import world from '../../logics/world';
import game from '../../logics/game';
import renderMessage from '../../logics/renderMessage';
import { checkStories, checkStoriesLater } from './components/MapPanel';
import { BuildInventory } from '../produce/Produce';
import { ScrollableTabView } from '../../components/tabview';
import UnitPanel from './components/UnitPanel';
import PlayerPanel from './components/PlayerPanel';
import MapPanel from './components/MapPanel';
import { alert } from '../../common/message';
import styles from './Battle.less';
const annoucement = require('../../../data/annoucement');

@observer
export default class Battle extends Component {
  static title = '战斗';
  static leftNavTitle = '切换人物';

  selectedItem = observable(null);

  dispose;

  componentDidMount() {
    if (game.lastVersion !== annoucement.version) {
      game.lastVersion = annoucement.version;
      setTimeout(() => {
        this.context.navigator.push({
          location: '/story/annoucement',
        });
      }, 1000);
    }
    checkStoriesLater();
    this.dispose = message.addListener('message');
  }
  componentWillUnmount() {
    this.dispose.remove();
  }
  onLeftPressed() {
    if (world.player) {
      world.player.save();
    }
    world.dispose();
    game.save();
    renderMessage.dispose();
    game.currentPlayer = null;
    this.context.navigator.resetTo({
      location: '/player/choose',
    });
  }

  @computed
  get pendingTimeLabel() {
    if (world.pendingTime >= 1 * 3600 * 1000) {
      return (world.pendingTime / 3600 / 1000).toFixed(1) + '小时';
    }
    return (world.pendingTime / 60 / 1000).toFixed(1) + '分钟';
  }

  onMessage = ({ type }) => {
    if (type === 'battle.death') {
      checkStories(this.context.navigator, checkStoriesLater);
    }
  };

  skipForward = () => {
    alert(
      '提示',
      `跳过挂机的时间不能被恢复，你也不能获取到这段时间的金币、经验和装备，是否确认？`,
      [{ text: '取消' }, { text: '确认', onPress: () => world.skipForward() }]
    );
  };

  render() {
    const { player } = world;
    if (world.paused || !player) {
      return (
        <View style={[styles.container, styles.centerContainer]}>
          <Text>当你不在的时候，时光依然飞逝。剩余{this.pendingTimeLabel}</Text>
          <Text style={styles.skipFoward} onPress={this.skipForward}>
            我只是想杀杀怪物。。（跳过）
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollableTabView style={styles.container}>
          <UnitPanel tabLabel="单位" />
          {world.units
            .filter((v) => v.player)
            .map((v, i) => (
              <PlayerPanel key={i} unit={v} tabLabel={v.name} />
            ))}
          <MapPanel tabLabel="地图" />
        </ScrollableTabView>
        <BuildInventory
          selected={this.selectedItem}
          inventory={player.awardInventory}
        />
      </View>
    );
  }
}
