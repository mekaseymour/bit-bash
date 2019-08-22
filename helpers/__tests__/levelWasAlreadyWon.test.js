import levelWasAlreadyWon from '../levelWasAlreadyWon';

test('returns true the level has already been completed', () => {
  const completedLevels = [
    { id: 1, target: 2, nodes: [1, 3], difficulty: 0 },
    { id: 2, target: 10, nodes: [1, 11], difficulty: 0 },
  ];
  const currentLevel = 1;

  const actual = levelWasAlreadyWon(completedLevels, currentLevel);
  const expected = true;

  expect(actual).toEqual(expected);
});

test('returns false if the level has not already been completed', () => {
  const completedLevels = [
    { id: 1, target: 2, nodes: [1, 3], difficulty: 0 },
    { id: 2, target: 10, nodes: [1, 11], difficulty: 0 },
  ];
  const currentLevel = 3;

  const actual = levelWasAlreadyWon(completedLevels, currentLevel);
  const expected = false;

  expect(actual).toEqual(expected);
});
