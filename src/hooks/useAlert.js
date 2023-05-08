import {useAlertDispatch} from 'contexts/AlertContext';

export const useAlert = () => {
  const alertDispatch = useAlertDispatch();

  const showAlert = (variant, message, time) => {
    alertDispatch({type: 'SHOW', variant, message});
    setTimeout(() => {
      alertDispatch({type: 'HIDE'});
    }, time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return showAlert;
};

export default useAlert;
