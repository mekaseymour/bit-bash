export const ADDITION_OPERATOR = '+';
export const SUBTRACTION_OPERATOR = '-';

export const ADD = 'add';
export const SUBTRACT = 'subtract';

const operations = {
  [ADD]: (a, b) => a + b,
  [SUBTRACT]: (a, b) => a - b,
};

export default operations;
