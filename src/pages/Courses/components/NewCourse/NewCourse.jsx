import { LuSend, LuUniversity } from 'react-icons/lu';
import { FaGraduationCap, FaSpinner, FaUserGraduate } from 'react-icons/fa';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { useAuth } from '../../../../context/AuthContext';
import TextArea from '../../../../components/TextArea/TextArea';
import TagsSelect from '../../../../components/TagsSelect/TagsSelect';
import ImageDropzone from '../../../../components/ImageDropzone/ImageDropzone';

import styles from './NewCourse.module.css';
import useCourses from '../../../../hooks/useCourses';
import { useLocation, useNavigate } from 'react-router-dom';
import { useErrorModal } from '../../../../hooks/useErrorModal';
import { useSuccessModal } from '../../../../hooks/useSuccessModal';
import Spinner from '../../../../components/Loader/Spinner/Spinner';
import { getUser } from '../../../../services/auth.service';
import button from '../../../../components/Button/Button';

const NewCourse = () => {
  const { user, updateUser, setNavTitle } = useAuth();

  useEffect(() => setNavTitle('Add New Course'), [setNavTitle]);

  const location = useLocation();
  const { addCourse, loading, courses } = useCourses(
    !location.pathname.split('/').includes('new')
  );
  const { open: openError } = useErrorModal();
  const { open: openSuccess } = useSuccessModal();
  const level = user.level.split('L')[0];

  const [images, setImages] = useState([]);
  const [instructorImage, setInstructorImage] = useState([]);
  const [imageError, setImageError] = useState('');

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      courseCode: '',
      courseTitle: '',
      unit: 0,
      instructor: {
        name: '',
        email: '',
        photo: '',
      },
      description: '',
      durationWeeks: '',
      classesPerWeek: '',
      tags: [],
    },
  });

  const navigate = useNavigate();

  const desc = watch('description');

  const courseTags = [
    'Core',
    'Elective',
    'General Studies',
    'Lab Course',
    'Seminar',
    'Project-Based',
    'Thesis',
    'Practical',
    'Research',
    'Workshop',
    'Tutorial',
    'Introductory',
    'Intermediate',
    'Advanced',
    'Foundational',
    'Morning',
    'Afternoon',
    'Evening',
    'Weekend',
    'Virtual Class',
    'In-Person',
    'Theoretical',
    'Applied',
    'Technical',
    'Quantitative',
    'Creative',
    'Analytical',
    'Case Study',
    'Mandatory',
    'Optional',
    'Departmental',
    'Inter-Faculty',
  ];

  const handleAddImages = (newFiles) => {
    setImageError('');
    setImages((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (updated.length === 0) setImageError('Cover image is required');
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      setImageError('Cover image is required');
      return;
    }

    const payload = {
      ...data,
      thumbnail: images,
      instructor: {
        name: data.instructor.name,
        email: data.instructor.email,
        photo: instructorImage,
      },
      faculty: user.faculty,
      department: user.department,
      level: user.level,
      createdBy: user._id,
      group: user.group,
    };

    const {
      courseCode,
      courseTitle,
      unit,
      instructor: { name: instructorName, email: instructorEmail },
      description,
      durationWeeks,
      classesPerWeek,
      tags,
    } = data;

    const formData = new FormData();

    formData.append('courseCode', courseCode);
    formData.append('courseTitle', courseTitle);
    formData.append('unit', unit.toString());
    formData.append('level', user.level);
    formData.append('department', user.department);
    formData.append('faculty', user.faculty);
    formData.append('durationWeeks', durationWeeks.toString());
    formData.append('classesPerWeek', classesPerWeek.toString());

    formData.append('description', description);

    formData.append('tags', JSON.stringify(tags || []));

    formData.append(
      'instructor',
      JSON.stringify({
        name: instructorName,
        email: instructorEmail,
      })
    );

    if (instructorImage instanceof File) {
      formData.append('instructorImage', instructorImage);
    }

    if (images?.length) {
      formData.append('thumbnail', images[0]);
    }

    try {
      const res = await addCourse(formData);
      if (res?.success) {
        reset();
        setInstructorImage([]);
        setImages([]);
        openSuccess(res.course);

        if (!courses || courses.length === 0) {
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
          navigate('/class-rep/courses');
        }
      }
    } catch (err) {
      console.log(err);
      openError(err);
    }

    console.log('Form Submitted:', payload);
    // TODO: submit to backend
  };

  useEffect(() => {
    return () => {
      images.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [images]);

  return (
    <div className={styles.newCoursePage}>
      <h2 className={styles.heading}>Add New Course</h2>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}>
        {/* Course Basics */}
        <section className={styles.courseBasics}>
          <label>
            <span className={styles.label}>Course Code</span>
            <input
              type="text"
              placeholder="e.g., BCH105"
              {...register('courseCode', { required: true })}
            />
            {errors.courseCode && (
              <p className={styles.error}>Course code is required</p>
            )}
          </label>
          <label>
            <span className={styles.label}>Credit Unit</span>
            <input
              type="number"
              placeholder="e.g., 1"
              {...register('unit', { required: true })}
            />
            {errors.unit && (
              <p className={styles.error}>Course unit is required</p>
            )}
          </label>

          <label>
            <span className={styles.label}>Course Title</span>
            <input
              type="text"
              placeholder="Your course title goes here..."
              {...register('courseTitle', { required: true })}
            />
            {errors.courseTitle && (
              <p className={styles.error}>Course title is required</p>
            )}
          </label>
        </section>

        {/* Static Info */}
        <section className={styles.userBasics}>
          <div className={styles.userBasicsCard}>
            <h4>Faculty</h4>
            <div className={styles.selectWrap}>
              <div
                className={styles.iconWrap}
                style={{ background: 'var(--late-light)' }}>
                <LuUniversity color="var(--late)" />
              </div>
              <b>{user.faculty}</b>
            </div>
          </div>
          <div className={styles.userBasicsCard}>
            <h4>Department</h4>
            <div className={styles.selectWrap}>
              <div
                className={styles.iconWrap}
                style={{ background: 'var(--green-light)' }}>
                <FaGraduationCap color="var(--green)" />
              </div>
              <b>{user.department}</b>
            </div>
          </div>
          <div className={styles.userBasicsCard}>
            <h4>Level</h4>
            <div className={styles.selectWrap}>
              <div
                className={styles.iconWrap}
                style={{ background: 'var(--main-color-light)' }}>
                <FaUserGraduate color="var(--main-color)" />
              </div>
              <b>{level}</b>
            </div>
          </div>
        </section>

        <section className={styles.instructorSection}>
          <h3>Instructor Information</h3>

          <div className={styles.inputs}>
            <label className={styles.label}>
              <b>Name</b>
              <input
                {...register('instructor.name', {
                  required: 'Instructor name is required',
                })}
                className={styles.input}
                placeholder="Dr. John Doe"
              />
              {errors.instructor?.name && (
                <span className={styles.error}>
                  {errors.instructor.name.message}
                </span>
              )}
            </label>

            <label className={styles.label}>
              <b>Email</b>
              <input
                type="email"
                {...register('instructor.email', {
                  pattern: {
                    value: /^\S+@\S+$/,
                    message: 'Enter a valid email',
                  },
                })}
                className={styles.input}
                placeholder="john.doe@university.edu"
              />
              {errors.instructor?.email && (
                <span className={styles.error}>
                  {errors.instructor.email.message}
                </span>
              )}
            </label>
          </div>

          <div className={styles.instructorImage}>
            <b>Instructor Photo</b>
            <ImageDropzone
              images={instructorImage}
              onDrop={(file) => {
                setInstructorImage(file);
              }}
              onRemove={() => setInstructorImage([])}
              maxFiles={1}
            />
          </div>
        </section>

        {/* Description */}
        <section className={styles.description}>
          <h4>Course Description</h4>
          <TextArea
            value={desc}
            placeholder="Provide a brief description of this course. What will students learn?"
            {...register('description', { required: true })}
            maxLength={750}
          />
          {errors.description && (
            <p className={styles.error}>Course description is required</p>
          )}
        </section>

        {/* Duration & Classes */}
        <section className={styles.inputs}>
          <label className={styles.label}>
            <p>
              How many weeks will this course run for?
              <span className={styles.helperText}>
                (Enter the total number of weeks students are expected to
                attend.)
              </span>
            </p>
            <input
              type="number"
              placeholder="e.g., 12"
              {...register('durationWeeks', {
                required: 'This field is required',
                min: { value: 5, message: 'Must be at least 5 week' },
              })}
              className={styles.input}
            />

            {errors.durationWeeks && (
              <span className={styles.error}>
                {errors.durationWeeks.message}
              </span>
            )}
          </label>

          <label className={styles.label}>
            <p>
              How many class sessions will take place each week?
              <span className={styles.helperText}>
                (Specify how many times the class will meet per week — e.g., 2
                for Mondays & Thursdays.)
              </span>
            </p>
            <input
              type="number"
              placeholder="e.g., 3"
              {...register('classesPerWeek', {
                required: 'This field is required',
                min: {
                  value: 1,
                  message: 'Must be at least 1 session per week',
                },
              })}
              className={styles.input}
            />
            {errors.classesPerWeek && (
              <span className={styles.error}>
                {errors.classesPerWeek.message || 'This field is required'}
              </span>
            )}
          </label>
        </section>

        {/* Tags */}
        <section className={styles.tagSection}>
          <Controller
            name="tags"
            control={control}
            rules={{
              validate: (val) =>
                val.length > 3 || 'At least three tag is required',
            }}
            render={({ field }) => (
              <TagsSelect
                label="Add Relevant Course Tags"
                TAG_OPTIONS={courseTags}
                selectedTags={field.value}
                onChange={field.onChange}
                max={15}
              />
            )}
          />
          {errors.tags && <p className={styles.error}>{errors.tags.message}</p>}
        </section>

        {/* Image Upload */}
        <section className={styles.thumbnailSection}>
          <label>
            <b>Course Cover Image</b>
          </label>
          <ImageDropzone
            images={images}
            onDrop={handleAddImages}
            onRemove={handleRemoveImage}
            maxFiles={1}
          />
          {imageError && <p className={styles.error}>{imageError}</p>}
        </section>

        {/* Submit */}
        {button.multiple({
          type: 'submit',
          name: styles.submitButton,
          loader: loading,
          element: loading ? 'Submitting' : 'Submit Course',
          icon: loading ? FaSpinner : LuSend,
        })}
        <button
          type="submit"
          className={styles.submitButton}>
          {loading ? (
            <Spinner
              borderWidth="1px"
              borderColor="white"
              size="20px"
            />
          ) : (
            'Submit Course'
          )}
        </button>
      </form>
    </div>
  );
};

export default NewCourse;
