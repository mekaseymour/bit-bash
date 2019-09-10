import saveBrainPower from './saveBrainPower';
import getEarnedBrainPower from './getEarnedBrainPower';

const addToTotalEarnedBrainPower = (context, bp) => {
  const newTotalBrainPower = context.brainPower + bp;

  context.setBrainPower(newTotalBrainPower);
  saveBrainPower(newTotalBrainPower);
};

const deductFromTotalBrainPower = (context, amount) => {
  const newTotalBrainPower = context.brainPower - amount;

  context.setBrainPower(newTotalBrainPower);
  saveBrainPower(newTotalBrainPower);
};

export { addToTotalEarnedBrainPower, deductFromTotalBrainPower, getEarnedBrainPower, saveBrainPower };
