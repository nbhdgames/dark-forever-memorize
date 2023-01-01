import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { Button } from '../button';

export function Input({ onValueChange, onChange, ...others }) {
  const handleChange = useCallback(
    (ev) => {
      onChange && onChange(ev);
      if (!ev.isDefaultPrevented) {
        return;
      }
      onValueChange && onValueChange(ev.currentTarget.value);
    },
    [onChange, onValueChange]
  );
  return (
    <div className={styles.container}>
      <input className={styles.input} {...others} onChange={handleChange} />
    </div>
  );
}

export function TextArea({ onValueChange, onChange, ...others }) {
  const handleChange = useCallback(
    (ev) => {
      onChange && onChange(ev);
      if (!ev.isDefaultPrevented) {
        return;
      }
      onValueChange && onValueChange(ev.currentTarget.value);
    },
    [onChange, onValueChange]
  );
  return (
    <div className={styles.container}>
      <textarea
        className={styles.textArea}
        {...others}
        onChange={handleChange}
      />
    </div>
  );
}

export function SearchInput({ onValueChange, onChange, value, ...others }) {
  const handleChange = useCallback(
    (ev) => {
      onChange && onChange(ev);
      if (!ev.isDefaultPrevented) {
        return;
      }
      onValueChange && onValueChange(ev.currentTarget.value);
    },
    [onChange, onValueChange]
  );
  const handleClear = useCallback(() => {
    onValueChange('');
  }, []);
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={value}
        {...others}
        onChange={handleChange}
      />
      <div
        className={classnames(styles.clear, value === '' && styles.disabled)}
        onClick={handleClear}
      >
        ×
      </div>
    </div>
  );
}

export function InputNumber({
  onValueChange,
  onChange,
  min,
  max,
  value,
  className,

  ...others
}) {
  const [text, setText] = useState(() => String(value || 0));

  useEffect(() => {
    setText(String(value));
  }, [value]);

  const handleChange = useCallback(
    (ev) => {
      onChange && onChange(ev);
      if (!ev.isDefaultPrevented) {
        return;
      }
      setText(ev.currentTarget.value);
    },
    [onChange, onValueChange]
  );
  const resetText = useCallback(() => {
    let val = Math.floor(Number(text));
    if (min) {
      val = Math.max(min, val);
    }
    if (max) {
      val = Math.min(max, val);
    }
    onValueChange && onValueChange(val);
    setText(String(val));
  }, [text, value]);

  const handleInc = useCallback(() => {
    if (value < max) {
      onValueChange && onValueChange(value + 1);
    }
  }, [value, max]);
  const handleDec = useCallback(() => {
    if (value > min) {
      onValueChange && onValueChange(value - 1);
    }
  }, [value, min]);

  return (
    <div className={styles.container}>
      <Button
        disabled={value <= min}
        className={styles.btn}
        onClick={handleDec}
      >
        -
      </Button>
      <input
        className={classnames(styles.input, styles.inputNum, className)}
        {...others}
        value={text}
        onChange={handleChange}
        onBlur={resetText}
      />
      <Button
        disabled={value >= max}
        className={styles.btn}
        onClick={handleInc}
      >
        +
      </Button>
    </div>
  );
}
