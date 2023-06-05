import AuthForm from 'components/common/AuthForm';
import {postSignup} from 'apis/auth';
import SignupForm from './SignupForm';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {ERRORS, validationSchema} from './validationSchema';
import {useNavigate} from 'react-router-dom';
import {format} from 'date-fns';
import useAlert from 'hooks/useAlert';
import {LOGIN_EMAIL} from 'constants/path';
import CODE from 'constants/errorCode';

const Signup = ({title}) => {
  // 회원가입 폼에서 필드의 값과 유효성 검증을 위해 사용
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const {setError, setFocus} = formMethods;

  // 페이지 이동을 위해 사용
  const navigate = useNavigate();

  // 알림 창 표시를 위한 훅
  const showAlert = useAlert();

  /**
   * 회원가입 폼에서 submit 이벤트가 발생하고 모든 필드가 유효한 경우 수행되는 함수이다.
   * @param {object} data - react-hook-form을 통해 관리하는 필드의 값이다.
   */
  const onSubmit = async data => {
    const {email, password, name, nickname, mobile, gender, birthdate} = data;

    const body = JSON.stringify({
      email,
      password,
      name,
      nickname,
      mobile,
      gender,
      birthyear: format(birthdate, 'yyyy'),
      birthday: format(birthdate, 'MM-dd'),
    });

    try {
      const response = await postSignup(body);
      if (!response) {
        throw new Error('서버와 연결이 불안정합니다.');
      }

      showAlert('success', '회원가입에 성공했습니다!', 2000);

      return navigate(LOGIN_EMAIL);
    } catch (err) {
      const errorCode = err?.response?.data?.errorCode;

      switch (errorCode) {
        case CODE.ALREADY_EXIST_USER_EMAIL: // 중복된 이메일을 입력할 때의 에러 처리
          setError('email', {type: 'custom', message: ERRORS.DUPLICATE_EMAIL});
          setFocus('email');
          break;
        case CODE.ALREADY_EXIST_USER_NICKNAME: // 중복된 닉네임을 입력할 때의 에러 처리
          setError('nickname', {
            type: 'custom',
            message: ERRORS.DUPLICATE_NICKNAME,
          });
          setFocus('nickname');
          break;
        default: // 기타 에러에 대한 처리
          showAlert(
            'danger',
            '회원가입에 실패했습니다. 잠시 후 시도해주세요.',
            2000,
          );
      }
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
