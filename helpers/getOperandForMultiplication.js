import randomNumber from './randomNumber';

export const MAX_NUMBER_FOR_MULTIPLICATION_WITH_SMALL_NUMS = 25;
export const MAX_NUMBER_FOR_MULTIPLICATION_WITH_LARGE_NUMS = 10;

const getOperandForMultiplication = operand => {
  const digits = String(operand).length;

  if (digits < 3) {
    const maxNum = MAX_NUMBER_FOR_MULTIPLICATION_WITH_SMALL_NUMS;

    return randomNumber(maxNum);
  } else {
    const maxNum = MAX_NUMBER_FOR_MULTIPLICATION_WITH_LARGE_NUMS;

    return randomNumber(maxNum);
  }
};

export default getOperandForMultiplication;
