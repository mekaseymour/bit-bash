const LEVELS_ALLOWED_BETWEEN_ADS = 4;

const shouldShowAd = context => {
  return context.levelsPlayedBetweenAds === LEVELS_ALLOWED_BETWEEN_ADS;
};

export default shouldShowAd;
