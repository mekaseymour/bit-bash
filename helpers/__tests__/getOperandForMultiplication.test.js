import getOperandForMultiplication, {
  MAX_NUMBER_FOR_MULTIPLICATION_WITH_SMALL_NUMS,
  MAX_NUMBER_FOR_MULTIPLICATION_WITH_LARGE_NUMS,
} from '../getOperandForMultiplication';

test('when input number is less than 3 digits, returns a number less than or equal to MAX_NUMBER_FOR_MULTIPLICATION_WITH_SMALL_NUMS', () => {
  const firstOperand = 12;

  const actual = getOperandForMultiplication(firstOperand);

  expect(actual).toBeLessThanOrEqual(MAX_NUMBER_FOR_MULTIPLICATION_WITH_SMALL_NUMS);
});

test('when input number is more than 3 digits, returns a number less than or equal to MAX_NUMBER_FOR_MULTIPLICATION_WITH_LARGE_NUMS', () => {
  const firstOperand = 3500;

  const actual = getOperandForMultiplication(firstOperand);

  expect(actual).toBeLessThanOrEqual(MAX_NUMBER_FOR_MULTIPLICATION_WITH_SMALL_NUMS);
});
