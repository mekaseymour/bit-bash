import { deductFromTotalBrainPower } from './brainPowerHelpers';
import saveUnlockedCustomizations from './saveUnlockedCustomizations';
import saveEnabledCustomization from './saveEnabledCustomization';

const enableCustomization = (context, customization) => {
  context.setEnabledCustomization(customization);
  saveEnabledCustomization(customization);
};

const customizationHasAlreadyBeenUnlocked = (context, customization) => {
  return (
    context.unlockedCustomizations.findIndex(unlockedCustomization => unlockedCustomization.id === customization.id) !==
    -1
  );
};

const unlockCustomization = (context, customization) => {
  const unlockedCustomizations = [...context.unlockedCustomizations];
  unlockedCustomizations.push(customization);

  context.setUnlockedCustomizations(unlockedCustomizations);
  saveUnlockedCustomizations(unlockedCustomizations);
  deductFromTotalBrainPower(context, customization.pointsToUnlock);
};

export { enableCustomization, customizationHasAlreadyBeenUnlocked, unlockCustomization };
