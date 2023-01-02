/**
 * Created by tdzl2003 on 12/18/16.
 */

import React, { Component } from 'react';
import { View } from '../components';
import game from '../logics/game';
import Player from '../logics/player';
import world from '../logics/world';
import { alert } from '../common/message';
import { router } from '../common/history';
import styles from './splash.less';

export default class Splash extends Component {
  async componentDidMount() {
    await game.load();

    if (game.currentPlayer) {
      try {
        const player = await Player.load(game.currentPlayer);
        player.postLoad();
        // world.addPlayer(player);
        // world.onMapChanged();
        world.resumeGame();
        // world.map = 'home';
        router.navigate('/home');
        return;
      } catch (err) {
        if (__DEV__) {
          console.warn(err.stack);
        }
        world.dispose();
        game.currentPlayer = null;
        alert(
          '错误',
          '加载游戏失败，请耐心等待更新，或者先选择其它角色进入游戏。' +
            err.message
        );
      }
    }
    router.navigate('/player/choose');
  }
  render() {
    return <View className={styles.container} />;
  }
}
