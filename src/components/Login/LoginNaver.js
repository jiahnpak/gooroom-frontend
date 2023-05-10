/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigate, useSearchParams} from 'react-router-dom';
import Loading from './Loading';
import {useEffect} from 'react';
import {REDIRECT_URI_NAVER} from 'constants/path';
import customAxios from 'utils/customAxios';
import {setRefreshToken} from 'utils/RefreshToken';
import {useAuthDispatch} from 'hooks/useAuth';

const LoginNaver = props => {
  const navigate = useNavigate();
  const authDispatch = useAuthDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // LoginNaver 컴포넌트가 처음 나타날 때 서버에 인가 코드를 보낸다.
  useEffect(() => {
    const postLoginNaver = async () => {
      const response = await customAxios.post(REDIRECT_URI_NAVER, {
        code,
        state,
      });
      const data = JSON.parse(response?.data || '{}');

      // access token과 refresh token을 서버에게 받아 저장한다.
      setRefreshToken(data['Authorization-refresh']);
      authDispatch({type: 'SET_TOKEN', token: data['Authorization']});

      return navigate('/');
    };
    error || postLoginNaver();
  }, []);

  return (
    <Loading
      title={!error && '로그인 중입니다.'}
      description={error ? errorDescription : '잠시만 기다려주세요.'}
    />
  );
};

export default LoginNaver;
