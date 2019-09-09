import { AsyncStorage } from 'react-native';
import { FURTHEST_SEEN_LEVEL } from '../config/storageKeys';

const updateFurthestSeenLevel = async (context, game) => {
  try {
    const furthestSeenLevelFromStorage = await AsyncStorage.getItem(FURTHEST_SEEN_LEVEL);
    const furthestSeenLevel = JSON.parse(furthestSeenLevelFromStorage);
    const currentLevelIsFurthestSeenLevel = furthestSeenLevel.id === game.id;

    if (currentLevelIsFurthestSeenLevel) {
      context.setFurthestSeenLevel(game);
      AsyncStorage.setItem(FURTHEST_SEEN_LEVEL, JSON.stringify(game));
    }
  } catch (error) {
    console.log('Error in updateFurthestSeenLevel', error);
  }
};

export default updateFurthestSeenLevel;
