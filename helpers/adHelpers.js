import shouldShowAd from './shouldShowAd';

const configureAndRequestAd = async () => {
  AdMobInterstitial.setAdUnitID(GOOGLE_INTERSTITIAL_AD_UNIT_ID);
  AdMobInterstitial.setTestDeviceID('EMULATOR');
  await AdMobInterstitial.requestAdAsync();
};

const showAd = async (afterAdAction, context) => {
  context.setLevelsPlayedBetweenAds(0);

  try {
    const isReady = await AdMobInterstitial.getIsReadyAsync();

    if (isReady) {
      await AdMobInterstitial.showAdAsync();
    } else {
      await configureAndRequestAd();
      await AdMobInterstitial.showAdAsync();
    }

    AdMobInterstitial.addEventListener('interstitialDidClose', () => {
      afterAdAction();
    });
  } catch (error) {
    console.log('error from showAd', error);
    afterAdAction();
  }
};

export { configureAndRequestAd, shouldShowAd, showAd };
