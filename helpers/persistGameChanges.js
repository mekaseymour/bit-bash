import updateInCompletedLevels from './updateInCompletedLevels';
import updateFurthestSeenLevel from './updateFurthestSeenLevel';

const persistGameChanges = (context, game) => {
  updateInCompletedLevels(context, game);
  updateFurthestSeenLevel(context, game);
};

export default persistGameChanges;
