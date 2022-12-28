import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }

  a {
    text-decoration: none;
  }

  body {
    margin:0 auto;
    max-width:768px;
    min-width:375px;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

export default GlobalStyle;
