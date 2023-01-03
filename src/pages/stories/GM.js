/**
 * Created by tdzl2003 on 2/18/17.
 */
import React, { PropTypes, Component } from 'react';

import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  AlertIOS,
} from 'react-native';
import { observer } from 'mobx-react/native';
import route from '../../utils/routerDecorator';
import { post } from '../../logics/network/rpc';
import world from '../../logics/world';
import { getClientId } from '../../logics/network/clientId';

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
});

function Button({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.itemLabel}>{children}</Text>
    </TouchableOpacity>
  );
}

@route('gm')
@observer
export default class GM extends Component {
  static title = 'GM之间';

  static contextTypes = {
    navigator: PropTypes.object,
  };

  sendTicket(product) {
    AlertIOS.prompt('创世神', '降下神之祝福的对象。', async clientId => {
      try {
        const ticket = await post('/gm/createTicket', {
          product,
          clientId,
          adminId: await getClientId(),
        });
        AlertIOS.prompt('创世神', '唵嘛呢叭咪吽', null, 'plain-text', ticket);
      } catch (err) {
        alert('神拒绝了你的请求。');
      }
    });
  }

  testPriv(priv) {
    return this.props[priv] || this.props.root;
  }

  possess = () => {
    AlertIOS.prompt('创世神', '降临的对象。', async clientId => {
      try {
        if (!this.props.root && typeof this.props.possess === 'string') {
          if (this.props.possess !== clientId) {
            alert('神微微一笑，然后拒绝了你的请求。');
            return;
          }
        }
        const roles = await post('/gm/listRoles', {
          clientId,
          adminId: await getClientId(),
        });
        this.context.navigator.push({
          location: '/story/possess',
          passProps: {
            roles,
          },
        });
      } catch (err) {
        alert('神拒绝了你的请求。');
      }
    });
  };

  setLevel = () => {
    AlertIOS.prompt('创世神', '到达的等级', async level => {
      const intLevel = level | 0;
      if (intLevel > 0 && intLevel <= 100) {
        world.player.exp = 0;
        world.player.level = intLevel;
      }
    });
  };

  setPeakLevel = () => {
    AlertIOS.prompt('创世神', '到达的等级', async level => {
      const intLevel = level | 0;
      if (intLevel >= 0 && intLevel <= 50000) {
        world.player.peakExp = 0;
        world.player.peakLevel = intLevel;
      }
    });
  };

  setSkillLevel = () => {
    AlertIOS.prompt('创世神', '到达的等级', async level => {
      const intLevel = level | 0;
      const { player } = world;
      if (intLevel >= 0 && intLevel <= player.level) {
        for (const key of player.skillExp.keys()) {
          const record = player.skillExp.get(key);
          record.exp = 0;
          record.level = intLevel;
        }
      }
    });
  };

  resetDungeon = () => {
    for (const key of world.player.dungeonTickets.keys()) {
      world.player.dungeonTickets.set(key, 10);
    }
    AlertIOS.alert('创世神', '所有的副本已重置。');
  };

  resetDungeonTickets = () => {
    for (const key of world.player.dungeonTickets.keys()) {
      world.player.dungeonTickets.set(key, 0);
    }
    AlertIOS.alert('创世神', '所有的副本已重置。');
  };

  resetTimeline = () => {
    world.player.timestamp = 0;
    AlertIOS.alert('创世神', '挂机时间已重置，请切换人物体验。');
  };
  clearPackages = () => {
    const { inventory } = world.player;
    for (let i = 0; i < inventory.length; i++) {
      inventory[i].clear();
    }
    AlertIOS.alert('创世神', '背包已清空。');
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.testPriv('createTicket') && (
          <Button onPress={() => this.sendTicket('diamonds.600')}>
            奖励兑换券600
          </Button>
        )}
        {this.testPriv('createTicket') && (
          <Button onPress={() => this.sendTicket('diamonds.1200')}>
            奖励兑换券1200
          </Button>
        )}
        {this.testPriv('createTicket') && (
          <Button onPress={() => this.sendTicket('diamonds.3000')}>
            奖励兑换券3000
          </Button>
        )}
        {this.testPriv('possess') && (
          <Button onPress={this.possess}>附身</Button>
        )}
        {this.testPriv('setLevel') && (
          <Button onPress={this.setLevel}>设置等级</Button>
        )}
        {this.testPriv('setLevel') && (
          <Button onPress={this.setSkillLevel}>设置技能等级</Button>
        )}
        {this.testPriv('setLevel') && (
          <Button onPress={this.setPeakLevel}>设置巅峰等级</Button>
        )}
        {this.testPriv('resetDungeon') && (
          <Button onPress={this.resetDungeon}>重置副本</Button>
        )}
        {this.testPriv('resetDungeon') && (
          <Button onPress={this.resetDungeonTickets}>清空副本</Button>
        )}
        {this.testPriv('resetDungeon') && (
          <Button onPress={this.resetTimeline}>重置挂机时间</Button>
        )}
        {this.testPriv('clearPackage') && (
          <Button onPress={this.clearPackages}>清空背包</Button>
        )}
      </ScrollView>
    );
  }
}
