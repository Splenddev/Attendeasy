import React, { useState, useEffect, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import './styles/Register.css';

import ProgressHeader from './ProgressHeader';
import PersonalForm from './steps/PersonalForm';
import RoleForm from './steps/RoleForm';
import ReviewStep from './steps/ReviewStep';
import VerificationStep from './steps/VerificationStep';
import ProfileSetup from './steps/ProfileSetup';

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

  // OTP related states
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

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
    },

    mode: 'onChange',
  });

  // Send OTP function simulation
  const sendOtp = async () => {
    setSendingOtp(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    setSendingOtp(false);
    setIsOtpSent(true);
    setTimeLeft(120); // e.g., 2 minutes expiry

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
  };

  // Format seconds as mm:ss
  const formatTimeLeft = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleNext = async () => {
    // Before step 2 (Verification), trigger validation for current fields
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

    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const onSubmit = (data) => {
    console.log('Submitted:', data);
    // Add API submission logic here
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <RoleForm onNext={handleNext} />;
      case 1:
        return (
          <PersonalForm
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <VerificationStep
            onBack={handleBack}
            sendOtp={sendOtp}
            loader1={sendingOtp}
            loader2={verifyingOtp}
            isOtpSent={isOtpSent}
            timeLeft={timeLeft}
            formatTimeLeft={formatTimeLeft}
            onNext={async (otpCode) => {
              setVerifyingOtp(true);
              await new Promise((res) => setTimeout(res, 1500));
              setVerifyingOtp(false);
              if (otpCode === '123456') {
                handleNext();
              } else {
                alert('Invalid OTP. Please try again.');
              }
            }}
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
              transition={{ duration: 0.4 }}>
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </form>
      </FormProvider>
    </div>
  );
};

export default Register;
