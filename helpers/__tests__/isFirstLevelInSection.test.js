import isFirstLevelInSection from '../isFirstLevelInSection';

test('returns true if given level is first level in a section of levels', () => {
  const level = 11;
  const levelsPerSection = 10;

  const actual = isFirstLevelInSection(level, levelsPerSection);

  expect(actual).toEqual(true);
});

test('returns false if given level is not first level in a section of levels', () => {
  const level = 3;
  const levelsPerSection = 10;

  const actual = isFirstLevelInSection(level, levelsPerSection);

  expect(actual).toEqual(false);
});
