/**
 * Created by tdzl2003 on 2/18/17.
 */
import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from '../../components';
import * as classnames from 'classnames';
import { makeObservable, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';

import { stories } from '../../../data';
import styles from './Play.less';

function parseStory(key) {
  const { script } = stories[key];
  const lines = script.split('\n');

  const result = [];

  let i = 0;
  for (; i < lines.length; i++) {
    const pieces = lines[i].trim().split(' ');
    if (pieces.length <= 0 || !pieces[0]) {
      continue;
    }
    if (pieces[pieces.length - 1] === '{') {
      const content = [];
      while (i < lines.length - 1) {
        const l = lines[++i];
        if (l === '}') {
          break;
        }
        content.push(l);
      }
      pieces[pieces.length - 1] = content.join('\n');
    }
    result.push({
      type: pieces[0].toLowerCase(),
      args: pieces.slice(1),
    });
  }
  return result;
}

@observer
export default class Player extends Component {
  @observable
  scenePanel = null;

  @observable
  content = null;

  eventKey = 0;

  constructor() {
    super();
    makeObservable(this);
  }

  componentDidMount() {
    this.play();
  }

  async play() {
    const storyData = parseStory(this.props.story);
    for (const data of storyData) {
      await this[data.type](...data.args);
    }
    this.props.onDismiss?.();
  }

  aside(content) {
    return this.say(null, content);
  }

  onScrollViewRef = (ref) => {
    this.scrollView = ref;
  };

  async say(name, content) {
    this.contentTop = 0;
    runInAction(() => {
      this.content = (
        <View className={styles.content} key={++this.eventKey}>
          {name && <Text className={styles.name}>[{name}]</Text>}
          <View className={styles.textContainer} ref={this.onScrollViewRef}>
            <Text className={styles.text}>{content}</Text>
          </View>
        </View>
      );
    });
    // 自动翻页
    let contentTop = 0;
    for (;;) {
      await this.waitPress();
      const scroll = this.scrollView;
      if (!scroll) {
        break;
      }
      const textHeight = scroll.scrollHeight;
      const scrollViewHeight = scroll.offsetHeight;
      if (contentTop + scrollViewHeight < textHeight) {
        contentTop += name ? 50 : 75;
        this.scrollView.scrollTop = contentTop;
      } else {
        break;
      }
    }
    runInAction(() => {
      this.content = null;
    });
  }

  async scene(name) {
    if (this.scenePanel) {
      this.scenePanel = (
        <View
          className={classnames(styles.scene, styles.hidden)}
          key={++this.eventKey}
        >
          <Text className={styles.sceneLabel}>{name}</Text>
        </View>
      );
      await this.wait(500);
    }
    if (name) {
      this.scenePanel = (
        <View className={styles.scene} key={++this.eventKey}>
          <Text className={styles.sceneLabel}>{name}</Text>
        </View>
      );
    }
    await this.wait(500);
  }

  async wait(ms) {
    return new Promise((resolve) => {
      this.onPressResolve = resolve;
      setTimeout(resolve, +ms);
    }).then(() => {
      this.onPressResolve = null;
    });
  }

  onPressResolve = null;

  waitPress() {
    return new Promise((resolve) => {
      this.onPressResolve = resolve;
    });
  }

  onPress = () => {
    const { onPressResolve } = this;
    if (onPressResolve) {
      this.onPressResolve = null;
      onPressResolve();
    }
  };

  back = () => {
    this.props.onDismiss?.();
  };

  render() {
    return (
      <View className={styles.container} onClick={this.onPress}>
        {this.scenePanel}
        {this.content}
        <TouchableOpacity className={styles.back} onPress={this.back}>
          <Text className={styles.backLabel}>跳过&gt;&gt;</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
