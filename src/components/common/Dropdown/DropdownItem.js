import React from 'react';
import styled, {css} from 'styled-components';
import {darken} from 'polished';
import BootstrapDropdownItem from 'react-bootstrap/esm/DropdownItem';

const StyledDropdownItem = styled(BootstrapDropdownItem)`
  ${({theme}) => {
    const selected = theme.btnVariant['primary'];
    return css`
      &:not(:disabled):not(.disabled).active,
      &:not(:disabled):not(.disabled):active {
        color: ${selected.font};
        background: ${darken(0.1, selected.background)};
        border: 1px solid ${darken(0.1, selected.border)};
        box-shadow: none;
      }
    `;
  }}
`;

const DropdownItem = ({children, ...rest}) => {
  return <StyledDropdownItem {...rest}>{children}</StyledDropdownItem>;
};

export default DropdownItem;
