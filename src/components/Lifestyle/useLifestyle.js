import {API_USERS_LIFESTYLE} from 'constants/apiUrls';
import useInterceptedAxios from 'hooks/useInterceptedAxios';
import {useEffect} from 'react';
import {useState} from 'react';

const useLifestyle = ({nickname}) => {
  const jwtAxios = useInterceptedAxios();

  const [lifestyle, setLifestyle] = useState({
    smokingType: false,
    drinkingType: '',
    sleepingHabitType: false,
    wakeupTime: '',
    organizeType: '',
    cleanupType: '',
    introduce: '',
  });

  const getLifestyle = async () => {
    try {
      const response = await jwtAxios.get(`${API_USERS_LIFESTYLE}/${nickname}`);
      const data = JSON.parse(response?.data || '{}');
      const {
        smokingType,
        drinkingType,
        sleepingHabitType,
        wakeupTime,
        organizeType,
        cleanupType,
        introduce,
      } = data;

      const lifestyle = {
        smokingType,
        drinkingType,
        sleepingHabitType,
        wakeupTime,
        organizeType,
        cleanupType,
        introduce,
      };
      setLifestyle(lifestyle);
    } catch (err) {}
  };

  // 유저 데이터 가져오기
  useEffect(() => {
    getLifestyle();
  }, []);

  return lifestyle;
};

export default useLifestyle;
