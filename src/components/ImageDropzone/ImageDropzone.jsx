import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaTimes } from 'react-icons/fa';
import styles from './ImageDropzone.module.css';
import button from '../Button/Button';

export default function ImageDropzone({
  images = [],
  onDrop,
  onRemove,
  maxFiles = 5,
}) {
  const isSingle = maxFiles === 1;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      if (!onDrop) return;

      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      onDrop(isSingle ? [filesWithPreview[0]] : filesWithPreview);
    },
    [onDrop, isSingle]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: handleDrop,
    multiple: !isSingle,
    maxFiles,
  });

  // Normalize files array
  const files = Array.isArray(images)
    ? isSingle
      ? images.slice(0, 1)
      : images
    : [];

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  return (
    <div className={styles.wrapper}>
      {/* Show dropzone if allowed more */}
      {files.length < maxFiles && (
        <div
          {...getRootProps({
            className: `${styles.dropzone} ${
              isDragActive ? styles.active : ''
            }`,
          })}
          aria-label="Image upload area">
          <input {...getInputProps()} />
          <div className={styles.iconWrap}>
            <FaUpload className={styles.icon} />
          </div>
          <div className={styles.dropText}>
            <p>Drag & drop or click to upload</p>
            {maxFiles > 1 && (
              <small className={styles.limitText}>
                Max {maxFiles} image{isSingle ? '' : 's'}
              </small>
            )}
          </div>
        </div>
      )}

      {/* Previews */}
      {files.length > 0 && (
        <div className={styles.previewGrid}>
          {files.map((file, idx) => {
            let previewUrl = null;

            if (file.preview) {
              previewUrl = file.preview;
            } else if (typeof file === 'string') {
              previewUrl = file; // Assume it's a URL string
            } else if (file instanceof File) {
              try {
                previewUrl = URL.createObjectURL(file);
              } catch (err) {
                console.error('Invalid file preview:', err);
              }
            }

            return (
              <div
                key={idx}
                className={styles.previewItem}>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt={`preview-${idx}`}
                    className={styles.previewImage}
                  />
                )}
                {button.multiple({
                  icon: FaTimes,
                  label: `Remove image ${idx + 1}`,
                  func: () => onRemove(idx),
                  name: styles.removeBtn,
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
