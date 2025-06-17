import { useState, useEffect, useCallback } from 'react';
import {
  MdCheckCircle,
  MdGroupAdd,
  MdOutlineCheckCircleOutline,
  MdUploadFile,
} from 'react-icons/md';
import { useAuth } from '../../../../context/AuthContext';
import GroupPreview from './GroupPreview';
import { motion, AnimatePresence } from 'framer-motion';
import Cropper from 'react-easy-crop';
import './GroupReg.css';
import getCroppedImg from '../../../../utils/cropImages';

const GroupReg = () => {
  const { user } = useAuth();

  const [step, setStep] = useState(1); // Step 1 = form, Step 2 = preview
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [banner, setBanner] = useState(null);
  const [bannerUrl, setBannerUrl] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [fileName, setFileName] = useState('Upload Banner');

  const [formData, setFormData] = useState({
    groupName: '',
    course: '',
    description: `A group created for ${user.level} level students in the Department of ${user.department}, Faculty of ${user.faculty}. Here, members can manage attendance, receive announcements, and share academic materials.`,
    classRules: '',
    assistantReps: '',
    attendancePolicy: {
      minPercentage: 75,
      allowPlea: true,
    },
    visibility: 'public',
    academicYear: '',
    groupLink: '',
  });

  const [classSchedule, setClassSchedule] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested attendance policy fields
    if (name.startsWith('attendancePolicy.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        attendancePolicy: {
          ...prev.attendancePolicy,
          [key]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleScheduleChange = (index, field, value) => {
    setClassSchedule((prev) =>
      prev.map((entry, i) => {
        if (i !== index) return entry;

        if (field === 'day') {
          return { ...entry, day: value };
        }

        // For timing fields (startTime or endTime)
        return {
          ...entry,
          timing: {
            ...entry.timing,
            [field]: value,
          },
        };
      })
    );
  };

  const addSchedule = () => {
    setClassSchedule((prev) => [
      ...prev,
      { day: '', timing: { startTime: '', endTime: '' } },
    ]);
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTempImage({ file, url });
      setFileName(
        file.name.length > 20 ? file.name.slice(0, 17) + '...' : file.name
      );
      setShowCropModal(true);
    }
  };

  const handleCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const applyCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(
        tempImage.url,
        croppedAreaPixels
      );
      setBanner(croppedImage.file);
      setBannerUrl(croppedImage.url);
      setShowCropModal(false);
    } catch (err) {
      console.error('Crop failed:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullPayload = {
      ...formData,
      department: user.department,
      faculty: user.faculty,
      level: user.level,
      schedule: classSchedule,
    };
    if (isMobile) setStep(2);
    else console.log('Submitting full data:', fullPayload);
  };

  const fullData = {
    ...formData,
    department: user.department,
    faculty: user.faculty,
    level: user.level,
    schedule: classSchedule,
  };

  const showForm = !isMobile || (isMobile && step === 1);
  const showPreview = !isMobile || (isMobile && step === 2);

  return (
    <div className="group-reg-wrapper">
      <div className={`group-reg-container ${isMobile ? '' : 'desktop'}`}>
        <AnimatePresence>
          {showForm && (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className={`group-reg-form ${isMobile ? '' : 'desktop'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}>
              <div className="group-reg-header">
                <MdGroupAdd
                  size={60}
                  color="#25aff3"
                />
                <h2>Create Your Class Group</h2>
              </div>

              <label className="group-reg-label">
                Group Name
                <input
                  className="group-reg-input"
                  type="text"
                  name="groupName"
                  placeholder="e.g. Class of Chemistry – 200 Level"
                  value={formData.groupName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="group-reg-label">
                Course
                <input
                  type="text"
                  name="course"
                  placeholder="e.g. Organic Chemistry"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="group-reg-input"
                />
              </label>

              <label className="group-reg-label group-reg-upload-label">
                Banner Image
                <div className="custom-file-upload">
                  <MdUploadFile size={24} />
                  <span>{fileName}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="hidden-file-input"
                  />
                </div>
              </label>

              <label className="group-reg-label">
                Description (optional)
                <textarea
                  name="description"
                  placeholder="Write a short description..."
                  value={formData.description}
                  className="group-reg-input group-reg-textarea"
                  onChange={handleChange}
                />
              </label>

              <label className="group-reg-label">
                Assistant Reps (matric numbers, comma-separated)
                <input
                  name="assistantReps"
                  placeholder="e.g. 20/1234, 20/5678"
                  value={formData.assistantReps}
                  onChange={handleChange}
                  className="group-reg-input"
                />
              </label>

              <label className="group-reg-label">
                Class Rules
                <textarea
                  name="classRules"
                  placeholder="Specify group behavior expectations..."
                  value={formData.classRules}
                  onChange={handleChange}
                  className="group-reg-input group-reg-textarea"
                />
              </label>

              <fieldset className="group-reg-label">
                <legend>Attendance Policy</legend>
                <label>
                  Min Attendance (%)
                  <input
                    type="number"
                    name="attendancePolicy.minPercentage"
                    value={formData.attendancePolicy.minPercentage}
                    onChange={handleChange}
                    min={0}
                    max={100}
                  />
                </label>
                <label>
                  {formData.attendancePolicy.allowPlea ? (
                    <MdCheckCircle color="var(--main-color)" />
                  ) : (
                    <MdOutlineCheckCircleOutline color="var(--main-color)" />
                  )}
                  <input
                    type="checkbox"
                    name="attendancePolicy.allowPlea"
                    checked={formData.attendancePolicy.allowPlea}
                    className="visually-hidden"
                    onChange={handleChange}
                  />
                  Allow Absent Pleas
                </label>
              </fieldset>

              <fieldset className="group-reg-label">
                <legend>Class Schedules</legend>
                {classSchedule.map((entry, i) => (
                  <div
                    key={i}
                    className="schedule-row">
                    <select
                      value={entry.day}
                      onChange={(e) =>
                        handleScheduleChange(i, 'day', e.target.value)
                      }
                      required>
                      <option value="">Day</option>
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                    </select>
                    <div>
                      <input
                        type="time"
                        value={entry.timing.startTime}
                        onChange={(e) =>
                          handleScheduleChange(i, 'startTime', e.target.value)
                        }
                        required
                      />
                      <input
                        type="time"
                        value={entry.timing.endTime}
                        onChange={(e) =>
                          handleScheduleChange(i, 'endTime', e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                ))}
                <button
                  className="add-schedule-btn"
                  type="button"
                  onClick={addSchedule}>
                  + Add
                </button>
              </fieldset>

              <label className="group-reg-label">
                Academic Year
                <input
                  type="text"
                  name="academicYear"
                  placeholder="e.g. 2024/2025"
                  value={formData.academicYear || ''}
                  onChange={handleChange}
                  className="group-reg-input"
                />
              </label>

              <label className="group-reg-label">
                Visibility
                <select
                  name="visibility"
                  className="group-reg-input"
                  value={formData.visibility || 'public'}
                  onChange={handleChange}>
                  <option value="public">
                    Public – Anyone can search & request
                  </option>
                  <option value="private">
                    Private – Only via invite/join code
                  </option>
                </select>
              </label>

              <label className="group-reg-label">
                WhatsApp / Telegram Link (optional)
                <input
                  type="url"
                  name="groupLink"
                  placeholder="Paste link to class group"
                  value={formData.groupLink || ''}
                  className="group-reg-input"
                  onChange={handleChange}
                />
              </label>

              <button
                type="submit"
                className="group-reg-button">
                <MdGroupAdd size={16} /> {isMobile ? 'Next' : 'Create Group'}
              </button>
            </motion.form>
          )}

          {showPreview && (
            <motion.div
              key="preview"
              className={
                isMobile ? 'group-preview-mobile' : 'group-preview-desktop'
              }
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}>
              {isMobile && (
                <button
                  onClick={() => setStep(1)}
                  className="group-reg-back-button">
                  ← Go Back
                </button>
              )}
              <GroupPreview
                data={fullData}
                bannerUrl={bannerUrl}
                role={user.role}
                disabled={showPreview}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {showCropModal && (
          <div className="crop-modal">
            <div className="crop-container">
              <Cropper
                image={tempImage.url}
                crop={crop}
                zoom={zoom}
                aspect={5 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
              <div className="crop-actions">
                <button onClick={() => setShowCropModal(false)}>Cancel</button>
                <button onClick={applyCrop}>Crop & Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupReg;
