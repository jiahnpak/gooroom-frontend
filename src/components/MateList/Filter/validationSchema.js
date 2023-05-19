import {dongMax} from 'constants/mateConstants';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  rentType: yup // 월세/전세 유효성 정의
    .string()
    .oneOf(['WOLSE', 'JEONSE']),
  price: yup // 가격대 유효성 정의
    .array(yup.number().min(0))
    .required()
    .ensure()
    .length(2),
  residenceType: yup // 주거 형태 유효성 정의
    .string()
    .required()
    .oneOf(['ONE_ROOM', 'TWO_ROOM', 'APARTMENT', 'STUDIO']),
  dong: yup // 지역 유효성 정의
    .string()
    .nullable()
    .max(dongMax),
  age: yup // 연령대 유효성 정의
    .array(yup.number().min(0))
    .required()
    .ensure()
    .length(2),
  postStatus: yup // 상태 유효성 정의
    .string()
    .oneOf(['PROGRESS', 'DISCUSSION', 'COMPLETE']),
});
