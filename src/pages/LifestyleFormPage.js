import LifestyleForm from 'components/LifestyleForm';
import Section from 'components/common/Section';
import useAuthRedirect from 'hooks/useAuthRedirect';

const LifestyleFormPage = () => {
  const title = '당신은 어떤 사람인가요?';
  const description = `생활 패턴, 청소 주기, MBTI까지, \n당신이 찾아 헤맨 완벽한 친구를 구해줄게요.`;

  // 인증되지 않은 사용자를 로그인 페이지로 리다이렉트
  useAuthRedirect();

  return (
    <Section title={title} description={description}>
      <LifestyleForm></LifestyleForm>
    </Section>
  );
};

export default LifestyleFormPage;
