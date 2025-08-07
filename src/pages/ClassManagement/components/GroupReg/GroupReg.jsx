import { useState, useEffect, useCallback } from 'react';
import {
  MdAdd,
  MdCheckCircle,
  MdClose,
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
import { createGroup } from '../../../../services/group.service';
import Spinner from '../../../../components/Loader/Spinner/Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getUser } from '../../../../services/auth.service';
import TagsSelect from '../../../../components/TagsSelect/TagsSelect';
import TextArea from '../../../../components/TextArea/TextArea';
import button from '../../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

const GroupReg = ({ fetchGroup }) => {
  const { user, updateUser } = useAuth();

  const navigate = useNavigate();

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
    description: `A group created for ${user.level} level students in the Department of ${user.department}, Faculty of ${user.faculty}. Here, members can manage attendance, receive announcements, and share academic materials.`,
    classRules: '',
    attendancePolicy: {
      minPercentage: 75,
      allowPlea: true,
    },
    visibility: 'public',
    academicYear: '',
    groupLink: '',
    tags: [],
    breaks: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const TAG_OPTIONS = [
    'official',
    'unofficial',
    'freshers',
    'final year',
    'staylite',
    // 'tutorial group',
    // 'study group',
    'departmental',
    // 'faculty-based',
    'postgraduate',
    'undergraduate',
    // 'course-specific',
    'level-specific',
    'general',
  ];

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

  const [showAllBreaks, setShowAllBreaks] = useState(false);

  const toggleShowAll = () => setShowAllBreaks((prev) => !prev);

  // Optional error object
  const isDateRangeInvalid = (from, to) => {
    return new Date(from) > new Date(to);
  };

  const handleBreakChange = (index, field, value) => {
    const updated = [...formData.breaks];
    updated[index][field] = value;
    setFormData({ ...formData, breaks: updated });
  };

  const addBreak = () => {
    setFormData((prev) => ({
      ...prev,
      breaks: [...prev.breaks, { title: '', from: '', to: '' }],
    }));
  };

  const removeBreak = (index) => {
    const updated = [...formData.breaks];
    updated.splice(index, 1);
    setFormData({ ...formData, breaks: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullPayload = {
      ...formData,
      department: user.department,
      faculty: user.faculty,
      level: user.level.includes('L') ? user.level : user.level + 'L',
    };

    // Debug
    console.log('Submitting payload:', fullPayload);

    // ✅ Prepare FormData
    const formDataToSend = new FormData();

    for (const key in fullPayload) {
      const value = fullPayload[key];

      if (['schedule', 'attendancePolicy', 'tags', 'breaks'].includes(key)) {
        formDataToSend.append(key, JSON.stringify(value)); // Send as JSON string
      } else {
        formDataToSend.append(key, value ?? '');
      }
    }

    if (banner) {
      formDataToSend.append('banner', banner); // already a File
    }

    try {
      const result = await createGroup(formDataToSend);
      console.log('Group created successfully:', result);

      if (isMobile) {
        setStep(2);
      }
      if (result.success) {
        try {
          const res = await getUser();
          if (res.success) {
            updateUser(res.user);
          }
        } catch (fetchErr) {
          console.error(
            'Failed to refresh user after group creation:',
            fetchErr
          );
        }
        toast.success(result.message);
        navigate('/class-rep/courses/new');
      }
    } catch (err) {
      console.error('Error creating group:', err.response?.data || err.message);
      toast.error(`Error creating group: ${err.response?.data || err.message}`);
      // Optionally show feedback to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const fullData = {
    ...formData,
    department: user.department,
    faculty: user.faculty,
    level: user.level,
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
                <b className="grp-desc">Description (optional)</b>
                <TextArea
                  value={formData.description}
                  placeholder="Provide a brief description of this group."
                  name="description"
                  onChange={handleChange}
                />
              </label>

              <label className="group-reg-label">
                Class Rules
                <TextArea
                  value={formData.classRules}
                  name="classRules"
                  onChange={handleChange}
                  placeholder="Specify group behavior expectations..."
                  maxLength={200}
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
                <legend>Break Periods</legend>

                <AnimatePresence>
                  {(showAllBreaks
                    ? formData.breaks
                    : formData.breaks.slice(0, 3)
                  ).map((breakItem, i) => {
                    const dateError =
                      breakItem.from &&
                      breakItem.to &&
                      isDateRangeInvalid(breakItem.from, breakItem.to);

                    return (
                      <motion.div
                        key={i}
                        className="schedule-row"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}>
                        <div className="break-item">
                          <input
                            type="text"
                            placeholder="Break Title e.g Mid Semester break"
                            value={breakItem.title}
                            onChange={(e) =>
                              handleBreakChange(i, 'title', e.target.value)
                            }
                            required
                          />
                          <input
                            type="date"
                            value={breakItem.from}
                            className={dateError ? 'error' : ''}
                            onChange={(e) =>
                              handleBreakChange(i, 'from', e.target.value)
                            }
                            required
                          />
                          <input
                            type="date"
                            value={breakItem.to}
                            className={dateError ? 'error' : ''}
                            onChange={(e) =>
                              handleBreakChange(i, 'to', e.target.value)
                            }
                            required
                          />
                          {dateError && (
                            <p className="error-msg">
                              "From" date cannot be after "To" date
                            </p>
                          )}
                        </div>
                        {button.multiple({
                          icon: MdClose,
                          func: () => removeBreak(i),
                          element: 'Remove',
                          name: 'remove-btn',
                        })}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {formData.breaks.length > 3 &&
                  button.normal({
                    func: () => toggleShowAll(),
                    element: showAllBreaks
                      ? 'Collapse'
                      : `Show All (${formData.breaks.length})`,
                    name: 'toggle-show-all',
                  })}

                {button.multiple({
                  icon: MdAdd,
                  func: () => addBreak(),
                  element: 'Add Break',
                  name: 'add-schedule-btn',
                })}
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

              <TagsSelect
                TAG_OPTIONS={TAG_OPTIONS}
                selectedTags={formData.tags}
                setForm={setFormData}
                max={5}
              />

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

              {button.normal({
                element: isSubmitting ? (
                  <Spinner />
                ) : (
                  <>
                    <MdGroupAdd size={16} />{' '}
                    {isMobile ? 'Next' : 'Create Group'}
                  </>
                ),
                disabled: isSubmitting,
                name: 'group-reg-button',
                type: 'submit',
              })}
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
                isMobile={isMobile}
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
                aspect={3 / 1.5}
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
