import { Platform } from 'react-native';
import * as Colors from './colors';
import * as Typography from './typography';

export const gameControlsButton = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  shadowOpacity: 1.0,
  shadowRadius: 0,
  shadowOffset: { width: 0, height: 5 },
  backgroundColor: Colors.lightGray,
  shadowColor: Colors.gray,
  height: 45,
  width: 50,
};

export const operationButton = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  shadowOpacity: 1.0,
  shadowRadius: 0,
  shadowOffset: { width: 0, height: 8 },
  backgroundColor: Colors.lightGray,
  shadowColor: Colors.gray,
  height: 67,
  width: 75,
  paddingTop: 10,
  marginHorizontal: 8,
  ...Platform.select({
    android: {
      shadowOffset: { width: 0, height: 8 },
      height: 75,
      paddingTop: 0,
    },
  }),
};

export const operationButtonText = {
  ...Typography.mainFont,
  color: Colors.blue,
  fontSize: 45,
};

export const wideButtonText = {
  ...Typography.mainFont,
  color: Colors.blue,
  fontSize: 36,
};

export const wideButton = (color, shadowColor) => ({
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 1.0,
  shadowRadius: 0,
  backgroundColor: color,
  shadowColor: shadowColor,
  height: 58,
  width: 280,
  paddingTop: 7,
  marginBottom: 20,
  ...Platform.select({
    android: {
      shadowOffset: { width: 0, height: 8 },
      height: 66,
      paddingTop: 0,
      marginBottom: 12,
    },
  }),
});
