import * as Colors from './colors';
import * as Typography from './typography';

export const button = {
  width: 245,
  height: 55,
  marginTop: 13,
};

export const contentContainer = {
  backgroundColor: Colors.white,
  height: 300,
  width: 265,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: Colors.black,
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
};

export const header = {
  ...Typography.mainFont,
  color: Colors.blue,
  fontSize: 25,
  textAlign: 'center',
};

export const subheader = {
  ...header,
  fontSize: 18,
};

export const wrapper = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.whiteWithOpacity,
};
