import {useReducer} from 'react';

const initialFilter = {
  page: 1,
  hasHome: true,
  rentType: 'WOLSE',
  minPrice: 0,
  maxPrice: 999999999,
  residenceType: 'ONE_ROOM',
  dong: null,
  minAge: 0,
  maxAge: 100,
  postStatus: 'PROGRESS',
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'MOVE_PAGE':
      return {...state, page: action.page};
    case 'MOVE_TAB':
      return {...state, hasHome: action.hasHome};
    case 'CHANGE_FILTER':
      return {...state, ...action.filter};
    default:
      throw new Error(`올바르지 않은 action입니다: ${action.type}`);
  }
};

const useFilter = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, initialFilter);

  return [filter, dispatchFilter];
};

export default useFilter;
