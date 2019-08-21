import getEarnedBrainPower from '../getEarnedBrainPower';

test('if inputted difficulty level is 0, returns 1', () => {
  const actual = getEarnedBrainPower(0);

  expect(actual).toEqual(1);
});

test('if inputted difficulty is anything other than 0, return difficulty multiplied by multiplier', () => {
  const actual = getEarnedBrainPower(3);

  expect(actual).toEqual(6);
});
