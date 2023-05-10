export const smokingType = {
  name: 'smokingType',
  label: '흡연 여부',
  placeholder: '흡연자예요!',
  options: [
    {label: '비흡연자예요!', value: false},
    {label: '흡연자예요!', value: true},
  ],
};

export const drinkingType = {
  name: 'drinkingType',
  label: '음주 빈도',
  placeholder: '음주 빈도 선택',
  options: [
    {label: '거의 안 마셔요', value: 'RARELY'},
    {label: '일주일에 2회 이하', value: 'SOMETIMES'},
    {label: '기타', value: 'USUALLY'},
  ],
};

export const sleepingHabitType = {
  name: 'sleepingHabitType',
  label: '수면 장애',
  placeholder: '이갈이나 코골이가 있어요!',
  options: [
    {label: '이갈이나 코골이가 없어요!', value: false},
    {label: '이갈이나 코골이가 있어요!', value: true},
  ],
};

export const wakeupTime = {
  name: 'wakeupTime',
  label: '수면 패턴',
  placeholder: '수면 패턴 선택',
  options: [
    {label: '6시 전에 일어나요', value: 'DAWN'},
    {label: '6시~9시에 일어나요', value: 'MORNING'},
    {label: '기타', value: 'AFTERNOON'},
  ],
};

export const organizeType = {
  name: 'organizeType',
  label: '물건을 쓰고 언제 정리하나요?',
  placeholder: '정리 주기 선택',
  options: [
    {label: '사용하자마자 바로 정리해요', value: 'NOW'},
    {label: '오늘 안에 정리해요', value: 'TODAY'},
    {label: '내일 정리해요', value: 'TOMORROW'},
  ],
};

export const cleanupType = {
  name: 'cleanupType',
  label: '청소 주기',
  placeholder: '청소 주기 선택',
  options: [
    {label: '1주일에 한 번 이상 해요', value: 'PER_1WEEK'},
    {label: '2주일에 한 번 이상 해요', value: 'PER_2WEEK'},
    {label: '1달에 한 번 이상 해요', value: 'PER_MONTH'},
  ],
};

export const introduce = {
  name: 'introduce',
  label: '자기 소개',
  placeholder: '취미, 라이프스타일, MBTI 등 자기소개를 자유롭게 써주세요.',
};
