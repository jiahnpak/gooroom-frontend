import logo from 'assets/images/logo.svg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BrandName} from './styles';
import Button from 'components/common/Button';

const Header = () => {
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
              <Nav.Link href="/">룸메 구하기</Nav.Link>
              <Nav.Link href="/">방 구하기</Nav.Link>
              <Nav.Link href="/">커뮤니티</Nav.Link>
              <Button variant="primary" href="/login">
                시작하기
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
