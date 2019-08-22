import { AsyncStorage } from 'react-native';
import { COMPLETED_LEVELS } from '../config/storageKeys';

const saveCompletedLevel = async level => {
  try {
    const alreadyCompletedLevels = await AsyncStorage.getItem(COMPLETED_LEVELS);

    if (alreadyCompletedLevels) {
      const alreadyCompletedLevelsArr = JSON.parse(alreadyCompletedLevels);
      alreadyCompletedLevelsArr.push(level);

      AsyncStorage.setItem(COMPLETED_LEVELS, JSON.stringify(alreadyCompletedLevelsArr));
    } else {
      AsyncStorage.setItem(COMPLETED_LEVELS, JSON.stringify([level]));
    }
  } catch (error) {
    console.log('Error in saveLevelCompletion', error.message);
  }
};

export default saveCompletedLevel;
