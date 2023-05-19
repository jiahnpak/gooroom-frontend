import * as yup from 'yup';
import {parse, isDate} from 'date-fns';
import {
  REGEXP_NAME,
  REGEXP_PHONENUMBER,
  emailMax,
  nameMax,
  nameMin,
  pwdMax,
  pwdMin,
} from 'constants/memberConstants';

const REGEXP_EMAIL =
  '^[\\w!#$%&’*+\\/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+\\/=?`{|}~^-]+)*@(?:[a-zA-Z\\d-]+\\.)+[a-zA-Z]{2,6}$';

const REGEXP_PASSWORD = `^.*(?=^.{${pwdMin},${pwdMax}}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$`;

// 회원가입 에러 메시지
export const ERRORS = {
  REQUIRED: '필수 항목입니다.',
  INVALID_EMAIL: '이메일 형식이 올바르지 않습니다.',
  INVALID_PASSWORD: `비밀번호는 영문자, 숫자, 특수문자를 포함한 ${pwdMin}~${pwdMax}자입니다.`,
  INVALID_LENGTH: `최소 ${nameMin}글자를 입력해주세요.`,
  INVALID_NAME: '이름 형식이 올바르지 않습니다.',
  INVALID_PHONENUMBER: '전화번호 형식이 올바르지 않습니다.',
  DUPLICATE_EMAIL: '이미 사용 중인 이메일입니다.',
  DUPLICATE_NICKNAME: '이미 사용 중인 닉네임입니다.',
  PASSWORD_NOT_MATCH: '비밀번호가 일치하지 않습니다.',
};

// 회원가입 폼의 유효성 검증을 위한 yup 객체
export const validationSchema = yup.object().shape({
  email: yup // 이메일 형식 확인
    .string()
    .required(ERRORS.REQUIRED)
    .matches(REGEXP_EMAIL, ERRORS.INVALID_EMAIL)
    .max(emailMax),
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
    .matches(REGEXP_NAME, ERRORS.INVALID_NAME)
    .min(nameMin, ERRORS.INVALID_LENGTH)
    .max(nameMax),
  nickname: yup // 닉네임 글자 수 확인
    .string()
    .required(ERRORS.REQUIRED)
    .matches(REGEXP_NAME, ERRORS.INVALID_NAME)
    .min(nameMin, ERRORS.INVALID_LENGTH)
    .max(nameMax),
  mobile: yup // 전화번호 형식 확인
    .string()
    .required(ERRORS.REQUIRED)
    .matches(REGEXP_PHONENUMBER, ERRORS.INVALID_PHONENUMBER),
  gender: yup // 성별 확인
    .string()
    .required()
    .oneOf(['M', 'F']),
  birthdate: yup // 생년월일 확인
    .date()
    .required()
    .transform((value, originalValue) => {
      return isDate(originalValue)
        ? originalValue
        : parse(originalValue, 'yyyy-MM-dd', new Date());
    })
    .max(new Date()),
  terms1: yup // 약관1 체크 확인
    .bool()
    .required()
    .oneOf([true]),
  terms2: yup // 약관2 체크 확인
    .bool()
    .required()
    .oneOf([true]),
});
