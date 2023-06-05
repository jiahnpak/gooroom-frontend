import {API_MATES_MARKED} from 'constants/apiUrls';
import {
  postStatusFormat,
  rentTypeFormat,
  residenceTypeFormat,
} from 'constants/mateConstants';
import {MATES} from 'constants/path';
import useAlert from 'hooks/useAlert';
import useInterceptedAxios from 'hooks/useInterceptedAxios';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {Pagination, Table} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {formatAgeGroup, formatPrice} from 'utils/mateUtils';

const FavoritePosts = () => {
  const jwtAxios = useInterceptedAxios();
  const showAlert = useAlert();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [favoritePosts, setFavoritePosts] = useState({
    totalMates: 0,
    mateList: [],
  });

  const getFavoritePosts = async page => {
    try {
      const response = await jwtAxios.get(API_MATES_MARKED, {
        params: {
          page: page - 1,
        },
      });
      const data = response?.data;
      if (!data) {
        throw new Error('No Data');
      }

      // setFavoritePosts로 게시글 목록을 favoritePosts 상태에 배열로 저장
      const {totalMates, mateList} = data;
      setFavoritePosts({
        totalMates,
        mateList,
      });
    } catch (err) {
      const errorCode = err?.response?.data?.errorCode;

      switch (errorCode) {
        default: // 기타 에러에 대한 처리
          showAlert(
            'danger',
            '서버와 연결이 불안정합니다. 잠시 후 시도해주세요.',
            2000,
          );
      }
    }
  };

  useEffect(() => {
    // 서버에서 찜한 게시글 목록을 받아오는 함수이다.
    getFavoritePosts(page);
  }, [page]);

  return (
    <div className="d-flex flex-column align-items-center">
      <Table striped borderless hover responsive size="sm">
        <thead>
          <tr>
            <th>제목</th>
            <th>연령대</th>
            <th>매칭 상태</th>
            <th>주소</th>
            <th>거주 유형</th>
            <th>월전세</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          {favoritePosts?.mateList?.map((favoritePosts, key) => (
            <tr
              key={key}
              style={{cursor: 'pointer'}}
              onClick={() => navigate(`${MATES}/${favoritePosts.postId}`)}
            >
              <td>{favoritePosts?.title}</td>
              <td>{formatAgeGroup(favoritePosts?.age)}</td>
              <td>{postStatusFormat[favoritePosts?.postStatus]}</td>
              <td>
                <span>{`${favoritePosts?.city} `}</span>
                <span>
                  {favoritePosts?.dong
                    ? `${favoritePosts.dong} `
                    : `${favoritePosts.roadName} `}
                </span>
              </td>
              <td>{residenceTypeFormat[favoritePosts?.residenceType]}</td>
              <td>{rentTypeFormat[favoritePosts?.rentType]}</td>
              <td>{formatPrice(favoritePosts?.roomPrice)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* 페이지 네비게이터 */}
      <Pagination
        totalPosts={favoritePosts.totalMates}
        onPageChange={page => setPage(page)}
      />
    </div>
  );
};

export default FavoritePosts;
