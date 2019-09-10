import { AsyncStorage } from 'react-native';
import { UNLOCKED_CUSTOMIZATIONS } from '../config/storageKeys';

const saveUnlockedCustomizations = customizations =>
  AsyncStorage.setItem(UNLOCKED_CUSTOMIZATIONS, JSON.stringify(customizations));

export default saveUnlockedCustomizations;
