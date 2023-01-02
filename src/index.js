import { render } from 'react-dom';
import React from 'react';
import App from './App';
import styles from './index.less';

const div = document.createElement('div');
div.className = styles.root;
document.body.appendChild(div);
render(<App />, div);
