import { Dimensions } from 'react-native';

const IPHONE_8_SCREEN_HEIGHT = 667;

export const IPHONE_8_OR_SMALLER = Dimensions.get('window').height <= IPHONE_8_SCREEN_HEIGHT;
