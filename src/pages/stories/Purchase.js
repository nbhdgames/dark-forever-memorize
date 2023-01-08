/**
 * Created by tdzl2003 on 2/18/17.
 */
import React, { Component } from 'react';

import { View, Text, ListView, TouchableOpacity } from '../../components';
import { observer } from 'mobx-react';
import game from '../../logics/game';
import { stories } from '../../../data';
import annoucement from '../../../data/annoucement';
import styles from './Purchase.less';
import { alert } from '../../common/message';
import { checkRequirement } from '../../logics/check';
import { router } from '../../common/history';
import NavBar from '../NavBar';

@observer
export default class StoryPurchaseList extends Component {
  static title = '情报兑换';

  dataSource = new ListView.DataSource({ rowHasChanged: (a, b) => a !== b });

  async componentDidMount() {}

  purchaseStory(data) {
    if (game.diamonds < data.price) {
      alert('提示', '您的神力点数不足，是否召唤创世神的力量，大量获得神力？', [
        {
          text: '确认',
          onPress: () => {
            router.navigate('/purchase');
          },
        },
        { text: '取消' },
      ]);
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

  // async enterGM() {
  //   if (__DEV__) {
  //     const { navigator } = this.context;
  //     navigator.push({
  //       location: '/story/gm',
  //       passProps: { root: true },
  //     });
  //     return;
  //   }
  //   try {
  //     const clientId = await getClientId();
  //     const result = await post('/gm/login', {
  //       clientId,
  //     });
  //     const { navigator } = this.context;
  //     navigator.push({
  //       location: '/story/gm',
  //       passProps: result,
  //     });
  //   } catch (err) {
  //     console.warn(err.stack);
  //     Alert.alert('帝国金库', '口令错误，卫兵把你赶了出来。');
  //   }
  // }

  enterCode = () => {
    alert('帝国金库', '卫兵拦住了你，不论你说什么口令都不管用。');
    // AlertIOS.prompt(
    //   '帝国金库',
    //   '卫兵拦住了你，要你说出通行的口令。',
    //   async (value) => {
    //     if (value === 'gm') {
    //       await this.enterGM();
    //       return;
    //     }
    //     const recordId = encodeURIComponent(value);
    //     if (game.ticketMap.has(recordId)) {
    //       Alert.alert('帝国金库', '这个口令已经领取过了，卫兵把你赶了出来');
    //       return;
    //     }
    //     try {
    //       const clientId = await getClientId();
    //       const productId = await get(
    //         new URI('/ticket/use')
    //           .query({
    //             clientId,
    //             ticketId: value,
    //           })
    //           .toString()
    //       );

    //       if (game.runProduct(productId, false)) {
    //         game.ticketMap.set(recordId, true);
    //         const name = game.getProductName(productId);
    //         Alert.alert(
    //           '帝国金库',
    //           `在卫兵的指引下，你从金库里领到了${name}。`
    //         );
    //       } else {
    //         Alert.alert(
    //           '帝国金库',
    //           `虽然口令正确，但是卫兵也在金库里迷路了……（请更新游戏再尝试该口令）。`
    //         );
    //       }
    //     } catch (err) {
    //       console.warn(err.stack);
    //       if (err.status === 404) {
    //         Alert.alert('帝国金库', `口令错误，卫兵把你赶了出来。`);
    //       } else {
    //         Alert.alert('帝国金库', '金库今天没有开张。（网络连接失败）');
    //       }
    //     }
    //   }
    // );
  };

  renderRow = (data) => {
    return (
      <TouchableOpacity
        className={styles.item}
        onPress={() => this.purchaseStory(data)}
      >
        <Text className={styles.itemLabel}>{data.name} </Text>
        <Text>消耗神力{data.price}点</Text>
      </TouchableOpacity>
    );
  };

  annoucement = () => {
    router.navigate('/story/annoucement');
  };

  renderFooter = () => {
    return (
      <View className={styles.footer}>
        <TouchableOpacity className={styles.item} onPress={this.enterCode}>
          <Text className={styles.itemLabel}>帝国金库</Text>
        </TouchableOpacity>
        <TouchableOpacity className={styles.item} onPress={this.annoucement}>
          <Text className={styles.itemLabel}>更新说明</Text>
          <Text>当前版本：{annoucement.version}</Text>
        </TouchableOpacity>
        <View className={styles.line}>
          <Text>(最后只有一串模糊的文字，再也看不清了)</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <NavBar title="情报兑换" back>
        <ListView
          className={styles.container}
          dataSource={this.dataSource.cloneWithRows(
            [...game.storiesMap.keys()]
              .filter((k) => game.storiesMap.get(k) === 'task')
              .map((k) => stories[k])
              .filter((v) => v)
              .filter((v) => !v.requirement || checkRequirement(v.requirement))
              .filter((v) => v.taskType === 'purchase')
          )}
          renderRow={this.renderRow}
          renderFooter={this.renderFooter}
        />
      </NavBar>
    );
  }
}
