/**
 * Created by tdzl2003 on 2/1/17.
 */

import React, { Component, PureComponent } from 'react';

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
      className={[styles.unit, styles[camelCase('unit-' + unit.camp)]]}
      onPress={() => world.focusEnemy(unit)}
      activeOpacity={0.8}
    >
      <Field
        className={styles.name}
        unit={unit}
        field="displayName"
        numberOfLines={1}
      />
      <HpBar unit={unit} className={styles.bar} />
      {unit.maxMp > 0 && <MpBar unit={unit} className={styles.bar} />}
      {unit.maxRp > 0 && <RpBar unit={unit} className={styles.bar} />}
      {unit.maxEp > 0 && <EpBar unit={unit} className={styles.bar} />}
      {((unit.player && unit.player.currentCareer === 'knight') ||
        unit.runAttrHooks(false, 'displayCpBar')) && <CpBar unit={unit} />}
      <Text numberOfLines={1} className={styles.target}>
        目标：
        <Field unit={unit} field="targetDisplayName" />
      </Text>
      <View className={styles.spacer} />
      <Field className={styles.casting} unit={unit} field="castingName" />
      <CastBar unit={unit} className={styles.bar} />
    </TouchableOpacity>
  );
});

@observer
class MessageList extends PureComponent {
  scrollRef = React.createRef();
  componentDidMount() {
    const s = this.scrollRef.current;
    if (s) {
      s.scrollTop = s.scrollHeight - s.offsetHeight;
    }
  }
  componentDidUpdate() {
    const s = this.scrollRef.current;
    if (s) {
      s.scrollTop = s.scrollHeight - s.offsetHeight;
    }
  }
  render() {
    return (
      <ScrollView
        className={styles.messageList}
        contentContainerClassName={styles.content}
        ref={this.scrollRef}
      >
        {renderMessage.rendered.slice(-200).map((v) => v.jsx)}
      </ScrollView>
    );
  }
}

@observer
export default class UnitPanel extends Component {
  renderUnit = (unit) => <Unit unit={unit} key={unit.key} />;
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
        <MessageList />
      </View>
    );
  }
}
