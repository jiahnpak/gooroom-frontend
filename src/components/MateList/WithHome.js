import useInterceptedAxios from 'hooks/useInterceptedAxios';
import ListGroup from 'react-bootstrap/ListGroup';
import {useEffect, useState} from 'react';
import {useMateList} from 'contexts/MateListContext';
import {useReducer} from 'react';
import Posted from '../common/Posted/Posted';
import {Button} from 'react-bootstrap';

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
    case 'CHANGE_MINPRICE':
    case 'CHANGE_MAXPRICE':
    case 'CHANGE_RESITYPE':
    case 'CHANGE_DONG':
    case 'CHANGE_MINAGE':
    case 'CHANGE_MAXAGE':
      return {...state, [action.field]: action.value};
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
        title: '집 o 게시글 1번',
        birthyear: '20대 후반',
        postStatus: '협의중',
        address: '상도동',
        homeType: '월세',
        roomPrice: '50만원',
      },
      {
        title: '집 o ',
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
        title: 'title',
        birthyear: 2000,
        postStatus: 'PROGRESS',
        address: '상도동',
        homeType: '월세',
        roomPrice: '50만원',
      },
    ],
  });
  const handlePage = current => {
    setPage(current + 1);
  };

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
      ;
      {/* <div style={{display: 'flex', justifyContent: 'center'}}>
        {Array.from({
          length: Math.ceil(mates.mateList.length / postsPerPage),
        }).map((_, index) => (
          <Button
            variant={page === 1 ? 'primary' : 'secondary'}
            size="sm"
            type="submit"
            onClick={() => handlePage()}
          >
            {index + 1}
          </Button>
        ))}
      </div> */}
      ;
    </>
  );
};
export default WithoutHome;
