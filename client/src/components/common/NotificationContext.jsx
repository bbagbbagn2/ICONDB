import { createContext, useContext, useState } from "react";
import Toast from "./Toast";
import styled from "styled-components";

const ToastContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;

  @media (max-width: 600px) {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
`;

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Toast functions
  const addToast = (type, title, message, duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = (type, title, message, duration) => {
    return addToast(type, title, message, duration);
  };

  const toastSuccess = (title, message, duration) => {
    return addToast("success", title, message, duration);
  };

  const toastError = (title, message, duration) => {
    return addToast("error", title, message, duration);
  };

  const toastWarning = (title, message, duration) => {
    return addToast("warning", title, message, duration);
  };

  const toastInfo = (title, message, duration) => {
    return addToast("info", title, message, duration);
  };

  const value = {
    // Toast methods
    showToast,
    toastSuccess,
    toastError,
    toastWarning,
    toastInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}

      {/* Toast Container */}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </ToastContainer>
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
