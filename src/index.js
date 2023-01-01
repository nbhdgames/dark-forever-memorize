import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div);
root.render(<App />);
