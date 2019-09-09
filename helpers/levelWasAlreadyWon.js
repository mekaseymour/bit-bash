const levelWasAlreadyWon = (completedLevels, level) => {
  return !!completedLevels.find(l => l.id === level);
};

export default levelWasAlreadyWon;
