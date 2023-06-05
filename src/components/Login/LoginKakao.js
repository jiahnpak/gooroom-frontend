/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigate} from 'react-router-dom';
import Loading from 'components/common/Loading';
import {useEffect} from 'react';
import {REDIRECT_URI_KAKAO} from 'constants/path';
import customAxios from 'utils/customAxios';
import useAlert from 'hooks/useAlert';
import {useSetRecoilState} from 'recoil';
import {AuthState} from 'stores/AuthState';

const LoginKakao = props => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(AuthState);
  const showAlert = useAlert();

  const code = new URL(window.location.href).searchParams.get('code');

  // LoginKakao 컴포넌트가 처음 나타날 때 서버에 인가 코드를 보낸다.
  useEffect(() => {
    const postLoginKakao = async () => {
      try {
        const response = await customAxios.post(REDIRECT_URI_KAKAO, code);

        const accessToken = response?.headers['authorization'];

        if (!accessToken) {
          throw new Error('토큰 생성에 실패했습니다.');
        }

        setAuth({authenticated: true, accessToken: accessToken});
      } catch (err) {
        showAlert(
          'danger',
          '로그인에 실패했습니다. 잠시 후 시도해주세요.',
          2000,
        );
      }

      return navigate('/');
    };
    postLoginKakao();
  }, []);

  return (
    <Loading title="로그인 중입니다." description="잠시만 기다려주세요." />
  );
};

export default LoginKakao;
