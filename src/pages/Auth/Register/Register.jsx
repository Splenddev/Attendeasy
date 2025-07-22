/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import './styles/Register.css';
import { toast } from 'react-toastify';
import ProgressHeader from './ProgressHeader';
import PersonalForm from './steps/PersonalForm';
import RoleForm from './steps/RoleForm';
import ReviewStep from './steps/ReviewStep';
import VerificationStep from './steps/VerificationStep';
import ProfileSetup from './steps/ProfileSetup';
import BtnGroup from './BtnGroup';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { sendUserOtp, verifyUserOtp } from '../../../services/auth.service';
import button from '../../../components/Button/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { formatTimeDiff } from '../../../utils/helpers';

const steps = [
  'Select Role',
  'Personal Details',
  'Profile Setup',
  'Review',
  'Verify',
];

const stepVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  animate: { x: 0, opacity: 1 },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

const Register = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [otpVerified, setOtpVerified] = useState(false);

  // OTP related states
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  const { setAuthBtnsLoading, register } = useAuth();

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // RHF form setup
  const methods = useForm({
    defaultValues: {
      role: '',
      name: '',
      email: '',
      password: '',
      otp0: '',
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      profilePicture: null,
      faculty: '',
      department: '',
      level: '',
      username: '',
      matricNumber: '',
      courses: [],
    },

    mode: 'onChange',
  });
  const email = methods.getValues('email'); // Assuming you're using RHF

  const sendOtp = async () => {
    setSendingOtp(true);

    try {
      const { success, message } = await sendUserOtp(
        'michaelnwode023@gmail.com'
      );

      if (!success) {
        throw new Error(message || 'Failed to send OTP');
      }

      toast.success('OTP sent successfully');
      setIsOtpSent(true);
      setTimeLeft(120); // 2 minutes countdown

      // Reset timer if any
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } catch (err) {
      console.error('sendOtp error:', err.message);
      toast.error(err?.response?.data || 'Failed to send OTP');
    } finally {
      setSendingOtp(false);
      setAuthBtnsLoading((prev) => ({ ...prev, login: false }));
    }
  };

  // Format seconds as mm:ss

  const handleNext = async () => {
    if (step === 1) {
      const valid = await methods.trigger([
        'role',
        'name',
        'email',
        'password',
      ]);
      if (!valid) return;
    }

    if (step === 3) {
      await sendOtp();
    }
    if (step === 3 && !isOtpSent) return;
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    const { otp0, otp1, otp2, otp3, otp4, otp5, terms, courses, ...userData } =
      data;

    setAuthBtnsLoading((prev) => ({ ...prev, submit: true }));

    try {
      const formData = new FormData();

      for (const key in userData) {
        if (key === 'profilePicture' && userData.profilePicture) {
          formData.append('profilePicture', userData.profilePicture);
        } else {
          formData.append(key, userData[key]);
        }
      }

      formData.append('courses', JSON.stringify(courses || []));

      const result = await register(formData);

      if (result.success) {
        toast.success(result.message || 'Account created');
        setDirection(1);
        setIsSubmitted(true);
        setStep((prev) => prev + 1);
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setAuthBtnsLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  const renderStep = (methods) => {
    switch (step) {
      case 0:
        return (
          <RoleForm
            onNext={handleNext}
            methods={methods}
          />
        );
      case 1:
        return <PersonalForm methods={methods} />;
      case 2:
        return (
          <ProfileSetup
            onNext={handleNext}
            onBack={handleBack}
            methods={methods}
          />
        );
      case 3:
        return (
          <ReviewStep
            onBack={handleBack}
            methods={methods}
            isSubmitted={isSubmitted}
          />
        );
      case 4:
        return (
          <VerificationStep
            email={email}
            sendOtp={sendOtp}
            verifyOtp={verifyUserOtp}
            loader1={sendingOtp}
            loader2={verifyingOtp}
            setLoader2={setVerifyingOtp}
            isOtpSent={isOtpSent}
            timeLeft={timeLeft}
            formatTimeLeft={formatTimeDiff}
            setOtpVerified={setOtpVerified}
            methods={methods}
            otpVerified={otpVerified}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-page-to-login">
        {button.multiple({
          icon: FaArrowLeft,
          element: 'To Login',
          func: () => navigate('/auth'),
        })}
      </div>
      <ProgressHeader
        currentStep={step}
        steps={steps}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="register-form">
          <AnimatePresence
            custom={direction}
            mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, delay: 0.2 }}>
              {renderStep(methods)}
            </motion.div>
          </AnimatePresence>
        </form>
        {step !== 0 && step !== 2 && step !== 4 && (
          <BtnGroup
            onBack={step === 2 ? null : handleBack}
            onNext={
              step === 4 || (step === 3 && !otpVerified && !isSubmitted)
                ? null
                : handleNext
            }
            step={step}
            submit={step === 4}
          />
        )}
      </FormProvider>
    </div>
  );
};

export default Register;
