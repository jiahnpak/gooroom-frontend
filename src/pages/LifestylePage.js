import Lifestyle from 'components/Lifestyle/Lifestyle';
import Section from 'components/common/Section/Section';
import useAuthRedirect from 'hooks/useAuthRedirect';

const LifestylePage = () => {
  const title = '나는 이런 사람이에요!';

  // 인증되지 않은 사용자를 로그인 페이지로 리다이렉트
  // useAuthRedirect();

  return (
    <Section title={title}>
      <Lifestyle></Lifestyle>
    </Section>
  );
};

export default LifestylePage;
