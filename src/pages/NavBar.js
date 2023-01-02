/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, { Component } from 'react';

import { View, TouchableOpacity, Text } from '../components';
import styles from './NavBar.less';
import { router } from '../common/history';

export default class NavBar extends Component {
  getRef = (ref) => {
    this.childrenRef = ref;
  };
  onLeftPressed = () => {
    if (this.props.onLeftPressed) {
      this.props.onLeftPressed();
    } else {
      router.navigate(-1);
    }
  };
  onRightPressed = () => {
    if (this.props.onRightPressed) {
      this.props.onRightPressed();
    }
  };
  renderBack() {
    return (
      <TouchableOpacity className={styles.left} onPress={this.onLeftPressed}>
        <Text className={styles.button}>返回</Text>
      </TouchableOpacity>
    );
  }
  render() {
    const { children, back, leftNavTitle, rightNavTitle, title } = this.props;

    return (
      <View className={styles.container}>
        <View className={styles.navBar}>
          <Text className={styles.title}>{title}</Text>
          {!!back && this.renderBack()}
          {!!leftNavTitle && (
            <TouchableOpacity
              className={styles.left}
              onPress={this.onLeftPressed}
            >
              <Text className={styles.button}>{leftNavTitle}</Text>
            </TouchableOpacity>
          )}
          {!!rightNavTitle && (
            <TouchableOpacity
              className={styles.right}
              onPress={this.onRightPressed}
            >
              <Text className={styles.button}>{rightNavTitle}</Text>
            </TouchableOpacity>
          )}
        </View>
        {children}
      </View>
    );
  }
}
