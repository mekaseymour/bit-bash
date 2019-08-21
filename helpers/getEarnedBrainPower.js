const BRAIN_POWER_PER_DIFFICULTY_UNIT = 2;

const getEarnedBrainPower = levelDifficulty => BRAIN_POWER_PER_DIFFICULTY_UNIT * levelDifficulty;

export default getEarnedBrainPower;
