export const ADDITION_OPERATOR = '+';
export const SUBTRACTION_OPERATOR = '-';
export const MULTIPLICATION_OPERATOR = '×';
export const DIVISION_OPERATOR = '÷';

export const ADD = 'add';
export const SUBTRACT = 'subtract';
export const MULTIPLY = 'multiply';
export const DIVIDE = 'divide';

export const getOperatorForDisplay = operation => {
  switch (operation) {
    case ADD:
      return ADDITION_OPERATOR;
    case SUBTRACT:
      return SUBTRACTION_OPERATOR;
    case MULTIPLY:
      return MULTIPLICATION_OPERATOR;
    case DIVIDE:
      return DIVISION_OPERATOR;
  }
};

const roundToTwoDecimals = num => Math.round(num * 100) / 100;

const operations = {
  [ADD]: (a, b) => a + b,
  [SUBTRACT]: (a, b) => a - b,
  [MULTIPLY]: (a, b) => roundToTwoDecimals(a * b),
  [DIVIDE]: (a, b) => roundToTwoDecimals(a / b),
};

export default operations;
