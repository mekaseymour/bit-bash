import { AsyncStorage } from 'react-native';
import { BRAIN_POWER } from '../config/storageKeys';

const saveBrainPower = bp => AsyncStorage.setItem(BRAIN_POWER, String(bp));

export default saveBrainPower;
