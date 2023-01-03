/**
 * Created by tdzl2003 on 12/18/16.
 */

import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from '../components';
import world from '../logics/world';
import styles from './TabBar.less';

export default class TabBar extends Component {
  goto(location) {
    const { onChange } = this.props;
    onChange(location);
  }
  renderItem(to, label) {
    const { active } = this.props;
    const isActive = active == to;
    return (
      <TouchableOpacity className={styles.button} onPress={() => this.goto(to)}>
        <Text className={isActive && styles.active}>{label}</Text>
      </TouchableOpacity>
    );
  }
  onAppStateChange(state) {
    // if (state === 'inactive') {
    //   // 进入到后台
    //   if (world.player) {
    //     world.player.save();
    //   }
    //   world.pause();
    // } else if (state === 'active') {
    //   world.resumeGame();
    // }
  }
  getRef = (ref) => {
    this.childrenRef = ref;
  };
  render() {
    const { children } = this.props;
    return (
      <View className={styles.container}>
        <View className={styles.content}>{children}</View>
        <View className={styles.tabBar}>
          {this.renderItem('battle', '战斗')}
          {this.renderItem('inventory', '包裹')}
          {this.renderItem('skills', '技能')}
          {this.renderItem('produce', '生产')}
          {this.renderItem('stories', '故事')}
        </View>
      </View>
    );
  }
}
