import * as Colors from './colors';
import * as Typography from './typography';

export const button = {
  width: 245,
  height: 55,
  marginTop: 13,
};

export const contentContainer = {
  backgroundColor: Colors.white,
  height: 'auto',
  minHeight: 320,
  width: 265,
  borderRadius: 8,
  justifyContent: 'space-between',
  alignItems: 'center',
  shadowColor: Colors.black,
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  paddingVertical: 15,
};

export const header = {
  ...Typography.mainFont,
  color: Colors.blue,
  fontSize: 25,
  textAlign: 'center',
  marginVertical: 10,
};

export const topSectionText = {
  ...Typography.mainFont,
  color: Colors.blue,
  fontSize: 14,
  textAlign: 'center',
};

export const subheader = {
  ...header,
  fontSize: 18,
  marginTop: 0,
};

export const wrapper = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.whiteWithOpacity,
};
