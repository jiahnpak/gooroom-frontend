import 'App.css';
import theme from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';
import {ThemeProvider} from 'styled-components';
import {Route, Routes} from 'react-router-dom';
import Layout from 'components/common/Layout';
import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users">
              <Route path="email" element={<SignupPage />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
