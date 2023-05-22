import styled, {css} from 'styled-components';

const activeStyle = css`
  ${props =>
    props.active === 'true' &&
    css`
      border-bottom: 3px solid ${({theme}) => theme.colors.primary};
    `}
`;

const StyledTab = styled.li`
  // 마우스 커서를 포인터로 변경
  cursor: pointer;

  // 글자 가운데 정렬
  display: flex;
  justify-content: center;
  align-items: center;

  // 크기 지정
  width: max-content;
  padding: 1.25rem 2.25rem;

  &:hover {
    background: ${({theme}) => theme.colors.white};
  }

  // 이 탭이 켜져있을 때의 스타일 지정
  ${activeStyle};
`;

const Tab = ({id, title, activeTab, setActiveTab}) => {
  const onClick = () => {
    setActiveTab(id);
  };

  return (
    <StyledTab onClick={onClick} active={String(activeTab === id)}>
      {title}
    </StyledTab>
  );
};

export default Tab;
