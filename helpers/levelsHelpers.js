import saveCompletedLevels from './saveCompletedLevels';

const updateAlreadyCompletedLevel = (context, level) => {
  const completedLevelsFromStorage = [...context.completedLevels];
  const positionOfAlreadyCompletedLevel = completedLevelsFromStorage.findIndex(l => l.id === level.id);

  completedLevelsFromStorage[positionOfAlreadyCompletedLevel] = level;
  context.setCompletedLevels(completedLevelsFromStorage);
  saveCompletedLevels(completedLevelsFromStorage);
};

export { updateAlreadyCompletedLevel };
