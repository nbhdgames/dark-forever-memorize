/**
 * Created by tdzl2003 on 12/18/16.
 */
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

import { View, Image, TouchableOpacity, Text } from '../components';
import { Outlet } from 'react-router';
import styles from './NavBar.less';
import { router } from '../common/history';

export class NavBarStore {
  @observable
  leftNavTitle = null;
  @observable
  rightNavTitle = null;
  @observable
  title = null;
  @observable
  back = null;

  childrenRef = null;

  constructor() {
    makeObservable(this);
  }
}

export const navbarStore = new NavBarStore();

@observer
export default class NavBar extends Component {
  onLeftPressed = () => {
    if (navbarStore.childrenRef && navbarStore.childrenRef.onLeftPressed) {
      navbarStore.childrenRef.onLeftPressed();
    } else {
      router.navigate(navbarStore.back);
    }
  };
  onRightPressed = () => {
    if (navbarStore.childrenRef && navbarStore.childrenRef.onRightPressed) {
      navbarStore.childrenRef.onRightPressed();
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
    return (
      <View className={styles.container}>
        <View className={styles.navBar}>
          <Text className={styles.title}>{navbarStore.title}</Text>
          {!!navbarStore.back && this.renderBack()}
          {!!navbarStore.leftNavTitle && (
            <TouchableOpacity
              className={styles.left}
              onPress={this.onLeftPressed}
            >
              <Text className={styles.button}>{navbarStore.leftNavTitle}</Text>
            </TouchableOpacity>
          )}
          {!!navbarStore.rightNavTitle && (
            <TouchableOpacity
              className={styles.right}
              onPress={this.onRightPressed}
            >
              <Text className={styles.button}>{navbarStore.rightNavTitle}</Text>
            </TouchableOpacity>
          )}
        </View>
        <Outlet />
      </View>
    );
  }
}
