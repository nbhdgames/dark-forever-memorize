import React, { Component } from 'react';
import TabBar from './TabBar';
import Battle from './battle/Battle';

const children = {
  battle: <Battle />,
};

export default class Home extends Component {
  state = {
    active: 'battle',
  };
  handleTabChange = (active) => {
    this.setState({
      active,
    });
  };
  render() {
    const { active } = this.state;
    return (
      <TabBar active={active} onChange={this.handleTabChange}>
        {children[active]}
      </TabBar>
    );
  }
}
