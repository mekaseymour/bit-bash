import { AsyncStorage } from 'react-native';
import { ENABLED_CUSTOMIZATION } from '../config/storageKeys';

const saveEnabledCustomization = customization =>
  AsyncStorage.setItem(ENABLED_CUSTOMIZATION, JSON.stringify(customization));

export default saveEnabledCustomization;
