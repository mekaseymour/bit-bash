import { AsyncStorage } from 'react-native';
import { COMPLETED_LEVELS } from '../config/storageKeys';

const saveCompletedLevels = levels => AsyncStorage.setItem(COMPLETED_LEVELS, JSON.stringify(levels));

export default saveCompletedLevels;
