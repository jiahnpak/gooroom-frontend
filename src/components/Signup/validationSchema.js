import * as yup from 'yup';

const REGEXP_EMAIL =
  '^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z\\d-]+\\.)+[a-zA-Z]{2,6}$';

export const pwdMin = 8;
export const pwdMax = 16;
const REGEXP_PASSWORD = `^.*(?=^.{${pwdMin},${pwdMax}}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$`;

const nameMin = 2;
const nameMax = 30;

const REGEXP_PHONENUMBER = '^\\d{3}-\\d{3,4}-\\d{4}$';

export const ERRORS = {
  REQUIRED: '필수 항목입니다.',
  INVALID_EMAIL: '이메일 형식이 올바르지 않습니다.',
  INVALID_PASSWORD: `비밀번호는 영문자, 숫자, 특수문자를 포함한 ${pwdMin}~${pwdMax}자입니다.`,
  INVALID_LENGTH: `${nameMin}~${nameMax}자를 입력해주세요.`,
  INVALID_PHONENUMBER: '전화번호 형식이 올바르지 않습니다.',
  DUPLICATE_EMAIL: '이미 사용 중인 이메일입니다.',
  PASSWORD_NOT_MATCH: '비밀번호가 일치하지 않습니다.',
};

export const validationSchema = yup.object().shape({
  email: yup // 이메일 형식 확인
    .string()
    .required(ERRORS.REQUIRED)
    .matches(REGEXP_EMAIL, ERRORS.INVALID_EMAIL),
  password: yup // 비밀번호 형식 확인
    .string()
    .required(ERRORS.REQUIRED)
    .matches(REGEXP_PASSWORD, ERRORS.INVALID_PASSWORD),
  confirm: yup // 비밀번호 일치 확인
    .string()
    .required(ERRORS.REQUIRED)
    .oneOf([yup.ref('password'), null], ERRORS.PASSWORD_NOT_MATCH),
  name: yup // 이름 글자 수 확인
    .string()
    .required(ERRORS.REQUIRED)
    .min(nameMin, ERRORS.INVALID_LENGTH)
    .max(nameMax, ERRORS.INVALID_LENGTH),
  nickname: yup // 닉네임 글자 수 확인
    .string()
    .required(ERRORS.REQUIRED)
    .min(nameMin, ERRORS.INVALID_LENGTH)
    .max(nameMax, ERRORS.INVALID_LENGTH),
  phonenumber: yup // 전화번호 형식 확인
    .string()
    .required(ERRORS.REQUIRED)
    .transform(value => value.replace(/\D/g, ''))
    .matches(REGEXP_PHONENUMBER, ERRORS.INVALID_PHONENUMBER),
  terms1: yup.bool().required().oneOf([true]),
  terms2: yup.bool().required().oneOf([true]),
});
