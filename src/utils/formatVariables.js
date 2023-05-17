import {priceMax} from 'components/MateList/Filter/validationSchema';

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
