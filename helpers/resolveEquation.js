import operations, {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  ADDITION_OPERATOR,
  SUBTRACTION_OPERATOR,
  MULTIPLICATION_OPERATOR,
  DIVISION_OPERATOR,
} from '../util/operations';

const resolveEquation = (left, right, operator) => {
  switch (operator) {
    case ADDITION_OPERATOR:
      return operations[ADD](left.num, right.num);
    case SUBTRACTION_OPERATOR:
      return operations[SUBTRACT](left.num, right.num);
    case MULTIPLICATION_OPERATOR:
      return operations[MULTIPLY](left.num, right.num);
    case DIVISION_OPERATOR:
      return operations[DIVIDE](left.num, right.num);
  }
};

export default resolveEquation;
