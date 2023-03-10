import React, { Component } from 'react';
import TabBar from './TabBar';
import Battle from './battle/Battle';
import Inventory from './inventory/Inventory';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import Skills from './career/Skills';
import Produces from './produce/Produce';
import StoryList from './stories/StoryList';
import world from '../logics/world';

const children = {
  battle: <Battle />,
  inventory: <Inventory />,
  skills: <Skills />,
  produce: <Produces />,
  stories: <StoryList />,
};

const activeObservable = observable.box('battle');

@observer
export default class Home extends Component {
  componentDidMount() {
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }
  componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  }
  onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      console.log('pause');
      world.pause();
    } else {
      console.log('resume');
      world.resumeGame();
    }
  };
  handleTabChange = action((active) => {
    activeObservable.set(active);
  });
  render() {
    const active = activeObservable.get();
    return (
      <TabBar active={active} onChange={this.handleTabChange}>
        {children[active]}
      </TabBar>
    );
  }
}
