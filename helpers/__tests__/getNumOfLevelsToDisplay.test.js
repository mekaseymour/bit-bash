import getNumOfLevelsToDisplay from '../getNumOfLevelsToDisplay';

test('if the number of levels completed is less than the number of levels allotted per section returns number of levels for one section', () => {
  const numOfLevelsCompleted = 10;
  const numberOfLevelsPerSection = 25;
  const actual = getNumOfLevelsToDisplay(numOfLevelsCompleted, numberOfLevelsPerSection);
  const expected = 25;

  expect(actual).toEqual(expected);
});

test('if the number of levels completed is greater than the number of levels allotted per section returns correct multiple of the numbers of levels per section', () => {
  const numOfLevelsCompleted = 53;
  const numberOfLevelsPerSection = 25;
  const actual = getNumOfLevelsToDisplay(numOfLevelsCompleted, numberOfLevelsPerSection);
  const expected = 75;

  expect(actual).toEqual(expected);
});

test('if the number of levels completed is equally divisible by the number of levels per section, return correct number of levels', () => {
  const numOfLevelsCompleted = 25;
  const numberOfLevelsPerSection = 25;
  const actual = getNumOfLevelsToDisplay(numOfLevelsCompleted, numberOfLevelsPerSection);
  const expected = 50;

  expect(actual).toEqual(expected);
});
