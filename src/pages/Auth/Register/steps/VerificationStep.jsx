import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';
import { useFormContext } from 'react-hook-form';
import button from '../../../../components/Button/Button';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../styles/VerificationStep.css';
import { useEffect } from 'react';

const VerificationStep = ({
  title = 'Verify Your Email',
  sendOtp,
  loader1,
  loader2,
  isOtpSent,
  timeLeft,
  formatTimeLeft,
  onNext,
  otpVerified, // ✅ New prop
}) => {
  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (otpVerified) {
      const digits = '123456'.split('');
      digits.forEach((digit, i) => {
        setValue(`otp${i}`, digit);
        if (inputsRef.current[i]) inputsRef.current[i].value = digit;
      });
    }
  }, [otpVerified, setValue]);

  const inputsRef = useRef([]);

  const otpValues =
    watch(['otp0', 'otp1', 'otp2', 'otp3', 'otp4', 'otp5']) || [];

  const inputHandler = (e, i) => {
    const val = e.target.value;
    const digit = val.replace(/\D/g, '').slice(0, 1);
    setValue(`otp${i}`, digit, { shouldValidate: true });
    if (inputsRef.current[i]) inputsRef.current[i].value = digit;
    if (digit && i < 5) {
      inputsRef.current[i + 1].focus();
    }
  };

  const keydownHandler = (e, i) => {
    if (e.key === 'Backspace' && !e.target.value && i > 0) {
      inputsRef.current[i - 1].focus();
    }
  };

  const pasteHandler = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, 6).split('');
    paste.forEach((char, i) => {
      const digit = char.replace(/\D/g, '');
      setValue(`otp${i}`, digit, { shouldValidate: true });
      if (inputsRef.current[i]) inputsRef.current[i].value = digit;
    });
    const nextFocus = Math.min(paste.length, 5);
    if (inputsRef.current[nextFocus]) inputsRef.current[nextFocus].focus();
  };

  // NEW: manual submit handler triggered by button click
  const onSubmitHandler = async () => {
    console.log('Submitting OTP...');
    const valid = await trigger([
      'otp0',
      'otp1',
      'otp2',
      'otp3',
      'otp4',
      'otp5',
    ]);
    if (!valid) {
      console.log('OTP validation failed');
      return;
    }
    const otpCode = otpValues.join('');
    console.log('OTP valid:', otpCode);
    if (onNext) onNext(otpCode);
  };

  return (
    <motion.div
      className="form-step otp-step"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}>
      <h2>{title}</h2>
      <p className="subtitle">Enter the 6-digit code sent to your email.</p>

      {/* Removed form tag */}
      <div
        className="otp-form"
        onPaste={pasteHandler}>
        <div className="otp-input-fields">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                {...register(`otp${i}`, {
                  required: 'Required',
                  pattern: { value: /^[0-9]$/, message: 'Must be a digit' },
                })}
                ref={(el) => (inputsRef.current[i] = el)}
                onInput={(e) => inputHandler(e, i)}
                onKeyDown={(e) => keydownHandler(e, i)}
                className={errors[`otp${i}`] ? 'input-error' : ''}
                autoComplete="one-time-code"
                readOnly={otpVerified}
              />
            ))}
        </div>

        <div className="otp-actions">
          <div className="resend-section">
            <span
              onClick={sendOtp}
              className="resend-otp">
              {loader1 ? <FiLoader /> : isOtpSent ? 'Resend OTP' : 'Send OTP'}
            </span>
            {timeLeft > 0 && (
              <p className="otp-expire-time">
                Expires in: <strong>{formatTimeLeft(timeLeft)}</strong>
              </p>
            )}
          </div>
          {button.multiple({
            name: 'verify-button reverse',
            icon: loader2 ? FiLoader : FaArrowRight,
            element: loader2 ? '' : otpVerified ? 'Verified' : 'Verify Email',
            type: 'button',
            disabled: loader2 || otpVerified, // ✅ disable if verified
            func: otpVerified ? undefined : onSubmitHandler,
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default VerificationStep;
