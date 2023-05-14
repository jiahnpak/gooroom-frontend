const CODE = {
  ALREADY_EXIST_USER_EMAIL: 419, // 이미 존재하는 이메일입니다.
  ALREADY_EXIST_USER_NICKNAME: 429, // 이미 존재하는 닉네임입니다.
  LOGIN_FAILURE: 401, // 등록되지 않은 이메일 또는 비밀번호를 잘못 입력했습니다.
  NOT_FOUND_MEMBER: 404, // 회원정보가 없습니다.
  INVALIDATE_TOKEN: 499, // 만료된 토큰 또는 유효하지 않은 토큰입니다.
  UNEXPECTED: 500, // 원인을 알 수 없음
};

export default CODE;
