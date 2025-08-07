import React, { useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './TextArea.module.css';

export default function TextArea({
  name,
  value,
  onChange,
  placeholder = 'Type here...',
  maxLength = 500,
  className = '',
  showCounter = true,
  register,
  ...props
}) {
  const internalRef = useRef();

  const handleKeyDown = (e) => {
    const textarea = e.target;
    const { selectionStart, selectionEnd } = textarea;
    const selected = (textarea.value || '').slice(selectionStart, selectionEnd);

    // Bold
    if (e.ctrlKey && e.key === 'b') {
      e.preventDefault();
      insertFormatted(`**${selected}**`, selectionStart, selectionEnd);
    }

    // Italic
    if (e.ctrlKey && e.key === 'i') {
      e.preventDefault();
      insertFormatted(`*${selected}*`, selectionStart, selectionEnd);
    }

    // Bullet list
    if (e.key === 'Enter') {
      const lines = textarea.value.slice(0, selectionStart).split('\n');
      const prevLine = lines[lines.length - 1];
      const match = /^\s*([-*])\s/.exec(prevLine);
      if (match) {
        e.preventDefault();
        const prefix = prevLine.match(/^\s*/)[0] + match[1] + ' ';
        insertFormatted(`\n${prefix}`, selectionStart, selectionEnd, true);
      }
    }
  };

  const insertFormatted = (insertedText, start, end, isSuffix = false) => {
    const currentValue = value ?? internalRef.current?.value ?? '';
    const newText =
      currentValue.slice(0, start) + insertedText + currentValue.slice(end);

    if (onChange && name) {
      onChange({
        target: {
          name,
          value: newText,
        },
      });
    } else if (internalRef.current) {
      internalRef.current.value = newText;
      internalRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  const liveValue = value ?? internalRef.current?.value ?? '';

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      style={{ position: 'relative' }}>
      <TextareaAutosize
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        maxLength={maxLength}
        maxRows={6}
        ref={(el) => {
          internalRef.current = el;
          if (register && name) {
            const { ref, ...rest } = register(name);
            ref(el);
            Object.entries(rest).forEach(([key, val]) => {
              el?.setAttribute(key, val);
            });
          }
        }}
        className={styles.textarea}
        style={{
          overflow: 'auto',
          transition: 'height 0.2s ease-in-out',
        }}
        {...props}
      />
      {showCounter && (
        <div className={styles.counter}>
          {liveValue.length}/{maxLength}
        </div>
      )}
    </div>
  );
}
