import saveBrainPower from './saveBrainPower';
import getEarnedBrainPower from './getEarnedBrainPower';
import { BRAIN_POWER_REQUIRED_TO_UNLOCK_HINT } from '../config/gameConfig';

const addToTotalEarnedBrainPower = (context, bp) => {
  const newTotalBrainPower = context.brainPower + bp;

  context.setBrainPower(newTotalBrainPower);
  saveBrainPower(newTotalBrainPower);
};

const deductFromTotalBrainPower = context => {
  const newTotalBrainPower = context.brainPower - BRAIN_POWER_REQUIRED_TO_UNLOCK_HINT;

  context.setBrainPower(newTotalBrainPower);
  saveBrainPower(newTotalBrainPower);
};

export { addToTotalEarnedBrainPower, deductFromTotalBrainPower, getEarnedBrainPower, saveBrainPower };
