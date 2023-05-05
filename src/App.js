import 'App.css';
import theme from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';
import {ThemeProvider} from 'styled-components';
import {Route, Routes} from 'react-router-dom';
import Layout from 'components/common/Layout';
import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
