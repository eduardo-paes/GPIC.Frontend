import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';
import LucidaSansRegularTTF from './fonts/Lucida Sans Regular.ttf';
import LucidaSansBoldOTF from './fonts/Lucida Sans Bold.otf';
import LucidaSansItalicTTF from './fonts/Lucida Sans Italic.ttf';

const GlobalStyles = createGlobalStyle`

    @font-face {
        font-family: 'Lucida Sans';
        font-style: normal;
        font-weight: normal;
        src: url(${LucidaSansRegularTTF}) format('ttf');
    }
    @font-face {
        font-family: 'Lucida Sans';
        font-style: normal;
        font-weight: bold;
        src: url(${LucidaSansBoldOTF}) format('otf');
    }
    @font-face {
        font-family: 'Lucida Sans';
        font-style: italic;
        font-weight: normal;
        src: url(${LucidaSansItalicTTF}) format('ttf');
    }
    
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
        font-family: 'Lucida Sans', 'Arial', sans-serif;
    }
    ::-webkit-scrollbar {
        width: 6px;
        background:  ${colors.primary[25]};
    }
    ::-webkit-scrollbar-track {
        background-color:  ${colors.primary[25]};
        border-radius: 1rem;
    }
    ::-webkit-scrollbar-track-piece {
        border-radius: 1rem;
    }
    ::-webkit-scrollbar-thumb {
        background: ${colors.primary[100]};
        border-radius: 1rem;
    }
`;

export default GlobalStyles;