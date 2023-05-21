import React from 'react';
import styled, {css} from 'styled-components';
import {lighten, darken} from 'polished';
import {DropdownButton} from 'react-bootstrap';

const variantStyles = css`
  ${({theme, variant}) => {
    const selected = theme.btnVariant[variant];
    return css`
      .btn-${variant}.dropdown-toggle, & > button {
        color: ${selected.font};
        background: ${selected.background};
        border: 1px solid ${selected.border};

        &:hover {
          color: ${selected.font};
          background: ${lighten(0.1, selected.background)};
          border: 1px solid ${selected.border};
        }

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

        &:disabled {
          color: ${selected.font};
          background: ${selected.background};
          border: 1px solid ${selected.border};
        }
      }
    `;
  }}
`;

const sizeStyles = css`
  ${({size}) => {
    switch (size) {
      case 'lg':
        return css`
          font-size: 1rem;
        `;
      default:
    }
  }}
`;

const StyledDropdown = styled(DropdownButton)`
  ${variantStyles}
  ${sizeStyles}
`;

const Dropdown = ({children, variant, size, ...rest}) => {
  return (
    <StyledDropdown variant={variant} size={size} {...rest}>
      {children}
    </StyledDropdown>
  );
};

Dropdown.defaultProps = {
  variant: 'primary',
};

export default Dropdown;
