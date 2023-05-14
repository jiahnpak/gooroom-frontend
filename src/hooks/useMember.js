import {useState} from 'react';
import useInterceptedAxios from './useInterceptedAxios';
import {API_USERS} from 'constants/apiUrls';
import CODE from 'constants/errorCode';

const useMember = () => {
  const [member, setMember] = useState({
    name: '',
    nickname: '',
    email: '',
    mobile: '',
    gender: '',
    birthyear: '',
    birthday: '',
  });
  const jwtAxios = useInterceptedAxios();

  const getMember = async () => {
    try {
      const response = await jwtAxios.get(API_USERS);
      const data = response?.data;
      if (!data) {
        throw new Error();
      }

      const {name, nickname, email, mobile, gender, birthyear, birthday} = data;

      setMember(prev => ({
        ...prev,
        name,
        nickname,
        email,
        mobile,
        gender,
        birthyear,
        birthday,
      }));

      return {name, nickname, email, mobile, gender, birthyear, birthday};
    } catch (err) {
      if (err?.response?.status === 404) {
        return CODE.NOT_FOUND_MEMBER;
      }
    }
  };

  return {member, setMember, getMember};
};

export default useMember;
