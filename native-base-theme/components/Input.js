import variable from './../variables/platform';

export default (variables = variable) => {
  const inputTheme = {
    '.multiline': {
      height: null,
    },
    height: variables.inputHeightBase,
    color: variables.inputColor,
    paddingLeft: 10,
    paddingRight: 5,
    marginTop: 10,
    paddingBottom: 5,
    flex: 1,
    borderColor: '#D6D7D8',

    fontSize: variables.inputFontSize,
    lineHeight: variables.inputLineHeight,
  };

  return inputTheme;
};
