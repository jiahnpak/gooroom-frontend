import useAlert from 'hooks/useAlert';
import useInterceptedAxios from 'hooks/useInterceptedAxios';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {Image, Table} from 'react-bootstrap';

const PersonalPosts = () => {
  const jwtAxios = useInterceptedAxios();
  const showAlert = useAlert();
  const [personalPosts, setPersonalPosts] = useState([]);

  useEffect(() => {
    // 서버에서 내가 작성한 게시글 목록을 받아오는 함수이다.
    const getPersonalPosts = async () => {
      try {
        const response = await jwtAxios.get();
        if (!response) {
          throw new Error('서버와 연결이 불안정합니다.');
        }

        // setPersonalPosts로 게시글 목록을 personalPosts 상태에 배열로 저장
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
    getPersonalPosts();
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
        {/* {personalPosts?.map((personalPosts, key) => (
          <tr key={key}>
            <td>personalPosts.프로필이미지</td>
            <td>personalPosts.제목</td>
            <td>personalPosts.연령대</td>
            <td>personalPosts.매칭 상태</td>
            <td>personalPosts.게시글 유형</td>
            <td>personalPosts.주소</td>
            <td>personalPosts.거주 유형</td>
            <td>personalPosts.월전세</td>
            <td>personalPosts.가격</td>
          </tr>
        ))} */}
      </tbody>
    </Table>
  );
};

export default PersonalPosts;
