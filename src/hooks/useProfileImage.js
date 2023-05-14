import {API_USERS_PROFILEIMAGE} from 'constants/apiUrls';
import {PROFILE_IMAGE} from 'constants/defaultValue';
import {useState} from 'react';
import useInterceptedAxios from './useInterceptedAxios';
import CODE from 'constants/errorCode';

const useProfileImage = () => {
  const [profileImage, setProfileImage] = useState(PROFILE_IMAGE);
  const jwtAxios = useInterceptedAxios();

  const getProfileImage = async nickname => {
    try {
      // 이미지 파일을 가져오기 위해 responseType을 arraybuffer로 지정
      const response = await jwtAxios.get(
        `${API_USERS_PROFILEIMAGE}/${nickname}`,
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
      const errorCode = err?.response?.data?.errorCode;
      if (!errorCode) {
        return CODE.UNEXPECTED;
      }

      return errorCode;
    }
  };

  return {profileImage, setProfileImage, getProfileImage};
};

export default useProfileImage;
