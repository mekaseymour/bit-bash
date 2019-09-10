import { Dimensions } from 'react-native';

const IPHONE_8_SCREEN_HEIGHT = 800;
const IPHONE_X_SCREEN_HEIGHT = 850;

export const IPHONE_8_OR_SMALLER = Dimensions.get('window').height <= IPHONE_8_SCREEN_HEIGHT;
export const IPHONE_X_OR_SMALLER = Dimensions.get('window').height <= IPHONE_X_SCREEN_HEIGHT;
