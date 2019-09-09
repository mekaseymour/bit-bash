import { LEVELS_BETWEEN_ADS } from '../config/gameConfig';

const shouldShowAd = context => {
  return context.levelsPlayedBetweenAds + 1 === LEVELS_BETWEEN_ADS;
};

export default shouldShowAd;
