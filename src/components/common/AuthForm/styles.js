import styled from 'styled-components';
import logo from 'assets/images/logo_square.svg';
import {Card} from 'react-bootstrap';
import Link from 'components/common/Link';

const Logo = styled(Card.Img)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  font-size: 1.25rem;
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
`;

const FormPositioner = styled.div`
  margin: 2rem auto;
  max-width: 500px;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const FormContent = styled(Card.Body)`
  padding-left: 3rem;
  padding-right: 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormContainer = ({children}) => {
  return (
    <FormPositioner>
      <Card>
        <Logo variant="top" as="div">
          <Link
            to="/"
            style={{
              color: '#000000',
              fontFamily: 'BrandNameFont',
            }}
          >
            <img alt="" src={logo} width="64" height="64" />
          </Link>
          <Link
            to="/"
            style={{
              color: '#000000',
              fontFamily: 'BrandNameFont',
            }}
          >
            구해줘 룸메즈
          </Link>
        </Logo>
        <FormContent>{children}</FormContent>
      </Card>
    </FormPositioner>
  );
};
