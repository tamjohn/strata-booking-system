import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden; 
    height: 100%; 
    width: 100%; 
  }
`;

export default GlobalStyle;
