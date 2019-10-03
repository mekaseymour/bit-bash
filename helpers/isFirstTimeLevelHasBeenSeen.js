import isFirstLevelInSection from './isFirstLevelInSection';

const isFirstTimeLevelHasBeenSeen = (context, level) => {
  if (!!context.furthestSeenLevel.id) {
    return context.furthestSeenLevel.id < level;
  } else {
    return true;
  }
};

export default isFirstTimeLevelHasBeenSeen;
