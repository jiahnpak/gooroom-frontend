import {API_USERS_LIFESTYLE} from 'constants/apiUrls';
import {useState} from 'react';
import useInterceptedAxios from './useInterceptedAxios';
import CODE from 'constants/errorCode';

const useLifestyle = () => {
  const [lifestyle, setLifestyle] = useState({
    smokingType: false,
    drinkingType: '',
    sleepingHabitType: false,
    wakeupTime: '',
    organizeType: '',
    cleanupType: '',
    introduce: '',
  });
  const jwtAxios = useInterceptedAxios();

  const getLifestyle = async nickname => {
    try {
      const response = await jwtAxios.get(`${API_USERS_LIFESTYLE}/${nickname}`);
      const data = response?.data;
      if (!data) {
        throw new Error();
      }

      const {
        smokingType,
        drinkingType,
        sleepingHabitType,
        wakeupTime,
        organizeType,
        cleanupType,
        introduce,
      } = data;

      setLifestyle({
        smokingType,
        drinkingType,
        sleepingHabitType,
        wakeupTime,
        organizeType,
        cleanupType,
        introduce,
      });
    } catch (err) {
      if (err?.response?.status === 404) {
        return CODE.NOT_FOUND_MEMBER;
      }
    }
  };

  return {lifestyle, setLifestyle, getLifestyle};
};

export default useLifestyle;
