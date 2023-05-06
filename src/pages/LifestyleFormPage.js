import LifestyleForm from 'components/LifestyleForm';
import Section from 'components/common/Section';

const LifestyleFormPage = () => {
  const title = '당신은 어떤 사람인가요?';
  const description = `생활 패턴, 청소 주기, MBTI까지, \n당신이 찾아 헤맨 완벽한 친구를 구해줄게요.`;

  return (
    <Section title={title} description={description}>
      <LifestyleForm></LifestyleForm>
    </Section>
  );
};

export default LifestyleFormPage;
