import {API_USERS_LIFESTYLE} from 'constants/apiUrls';
import {useState} from 'react';
import useInterceptedAxios from './useInterceptedAxios';
import CODE from 'constants/errorCode';

const initialLifestyle = {
  name: '',
  gender: '',
  age: 0,
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
        name,
        gender,
        age,
        smokingType,
        drinkingType,
        sleepingHabitType,
        wakeupType,
        organizeType,
        cleanupType,
        introduce,
      } = data;

      setLifestyle({
        name,
        gender,
        age,
        smokingType,
        drinkingType,
        sleepingHabitType,
        wakeupType,
        organizeType,
        cleanupType,
        introduce,
      });
    } catch (err) {
      const errorCode = err?.response?.data?.errorCode;
      if (!errorCode) {
        return CODE.UNEXPECTED;
      }

      return errorCode;
    }
  };

  return {lifestyle, setLifestyle, getLifestyle};
};

export default useLifestyle;
