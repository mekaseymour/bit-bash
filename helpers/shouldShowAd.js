import { LEVELS_BETWEEN_ADS } from '../config/gameConfig';

const shouldShowAd = context => {
  return context.levelsPlayedBetweenAds === LEVELS_BETWEEN_ADS;
};

export default shouldShowAd;
