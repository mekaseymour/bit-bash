const levelWasAlreadyBeat = (beatLevels, level) => !!beatLevels.find(l => l.id === level.id);

export default levelWasAlreadyBeat;
