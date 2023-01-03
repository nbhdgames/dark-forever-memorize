import React from 'react';
import styles from './modal.less';
import { render, unmountComponentAtNode } from 'react-dom';

const modalClearCbs = [];
let modalCount = 0;

export function onModalClear(cb) {
  if (modalCount == 0) {
    cb();
    return;
  }
  modalClearCbs.push(cb);
}

export function getModalCount() {
  return modalCount;
}

export function showModal(el) {
  ++modalCount;
  const div = document.createElement('div');
  div.className = styles.root;
  document.body.appendChild(div);
  const originOnDismiss = el.props.onDismiss;
  render(
    React.cloneElement(el, {
      onDismiss: () => {
        originOnDismiss && originOnDismiss();
        unmountComponentAtNode(div);
        document.body.removeChild(div);
        if (--modalCount == 0) {
          for (const item of modalClearCbs.splice(0)) {
            item();
          }
        }
      },
    }),
    div
  );
}
