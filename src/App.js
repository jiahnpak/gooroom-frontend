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

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/users">
                  <Route path="lifestyle">
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
