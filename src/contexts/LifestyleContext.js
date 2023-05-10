import {API_USERS_LIFESTYLE} from 'constants/apiUrls';
import useInterceptedAxios from 'hooks/useInterceptedAxios';
import {useContext} from 'react';
import {createContext} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';

const LifestyleContext = createContext();

export const initialLifestyle = {
  smokingType: false,
  drinkingType: '',
  sleepingHabitType: false,
  wakeupTime: '',
  organizeType: '',
  cleanupType: '',
  introduce: '',
};

// Context Provider 생성
export const LifestyleProvider = ({children}) => {
  const jwtAxios = useInterceptedAxios();

  const [lifestyle, setLifestyle] = useState(initialLifestyle);

  const getLifestyle = async nickname => {
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

  return (
    <LifestyleContext.Provider value={{lifestyle, getLifestyle}}>
      {children}
    </LifestyleContext.Provider>
  );
};

// 지정된 사용자의 생활패턴 데이터에 접근하는 custom hook 생성
export const useLifestyle = nickname => {
  const {lifestyle, getLifestyle} = useContext(LifestyleContext);

  // 지정된 사용자 생활패턴 가져오기
  useEffect(() => {
    getLifestyle(nickname);
  }, []);

  return lifestyle;
};
