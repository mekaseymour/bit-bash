import { AsyncStorage } from 'react-native';
import { COMPLETED_LEVELS } from '../config/storageKeys';

const updateInCompletedLevels = async (context, game) => {
  try {
    const completedLevelsFromStorage = await AsyncStorage.getItem(COMPLETED_LEVELS);
    const completedLevels = JSON.parse(completedLevelsFromStorage);
    const indexOfLevelInCompletedLevels = completedLevels.findIndex(completedLevel => completedLevel.id === game.id);

    const levelFoundInCompletedLevels = indexOfLevelInCompletedLevels !== -1;

    if (levelFoundInCompletedLevels) {
      completedLevels[indexOfLevelInCompletedLevels] = game;

      context.setCompletedLevels(completedLevels);
      AsyncStorage.setItem(COMPLETED_LEVELS, JSON.stringify(completedLevels));
    }
  } catch (error) {
    console.log('Error in updateCompletedLevels', error);
  }
};

export default updateInCompletedLevels;
