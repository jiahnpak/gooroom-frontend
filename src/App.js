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
import {AlertProvider} from 'contexts/AlertContext';
import ProfilePage from 'pages/ProfilePage';
import LifestylePage from 'pages/LifestylePage';
import LoginNaver from 'components/Login/LoginNaver';
import {RecoilRoot} from 'recoil';
import NotFoundPage from 'pages/NotFoundPage';
import MateListPage from 'pages/MateListPage';
import MateFormPage from 'pages/MateFormPage';
import MatePostedPage from 'pages/MatePostedPage';

const App = () => {
  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <CookiesProvider>
            <AuthProvider>
              <AlertProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path={PATH.LOGIN} element={<LoginPage />} />
                    <Route
                      path={PATH.LOGIN_EMAIL}
                      element={<LoginEmailPage />}
                    />
                    <Route path={PATH.LOGOUT} element={<Logout />} />
                    <Route
                      path={PATH.REDIRECT_URI_KAKAO}
                      element={<LoginKakao />}
                    />
                    <Route
                      path={PATH.REDIRECT_URI_NAVER}
                      element={<LoginNaver />}
                    />
                    <Route path={PATH.SIGNUP} element={<SignupPage />} />
                    <Route path={PATH.USERS} element={<ProfilePage />} />
                    <Route
                      path={PATH.USERS_LIFESTYLE}
                      element={<LifestyleFormPage />}
                    />
                    <Route
                      path={`${PATH.USERS_LIFESTYLE}/:nickname`}
                      element={<LifestylePage />}
                    />
                    <Route path={PATH.MATES}>
                      <Route index element={<MateListPage />} />
                      <Route path=":postId" element={<MatePostedPage />} />
                      <Route path="new" element={<MateFormPage />} />
                    </Route>
                  </Route>
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </AlertProvider>
            </AuthProvider>
          </CookiesProvider>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
