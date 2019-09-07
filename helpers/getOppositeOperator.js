import { ADD, SUBTRACT, MULTIPLY, DIVIDE } from '../util/operations';

const getOppositeOperator = operator => {
  switch (operator) {
    case ADD:
      return SUBTRACT;
    case SUBTRACT:
      return ADD;
    case MULTIPLY:
      return DIVIDE;
    case DIVIDE:
      return MULTIPLY;
  }
};

export default getOppositeOperator;
