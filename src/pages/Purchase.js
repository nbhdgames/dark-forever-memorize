/**
 * Created by tdzl2003 on 2/18/17.
 */

import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from '../components';
import game from '../logics/game';

import { observer } from 'mobx-react';
import { observable } from 'mobx';
import styles from './Purchase.less';
import NavBar from './NavBar';

@observer
export default class Purchase extends Component {
  @observable
  loading = true;

  @observable
  products = [];

  async componentDidMount() {
    // if (__IOS__) {
    //   const iapList = await get('/iapList');
    //   InAppUtils.loadProducts(iapList, (error, products) => {
    //     // update store here.
    //     if (products) {
    //       this.products.replace(products.sort((a, b) => a.price - b.price));
    //       this.loading = false;
    //     }
    //   });
    // }
  }
  purchase({ identifier }) {
    // if (__DEV__) {
    //   game.runProduct(identifier);
    //   alert('支付成功');
    //   return;
    // }
    // if (__IOS__) {
    //   InAppUtils.purchaseProduct(identifier, async (err, resp) => {
    //     game.refreshIap(true);
    //     if (resp && resp.productIdentifier) {

    //       await game.refreshIap(true);
    //       // functions[resp.productIdentifier]();
    //       alert('支付成功');
    //       return;
    //     }
    //     console.warn(JSON.stringify(err));
    //     alert('支付失败。若您的银行账户已经被扣费，可以关闭游戏并再次打开游戏以尝试恢复您的订单。');
    //   });
    // }
    alert('神听不见你的祈祷，仿佛有什么隔绝了神的意志……');
  }
  renderProductTitle = (product) => {
    const newName = game.getProductName(product.identifier);
    if (newName === product.title) {
      return <Text className={styles.title}>{newName}</Text>;
    }
    return (
      <Text className={styles.title}>
        <Text className={styles.deleteLine}>{product.title}</Text>
        {'\n'}
        {newName}
      </Text>
    );
  };
  renderProduct = (product) => {
    return (
      <TouchableOpacity
        key={product.identifier}
        style={styles.item}
        onPress={() => this.purchase(product)}
      >
        {this.renderProductTitle(product)}

        <View className={styles.column}>
          <Text className={styles.price}>{product.priceString}</Text>
          <Text className={styles.desc}>{product.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    // if (__ANDROID__) {
    return (
      <NavBar title="祈祷" back>
        <View className={[styles.container, styles.center]}>
          <Text>神听不见你的祈祷，仿佛有什么隔绝了神的意志……</Text>
        </View>
      </NavBar>
    );
    // }
    // if (this.loading) {
    //   return (
    //     <View style={[styles.container, styles.center]}>
    //       <Text>
    //         正在呼唤创世神的援助。{'\n'}如果过久不能得到响应请考虑返回重新呼唤。
    //       </Text>
    //     </View>
    //   );
    // }
    // return (
    //   <ScrollView style={styles.container}>
    //     {this.products.map(this.renderProduct)}
    //   </ScrollView>
    // );
  }
}
