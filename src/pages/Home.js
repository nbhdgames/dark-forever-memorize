import React, { Component } from 'react';
import TabBar from './TabBar';
import Battle from './battle/Battle';
import Inventory from './inventory/Inventory';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';

const children = {
  battle: <Battle />,
  inventory: <Inventory />,
};

const activeObservable = observable.box('battle');

@observer
export default class Home extends Component {
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
