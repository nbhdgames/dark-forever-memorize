/**
 * Created by tdzl2003 on 2/18/17.
 */
import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';

import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

import route from '../../utils/routerDecorator';
import { stories } from '../../../data';
import { StorySceneConfig } from '../../SceneConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    position: 'absolute',
    bottom: 10,
    left: 5,
    right: 5,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    overflow: 'hidden',
  },
  name: {
    fontSize: 20,
    fontFamily: 'STHeitiSC-Light',
  },
  text: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: 'STHeitiSC-Light',
  },
  scene: {
    marginTop: 80,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  sceneLabel: {
    fontSize: 36,
    fontFamily: 'STHeitiSC-Light',
  },
  back: {
    position: 'absolute',
    right: 20,
    top: 35,
  },
  backLabel: {
    color: 'white',
  },
});

const sceneAnimation = LayoutAnimation.create(500, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.opacity);

function parseStory(key) {
  const { script } = stories[key];
  const lines = script.split('\n');

  const result = [];

  let i = 0;
  for ( ; i < lines.length; i++ ) {
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

@route('play')
@observer
export default class Player extends Component {
  static hideNavBar = true;
  static sceneConfig = StorySceneConfig;

  static contextTypes = {
    navigator: PropTypes.object,
  };

  storyData = parseStory(this.props.story);

  @observable
  scenePanel = null;

  @observable
  content = null;

  eventKey = 0;

  contentTop = 0;

  componentDidMount() {
    this.play();
  }

  async play() {
    for (const data of this.storyData) {
      await this[data.type](...data.args);
    }
    this.props.onClose && this.props.onClose();
    this.context.navigator.pop();
  }

  aside(content) {
    return this.say(null, content);
  }

  onScrollViewLayout = ({nativeEvent:{layout:{height}}}) =>{
    this.scrollViewHeight = height;
  };

  onScrollViewRef = (ref) => {
    this.scrollView = ref;
  };

  onTextLayout = ({nativeEvent:{layout:{ height }}}) => {
    this.textHeight = height;
  };

  async say(name, content) {
    this.contentTop = 0;
    this.content = (
      <View style={styles.content} key={++this.eventKey}>
        {name && <Text style={styles.name}>[{name}]</Text>}
        <ScrollView
          style={styles.textContainer} onLayout={this.onScrollViewLayout}
          ref={this.onScrollViewRef}
        >
          <Text style={styles.text} onLayout={this.onTextLayout}>
            {content}
          </Text>
        </ScrollView>
      </View>
    );
    // 自动翻页
    for (;;) {
      await this.waitPress();
      if (this.contentTop + this.scrollViewHeight < this.textHeight) {
        this.contentTop += name ? 50 : 75;
        this.scrollView.scrollTo({ y: this.contentTop });
      } else {
        break;
      }
    }
    this.content = null;
  }

  async scene(name) {
    if (this.scenePanel) {
      LayoutAnimation.configureNext(sceneAnimation);
      this.scenePanel = null;
      await this.wait(500);
    }
    if (name) {
      LayoutAnimation.configureNext(sceneAnimation);
      this.scenePanel = (
        <View style={styles.scene} key={++this.eventKey}>
          <Text style={styles.sceneLabel}>{name}</Text>
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
    return new Promise(resolve => {
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
    this.props.onClose && this.props.onClose();
    this.context.navigator.pop();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={styles.container} >
          {this.scenePanel}
          {this.content}
          <TouchableOpacity style={styles.back} onPress={this.back}>
            <Text style={styles.backLabel}>跳过&gt;&gt;</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}