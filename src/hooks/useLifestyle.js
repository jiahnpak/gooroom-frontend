import {API_USERS_LIFESTYLE} from 'constants/apiUrls';
import {useState} from 'react';
import useInterceptedAxios from './useInterceptedAxios';
import CODE from 'constants/errorCode';

export const initialLifestyle = {
  smokingType: false,
  drinkingType: '',
  sleepingHabitType: false,
  wakeupType: '',
  organizeType: '',
  cleanupType: '',
  introduce: '',
};

const useLifestyle = () => {
  const [lifestyle, setLifestyle] = useState(initialLifestyle);
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
        wakeupType,
        organizeType,
        cleanupType,
        introduce,
      } = data;

      setLifestyle({
        smokingType,
        drinkingType,
        sleepingHabitType,
        wakeupType,
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
