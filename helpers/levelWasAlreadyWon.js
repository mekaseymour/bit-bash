const levelWasAlreadyWon = (completedLevels, level) => !!completedLevels.find(l => l.id === level);

export default levelWasAlreadyWon;
