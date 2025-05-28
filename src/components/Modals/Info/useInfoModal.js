import { useState } from 'react';

const useInfoModal = () => {
  const [visible, setVisible] = useState(false);
  const [modalId, setModalId] = useState(null);

  const openModal = (id) => {
    setModalId(id);
    setVisible(true);
    console.log(id);
  };

  console.log(modalId);

  const closeModal = () => {
    setVisible(false);
    setModalId(null);
  };

  return {
    visible,
    modalId,
    openModal,
    closeModal,
  };
};

export default useInfoModal;
