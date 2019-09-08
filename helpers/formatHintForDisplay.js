import { getOperatorForDisplay } from '../util/operations';

const formatHintForDisplay = (leftOperand, rightOperand, operator, result) =>
  `${leftOperand} ${getOperatorForDisplay(operator)} ${rightOperand} = ${result}`;

export default formatHintForDisplay;
