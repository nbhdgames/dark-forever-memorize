/**
 * Created by tdzl2003 on 2/1/17.
 */

import React, { Component } from 'react';

import { View, Text, ScrollView, TouchableOpacity } from '../../../components';
import { observer } from 'mobx-react';
import camelCase from 'camelcase';
import {
  HpBar,
  MpBar,
  RpBar,
  EpBar,
  CastBar,
  CpBar,
} from '../../../components/bar';
import Field from '../../../components/Field';
import world from '../../../logics/world';
import renderMessage from '../../../logics/renderMessage';
import styles from './UnitPanel.less';

const Unit = observer(function Unit({ unit }) {
  return (
    <TouchableOpacity
      style={[styles.unit, styles[camelCase('unit', unit.camp)]]}
      onPress={() => world.focusEnemy(unit)}
      activeOpacity={0.8}
    >
      <Field
        style={styles.name}
        unit={unit}
        field="displayName"
        numberOfLines={1}
      />
      <HpBar unit={unit} style={styles.bar} />
      {unit.maxMp > 0 && <MpBar unit={unit} style={styles.bar} />}
      {unit.maxRp > 0 && <RpBar unit={unit} style={styles.bar} />}
      {unit.maxEp > 0 && <EpBar unit={unit} style={styles.bar} />}
      {((unit.player && unit.player.currentCareer === 'knight') ||
        unit.runAttrHooks(false, 'displayCpBar')) && <CpBar unit={unit} />}
      <Text numberOfLines={1} style={styles.target}>
        目标：
        <Field unit={unit} field="targetDisplayName" />
      </Text>
      <View style={styles.spacer} />
      <Field style={styles.casting} unit={unit} field="castingName" />
      <CastBar unit={unit} style={styles.bar} />
    </TouchableOpacity>
  );
});

@observer
export default class UnitPanel extends Component {
  scrollRef = React.createRef();
  renderUnit = (unit) => <Unit unit={unit} key={unit.key} />;
  on;
  componentDidMount() {
    const s = this.scrollRef.current;
    if (s) {
      s.offsetTop = s.clientHeight - s.offsetHeight;
    }
  }
  render() {
    return (
      <View className={styles.container}>
        <ScrollView
          className={styles.panel}
          contentContainerClassName={styles.panelContent}
          bounces={false}
        >
          {world.units.map(this.renderUnit)}
        </ScrollView>
        <ScrollView
          className={styles.messageList}
          contentContainerClassName={styles.content}
          ref={this.scrollRef}
        >
          {renderMessage.rendered.slice(-200).map((v) => v.jsx)}
        </ScrollView>
      </View>
    );
  }
}
