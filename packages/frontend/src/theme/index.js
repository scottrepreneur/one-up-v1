import React from 'react';
import { ThemeProvider, createGlobalStyle, css } from 'styled-components';

export const MEDIA_WIDTHS = {
  upToSmall: 600,
  upToMedium: 960,
  upToLarge: 1280,
  upToExtraLarge: 1600,
};

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    accumulator[size] = (...args) => css`
      @media (max-width: ${MEDIA_WIDTHS[size]}px) {
        ${css(...args)}
      }
    `;
    return accumulator;
  },
  {}
);

// type ThemeProps = {
//   children: any;
// }

const AppThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// interface Theme {
//   white: string;
//   black: string;
//   textColor: string;
//   greyText: string;

//   backgroundColor: string;
//   mediaWidth: typeof mediaWidthTemplates,
// }

export const theme = () => {
  return {
    white: '#ffffff',
    black: '#000000',
    textColor: '#ffffff',
    greyText: '#BDBDBD',

    primary: '#49B2F8',

    backgroundColor: '#212121',
    lighterBackgroundColor: '#333333',
    // media widths
    mediaWidth: mediaWidthTemplates,
  };
};

export const GlobalStyle = createGlobalStyle`
  @supports (font-variation-settings: normal) {
    html { font-family: 'Avenir', serif;}
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  body > div {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}

  html {
    font-size: 16px;
    font-variant: none;
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.backgroundColor};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`;

export default AppThemeProvider;
