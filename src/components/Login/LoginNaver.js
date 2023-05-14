/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigate, useSearchParams} from 'react-router-dom';
import Loading from 'components/common/Loading';
import {useEffect} from 'react';
import {REDIRECT_URI_NAVER} from 'constants/path';
import customAxios from 'utils/customAxios';
import {setRefreshToken} from 'utils/RefreshToken';
import useAlert from 'hooks/useAlert';
import {useSetRecoilState} from 'recoil';
import {AuthState} from 'stores/AuthState';

const LoginNaver = props => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(AuthState);
  const showAlert = useAlert();

  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // LoginNaver 컴포넌트가 처음 나타날 때 서버에 인가 코드를 보낸다.
  useEffect(() => {
    const postLoginNaver = async () => {
      try {
        const response = await customAxios.post(REDIRECT_URI_NAVER, {
          code,
          state,
        });

        const accessToken = response?.headers['authorization'];
        const refreshToken = response?.headers['authorization-refresh'];

        if (!(accessToken && refreshToken)) {
          throw new Error('토큰 생성에 실패했습니다.');
        }

        setRefreshToken(refreshToken);
        setAuth({authenticate: true, accessToken: accessToken});
      } catch (err) {
        showAlert(
          'danger',
          '로그인에 실패했습니다. 잠시 후 시도해주세요.',
          2000,
        );
      }

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
