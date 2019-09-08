import toBeType from 'jest-tobetype';
import generateGame from '../generateGame';

expect.extend(toBeType);

test('returns object with all expected keys to have valid values', () => {
  const level = 1;

  const actual = generateGame(level);

  expect(actual.id).toEqual(level);
  expect(actual.target).toBeType('number');
  expect(actual.nums.length).toBeGreaterThan(0);
  expect(actual.difficulty).toBeType('number');
  expect(actual.hints.length).toBeGreaterThan(0);
  expect(actual.hintsUnlocked).toEqual(0);
});
