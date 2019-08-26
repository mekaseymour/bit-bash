import getRandomFactorOfOperand from '../getRandomFactorOfOperand';

test('returns number that is a factor of the given operand', () => {
  const operand = 20;
  const possibleFactors = [1, 2, 4, 5, 10, 20];
  const actual = getRandomFactorOfOperand(operand);

  expect(possibleFactors).toContain(actual);
});
