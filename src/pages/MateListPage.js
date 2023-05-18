import MateList from 'components/MateList';
import Filter from 'components/MateList/Filter/Filter';
import {ButtonWrapper, StyledMateListWrapper} from 'components/MateList/styles';
import useFilter from 'components/MateList/Filter/useFilter';
import Button from 'components/common/Button/Button';
import Section from 'components/common/Section/Section';
import CODE from 'constants/errorCode';
import useMateList from 'hooks/useMateList';
import {useEffect, useState} from 'react';
import UnexpectedPage from './UnexpectedPage';
import Loading from 'components/common/Loading/Loading';
import Pagination from 'components/common/Pagination/Pagination';

const MateListPage = () => {
  const title = '룸메 구하기';

  const [activeButton, setActiveButton] = useState('button1');
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [filter, dispatchFilter] = useFilter();
  const {mateList, getMateList} = useMateList();

  // 룸메이트 게시글 탭을 누르면 필터에 반영
  const onTabClick = buttonName => {
    setActiveButton(buttonName);
    dispatchFilter({type: 'MOVE_TAB', hasHome: buttonName === 'button1'});
  };

  // 페이지 네비게이터를 누르면 필터에 반영
  const onPageChange = page => {
    dispatchFilter({type: 'MOVE_PAGE', page: page});
  };

  useEffect(() => {
    const getDatas = async () => {
      const response = await getMateList();
      switch (response) {
        case CODE.UNEXPECTED:
          setUnexpectedError(true);
          break;
        default:
      }

      setLoading(false);
    };
    getDatas();
  }, [filter]);

  if (unexpectedError) {
    return <UnexpectedPage />;
  }

  // 서버에서 데이터를 가져오는 중에는 로딩화면 렌더링
  if (loading) {
    return <Loading />;
  }

  return (
    <Section title={title}>
      <StyledMateListWrapper>
        {/* 룸메이트 게시글 탭 */}
        <ButtonWrapper>
          <Button
            variant={activeButton === 'button1' ? 'primary' : 'secondary'}
            size="lg"
            style={{margin: '10px', fontSize: '1rem', borderRadius: '15px'}}
            onClick={() => onTabClick('button1')}
          >
            거주 중인 집이 있어요
          </Button>
          <Button
            variant={activeButton === 'button2' ? 'primary' : 'secondary'}
            size="lg"
            style={{
              margin: '10px',
              borderRadius: '15px',
              fontSize: '1rem',
            }}
            onClick={() => onTabClick('button2')}
          >
            같이 집 구해요
          </Button>
        </ButtonWrapper>

        {/* 필터링 메뉴 */}
        <Filter dispatchFilter={dispatchFilter} />

        {/* 현재 페이지의 룸메이트 게시글 목록 */}
        <MateList mateList={mateList} />

        {/* 페이지 네비게이터 */}
        <Pagination
          totalPosts={mateList.totalMates}
          onPageChange={onPageChange}
        />
      </StyledMateListWrapper>
    </Section>
  );
};

export default MateListPage;
