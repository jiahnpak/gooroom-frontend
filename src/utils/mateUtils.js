import {differenceInSeconds} from 'date-fns';

const {priceMax} = require('constants/mateConstants');

// 가격대 슬라이더의 속성을 정의하는 객체
export const priceControl = {
  WOLSE: {
    // 월세인 경우
    max: 30,
    otherMax: 35,
    scale: price => {
      if (price <= 14) {
        return 10000 * (5 * price);
      } else if (price <= 22) {
        return 10000 * (10 * (price - 14) + 70);
      } else if (price <= 29) {
        return 10000 * (50 * (price - 22) + 150);
      } else {
        return priceMax;
      }
    },
  },
  JEONSE: {
    // 전세인 경우
    max: 35,
    otherMax: 30,
    scale: price => {
      if (price <= 2) {
        return 10000 * (50 * price);
      } else if (price <= 6) {
        return 10000 * (100 * (price - 2) + 100);
      } else if (price <= 25) {
        return 10000 * (500 * (price - 6) + 500);
      } else if (price <= 27) {
        return 10000 * (5000 * (price - 25) + 10000);
      } else if (price <= 34) {
        return 10000 * (10000 * (price - 27) + 20000);
      } else {
        return priceMax;
      }
    },
  },
};

export const formatPrice = price => {
  if (price === priceMax) {
    return '전체';
  } else if (price > 0) {
    const erk = Math.floor(price / 100000000);
    const man = Math.floor((price % 100000000) / 10000);
    return (!!erk ? erk + '억 ' : '') + (!!man ? man + '만 ' : '') + '원';
  } else {
    return price;
  }
};

export const formatAgeGroup = age => {
  const tens = Math.floor(age / 10) * 10;
  const units = age % 10;

  if (units < 3) {
    return `${tens}대 초반`;
  } else if (units < 7) {
    return `${tens}대 중반`;
  } else {
    return `${tens}대 후반`;
  }
};

export const formatDifferenceInTimes = (laterDate, earlierDate) => {
  let difference = differenceInSeconds(laterDate, earlierDate);
  const times = [60, 60, 24, 365];
  const units = ['초', '분', '시간', '일', '년'];

  let i;
  for (i = 0; i < times.length; i++) {
    const nextDifference = Math.floor(difference / times[i]);
    if (nextDifference === 0) {
      break;
    }
    difference = nextDifference;
  }
  return `${difference}${units[i]} 전`;
};
