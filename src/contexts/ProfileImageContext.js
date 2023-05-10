import {API_USERS_PROFILEIMAGE} from 'constants/apiUrls';
import {PROFILE_IMAGE} from 'constants/defaultValue';
import useInterceptedAxios from 'hooks/useInterceptedAxios';
import React, {createContext, useContext, useState, useEffect} from 'react';

const ProfileImageContext = createContext();

// Context Provider 생성
export const ProfileImageProvider = ({children}) => {
  const jwtAxios = useInterceptedAxios();
  const [profileImage, setProfileImage] = useState(PROFILE_IMAGE);

  const getProfileImage = async nickname => {
    try {
      const response = await jwtAxios.get(
        `${API_USERS_PROFILEIMAGE}/${nickname}`,
        {
          responseType: 'arraybuffer',
        },
      );
      const imageData = response?.data?.file;

      if (imageData) {
        const imageType = response.headers['content-type'].split('/')[1];
        const base64Image = Buffer.from(imageData, 'binary').toString('base64');

        setProfileImage(`data:image/${imageType};base64,${base64Image}`);
      }
    } catch (err) {}
  };

  return (
    <ProfileImageContext.Provider value={{profileImage, getProfileImage}}>
      {children}
    </ProfileImageContext.Provider>
  );
};

// 프로필 이미지에 접근하는 custom hook 생성
export const useProfileImage = nickname => {
  const {profileImage, getProfileImage} = useContext(ProfileImageContext);

  // 프로필 이미지 가져오기
  useEffect(() => {
    getProfileImage(nickname);
  }, []);

  return profileImage;
};
