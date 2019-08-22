const BRAIN_POWER_PER_DIFFICULTY_UNIT = 2;

const getEarnedBrainPower = levelDifficulty =>
  !!levelDifficulty ? BRAIN_POWER_PER_DIFFICULTY_UNIT * levelDifficulty : 1;

export default getEarnedBrainPower;
