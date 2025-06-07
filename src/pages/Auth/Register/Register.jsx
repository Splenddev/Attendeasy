import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import './Register.css';
import ProgressHeader from './ProgressHeader';
import PersonalForm from './steps/PersonalForm';
import RoleForm from './steps/RoleForm';
import ReviewStep from './steps/ReviewStep';
const steps = ['Select Role', 'Personal Details', 'Review'];

const Register = () => {
  const [step, setStep] = useState(0);
  const methods = useForm({
    defaultValues: {
      role: '',
      name: '',
      email: '',
      password: '',
    },
  });

  const handleNext = async () => {
    const valid = await methods.trigger();
    if (valid) setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const onSubmit = (data) => {
    console.log('Submitted:', data);
    // Send to backend here
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
          {step === 0 && <RoleForm onNext={handleNext} />}
          {step === 1 && (
            <PersonalForm
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 2 && <ReviewStep onBack={handleBack} />}
        </form>
      </FormProvider>
    </div>
  );
};

export default Register;
