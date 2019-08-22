import { AsyncStorage } from 'react-native';
import { FURTHEST_SEEN_LEVEL } from '../config/storageKeys';

const shouldSetNewFurthestSeenLevel = (savedFurthestSeenLevel, currentLevel) => {
  return !savedFurthestSeenLevel || savedFurthestSeenLevel.id < currentLevel.id;
};

const saveFurthestSeenLevel = async level => {
  try {
    const savedFurthestSeenLevel = AsyncStorage.getItem(FURTHEST_SEEN_LEVEL);

    if (shouldSetNewFurthestSeenLevel()) {
      AsyncStorage.setItem(FURTHEST_SEEN_LEVEL, JSON.stringify(level));
    }
  } catch (error) {
    console.log('Error in saveFurthestSeenLevel', error.message);
  }
};

export default saveFurthestSeenLevel;
