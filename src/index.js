import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import styles from './index.less';

const div = document.createElement('div');
div.className = styles.root;
document.body.appendChild(div);
const root = createRoot(div);
root.render(<App />);
