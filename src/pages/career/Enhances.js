/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from '../../components';
import { expr } from 'mobx-utils';
import { observer } from 'mobx-react';
import world from '../../logics/world';
import { enhances } from '../../../data';
import styles from './Enhances.less';
import NavBar from '../NavBar';

const SelectedEnhances = observer(function SelectedEnhances() {
  const { player } = world;
  if (player.careerInfo.selectedEnhances.length === 0) {
    return (
      <View className={styles.selectedList}>
        <Text>没有选择任何强化技能。</Text>
      </View>
    );
  }
  return (
    <View className={styles.selectedList}>
      {player.careerInfo.selectedEnhances.map((key, i) => {
        const enhanceInfo = enhances[key];
        return (
          <View key={i} className={styles.selectedEnhance}>
            <View>
              <Text>{enhanceInfo.name}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
});

const EnhanceInfo = observer(function EnhanceInfo({ level, enhance }) {
  const { player } = world;
  const enhanceInfo = enhances[enhance];
  const selectedEnhanceCount = expr(
    () => world.player.careerInfo.selectedEnhances.length
  );
  const selectedIndex = expr(() =>
    world.player.careerInfo.selectedEnhances.indexOf(enhance)
  );
  const enabled =
    selectedIndex >= 0 ||
    (selectedEnhanceCount < player.maxEnhanceCount && level <= player.level);
  const disabled = !enabled && selectedIndex < 0;

  return (
    <TouchableOpacity
      className={[styles.enhanceItem, disabled && styles.enhanceItemDisabled]}
      activeOpacity={0.8}
      disabled={disabled}
      onPress={() => {
        if (selectedIndex >= 0) {
          world.unselectEnhance(enhance);
        } else if (selectedEnhanceCount < player.maxEnhanceCount) {
          world.selectEnhance(enhance);
        }
      }}
    >
      <View className={styles.enhanceItemMain}>
        <Text className={styles.enhanceName}>{enhanceInfo.name}</Text>
        {level > player.level && <Text>{level}级后开启</Text>}
        {selectedIndex >= 0 && <Text>已选中</Text>}
        <View className={styles.spacer} />
      </View>
      <Text>{enhanceInfo.description}</Text>
    </TouchableOpacity>
  );
});

@observer
export default class Enhances extends Component {
  render() {
    const { player } = world;
    const { maxEnhanceCount, nextEnhanceUnlockLevel } = player;
    return (
      <NavBar title="被动技能" back>
        <View className={styles.container}>
          <SelectedEnhances />
          <View>
            <Text>
              最多选择{maxEnhanceCount}个被动技能，
              {nextEnhanceUnlockLevel && (
                <Text>
                  下一个被动技能位置将在{player.nextEnhanceUnlockLevel}级解锁。
                </Text>
              )}
            </Text>
          </View>
          <ScrollView>
            {Object.keys(player.careerData.enhances).map((key) => (
              <EnhanceInfo
                level={player.careerData.enhances[key]}
                enhance={key}
                key={key}
              />
            ))}
          </ScrollView>
        </View>
      </NavBar>
    );
  }
}
