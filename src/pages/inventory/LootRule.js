/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, { Component } from 'react';
import { View, Text, InputNumber, ScrollView } from '../../components';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import world from '../../logics/world';
import SelectBox from './SelectBox';
import { goods } from '../../../data';
import { qualityNames, qualityStyles } from './Inventory';
import styles from './LootRule.less';
import NavBar from '../NavBar';

const ds = {};

for (const key in goods) {
  const good = goods[key];
  if (good.class) {
    ds[good.class] = ds[good.class] || [0, 0, 0, 0, 0];
  }
}

const CLASS_NAMES = {
  sword: '剑',
  dagger: '匕首',
  wand: '杖',
  cloth: '布甲',
  lightArmor: '轻甲',
  armor: '重甲',
  ornament: '饰品',
};

const Setting = observer(function Settings({ clazz, quality }) {
  const { player } = world;

  const rule = player.lootRule.get(clazz);
  const value = rule ? rule[quality] : 0;

  return (
    <SelectBox
      values={quality ? ['拾取', '出售', '分解'] : ['拾取', '出售']}
      selectedIndex={value}
      onChange={action((index) => {
        let rule = player.lootRule.get(clazz);
        if (!rule) {
          player.lootRule.set(clazz, [0, 0, 0, 0, 0]);
          rule = player.lootRule.get(clazz);
        }
        rule[quality] = index;
      })}
    />
  );
});

const Header = observer(function () {
  const { player } = world;

  return (
    <View>
      <View className={styles.header}>
        <Text className={styles.headerFont}>装等筛选</Text>
      </View>
      <View className={[styles.row, styles.titleView]}>
        <Text className={styles.sliderTitle}>
          自动分解低于{player.minLootLevel}装等：
        </Text>
        <InputNumber
          className={styles.flex1}
          value={player.minLootLevel}
          onValueChange={(value) => (player.minLootLevel = value)}
          min={1}
        />
      </View>
    </View>
  );
});

@observer
export default class LootRule extends Component {
  static title = '拾取规则';

  // dataSource = new ListView.DataSource({
  //   rowHasChanged: (v1, v2) => v1 !== v2,
  //   sectionHeaderHasChanged: (v1, v2) => v1 !== v2,
  // }).cloneWithRowsAndSections(ds);

  renderSectionHeader = (id) => {
    return (
      <View className={styles.header}>
        <Text className={styles.headerFont}>{CLASS_NAMES[id] || id} </Text>
      </View>
    );
  };
  qualityColor(v) {
    if (v === '普通') {
      return 'black';
    }
    if (v === '优秀') {
      return '#aaf';
    }
    if (v === '精良') {
      return '#ffa';
    }
    if (v === '史诗') {
      return '#fda';
    }
    if (v === '传说') {
      return '#afd';
    }
  }
  renderRow = (sectionId, rowId) => {
    return (
      <View className={[styles.row, styles.titleView]} key={rowId}>
        <Text className={[styles.title, qualityStyles[rowId]]}>
          {qualityNames[rowId]}
        </Text>
        <Setting clazz={sectionId} quality={rowId | 0} />
      </View>
    );
  };

  renderHeader = () => {
    return <Header />;
  };

  render() {
    return (
      <NavBar title="拾取规则" back>
        <View className={styles.container}>
          <ScrollView className={styles.flex1}>
            {this.renderHeader()}
            {Object.entries(ds).map(([k, v]) => (
              <View key={k}>
                {this.renderSectionHeader(k)}
                {v.map((item, i) => this.renderRow(k, i))}
              </View>
            ))}
          </ScrollView>
        </View>
      </NavBar>
    );
  }
}
