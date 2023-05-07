import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup // 이메일 유효성 정의
    .string()
    .required(),
  password: yup // 비밀번호 유효성 정의
    .string()
    .required(),
});
