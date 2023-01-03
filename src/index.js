import { render } from 'react-dom';
import React from 'react';
import App from './App';
import styles from './index.less';
import game from './logics/game';
import world from './logics/world';

const div = document.createElement('div');
div.className = styles.root;
document.body.appendChild(div);
render(<App />, div);

window.addEventListener('beforeunload', () => {
  game.save();
  world.player?.save();
});
