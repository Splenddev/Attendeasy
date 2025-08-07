import React, { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

export default function MarkdownEditor({
  storageKey = 'markdown-draft',
  placeholder = 'Write your content here...',
  minWords = 100,
  viewMode = 'edit', // 'edit' | 'preview'
  onChange = () => {},
}) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setContent(saved);
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, content);
    onChange(content);
    validate(content);
  }, [content, storageKey, onChange]);

  const validate = (text) => {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    setError(
      wordCount < minWords
        ? `Minimum ${minWords} words required. Currently: ${wordCount}`
        : ''
    );
  };

  const handleChange = (val) => {
    setContent(val || '');
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <MDEditor
        value={content}
        onChange={handleChange}
        preview={viewMode}
        height={300}
        placeholder={placeholder}
        commandsFilter={(cmd) =>
          [
            'bold',
            'italic',
            'unordered-list',
            'ordered-list',
            'preview',
          ].includes(cmd.name)
            ? cmd
            : false
        }
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.9rem',
          marginTop: '0.5rem',
          color: '#666',
        }}>
        <span>{charCount} characters</span>
        <span>{wordCount} words</span>
      </div>

      {error && (
        <div
          style={{ color: 'red', marginTop: '0.25rem', fontSize: '0.85rem' }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
