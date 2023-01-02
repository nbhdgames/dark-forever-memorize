import React, { useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Input, TextArea } from '../components';
import { getCombKeyName } from './combKey';
import styles from './message.less';

const Alert = ({ title, onClose, children }) => {
  return (
    <div className={styles.mask}>
      <div className={styles.modal}>
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>{children}</div>
        <div className={styles.buttonList}>
          <Button onClick={onClose} autoFocus>
            确定
          </Button>
        </div>
      </div>
    </div>
  );
};

export function alert(title, message) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const root = createRoot(div);
  return new Promise((resolve) => {
    root.render(
      <Alert
        title={title}
        onClose={() => {
          root.unmount();
          document.body.removeChild(div);
          resolve();
        }}
      >
        {message}
      </Alert>
    );
  });
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
  const root = createRoot(div);
  return (
    new Promise() <
    boolean >
    ((resolve) => {
      root.render(
        <Confirm
          onConfirm={() => {
            root.unmount();
            document.body.removeChild(div);
            resolve(true);
          }}
          onCancel={() => {
            root.unmount();
            document.body.removeChild(div);
            resolve(false);
          }}
        >
          {message}
        </Confirm>
      );
    })
  );
}

const Prompt = ({ onConfirm, onCancel, defaultValue, children }) => {
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

export function prompt(message, defaultValue = '') {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const root = createRoot(div);
  return (
    (new Promise() < string) |
    (null >
      ((resolve) => {
        root.render(
          <Prompt
            defaultValue={defaultValue}
            onConfirm={(val) => {
              root.unmount();
              document.body.removeChild(div);
              resolve(val);
            }}
            onCancel={() => {
              root.unmount();
              document.body.removeChild(div);
              resolve(null);
            }}
          >
            {message}
          </Prompt>
        );
      }))
  );
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
  const root = createRoot(div);
  return (
    (new Promise() < string) |
    (null >
      ((resolve) => {
        root.render(
          <PromptTextArea
            defaultValue={defaultValue}
            onConfirm={(val) => {
              root.unmount();
              document.body.removeChild(div);
              resolve(val);
            }}
            onCancel={() => {
              root.unmount();
              document.body.removeChild(div);
              resolve(null);
            }}
          >
            {message}
          </PromptTextArea>
        );
      }))
  );
}
