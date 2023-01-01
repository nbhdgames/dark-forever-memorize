import styles from './toast.less';

export function toast(message) {
  const root = document.createElement('div');
  root.className = styles.root;
  const container = document.createElement('div');
  container.className = styles.container;
  container.appendChild(document.createTextNode(message));
  root.appendChild(container);

  document.body.appendChild(root);

  setTimeout(() => {
    container.className = styles.container + ' ' + styles.visible;
  });

  let dismissed = false;
  function dismiss() {
    if (dismissed) {
      return;
    }
    dismissed = true;
    container.className = styles.container;
    setTimeout(() => {
      document.body.removeChild(root);
    }, 300);
  }
  container.addEventListener('click', dismiss);

  setTimeout(dismiss, 1700);
}
