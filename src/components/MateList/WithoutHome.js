import useInterceptedAxios from 'hooks/useInterceptedAxios';
import ListGroup from 'react-bootstrap/ListGroup';
import {useEffect, useState} from 'react';
import {useMateList} from 'contexts/MateListContext';
import {useReducer} from 'react';
import Posted from '../common/Posted/Posted';

const initialFilter = {
  page: 1,
  hasHome: false,
  rentType: null,
  minPrice: null,
  maxPrice: null,
  residenceType: null,
  dong: null,
  minAge: null,
  maxAge: null,
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'MOVE_PAGE':
      return {...state, page: action.page};
    case 'MOVE_TAB':
      return {...state, hasHome: action.hasHome};
    case 'CHANGE_RENTTYPE':
      return {...state, rentType: action.rentType};
    case 'CHANGE_MINPRICE':
      return {...state, minPrice: action.minPrice};
    case 'CHANGE_MAXPRICE':
      return {...state, maxPrice: action.maxPrice};
    case 'CHANGE_RESITYPE':
      return {...state, residenceType: action.residenceType};
    case 'CHANGE_DONG':
      return {...state, dong: action.dong};
    case 'CHANGE_MINAGE':
      return {...state, minAge: action.minAge};
    case 'CHANGE_MAXAGE':
      return {...state, maxAge: action.maxAge};
    default:
      throw new Error(`올바르지 않은 action입니다: ${action.type}`);
  }
};

const WithoutHome = () => {
  const [filter, dispatch] = useReducer(filterReducer, initialFilter);
  const mateList = useMateList(filter);
  const [page, setPage] = useState(1);
  const postsPerPage = 10;
  const [mates, setMates] = useState({
    totalMates: 0,
    mateList: [
      {
        title: '집 x 게시글 1번',
        birthyear: '20대 후반',
        postStatus: '협의중',
        address: '상도동',
        homeType: '원룸',
        roomPrice: '50만원',
        rentType: '월세',
      },
      {
        title: 'title',
        birthyear: 2000,
        postStatus: 'PROGRESS',
        address: '상도동',
        homeType: '원룸',
        roomPrice: '50만원',
        rentType: '월세',
      },
      {
        title: 'title',
        birthyear: 2000,
        postStatus: 'PROGRESS',
        address: '상도동',
        homeType: '월세',
        roomPrice: '50만원',
        rentType: '월세',
      },
      {
        title: 'title',
        birthyear: 2000,
        postStatus: 'PROGRESS',
        address: '상도동',
        homeType: '월세',
        roomPrice: '50만원',
      },
      {
        title: 'title',
        birthyear: 2000,
        postStatus: 'PROGRESS',
        address: '상도동',
        homeType: '월세',
        roomPrice: '50만원',
      },
      {
        title: '집 x 게시글 1번',
        birthyear: '20대 후반',
        postStatus: '협의중',
        address: '상도동',
        homeType: '월세',
        roomPrice: '50만원',
      },
      {
        title: '집 x 게시글 1번',
        birthyear: '20대 후반',
        postStatus: '협의중',
        address: '상도동',
        homeType: '월세',
        roomPrice: '50만원',
      },
      {
        title: '집 x 게시글 1번',
        birthyear: '20대 후반',
        postStatus: '협의중',
        address: '상도동',
        homeType: '월세',
        roomPrice: '50만원',
      },
    ],
  });

  // useEffect(() => {
  //   const getMates = async () => {
  //     try {
  //       const matesList = await jwtAxios.get('/mates', {params: filter});
  //       const data = JSON.parse(matesList?.data || '{}');
  //     } catch (err) {}
  //   };
  //   getMates();
  // }, [filter]);

  return (
    <>
      {mates.mateList.map((mates, index) => (
        <div>
          <Posted key={index} mates={mates}></Posted>
        </div>
      ))}
      {/* <div>
        {Array.from({length: Math.ceil(mates.length / 10)}).map((_, index) => (
          <button key={index} onClick={() => handlePage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div> */}
    </>
  );
};
export default WithoutHome;
