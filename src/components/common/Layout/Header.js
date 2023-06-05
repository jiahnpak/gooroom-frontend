import logo from 'assets/images/logo.svg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BrandName} from './styles';
import Button from 'components/common/Button';
import {LOGIN, LOGOUT, MATES, ROOMS, USERS} from 'constants/path';
import {useRecoilValue} from 'recoil';
import {AuthState} from 'stores/AuthState';

const Header = () => {
  const auth = useRecoilValue(AuthState);

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand
            href="/"
            className="d-flex align-items-center gap-3 flex-wrap"
          >
            <img
              alt=""
              src={logo}
              width="64"
              height="36"
              className="d-inline-block align-top"
            />{' '}
            <BrandName>구해줘 룸메즈</BrandName>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="global-navbar" />
          <Navbar.Collapse id="global-navbar">
            <Nav className="ms-auto">
              <Nav.Link href={MATES}>룸메 구하기</Nav.Link>
              <Nav.Link href={ROOMS}>방 구하기</Nav.Link>
              {auth.authenticated ? (
                <>
                  <Button variant="secondary" href={LOGOUT} className="mx-2">
                    로그아웃
                  </Button>
                  <Button variant="primary" href={USERS} className="mx-2">
                    마이페이지
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" href={LOGIN} className="mx-2">
                    시작하기
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
