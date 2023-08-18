import {Dimensions} from 'react-native';

const theme = {
  // primary color
  primary: '#0a0a0a',
  blue: '#1D3557',
  // primary_faint: '#9dacbb',
  // primary_faint: '#223F66',
  primary_faint: '#141414',
  primary_light: '#0a0a0a90',
  // primary_light: '#A8DADC',
  primary_transparent: '#00000030',
  // secondary color
  secondary: '#E63946',
  secondary_faint: '#f3a4a9',
  secondary_light: '#fcc2c3',
  light: '#FAFAFA',

  third: '#08c18a',
  third_faint: '#08c18a70',
  
  // text
  text_light: '#ffffff',
  text_dark: '#000000',
  text_dark_faint: '#363636',

  // random colors
  grey: '#c1c1c1',
  red: '#ff0000',
  amber: '#ff0',
  background: "#FFFFFF" ,
  black: '#000000'
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const alertLightMode = { backgroundColor: 'white', borderRadius: 5, width: windowWidth - 50, marginLeft: 25, };


export {windowHeight, windowWidth, theme, alertLightMode};
