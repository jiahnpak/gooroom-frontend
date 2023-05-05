const colors = {
  primary: '#6A5ACD',
  white: '#FBFBFB',
  lightgray: '#AFB1B6',
  btnBorder: '#D4D2E3',
  textDefault: '#5D5A88',
};

const btnVariant = {
  primary: {
    font: colors.white,
    background: colors.primary,
    border: colors.primary,
  },
  secondary: {
    font: colors.textDefault,
    background: colors.white,
    border: colors.btnBorder,
  },
};

const theme = {
  colors,
  btnVariant,
};

export default theme;
