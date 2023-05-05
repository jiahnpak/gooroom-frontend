import styled, {css} from 'styled-components';
import {darken} from 'polished';
import {Link as RouterLink} from 'react-router-dom';

const StyledLink = styled(RouterLink)`
  ${({theme}) => {
    const lightgray = theme.colors.lightgray;
    return css`
      text-decoration: none;
      color: ${lightgray};
      &:hover {
        color: ${darken(0.1, lightgray)};
      }
    `;
  }}
`;

const Link = ({children, ...rest}) => {
  return <StyledLink {...rest}>{children}</StyledLink>;
};

export default Link;
