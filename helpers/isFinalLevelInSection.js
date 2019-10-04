import { LEVELS_PER_SECTION } from '../config/gameConfig';

const isFinalLevelInSection = (level, levelsPerSection = LEVELS_PER_SECTION) => level % levelsPerSection === 0;

export default isFinalLevelInSection;
