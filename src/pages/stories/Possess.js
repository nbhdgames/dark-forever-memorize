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
import moment from 'moment';
import route from '../../utils/routerDecorator';
import {post} from '../../logics/network/rpc';
import {getClientId} from '../../logics/network/clientId';
import { roles, careers } from '../../../data';
import Player, { PlayerMeta } from '../../logics/player';
import game from '../../logics/game';
import world from '../../logics/world';
import renderMessage from '../../logics/renderMessage';

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

@route('possess')
@observer
export default class GM extends Component {
  static title='附身';

  static contextTypes = {
    navigator: PropTypes.object,
  };

  possess = () => {
    AlertIOS.prompt('创世神', '降临的对象。', async clientId => {
      try {
        const roles = await post('/gm/listRoles', {
          clientId,
          adminId: await getClientId(),
        });

      } catch (err) {
        alert('神拒绝了你的请求。');
      }
    });
  };

  onChoose = async (v) => {
    try {
      const role = await post('/gm/downloadRole', {
        id: v.id,
        adminId: await getClientId(),
      });

      if (game.playerMetas.size >= game.playerSlotCount) {
        alert('没有空缺的人物栏位了。');
        return;
      }
      const detail = JSON.parse(role);
      delete detail.key;
      delete detail.timestamp;
      delete detail.timelineId;

      world.player.save();
      world.dispose();
      renderMessage.dispose();

      const player = await Player.create(new PlayerMeta().fromJS({
        role: 'Eyer',
      }));
      console.log(player.key);
      player.fromJS(detail);
      console.log(player.key);
      player.save(true);

      game.currentPlayer = player.key;
      this.context.navigator.resetTo({
        location: '/player/choose',
      });
    } catch (err) {
      console.error(err.stack);
      alert('神拒绝了你的请求。');
    }
  };

  renderRole = (v, i) => {
    return (
      <TouchableOpacity key={i} style={styles.item} onPress={() => this.onChoose(v)}>
        <Text>{roles[v.role].name} {v.currentCareerLevel}级{careers[v.currentCareer].name}</Text>
        <Text>最后游戏时间{moment(v.timestamp).format('YYYY-MM-DD hh:mm:ss')}</Text>
      </TouchableOpacity>
    )
  };

  render() {
    const { roles } = this.props;
    return (
      <ScrollView
        style={styles.container}
      >
        {roles.map(this.renderRole)}
      </ScrollView>
    );
  }
}