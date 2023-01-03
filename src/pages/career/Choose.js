/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from '../../components';
import { observer } from 'mobx-react';
import world from '../../logics/world';
import { careers } from '../../../data';
import styles from './Choose.less';
import { checkRequirement } from '../../logics/check';
import { router } from '../../common/history';
import NavBar from '../NavBar';

const CareerInfo = observer(function CareerInfo({ type, onPress }) {
  const data = careers[type];
  const { player, playerUnit } = world;
  const level = player.getCareerLevel(type);

  return (
    <TouchableOpacity
      className={styles.careerItem}
      activeOpacity={0.8}
      onPress={() => {
        playerUnit.selectCareer(type);
        onPress && onPress();
      }}
    >
      <View className={styles.main}>
        <Text className={styles.name}>{data.name}</Text>
        {player.currentCareer === type && <Text>当前职业</Text>}
        <View className={styles.spacer} />
        {level ? <Text>等级：{level}</Text> : <Text>新职业</Text>}
      </View>
    </TouchableOpacity>
  );
});

@observer
export default class CareerChoose extends Component {
  onPress = () => {
    router.navigate(-1);
  };
  render() {
    const validCareers = Object.keys(careers).filter((key) => {
      return (
        !careers[key].requirement || checkRequirement(careers[key].requirement)
      );
    });
    return (
      <NavBar title="职业" back>
        <ScrollView className={styles.container}>
          {validCareers.map((key) => (
            <CareerInfo key={key} type={key} onPress={this.onPress} />
          ))}
        </ScrollView>
      </NavBar>
    );
  }
}
