import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
  FaTimes,
  FaUpload,
  FaFileAlt,
  FaImage,
  FaVideo,
  FaMusic,
  FaLink,
  FaTrash,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { uploadScheduleMedia } from '../../../services/schedule.media.service';
import styles from './FileUploadModal.module.css';

const allowedExtensionsMap = {
  doc: ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx'],
  image: ['.png', '.jpeg', '.jpg', '.webp'],
  video: ['.mp4', '.webm', '.avi'],
  audio: ['.mp3', '.aac', '.wav', '.wma'],
};

const MAX_SIZE_MB = 20;

const getFileType = (name = '') => {
  const ext = name.slice(name.lastIndexOf('.')).toLowerCase();
  return (
    Object.keys(allowedExtensionsMap).find((type) =>
      allowedExtensionsMap[type].includes(ext)
    ) || null
  );
};

const validateFile = (file, existingNames = []) => {
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  const sizeMb = file.size / (1024 * 1024);

  if (sizeMb > MAX_SIZE_MB) return 'File too large (max 20 MB)';
  if (!Object.values(allowedExtensionsMap).flat().includes(ext))
    return 'Unsupported file type';
  if (existingNames.includes(file.name)) return 'File already uploaded';
  return null;
};

const iconMap = {
  doc: FaFileAlt,
  image: FaImage,
  video: FaVideo,
  audio: FaMusic,
  link: FaLink,
};

const FileUploadModal = ({
  isOpen,
  onClose,
  scheduleId,
  existingMediaNames = [],
  onSuccess,
  defaultRequireApproval = false,
}) => {
  const [files, setFiles] = useState([]);
  const [linkUrl, setLinkUrl] = useState('');
  const [requireApproval, setRequireApproval] = useState(
    defaultRequireApproval
  );
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newValid = [];
      for (const file of acceptedFiles) {
        const error = validateFile(
          file,
          files.map((f) => f.name).concat(existingMediaNames)
        );
        if (error) toast.warning(`${file.name}: ${error}`);
        else newValid.push(file);
      }
      if (newValid.length > 0) {
        setFiles((prev) => [...prev, ...newValid]);
        setError('');
      }
    },
    [files, existingMediaNames]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openFilePicker,
  } = useDropzone({ onDrop, multiple: true, noClick: true });

  const handleRemove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    const formData = new FormData();

    if (linkUrl.trim()) {
      formData.append('link', linkUrl.trim());
      formData.append('fileType', 'link');
      formData.append('name', linkUrl.trim());
    } else if (files.length === 0) {
      return setError('Add at least one file or a valid link');
    } else {
      files.forEach((file) => formData.append('files', file));
    }

    formData.append('requireApproval', requireApproval);

    try {
      setIsUploading(true);
      await uploadScheduleMedia(scheduleId, formData, (p) => setProgress(p));
      toast.success('Upload successful 🎉');
      onSuccess?.();
      setFiles([]);
      setLinkUrl('');
      onClose();
    } catch (err) {
      setIsUploading(false);
      toast.error(err?.message || 'Upload failed');
    }
  };

  const backdropMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalMotion = {
    initial: { opacity: 0, scale: 0.9, y: 50 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] },
    },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          {...backdropMotion}
          onClick={() => !isUploading && onClose()}>
          <motion.div
            className={styles.modalContainer}
            {...modalMotion}
            onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Add Media</h3>
              <button
                className={styles.iconBtn}
                disabled={isUploading}
                onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div
              {...getRootProps()}
              className={styles.dropzone}>
              <input {...getInputProps()} />
              {isDragActive ? 'Drop files here…' : 'Drag files here'}
              <br />
              <button
                type="button"
                onClick={openFilePicker}
                disabled={isUploading}>
                {files ? 'Add More (max = 10)' : 'Browse'}
              </button>
            </div>

            <div className={styles.previewGrid}>
              {files.map((file, i) => {
                const type = getFileType(file.name);
                const Icon = iconMap[type] || FaFileAlt;
                const isMedia = type === 'image' || type === 'video';
                const previewUrl = URL.createObjectURL(file);
                return (
                  <div
                    key={i}
                    className={styles.previewItem}
                    title={file.name}>
                    {isMedia ? (
                      type === 'image' ? (
                        <img
                          src={previewUrl}
                          alt="preview"
                          onLoad={() => URL.revokeObjectURL(previewUrl)}
                        />
                      ) : (
                        <video
                          src={previewUrl}
                          controls
                          onLoadedData={() => URL.revokeObjectURL(previewUrl)}
                        />
                      )
                    ) : (
                      <div className={styles.previewIcon}>
                        <Icon />
                      </div>
                    )}
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemove(i)}>
                      <FaTrash />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className={styles.or}>or</div>

            <div className={styles.inputGroup}>
              <label>Link</label>
              <input
                type="url"
                placeholder="https://example.com/resource"
                value={linkUrl}
                disabled={isUploading}
                onChange={(e) => {
                  setLinkUrl(e.target.value);
                  if (e.target.value) setFiles([]);
                }}
              />
            </div>

            <div className={styles.checkbox}>
              <input
                id="approveChk"
                type="checkbox"
                checked={requireApproval}
                disabled={isUploading}
                onChange={(e) => setRequireApproval(e.target.checked)}
              />
              <label htmlFor="approveChk">Require approval</label>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {isUploading && (
              <>
                <div className={styles.progressContainer}>
                  <motion.div
                    className={styles.progressBar}
                    style={{ width: `${progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <small>{progress}%</small>
              </>
            )}

            <div className={styles.modalActions}>
              <button
                className={styles.uploadBtn}
                disabled={isUploading || (files.length === 0 && !linkUrl)}
                onClick={handleUpload}>
                {isUploading ? (
                  'Uploading…'
                ) : (
                  <>
                    <FaUpload /> Upload
                  </>
                )}
              </button>
              <button
                className={styles.cancelBtn}
                disabled={isUploading}
                onClick={onClose}>
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

FileUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  scheduleId: PropTypes.string.isRequired,
  existingMediaNames: PropTypes.arrayOf(PropTypes.string),
  onSuccess: PropTypes.func,
  defaultRequireApproval: PropTypes.bool,
};

export default FileUploadModal;
