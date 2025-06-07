import { useState } from 'react';
import './FileUploadModal.css';

const allowedExtensions = {
  doc: ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx'],
  image: ['.png', '.jpeg', '.jpg', '.webp'],
  video: ['.mp4', '.webm', '.avi'],
  audio: ['.mp3', '.aac', '.wav', '.wma'],
};

const getFileType = (name) => {
  const ext = name.slice(name.lastIndexOf('.')).toLowerCase();
  for (const type in allowedExtensions) {
    if (allowedExtensions[type].includes(ext)) return type;
  }
  return null;
};

const FileUploadModal = ({ isOpen, onClose, courseId, onUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = () => {
    if (!file) return;

    const fileType = getFileType(file.name);
    if (!fileType) {
      setError('Unsupported file type');
      return;
    }

    const newMedia = {
      id: `media-${Date.now()}`,
      fileType,
      allowedExt: allowedExtensions[fileType],
      src: URL.createObjectURL(file),
      name: file.name,
      dateAdded: new Date().toISOString().slice(0, 10),
      timeAdded: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onUpload(courseId, newMedia);
    setFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="upload-modal-overlay"
      onClick={onClose}>
      <div
        className="upload-modal"
        onClick={(e) => e.stopPropagation()}>
        <h3>Upload Media</h3>
        <input
          type="file"
          onChange={(e) => {
            setError('');
            setFile(e.target.files[0]);
          }}
        />
        {error && <p className="upload-error">{error}</p>}
        <div className="upload-actions">
          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={!file}>
            Upload
          </button>
          <button
            className="cancel-btn"
            onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
