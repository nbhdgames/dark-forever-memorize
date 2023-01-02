/**
 * Created by tdzl2003 on 2/1/17.
 */
import React, { Component } from 'react';
import { expr } from 'mobx-utils';
import { observer } from 'mobx-react';
import { View, Text, ScrollView } from '../../../components';
import Field, { IntField, FixedField } from '../../../components/Field';
import {
  HpBar,
  MpBar,
  RpBar,
  EpBar,
  ExpBar,
  CpBar,
} from '../../../components/bar';
import styles from './PlayerPanel.less';

function Seperator() {
  return <View style={styles.seperator} />;
}

@observer
export default class PlayerPanel extends Component {
  render() {
    const { unit } = this.props;
    const isPeak = expr(() => unit.player.level >= 60);
    const showMaxLevel = expr(() => unit.player.maxLevel > 60);

    const max = unit.runAttrHooks(3, 'maxComboPoint');
    return (
      <ScrollView className={styles.panel}>
        <Text>
          <Field className={styles.name} unit={unit} field="displayName" />
          等级
          <IntField unit={unit.player} field="level" />
          {isPeak && (
            <Text className={styles.blue}>
              ({<IntField unit={unit.player} field="peakLevel" />})
            </Text>
          )}
          <Field unit={unit.player} field="careerName" />
          {showMaxLevel && (
            <Text>
              (等级上限：
              <Field unit={unit.player} field="maxLevel" />)
            </Text>
          )}
        </Text>
        <View className={styles.row}>
          <View className={styles.column}>
            <Text>
              生命: <IntField unit={unit} field="hp" /> /{' '}
              <IntField unit={unit} field="maxHp" />
            </Text>
            <HpBar unit={unit} />
            {unit.maxMp > 0 && (
              <Text>
                魔力: <IntField unit={unit} field="mp" /> /{' '}
                <IntField unit={unit} field="maxMp" />
              </Text>
            )}
            {unit.maxMp > 0 && <MpBar unit={unit} />}
            {unit.maxRp > 0 && (
              <Text>
                怒气: <IntField unit={unit} field="rp" /> /{' '}
                <IntField unit={unit} field="maxRp" />
              </Text>
            )}
            {unit.maxRp > 0 && <RpBar unit={unit} />}
            {unit.maxEp > 0 && (
              <Text>
                能量: <IntField unit={unit} field="ep" /> /{' '}
                <IntField unit={unit} field="maxEp" />
              </Text>
            )}
            {unit.maxEp > 0 && <EpBar unit={unit} />}
            {unit.player && unit.player.currentCareer === 'knight' && (
              <Text>
                圣能: <IntField unit={unit} field="comboPoint" /> / {max}
              </Text>
            )}
            {unit.player && unit.player.currentCareer === 'knight' && (
              <CpBar unit={unit} />
            )}
            <Text>
              经验: <IntField unit={unit} field="exp" /> /{' '}
              <IntField unit={unit} field="maxExp" />
            </Text>
            <ExpBar unit={unit} />
          </View>
          <View className={styles.column}>
            <Text>
              力量: <IntField unit={unit} field="str" />{' '}
            </Text>
            <Text>
              敏捷: <IntField unit={unit} field="dex" />{' '}
            </Text>
            <Text>
              智力: <IntField unit={unit} field="int" />{' '}
            </Text>
            <Text>
              耐力: <IntField unit={unit} field="sta" />{' '}
            </Text>
          </View>
        </View>
        <View className={styles.row}>
          <View className={styles.column}>
            <Text>
              攻击力: <FixedField unit={unit} field="atk" />{' '}
            </Text>
            <Text>
              攻击速度: <FixedField unit={unit} field="atkSpeed" />
              次/秒{' '}
            </Text>
            <Text>
              速度加成:{' '}
              <FixedField unit={unit} field="speedRate" mul={100} inc={-1} />%{' '}
            </Text>
            <Text>
              暴击几率: <FixedField unit={unit} field="critRate" mul={100} />%{' '}
            </Text>
            <Text>
              暴击伤害: <FixedField unit={unit} field="critBonus" mul={100} />%{' '}
            </Text>
            <Text>
              法术伤害加成:{' '}
              <FixedField unit={unit} field="dmgAdd" mul={100} inc={-1} />%{' '}
            </Text>
            <Seperator />
            <Text>
              击杀恢复生命: <FixedField unit={unit} field="hpFromKill" />{' '}
            </Text>
            <Text>
              击杀恢复法力: <FixedField unit={unit} field="mpFromKill" />{' '}
            </Text>
            <Text>
              经验加成:{' '}
              <FixedField unit={unit} field="expInc" mul={100} inc={-1} />%{' '}
            </Text>
            <Text>
              技能学习速度提升:{' '}
              <FixedField unit={unit} field="skillExpInc" mul={100} inc={-1} />%{' '}
            </Text>
            <Text>
              装备品质提升:{' '}
              <FixedField unit={unit} field="mf" mul={100} inc={-1} />%{' '}
            </Text>
            <Text>
              掉落金币提升:{' '}
              <FixedField unit={unit} field="gf" mul={100} inc={-1} />%{' '}
            </Text>
            <Seperator />
            <Text>
              闪避几率: <FixedField unit={unit} field="dodgeRate" mul={100} />%{' '}
            </Text>
            <Text>
              护甲: <IntField unit={unit} field="def" />{' '}
            </Text>
          </View>
          <View style={styles.column}>
            <Text>
              每5秒回复生命:{' '}
              <FixedField unit={unit} field="hpRecovery" mul={5} />{' '}
            </Text>
            <Text>
              每5秒回复法力:{' '}
              <FixedField unit={unit} field="mpRecovery" mul={5} />{' '}
            </Text>
            <Text>
              每5秒回复怒气:{' '}
              <FixedField unit={unit} field="rpRecovery" mul={5} />{' '}
            </Text>
            <Text>
              每5秒回复能量:{' '}
              <FixedField unit={unit} field="epRecovery" mul={5} />{' '}
            </Text>
            <Text>
              怒气消耗回复生命: <FixedField unit={unit} field="rpRecHp" />{' '}
            </Text>
            <Text>
              吸血: <FixedField unit={unit} field="leech" mul={5} />{' '}
            </Text>
            <Seperator />
            <Text>
              火焰抗性: <IntField unit={unit} field="fireResist" />{' '}
            </Text>
            <Text>
              寒冷抗性: <IntField unit={unit} field="coldResist" />{' '}
            </Text>
            <Text>
              闪电抗性: <IntField unit={unit} field="lightningResist" />{' '}
            </Text>
            <Text>
              暗影抗性: <IntField unit={unit} field="darkResist" />{' '}
            </Text>
            <Text>
              火焰吸收: <FixedField unit={unit} field="fireAbsorb" mul={100} />%{' '}
            </Text>
            <Text>
              寒冷吸收: <FixedField unit={unit} field="coldAbsorb" mul={100} />%{' '}
            </Text>
            <Text>
              闪电吸收:{' '}
              <FixedField unit={unit} field="lightningAbsorb" mul={100} />%{' '}
            </Text>
            <Text>
              暗影吸收: <FixedField unit={unit} field="darkAbsorb" mul={100} />%{' '}
            </Text>
            <Text>
              物理吸收: <FixedField unit={unit} field="meleeAbsorb" mul={100} />
              %{' '}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
