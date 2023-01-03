/**
 * Created by tdzl2003 on 2/18/17.
 */
import React, { PropTypes, Component } from 'react';

import {
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import route from '../../utils/routerDecorator';
import game from '../../logics/game';
import {stories} from '../../../data';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    borderBottomWidth: 1,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  itemLabel: {
    fontSize: 20,
  },
});

@route('stories')
@observer
export default class StoryList extends Component {
  static title='故事';
  static rightNavTitle = '情报兑换';

  static contextTypes = {
    navigator: PropTypes.object,
  };

  @observable
  dataSource = new ListView.DataSource({ rowHasChanged: (a, b) => a !== b });

  onRightPressed = () => {
    const { navigator } = this.context;
    navigator.push({
      location: '/story/purchase',
    });
  };

  playStory(data) {
    const { navigator } = this.context;
    navigator.push({
      location: '/story/play',
      passProps: {
        story: data.key,
      },
    });
  }

  renderRow = (data) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.playStory(data)}>
        <Text style={styles.itemLabel}>{data.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.dataSource.cloneWithRows(
          game.storiesMap.keys()
            .filter(k => game.storiesMap.get(k) === 'done')
            .map(k => stories[k])
            .filter(v=> v && v.script)
        )}
        renderRow={this.renderRow}
      />
    );
  }
}