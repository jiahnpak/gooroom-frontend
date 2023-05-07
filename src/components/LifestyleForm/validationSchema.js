import * as yup from 'yup';
import {
  smokingType,
  drinkingType,
  sleepingHabitType,
  wakeupTime,
  organizeType,
  cleanupType,
  introduce,
} from './itemList';

export const validationSchema = yup.object().shape({
  [smokingType.name]: yup // 흡연 여부 유효성 정의
    .bool()
    .required()
    .oneOf([true, false]),
  [drinkingType.name]: yup // 음주 빈도 유효성 정의
    .string()
    .required()
    .oneOf(drinkingType.options.map(option => option.value)),
  [sleepingHabitType.name]: yup // 수면 장애 유효성 정의
    .bool()
    .required()
    .oneOf([true, false]),
  [wakeupTime.name]: yup // 수면 패턴 유효성 정의
    .number()
    .required()
    .oneOf(wakeupTime.options.map(option => option.value)),
  [organizeType.name]: yup // 정리 주기 유효성 정의
    .string()
    .required()
    .oneOf(organizeType.options.map(option => option.value)),
  [cleanupType.name]: yup // 청소 주기 유효성 정의
    .string()
    .required()
    .oneOf(cleanupType.options.map(option => option.value)),
  [introduce.name]: yup // 자기 소개 유효성 정의
    .string()
    .max(500),
});
