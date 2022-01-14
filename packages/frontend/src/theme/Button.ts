const Button = {
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
};

export default Button;
