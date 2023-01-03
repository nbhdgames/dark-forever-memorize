/**
 * Created by tdzl2003 on 2/18/17.
 */
import React, { PropTypes, Component } from 'react';

import {
  View,
  Text,
  Alert,
  AlertIOS,
  ListView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import URI from 'urijs';
import route from '../../utils/routerDecorator';
import { get, post } from '../../logics/network/rpc';
import game from '../../logics/game';
import { stories } from '../../../data';
import { getClientId } from '../../logics/network/clientId';
import { checkRequirement } from '../battle/components/MapPanel';
import annoucement from '../../../data/annoucement';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    borderBottomWidth: 1,
    height: 60,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  itemLabel: {
    fontSize: 20,
  },
  footer: {},
  line: {
    flexDirection: 'row',
  },
});

@observer
export default class StoryPurchaseList extends Component {
  static title = '情报兑换';

  static contextTypes = {
    navigator: PropTypes.object,
  };

  dataSource = new ListView.DataSource({ rowHasChanged: (a, b) => a !== b });

  @observable
  clientId = '';

  async componentDidMount() {
    this.clientId = await getClientId();
  }

  purchaseStory(data) {
    const { navigator } = this.context;
    if (game.diamonds < data.price) {
      Alert.alert(
        '提示',
        '您的神力点数不足，是否召唤创世神的力量，大量获得神力？',
        [
          {
            text: '确认',
            onPress: () => {
              navigator.push({
                location: '/purchase',
              });
            },
          },
          { text: '取消' },
        ]
      );
      return;
    }
    game.diamonds -= data.price;
    game.storiesMap.set(data.key, 'done');
    if (data.script) {
      navigator.push({
        location: '/story/play',
        passProps: {
          story: data.key,
        },
      });
    }
  }

  async enterGM() {
    if (__DEV__) {
      const { navigator } = this.context;
      navigator.push({
        location: '/story/gm',
        passProps: { root: true },
      });
      return;
    }
    try {
      const clientId = await getClientId();
      const result = await post('/gm/login', {
        clientId,
      });
      const { navigator } = this.context;
      navigator.push({
        location: '/story/gm',
        passProps: result,
      });
    } catch (err) {
      console.warn(err.stack);
      Alert.alert('帝国金库', '口令错误，卫兵把你赶了出来。');
    }
  }

  enterCode = () => {
    AlertIOS.prompt(
      '帝国金库',
      '卫兵拦住了你，要你说出通行的口令。',
      async (value) => {
        if (value === 'gm') {
          await this.enterGM();
          return;
        }
        const recordId = encodeURIComponent(value);
        if (game.ticketMap.has(recordId)) {
          Alert.alert('帝国金库', '这个口令已经领取过了，卫兵把你赶了出来');
          return;
        }
        try {
          const clientId = await getClientId();
          const productId = await get(
            new URI('/ticket/use')
              .query({
                clientId,
                ticketId: value,
              })
              .toString()
          );

          if (game.runProduct(productId, false)) {
            game.ticketMap.set(recordId, true);
            const name = game.getProductName(productId);
            Alert.alert(
              '帝国金库',
              `在卫兵的指引下，你从金库里领到了${name}。`
            );
          } else {
            Alert.alert(
              '帝国金库',
              `虽然口令正确，但是卫兵也在金库里迷路了……（请更新游戏再尝试该口令）。`
            );
          }
        } catch (err) {
          console.warn(err.stack);
          if (err.status === 404) {
            Alert.alert('帝国金库', `口令错误，卫兵把你赶了出来。`);
          } else {
            Alert.alert('帝国金库', '金库今天没有开张。（网络连接失败）');
          }
        }
      }
    );
  };

  renderRow = (data) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.purchaseStory(data)}
      >
        <Text style={styles.itemLabel}>{data.name} </Text>
        <Text>消耗神力{data.price}点</Text>
      </TouchableOpacity>
    );
  };

  annoucement = () => {
    this.context.navigator.push({
      location: '/story/annoucement',
    });
  };

  renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.item} onPress={this.enterCode}>
          <Text style={styles.itemLabel}>帝国金库</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={this.annoucement}>
          <Text style={styles.itemLabel}>更新说明</Text>
          <Text>当前版本：{annoucement.version}</Text>
        </TouchableOpacity>
        <View style={styles.line}>
          <Text>您的专属ID（长按复制）：</Text>
          <Text selectable>{this.clientId}</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.dataSource.cloneWithRows(
          game.storiesMap
            .keys()
            .filter((k) => game.storiesMap.get(k) === 'task')
            .map((k) => stories[k])
            .filter((v) => v)
            .filter((v) => !v.requirement || checkRequirement(v.requirement))
            .filter((v) => v.taskType === 'purchase')
        )}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
      />
    );
  }
}
