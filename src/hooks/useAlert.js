import {useState, useCallback} from 'react';

const useAlert = () => {
  const [alert, setAlert] = useState({
    show: false,
    variant: 'light',
    message: '',
  });

  const showAlert = useCallback((variant, message, time) => {
    setAlert(alert => ({variant, message, show: true}));
    setTimeout(() => {
      setAlert(alert => ({...alert, show: false}));
    }, time);
  }, []);

  return [alert, showAlert];
};

export default useAlert;
