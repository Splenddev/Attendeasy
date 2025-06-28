import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';
import { useFormContext } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import button from '../../../../components/Button/Button';
import '../styles/VerificationStep.css';
import { toast } from 'react-toastify';
import { verifyUserOtp } from '../../../../services/auth.service';

const VerificationStep = ({
  title = 'Verify Your Email',
  email = 'michaelnwode023@gmail.com',
  sendOtp,
  loader1,
  loader2,
  setLoader2, // ✅ NEW
  isOtpSent,
  timeLeft,
  formatTimeLeft,
  setOtpVerified,
  otpVerified,
}) => {
  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  const inputsRef = useRef([]);

  const navigate = useNavigate();

  const otpValues =
    watch(['otp0', 'otp1', 'otp2', 'otp3', 'otp4', 'otp5']) || [];
  const otpCode = otpValues.join('');

  useEffect(() => {
    if (otpVerified) {
      const digits = otpCode.split('');
      digits.forEach((digit, i) => {
        setValue(`otp${i}`, digit);
        if (inputsRef.current[i]) inputsRef.current[i].value = digit;
      });
    }
  }, [otpVerified, setValue, otpCode]);

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

  const onSubmitHandler = async () => {
    const valid = await trigger([
      'otp0',
      'otp1',
      'otp2',
      'otp3',
      'otp4',
      'otp5',
    ]);
    if (!valid) {
      toast.error('Please enter all 6 digits.');
      return;
    }

    try {
      setLoader2(true);
      const { success, message } = await verifyUserOtp(
        'michaelnwode023@gmail.com',
        otpCode
      );
      setLoader2(false);

      if (success) {
        toast.success('OTP verified successfully!');

        setOtpVerified(true);
      } else {
        toast.error(message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      setLoader2(false);
      toast.error('An error occurred during OTP verification.');
      console.error(error);
    }
  };

  return (
    <motion.div
      className="form-step otp-step"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}>
      <h2>{title}</h2>
      <p className="subtitle">
        {isOtpSent
          ? 'Enter the 6-digit code sent to your email.'
          : 'Click on send otp to to request for an otp.'}
      </p>

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
              {loader1 ? (
                <FiLoader className="spin" />
              ) : isOtpSent ? (
                'Resend OTP'
              ) : (
                'Send OTP'
              )}
            </span>
            {timeLeft > 0 && (
              <p className="otp-expire-time">
                Expires in: <strong>{formatTimeLeft(timeLeft)}</strong>
              </p>
            )}
          </div>

          {button.normal({
            name: 'verify-button reverse',
            element: loader2 ? (
              <FiLoader />
            ) : otpVerified ? (
              'Verified'
            ) : (
              'Verify Email'
            ),
            type: 'button',
            disabled: loader2 || otpVerified,
            func: otpVerified ? undefined : onSubmitHandler,
            loader: loader2,
          })}
          {otpVerified &&
            button.multiple({
              element: 'Proceed to Login',
              icon: FaArrowRight,
              func: () => navigate('/auth'),
            })}
        </div>
      </div>
    </motion.div>
  );
};

export default VerificationStep;
