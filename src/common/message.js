import React, { useCallback, useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Button, Input, TextArea } from '../components';
import { getCombKeyName } from './combKey';
import styles from './message.less';

const Alert = ({ title, onClose, children, buttons }) => {
  return (
    <div className={styles.mask}>
      <div className={styles.modal}>
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>{children}</div>
        <div className={styles.buttonList}>
          {!buttons && (
            <div
              className={styles.button}
              onClick={onClose}
              autoFocus
              role="button"
            >
              确定
            </div>
          )}
          {buttons &&
            buttons.map((v) => (
              <div className={styles.button} onClick={v.onPress} role="button">
                {v.text}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export function alert(title, message, buttons) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return new Promise((resolve) => {
    render(
      <Alert
        title={title}
        onClose={() => {
          unmountComponentAtNode(div);
          document.body.removeChild(div);
          resolve();
        }}
        buttons={buttons}
      >
        {message}
      </Alert>
    );
  }, div);
}

const Confirm = ({ onConfirm, onCancel, children }) => {
  return (
    <div className={styles.mask}>
      <div className={styles.modal}>
        <div className={styles.message}>{children}</div>
        <div className={styles.buttonList}>
          <Button onClick={onConfirm} autoFocus>
            确定
          </Button>
          <Button onClick={onCancel}>取消</Button>
        </div>
      </div>
    </div>
  );
};

export function confirm(message) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  return new Promise()((resolve) => {
    render(
      <Confirm
        onConfirm={() => {
          unmountComponentAtNode(div);
          document.body.removeChild(div);
          resolve(true);
        }}
        onCancel={() => {
          unmountComponentAtNode(div);
          document.body.removeChild(div);
          resolve(false);
        }}
      >
        {message}
      </Confirm>,
      div
    );
  });
}

const Prompt = ({ title, onConfirm, onCancel, defaultValue, children }) => {
  const [val, setVal] = useState(defaultValue || '');

  const handleConfirm = useCallback(() => {
    onConfirm(val);
  }, [val]);

  const handleKeyDown = useCallback(
    (ev) => {
      switch (getCombKeyName(ev)) {
        case 'Enter': {
          ev.stopPropagation();
          handleConfirm();
          break;
        }
        default:
          return;
      }
    },
    [handleConfirm]
  );

  return (
    <div className={styles.mask}>
      <div className={styles.modal}>
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>{children}</div>
        <Input
          autoFocus
          value={val}
          onValueChange={setVal}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.buttonList}>
          <Button onClick={handleConfirm}>确定</Button>
          <Button onClick={onCancel}>取消</Button>
        </div>
      </div>
    </div>
  );
};

export function prompt(title, message, defaultValue = '') {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return new Promise((resolve) => {
    render(
      <Prompt
        title={title}
        defaultValue={defaultValue}
        onConfirm={(val) => {
          unmountComponentAtNode(div);
          document.body.removeChild(div);
          resolve(val);
        }}
        onCancel={() => {
          unmountComponentAtNode(div);
          document.body.removeChild(div);
          resolve(null);
        }}
      >
        {message}
      </Prompt>,
      div
    );
  });
}

const PromptTextArea = ({ onConfirm, onCancel, defaultValue, children }) => {
  const [val, setVal] = useState(defaultValue || '');

  const handleConfirm = useCallback(() => {
    onConfirm(val);
  }, [val]);

  return (
    <div className={styles.mask}>
      <div className={styles.modal}>
        <div className={styles.message}>{children}</div>
        <TextArea autoFocus value={val} onValueChange={setVal} />
        <div className={styles.buttonList}>
          <Button onClick={handleConfirm}>确定</Button>
          <Button onClick={onCancel}>取消</Button>
        </div>
      </div>
    </div>
  );
};

export function promptTextArea(message, defaultValue = '') {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return new Promise((resolve) => {
    render(
      <PromptTextArea
        defaultValue={defaultValue}
        onConfirm={(val) => {
          unmountComponentAtNode(div);
          document.body.removeChild(div);
          resolve(val);
        }}
        onCancel={() => {
          unmountComponentAtNode(div);
          document.body.removeChild(div);
          resolve(null);
        }}
      >
        {message}
      </PromptTextArea>,
      div
    );
  });
}
