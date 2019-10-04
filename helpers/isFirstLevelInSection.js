import { LEVELS_PER_SECTION } from '../config/gameConfig';

const isFirstLevelInSection = (level, levelsPerSection = LEVELS_PER_SECTION) => (level - 1) % levelsPerSection === 0;

export default isFirstLevelInSection;
