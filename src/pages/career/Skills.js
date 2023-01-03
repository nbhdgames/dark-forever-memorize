/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from '../../components';
import { expr } from 'mobx-utils';
import { observer } from 'mobx-react';
import world from '../../logics/world';
import { skills } from '../../../data';
import styles from './Skill.less';
import { router } from '../../common/history';
import NavBar from '../NavBar';

const SelectedSkills = observer(function SelectedSkills() {
  const { player } = world;
  if (player.careerInfo.selectedSkills.length === 0) {
    return (
      <View className={styles.selectedList}>
        <Text>没有选择任何主动技能，该角色将不会行动。</Text>
      </View>
    );
  }
  return (
    <View className={styles.selectedList}>
      {player.careerInfo.selectedSkills.map((key, i) => {
        const skillInfo = skills[key];
        const skillExp = player.skillExp.get(skillInfo.expGroup || key);
        return (
          <View key={i} className={styles.selectedSkill}>
            <Text className={styles.order}>{i + 1}</Text>
            <View>
              <Text>{skillInfo.name}</Text>
              <Text>{skillExp.level}级</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
});

function costDesc(cost) {
  if (typeof cost === 'function') {
    return cost(world.player) | 0;
  }
  return cost | 0;
}

const SkillInfo = observer(function SkillInfo({ level, skill }) {
  const { player, playerUnit } = world;
  const skillInfo = skills[skill];
  const skillExp = player.skillExp.get(skillInfo.expGroup || skill);
  const selectedSkillCount = expr(
    () => player.careerInfo.selectedSkills.length
  );
  const selectedIndex = expr(() =>
    player.careerInfo.selectedSkills.indexOf(skill)
  );
  const enabled =
    selectedIndex >= 0 ||
    (selectedSkillCount < player.maxSkillCount && level <= player.level);

  const conflict = expr(
    () =>
      skills[skill].group &&
      selectedIndex === -1 &&
      player.careerInfo.selectedSkills.find(
        (v) => skills[v].group === skills[skill].group
      )
  );

  const disabled = (!enabled || !!conflict) && selectedIndex < 0;

  let { coolDown, description, cost } = skillInfo;
  let nextDiscription = null;

  if (typeof coolDown === 'function') {
    coolDown = coolDown(skillExp.level, playerUnit);
  }
  if (typeof description === 'function') {
    nextDiscription = description(skillExp.level + 1, world.playerUnit);
    description = description(skillExp.level, world.playerUnit);
  }

  return (
    <TouchableOpacity
      className={[styles.skillItem, disabled && styles.skillItemDisabled]}
      activeOpacity={0.8}
      disabled={disabled}
      onPress={() => {
        if (selectedIndex >= 0) {
          world.unselectSkill(skill);
        } else if (selectedSkillCount < player.maxSkillCount) {
          world.selectSkill(skill);
        }
      }}
    >
      <View className={styles.skillItemMain}>
        <Text className={styles.skillName}>{skillInfo.name}</Text>
        {selectedIndex >= 0 && <Text>顺序：{selectedIndex + 1}</Text>}
        {level <= player.level && conflict && (
          <Text>冲突: {skills[conflict].name}</Text>
        )}
        <View className={styles.spacer} />
        <Text>
          {skillExp.exp | 0}/{skillInfo.maxExp(skillExp.level)}
        </Text>
      </View>
      <View className={styles.row}>
        {level > player.level && (
          <Text className={styles.textMargin}>需达到{level}级</Text>
        )}
        {level <= player.level && (
          <Text className={styles.textMargin}>等级：{skillExp.level}</Text>
        )}
        {coolDown && (
          <Text className={styles.textMargin}>
            冷却时间：{(coolDown / 1000).toFixed(1)}秒
          </Text>
        )}
        {cost && cost.rp && (
          <Text className={styles.textMargin}>
            消耗怒气 {costDesc(cost.rp)}
          </Text>
        )}
        {cost && cost.mp && (
          <Text className={styles.textMargin}>
            消耗法力 {costDesc(cost.mp)}
          </Text>
        )}
        {cost && cost.ep && (
          <Text className={styles.textMargin}>
            消耗能量 {costDesc(cost.ep)}
          </Text>
        )}
      </View>
      <Text>{description}</Text>
      {level <= player.level && nextDiscription && (
        <Text>下一级：{nextDiscription}</Text>
      )}
    </TouchableOpacity>
  );
});

@observer
export default class Skills extends Component {
  onLeftPressed = () => {
    router.navigate('/career/choose');
  };
  onRightPressed = () => {
    router.navigate('/career/enhances');
  };
  render() {
    const { player } = world;
    const { maxSkillCount, nextSkillUnlockLevel } = player;
    return (
      <NavBar
        title="主动技能"
        leftNavTitle="职业"
        rightNavTitle="被动技能"
        onLeftPressed={this.onLeftPressed}
        onRightPressed={this.onRightPressed}
      >
        <View className={styles.container}>
          <SelectedSkills />
          <View>
            <Text>
              最多选择{maxSkillCount}个技能，
              {nextSkillUnlockLevel && (
                <Text>
                  下一个主动技能位置将在{player.nextSkillUnlockLevel}级解锁。
                </Text>
              )}
            </Text>
          </View>
          <ScrollView>
            {Object.keys(player.careerData.skills).map((key) => (
              <SkillInfo
                level={player.careerData.skills[key]}
                skill={key}
                key={key}
              />
            ))}
          </ScrollView>
        </View>
      </NavBar>
    );
  }
}
