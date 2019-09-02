import randomNumber from '../randomNumber';

test('returns whole number that is less than or equal to the given input', () => {
  const max = 10;

  const actual = randomNumber(max);

  expect(actual).toBeLessThanOrEqual(max);
});
