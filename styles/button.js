import * as Colors from './colors';
import * as Typography from './typography';

export const OPERATION_BUTTON = {
  height: 75,
  width: 75,
  marginHorizontal: 8,
};

export const gameControlsButton = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 1.0,
  shadowRadius: 0,
  shadowOffset: { width: 0, height: 5 },
  backgroundColor: Colors.lightGray,
  shadowColor: Colors.gray,
  height: 45,
  width: 50,
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
});
