let setModalState = null;

export const useSuccessModal = () => {
  return {
    open: (data = {}) => {
      const normalized = normalizeSuccess(data);

      if (import.meta.env.DEV) {
        console.log('[SuccessModal Triggered]', normalized);
      }

      if (setModalState) {
        setModalState({
          isOpen: true,
          success: normalized,
          initiator: data.initiator || 'unknown',
        });
      }
    },

    close: () => {
      if (setModalState) {
        setModalState((prev) => ({ ...prev, isOpen: false }));
      }
    },
  };
};

export const registerSuccessModal = (setter) => {
  setModalState = setter;
};

// 🧠 Normalize any success data shape
function normalizeSuccess(data = {}) {
  return {
    title: data.title || 'Action Successful',
    message:
      data.message ||
      (typeof data === 'string'
        ? data
        : 'Your action was completed successfully.'),
    status: data.status || 200,
    timestamp: new Date().toISOString(),

    // Optional extras
    code: data.code || '',
    meta: data.meta || {},
    ...data,
  };
}
