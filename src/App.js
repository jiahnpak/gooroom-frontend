import 'App.css';
import theme from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';
import {ThemeProvider} from 'styled-components';
import {Route, Routes} from 'react-router-dom';
import Layout from 'components/common/Layout';
import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import LifestyleFormPage from 'pages/LifestyleFormPage';
import {AuthProvider} from 'contexts/AuthContext';
import {CookiesProvider} from 'react-cookie';
import * as PATH from 'constants/path';
import LoginEmailPage from 'pages/LoginEmailPage';
import LoginKakao from 'components/Login/LoginKakao';
import Logout from 'components/Logout/Logout';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <CookiesProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path={PATH.LOGIN} element={<LoginPage />} />
                <Route path={PATH.LOGIN_EMAIL} element={<LoginEmailPage />} />
                <Route path={PATH.LOGOUT} element={<Logout />} />
                <Route
                  path={PATH.REDIRECT_URI_KAKAO}
                  element={<LoginKakao />}
                />
                <Route path={PATH.SIGNUP} element={<SignupPage />} />
                <Route path={PATH.USERS}>
                  <Route path={PATH.LIFESTYLE}>
                    <Route index element={<LifestyleFormPage />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </CookiesProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
