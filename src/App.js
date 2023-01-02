import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { RouterProvider } from 'react-router';
import { router } from './common/history';

@observer
export default class App extends Component {
  render() {
    return <RouterProvider router={router} />;
  }
}
