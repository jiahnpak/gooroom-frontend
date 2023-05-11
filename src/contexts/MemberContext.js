import {API_USERS} from 'constants/apiUrls';
import useAlert from 'hooks/useAlert';
import useInterceptedAxios from 'hooks/useInterceptedAxios';
import React, {createContext, useContext, useState, useEffect} from 'react';

const MemberContext = createContext();

// Context Provider 생성
export const MemberProvider = ({children}) => {
  const jwtAxios = useInterceptedAxios();
  const showAlert = useAlert();

  const [member, setMember] = useState({
    name: '',
    nickname: '',
    email: '',
    mobile: '',
    gender: '',
    birthyear: '',
    birthday: '',
  });

  const getMember = async () => {
    try {
      const response = await jwtAxios.get(API_USERS);
      const data = JSON.parse(response?.data || '{}');
      const {name, nickname, email, mobile, gender, birthyear, birthday} = data;

      // response.data가 없는 경우 에러 처리
      if (data.constructor === Object && Object.keys(data).length === 0) {
        throw new Error('서버가 불안정합니다. 문제가 계속될 시 문의바랍니다.');
      }

      const member = {
        name,
        nickname,
        email,
        mobile,
        gender,
        birthyear,
        birthday,
      };
      setMember(member);
    } catch (err) {
      showAlert('danger', '페이지를 로드할 수 없습니다.', 3000);
    }
  };

  // 유저 데이터 가져오기
  useEffect(() => {
    getMember();
  }, []);

  return (
    <MemberContext.Provider value={member}>{children}</MemberContext.Provider>
  );
};

// 사용자 정보에 접근하는 custom hook 생성
export const useMember = () => {
  const member = useContext(MemberContext);
  return member;
};
