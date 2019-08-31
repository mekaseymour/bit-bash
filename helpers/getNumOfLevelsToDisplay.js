import { LEVELS_PER_SECTION } from '../config/gameConfig';

const getNumOfLevelsToDisplay = (levelsSeen, levelsPerSection = LEVELS_PER_SECTION) => {
  const levelsCompletedToLevelsInSectionRatio = levelsSeen / levelsPerSection;
  if (levelsCompletedToLevelsInSectionRatio < 1) {
    return levelsPerSection;
  } else {
    return (Math.floor(levelsCompletedToLevelsInSectionRatio) + 1) * levelsPerSection;
  }
};

export default getNumOfLevelsToDisplay;
