import isFinalLevelInSection from '../isFinalLevelInSection';

test('returns true when the given level number is evenly divisible by the number of levels in a section', () => {
  const level = 50;
  const levelsPerSection = 10;

  const actual = isFinalLevelInSection(level, levelsPerSection);

  expect(actual).toEqual(true);
});

test('returns false when the given level number is not evenly divisible by the number of levels in a section', () => {
  const level = 1;
  const levelsPerSection = 10;

  const actual = isFinalLevelInSection(level, levelsPerSection);

  expect(actual).toEqual(false);
});
