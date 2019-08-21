import { AsyncStorage } from 'react-native';
import { HIGHEST_LEVEL } from '../config/storageKeys';

const saveLevelCompletion = async levelId => {
  try {
    const highestSavedLevel = await AsyncStorage.getItem(HIGHEST_LEVEL);

    if (!highestSavedLevel || parseInt(highestSavedLevel) < levelId) {
      AsyncStorage.setItem(HIGHEST_LEVEL, String(levelId));
    }
  } catch (error) {
    console.log('Error in saveLevelCompletion', error.message);
  }
};

export default saveLevelCompletion;
