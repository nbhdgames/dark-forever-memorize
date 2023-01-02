/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, { Component } from 'react';

import { View, TouchableOpacity, Text } from '../components';
import styles from './NavBar.less';
import { router } from '../common/history';

export default class NavBar extends Component {
  state = {
    leftNavTitle: null,
    title: null,
    rightNavTitle: null,
  };
  componentDidMount() {
    this.setState({
      leftNavTitle: this.props.leftNavTitle,
      title: this.props.title,
      rightNavTitle: this.props.rightNavTitle,
    });
  }
  getRef = (ref) => {
    this.childrenRef = ref;
  };
  onLeftPressed = () => {
    if (this.childrenRef && this.childrenRef.onLeftPressed) {
      this.childrenRef.onLeftPressed();
    } else {
      router.navigate(this.props.back);
    }
  };
  onRightPressed = () => {
    if (this.childrenRef && this.childrenRef.onRightPressed) {
      this.childrenRef.onRightPressed();
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
    const { children, back } = this.props;
    const { leftNavTitle, rightNavTitle, title } = this.state;

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
        {React.cloneElement(children, { ref: this.getRef, navBar: this })}
      </View>
    );
  }
}
