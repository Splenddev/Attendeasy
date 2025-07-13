let setModalState = null;

export const useErrorModal = () => {
  return {
    open: (err = {}) => {
      // Normalize error
      const normalized = normalizeError(err);

      // Dev log
      if (import.meta.env.DEV) {
        console.error('[ErrorModal Triggered]', normalized);
      }

      if (setModalState) {
        setModalState({
          isOpen: true,
          error: normalized,
          initiator: err.initiator || 'unknown',
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

export const registerErrorModal = (setter) => {
  setModalState = setter;
};

// 🧠 Normalize any error shape
function normalizeError(err = {}) {
  const isError = err instanceof Error;

  return {
    title: err.title || 'Something went wrong',
    message:
      err.message || (typeof err === 'string' ? err : 'Unexpected error'),
    code: err.code || '',
    errors: err.errors || [],
    status: err.status || err.response?.status || '',
    stack: isError ? err.stack : '',
    timestamp: new Date().toISOString(),

    // Spread for additional debugging info (e.g. AxiosError, custom fields)
    ...err,
  };
}
