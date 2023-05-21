import Pagination from 'components/common/Pagination/Pagination';
import {API_MATES_PERSONAL} from 'constants/apiUrls';
import CODE from 'constants/errorCode';
import useAlert from 'hooks/useAlert';
import useInterceptedAxios from 'hooks/useInterceptedAxios';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {Image, Table} from 'react-bootstrap';

const PersonalPosts = () => {
  const jwtAxios = useInterceptedAxios();
  const showAlert = useAlert();

  const [page, setPage] = useState(1);
  const [personalPosts, setPersonalPosts] = useState({
    totalMates: 0,
    mateList: [],
  });

  const getPersonalPosts = async page => {
    try {
      const response = await jwtAxios.get(`${API_MATES_PERSONAL}`, {
        params: {
          page,
        },
      });
      const data = response?.data;
      if (!data) {
        throw new Error();
      }

      const {totalMates, mateList} = data;
      setPersonalPosts({
        totalMates,
        mateList,
      });
    } catch (err) {
      showAlert(
        'danger',
        '서버와 연결이 불안정합니다. 잠시 후 다시 시도해주세요.',
        2000,
      );
    }
  };

  useEffect(() => {
    // 서버에서 내가 작성한 게시글 목록을 받아오는 함수이다.
    getPersonalPosts(page);
  }, [page]);

  console.log(personalPosts);

  return (
    <>
      <Table striped borderless hover responsive size="sm">
        <thead>
          <tr>
            <th>
              <Image fluid roundedCircle thumbnail></Image>
            </th>
            <th>제목</th>
            <th>연령대</th>
            <th>매칭 상태</th>
            <th>게시글 유형</th>
            <th>주소</th>
            <th>거주 유형</th>
            <th>월전세</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          {personalPosts?.mateList?.map((personalPosts, key) => (
            <tr key={key}>
              <td>personalPosts?.title</td>
              <td>formatAgeGroup(personalPosts?.age)</td>
              <td>postStatusFormat[personalPosts?.postStatus]</td>
              <td>hasHomeFormat[personalPosts?.hasHome]</td>
              <td>personalPosts?.city && `${personalPosts.city} `</td>
              <td>residenceTypeFormat[personalPosts?.residenceType]</td>
              <td>rentTypeFormat[personalPosts?.rentType]</td>
              <td>formatPrice(personalPosts?.roomPrice)</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* 페이지 네비게이터 */}
      <Pagination
        totalPosts={personalPosts.totalMates}
        onPageChange={page => setPage(page)}
      />
    </>
  );
};

export default PersonalPosts;
