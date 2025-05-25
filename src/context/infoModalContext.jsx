import { createContext, useContext, useState } from 'react';

const InfoModalContext = createContext();

export const InfoModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [modalId, setModalId] = useState(null);

  const openModal = (id) => {
    setModalId(id);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setModalId(null);
  };

  const value = { visible, modalId, openModal, closeModal };

  return (
    <InfoModalContext.Provider value={value}>
      {children}
    </InfoModalContext.Provider>
  );
};

export const useInfoModal = () => useContext(InfoModalContext);
