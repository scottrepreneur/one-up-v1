import { extendTheme } from '@chakra-ui/react';

// const customColors = {
//   white: '#ffffff',
//   black: '#000000',
//   textColor: '#ffffff',
//   greyText: '#BDBDBD',

//   primary: '#49B2F8',

//   backgroundColor: '#212121',
//   lighterBackgroundColor: '#333333',
// };

// Let's say you want to add custom colors
export const customTheme = {
  // ...theme,
  colors: {
    // ...theme.colors,
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
};

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        fontFamily: 'calling-code',
        fontSize: 'md',
        color: 'whiteAlpha.900',
      },
      a: {
        _hover: { textDecoration: 'none' },
      },
    },
  },
});
