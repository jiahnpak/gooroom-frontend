import React, {useState} from 'react';
import styled from 'styled-components';
import Tab from './Tab';
import Button from 'components/common/Button/Button';
import TabPanel from './TabPanel';

const StyledTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  // 크기 지정
  min-width: 90%;
  padding: 2rem;
`;

const StyledTabList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  // 크기 지정
  width: 100%;

  // 색상 지정
  border-bottom: 2px solid ${({theme}) => theme.colors.divider};
`;

const StyledTabListLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;

  margin-bottom: 0;
`;

const StyledTabListRight = styled.div``;

const StyledTabContent = styled.div``;

const Tabs = ({tabList, tabButton, children}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <StyledTabs>
      <StyledTabList role="tablist">
        <StyledTabListLeft>
          {tabList?.map(tabList => (
            <Tab
              id={tabList.id}
              title={tabList.title}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              key={tabList.id}
              role="tab"
            />
          ))}
        </StyledTabListLeft>
        <StyledTabListRight>
          {tabButton && (
            <Button
              variant="secondary"
              size="lg"
              style={{
                fontSize: '1rem',
                whiteSpace: 'nowrap',
              }}
              onClick={tabButton.onClick}
            >
              {tabButton.title}
            </Button>
          )}
        </StyledTabListRight>
      </StyledTabList>
      <StyledTabContent>
        {React.Children.map(children, (child, index) => {
          return (
            <TabPanel key={index} id={tabList[index].id} activeTab={activeTab}>
              {child}
            </TabPanel>
          );
        })}
      </StyledTabContent>
    </StyledTabs>
  );
};

export default Tabs;
