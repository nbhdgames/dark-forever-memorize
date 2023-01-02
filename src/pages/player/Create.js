/**
 * Created by tdzl2003 on 12/18/16.
 */

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from '../../components';
import { expr } from 'mobx-utils';
import { observer } from 'mobx-react';
import Player, { PlayerMeta } from '../../logics/player';
import world from '../../logics/world';

import { roles } from '../../../data';
import styles from './Create.less';
import { alert } from '../../common/message';
import { checkRequirement } from '../../logics/check';
import { boxObjectField } from '../../common/utils';
import { router } from '../../common/history';

function Group({ title, children }) {
  return (
    <View className={styles.group}>
      <Text className={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

function OptionGroup({ title, children, target }) {
  return (
    <Group title={title}>
      <View className={styles.options}>
        {React.Children.map(children, (v) =>
          React.cloneElement(v, {
            target,
          })
        )}
      </View>
    </Group>
  );
}

const Option = observer(function Option({ children, value, target }) {
  const active = expr(() => target && target.get() === value);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={[styles.option, active && styles.optionActive]}
      onPress={() => target.set(value)}
    >
      <Text className={[styles.label, active && styles.labelActive]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});

@observer
export default class PlayerCreate extends PureComponent {
  form = new PlayerMeta();

  roleField = boxObjectField(this.form, 'role');

  async onRightPressed() {
    try {
      const player = await Player.create(this.form);

      world.resetTimeline();
      world.addPlayer(player);
      world.map = 'home';
      world.resumeGame();
      router.navigate('/home/battle');
    } catch (err) {
      if (__DEV__) {
        console.warn(err.stack);
      }
      switch (err.code) {
        case 403:
          alert('提示', '您已无法创建更多角色，请回到首页查看');
          break;
        default:
          alert('错误', '创建失败');
          break;
      }
    }
  }

  render() {
    return (
      <View className={styles.container}>
        <OptionGroup title="角色" target={this.roleField} field="role">
          {Object.keys(roles)
            .filter(
              (k) =>
                !roles[k].requirement || checkRequirement(roles[k].requirement)
            )
            .map((k) => (
              <Option key={k} value={k}>
                {roles[k].name}
              </Option>
            ))}
        </OptionGroup>
        <Group title="角色介绍">
          <Text className={styles.body}>{this.form.roleData.description}</Text>
        </Group>
      </View>
    );
  }
}
