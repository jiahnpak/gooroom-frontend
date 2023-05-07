import {StyledAlert} from './styles';

const Alert = ({children, ...rest}) => {
  return <StyledAlert {...rest}>{children}</StyledAlert>;
};

export default Alert;
