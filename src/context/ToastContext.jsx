import { createContext, useState } from 'react';
import MySnackBar from '../MySnackBar';

export let ToastContext = createContext();
export let ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <MySnackBar open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};
