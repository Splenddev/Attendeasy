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
import { sendUserOtp, verifyUserOtp } from '../../../services/authService';

const steps = [
  'Select Role',
  'Personal Details',
  'Verify',
  'Profile Setup',
  'Review',
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
    },

    mode: 'onChange',
  });
  const email = methods.getValues('email'); // Assuming you're using RHF

  const sendOtp = async () => {
    setSendingOtp(true);

    try {
      const { success, message } = await sendUserOtp(email);

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
  const formatTimeLeft = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleNext = async () => {
    if (step === 1) {
      const valid = await methods.trigger([
        'role',
        'name',
        'email',
        'password',
      ]);
      if (!valid) return;
      // Send OTP automatically when moving to verify step
      await sendOtp();
    }

    if (step === 2) {
      // Normally OTP verification handled inside VerificationStep
      // So here, just proceed if you want
    }
    if (step === 1 && !isOtpSent) return;
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    const { otp0, otp1, otp2, otp3, otp4, otp5, terms, ...userData } = data;
    setAuthBtnsLoading((prev) => ({ ...prev, submit: true }));

    try {
      const formData = new FormData();

      // Append all key-value pairs
      for (const key in userData) {
        if (key === 'profilePicture') {
          formData.append('profilePicture', userData.profilePicture);
        } else {
          formData.append(key, userData[key]);
        }
      }

      const result = await register(formData);
      console.log(result);
      if (result.success) {
        navigate('/auth'); // ✅ or success screen
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setAuthBtnsLoading((prev) => ({ ...prev, submit: false }));
    }

    console.log('Submitted:', data);
    // Add API submission logic here
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <RoleForm onNext={handleNext} />;
      case 1:
        return <PersonalForm />;
      case 2:
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
            formatTimeLeft={formatTimeLeft}
            onNext={(otp) => {
              console.log('Verified OTP:', otp);
              setOtpVerified(true);
            }}
            otpVerified={otpVerified}
          />
        );
      case 3:
        return (
          <ProfileSetup
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return <ReviewStep onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="register-wrapper">
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
              {renderStep()}
            </motion.div>
          </AnimatePresence>
          {error && <p>{error}</p>}
        </form>
        {step !== 0 && step !== 3 && (
          <BtnGroup
            onBack={handleBack}
            onNext={
              (step === 2 && !otpVerified) || step === 4 ? null : handleNext
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
