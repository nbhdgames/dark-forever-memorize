/**
 * Created by tdzl2003 on 2/18/17.
 */
import React, { Component } from 'react';

import { Text, ListView, TouchableOpacity } from '../../components';
import { observer } from 'mobx-react';
import game from '../../logics/game';
import { stories } from '../../../data';
import styles from './StoryList.less';
import { router } from '../../common/history';
import { showModal } from '../../common/modal';
import Player from './Play';
import NavBar from '../NavBar';

@observer
export default class StoryList extends Component {
  dataSource = new ListView.DataSource({ rowHasChanged: (a, b) => a !== b });

  onRightPressed = () => {
    router.navigate('/story/purchase');
  };

  playStory(data) {
    showModal(<Player story={data.key} />);
  }

  renderRow = (data) => {
    return (
      <TouchableOpacity
        className={styles.item}
        onPress={() => this.playStory(data)}
      >
        <Text className={styles.itemLabel}>{data.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <NavBar
        title="故事"
        rightNavTitle="情报兑换"
        onRightPressed={this.onRightPressed}
      >
        <ListView
          className={styles.container}
          dataSource={this.dataSource.cloneWithRows(
            [...game.storiesMap.keys()]
              .filter((k) => game.storiesMap.get(k) === 'done')
              .map((k) => stories[k])
              .filter((v) => v && v.script)
          )}
          renderRow={this.renderRow}
        />
      </NavBar>
    );
  }
}
