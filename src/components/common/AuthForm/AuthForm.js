import {Card} from 'react-bootstrap';
import {FormContainer} from './styles';

const AuthForm = ({children, title}) => {
  return (
    <FormContainer>
      <Card.Title className="mb-5 text-center">{title}</Card.Title>
      {children}
    </FormContainer>
  );
};

export default AuthForm;
