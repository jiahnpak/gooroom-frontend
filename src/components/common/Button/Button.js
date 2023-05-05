import React from 'react';
import styled, {css} from 'styled-components';
import BootstrapButton from 'react-bootstrap/Button';
import {lighten, darken} from 'polished';

const variantStyles = css`
  ${({theme, variant}) => {
    const selected = theme.btnVariant[variant];
    return css`
      color: ${selected.font};
      background: ${selected.background};
      border: 1px solid ${selected.border};

      &:hover {
        color: ${selected.font};
        background: ${lighten(0.1, selected.background)};
        border: 1px solid ${selected.border};
      }

      &.dropdown-toggle,
      &:not(:disabled):not(.disabled).active,
      &:not(:disabled):not(.disabled):active {
        color: ${selected.font};
        background: ${darken(0.1, selected.background)};
        border: 1px solid ${darken(0.1, selected.border)};
        box-shadow: none;
      }

      &.focus,
      &:focus,
      &:focus-visible {
        box-shadow: none;
        color: ${selected.font};
        background: ${selected.background};
        border: 1px solid ${selected.border};
      }

      &:focus-visible {
        outline: 0;
      }
    `;
  }}
`;

const StyledButton = styled(BootstrapButton)`
  ${variantStyles}
`;

const Button = ({children, variant, ...rest}) => {
  return (
    <StyledButton variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
};

Button.defaultProps = {
  variant: 'primary',
};

export default Button;
