const TabPanel = ({id, activeTab, children}) => {
  return activeTab === id ? <>{children}</> : null;
};

export default TabPanel;
