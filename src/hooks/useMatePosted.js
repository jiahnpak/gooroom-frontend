import {useState} from 'react';
import useInterceptedAxios from './useInterceptedAxios';
import {API_MATES} from 'constants/apiUrls';
import CODE from 'constants/errorCode';
import {PROFILE_IMAGE} from 'constants/defaultValue';

const useMatePosted = () => {
  // 게시글에서 조회되는 정보를 저장, 관리한다.
  const [mateInfo, setMateInfo] = useState({
    title: null,
    hasHome: null,
    postStatus: null,
    lastEditTime: null,
    residenceType: null,
    rentType: null,
    roomPrice: null,
    city: null,
    roadName: null,
    buildingNumber: null,
    zipcode: null,
    content: null,
    nickname: null,
    age: null,
    postmark: null,
  });
  // 게시글 작성자의 프로필 사진를 저장, 관리한다.
  const [profileImage, setProfileImage] = useState(PROFILE_IMAGE);
  // 게시글에 등록된 방 사진을 저장, 관리한다.
  const [roomImage, setRoomImage] = useState(null);

  const jwtAxios = useInterceptedAxios();

  /**
   * 서버에서 postId를 id로 갖는 게시글의 정보를 받아와서 mateInfo에 저장한다.
   * @param {int} postId - 게시글 id
   */
  const getMateInfo = async postId => {
    try {
      const response = await jwtAxios.get(`${API_MATES}/${postId}`);
      const data = response?.data;
      if (!data) {
        throw new Error();
      }

      setMateInfo(prev => data);
    } catch (err) {
      const errorCode = err?.response?.data?.errorCode;
      if (!errorCode) {
        return CODE.UNEXPECTED;
      }

      return errorCode;
    }
  };

  /**
   * 서버에서 postId를 id로 갖는 게시글 작성자의 프로필 사진을 받아와서 profileImage에 저장한다.
   * @param {int} postId - 게시글 id
   */
  const getProfileImage = async postId => {
    try {
      // 이미지 파일을 가져오기 위해 responseType을 arraybuffer로 지정
      const response = await jwtAxios.get(
        `${API_MATES}/${postId}/profileImage`,
        {responseType: 'arraybuffer'},
      );
      const imageData = response?.data?.file;
      if (!imageData) {
        throw new Error();
      }

      const imageType = response.headers['content-type'].split('/')[1];
      // 이미지를 Base64 문자열로 변경
      const base64Image = Buffer.from(imageData, 'binary').toString('base64');

      setProfileImage(`data:image/${imageType};base64,${base64Image}`);
    } catch (err) {
      if (err?.response?.status === CODE.NOT_FOUND) {
        return CODE.NOT_FOUND;
      }
      const errorCode = err?.response?.data?.errorCode;
      if (!errorCode) {
        return CODE.UNEXPECTED;
      }

      return errorCode;
    }
  };

  /**
   * 서버에서 postId를 id로 갖는 게시글 작성자의 프로필 사진을 받아와서 profileImage에 저장한다.
   * @param {int} postId - 게시글 id
   */
  const getRoomImage = async postId => {
    try {
      // 이미지 파일을 가져오기 위해 responseType을 arraybuffer로 지정
      const response = await jwtAxios.get(`${API_MATES}/${postId}/roomImage`, {
        responseType: 'arraybuffer',
      });
      const imageData = response?.data?.file;
      if (!imageData) {
        throw new Error();
      }

      const imageType = response.headers['content-type'].split('/')[1];
      // 이미지를 Base64 문자열로 변경
      const base64Image = Buffer.from(imageData, 'binary').toString('base64');

      setRoomImage(`data:image/${imageType};base64,${base64Image}`);
    } catch (err) {
      if (err?.response?.status === CODE.NOT_FOUND) {
        return CODE.NOT_FOUND;
      }
      const errorCode = err?.response?.data?.errorCode;
      if (!errorCode) {
        return CODE.UNEXPECTED;
      }

      return errorCode;
    }
  };

  return {
    mateInfo,
    setMateInfo,
    getMateInfo,
    profileImage,
    setProfileImage,
    getProfileImage,
    roomImage,
    setRoomImage,
    getRoomImage,
  };
};

export default useMatePosted;
