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
  colors: {
    // ...theme.colors,
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
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
  components: {
    Heading: {
      baseStyle: {
        fontFamily: 'calling-code',
      },
    },
    Button: {
      baseStyle: {
        textTransform: 'uppercase',
        fontWeight: 700,
        _hover: {
          fontWeight: 900,
        },
      },
      variants: {
        primary: {
          bg: 'brand.900',
          color: 'white',
          _hover: {
            bg: 'brand.800',
          },
        },
        outline: {
          bg: 'transparent',
          border: '1px',
          borderColor: 'brand.700',
          color: 'brand.700',
          _hover: {
            bg: 'brand.900',
            color: 'whiteAlpha.800',
          },
        },
      },
    },
  },
});
