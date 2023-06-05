import LifestyleForm from 'components/LifestyleForm';
import Loading from 'components/common/Loading/Loading';
import Section from 'components/common/Section';
import CODE from 'constants/errorCode';
import useMember from 'hooks/useMember';
import {useState} from 'react';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import UnexpectedPage from './UnexpectedPage';

const LifestyleFormPage = () => {
  const title = '당신은 어떤 사람인가요?';
  const description = `생활 패턴, 청소 주기, MBTI까지, \n당신이 찾아 헤맨 완벽한 친구를 구해줄게요.`;

  const [unexpectedError, setUnexpectedError] = useState(false);
  const [loading, setLoading] = useState(true);

  const {member, getMember} = useMember();
  const {state} = useLocation();

  useEffect(() => {
    const getDatas = async () => {
      const response = await getMember();

      switch (response) {
        case CODE.UNEXPECTED:
          setUnexpectedError(true);
          break;
        default:
      }

      setLoading(false);
    };
    getDatas();
  }, []);

  if (unexpectedError) {
    return <UnexpectedPage />;
  }

  // 서버에서 데이터를 가져오는 중에는 로딩화면 렌더링
  if (loading) {
    return <Loading />;
  }

  return (
    <Section title={title} description={description}>
      <LifestyleForm member={member} lifestyle={state}></LifestyleForm>
    </Section>
  );
};

export default LifestyleFormPage;
