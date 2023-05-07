import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'DefaultFont';
  }

  hr {
    border-color: ${({theme}) => theme.colors.hr};
  }
`;

export default GlobalStyle;
