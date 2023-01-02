/**
 * Created by lighthx on 2017/4/14.
 */
import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  PixelRatio,
} from 'react-native';
const line = 1 / PixelRatio.get()
const styles = StyleSheet.create({
  contain: {
    flexDirection: 'row',
    flex: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderWidth: line,
    borderRadius: 3,
    height: 20,
  }
})
export default class SelectBox extends Component {
  state = {
    active: this.props.selectedIndex,
  }

  componentWillMount() {
  }
  onPress = (i) => {
    this.setState({active: i})
    this.props.onChange(i)
  };

  item(v, i) {
    const backgroundColor = this.state.active == i ? 'blue' : 'white';
    const color = this.state.active == i ? 'white' : 'blue';
    return (
      <TouchableOpacity style={[styles.item,{backgroundColor}]} onPress={()=>this.onPress(i)} key={i}>
      <Text style={{color}}>
    {v}
  </Text>
  </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.contain}>
        {this.props.values.map((v, i) => this.item(v, i))}
      </View>
    )
  }
}