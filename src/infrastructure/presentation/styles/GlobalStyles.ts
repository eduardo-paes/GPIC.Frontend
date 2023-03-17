import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    max-width: 100vw;
    width: 100%;
    background-color: #F5F9FB;
  }

  body {
    font-family: 'Trebuchet MS';
  }
`;
