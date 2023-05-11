import AuthForm from 'components/common/AuthForm';
import {postSignup} from 'apis/auth';
import SignupForm from './SignupForm';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {ERRORS, validationSchema} from './validationSchema';
import {useNavigate} from 'react-router-dom';
import {format} from 'date-fns';
import useAlert from 'hooks/useAlert';
import {setRefreshToken} from 'utils/RefreshToken';
import {useAuthDispatch} from 'hooks/useAuth';
import {USERS_LIFESTYLE} from 'constants/path';
import errorCode from 'constants/errorCode';

const Signup = ({title}) => {
  // 회원가입 폼에서 필드의 값과 유효성 검증을 위해 사용
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const {setError} = formMethods;

  // 페이지 이동을 위해 사용
  const navigate = useNavigate();

  // 알림 창 표시를 위한 훅
  const showAlert = useAlert();

  const authDispatch = useAuthDispatch();

  /**
   * 회원가입 폼에서 submit 이벤트가 발생하고 모든 필드가 유효한 경우 수행되는 함수이다.
   * @param {object} data - react-hook-form을 통해 관리하는 필드의 값이다.
   */
  const onSubmit = data => {
    const {email, password, name, nickname, mobile, gender, birthdate} = data;

    const body = JSON.stringify({
      email,
      password,
      name,
      nickname,
      mobile,
      gender,
      birthyear: format(birthdate, 'yyyy'),
      birthdat: format(birthdate, 'MM-dd'),
    });

    try {
      const response = postSignup(body);
      const data = JSON.parse(response?.data || '{}');

      // response.data가 없는 경우 에러 처리
      if (data.constructor === Object && Object.keys(data).length === 0) {
        throw new Error('서버가 불안정합니다. 문제가 계속될 시 문의바랍니다.');
      }

      if (!data['errorCode']) {
        // 에러 코드가 없는 경우, 회원가입 성공
        setRefreshToken(data['Authorization-refresh']);
        authDispatch({type: 'SET_TOKEN', token: data['Authorization']});

        return navigate(USERS_LIFESTYLE);
      } else if (data['errorCode'] === errorCode.ALREADY_EXIST_USER_EMAIL) {
        setError('email', {type: 'custom', message: ERRORS.DUPLICATE_EMAIL});
      }
    } catch (err) {
      showAlert(
        'danger',
        '회원가입에 실패했습니다. 잠시 후 시도해주세요.',
        2000,
      );
    }
  };

  const onInvalid = errors => {
    console.log(errors);
  };

  return (
    <>
      <AuthForm title={title}>
        <SignupForm
          formMethods={formMethods}
          onSubmit={onSubmit}
          onInvalid={onInvalid}
        ></SignupForm>
      </AuthForm>
    </>
  );
};

export default Signup;
