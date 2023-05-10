const colors = {
  primary: '#6A5ACD',
  white: '#FBFBFB',
  lightgray: '#AFB1B6',
  danger: '#F85149',
  secondaryBtnBorder: '#D4D2E3',
  secondaryBtnText: '#5D5A88',
  textDefault: '#5D5D5D',
  hr: '#ABABAB',
  divider: '#D4D2E3',
};

const btnVariant = {
  primary: {
    font: colors.white,
    background: colors.primary,
    border: colors.primary,
  },
  secondary: {
    font: colors.secondaryBtnText,
    background: colors.white,
    border: colors.secondaryBtnBorder,
  },
  danger: {
    font: colors.danger,
    background: colors.white,
    border: colors.secondaryBtnBorder,
  },
};

const theme = {
  colors,
  btnVariant,
};

export default theme;
