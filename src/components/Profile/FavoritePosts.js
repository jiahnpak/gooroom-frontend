import useAlert from 'hooks/useAlert';
import useInterceptedAxios from 'hooks/useInterceptedAxios';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {Image, Table} from 'react-bootstrap';

const FavoritePosts = () => {
  const jwtAxios = useInterceptedAxios();
  const showAlert = useAlert();
  const [favoritePosts, setFavoritePosts] = useState([]);

  useEffect(() => {
    // 서버에서 찜한 게시글 목록을 받아오는 함수이다.
    const getFavoritePosts = async () => {
      try {
        const response = await jwtAxios.get();
        if (!response) {
          throw new Error('서버와 연결이 불안정합니다.');
        }

        // setFavoritePosts로 게시글 목록을 favoritePosts 상태에 배열로 저장
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
    getFavoritePosts();
  }, [jwtAxios]);

  return (
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
        {/* {favoritePosts?.map((favoritePosts, key) => (
          <tr key={key}>
            <td>favoritePosts.프로필이미지</td>
            <td>favoritePosts.제목</td>
            <td>favoritePosts.연령대</td>
            <td>favoritePosts.매칭 상태</td>
            <td>favoritePosts.게시글 유형</td>
            <td>favoritePosts.주소</td>
            <td>favoritePosts.거주 유형</td>
            <td>favoritePosts.월전세</td>
            <td>favoritePosts.가격</td>
          </tr>
        ))} */}
      </tbody>
    </Table>
  );
};

export default FavoritePosts;
