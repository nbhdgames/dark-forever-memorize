/**
 * Created by lighthx on 2017/4/14.
 */
import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from '../../components';
import styles from './SelectBox.less';

export default class SelectBox extends Component {
  state = {
    active: this.props.selectedIndex,
  };

  onPress = (i) => {
    this.setState({ active: i });
    this.props.onChange(i);
  };

  item(v, i) {
    return (
      <TouchableOpacity
        className={[styles.item, this.state.active == i && styles.active]}
        onPress={() => this.onPress(i)}
        key={i}
      >
        <Text
          className={[styles.label, this.state.active == i && styles.active]}
        >
          {v}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View className={styles.contain}>
        {this.props.values.map((v, i) => this.item(v, i))}
      </View>
    );
  }
}
