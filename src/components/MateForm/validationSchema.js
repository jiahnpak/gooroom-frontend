import {contentMax, priceStep, titleMax} from 'constants/mateConstants';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  residenceType: yup // 주거 형태 유효성 정의
    .string()
    .required()
    .oneOf(['ONE_ROOM', 'TWO_ROOM', 'APARTMENT', 'STUDIO']),
  rentType: yup // 월세/전세 유효성 정의
    .string()
    .oneOf(['WOLSE', 'JEONSE']),
  roomPrice: yup // 가격 유효성 정의
    .number()
    .required()
    .min(0)
    .test({test: value => value % priceStep === 0}),
  address: yup // 지역 유효성 정의
    .string()
    .required(),
  title: yup // 게시글 제목 유효성 정의
    .string()
    .required()
    .max(titleMax),
  content: yup // 게시글 본문 유효성 정의
    .string()
    .required()
    .max(contentMax),
});
