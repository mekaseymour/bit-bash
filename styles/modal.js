import { Platform } from 'react-native';
import * as Colors from './colors';
import * as Typography from './typography';

export const bottomSection = {
  alignItems: 'center',
};

export const container = {
  backgroundColor: Colors.white,
  minHeight: 375,
  width: 265,
  borderRadius: 8,
  alignItems: 'center',
  shadowColor: Colors.black,
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  paddingVertical: 15,
};

export const content = {
  flex: 1,
  justifyContent: 'space-between',
  height: 'auto',
  alignItems: 'center',
};

export const header = {
  ...Typography.mainFont,
  color: Colors.blue,
  fontSize: 25,
  textAlign: 'center',
  marginVertical: 10,
  ...Platform.select({
    android: {
      lineHeight: 25,
    },
  }),
};

export const topSectionText = {
  ...Typography.mainFont,
  color: Colors.blue,
  fontSize: 14,
  textAlign: 'center',
  ...Platform.select({
    android: {
      lineHeight: 14,
    },
  }),
};

export const subheader = {
  ...header,
  fontSize: 18,
  marginVertical: 0,
  ...Platform.select({
    android: {
      lineHeight: 18,
    },
  }),
};

export const wrapper = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.whiteWithOpacity,
};
