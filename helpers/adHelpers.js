import { Platform } from 'react-native';
import { AdMobInterstitial } from 'expo-ads-admob';
import shouldShowAd from './shouldShowAd';
import { ANDROID_GOOGLE_INTERSTITIAL_AD_UNIT_ID, IOS_GOOGLE_INTERSTITIAL_AD_UNIT_ID } from '../config';

const configureAds = () => {
  if (Platform.OS === 'ios') {
    AdMobInterstitial.setAdUnitID(IOS_GOOGLE_INTERSTITIAL_AD_UNIT_ID);
  }

  if (Platform.OS === 'android') {
    AdMobInterstitial.setAdUnitID(ANDROID_GOOGLE_INTERSTITIAL_AD_UNIT_ID);
  }

  AdMobInterstitial.setTestDeviceID('EMULATOR');
};

const showAd = async (actionAfterAdPlays, context) => {
  context.setLevelsPlayedBetweenAds(0);

  try {
    const adAlreadyRequested = await AdMobInterstitial.getIsReadyAsync();

    if (adAlreadyRequested) {
      AdMobInterstitial.showAdAsync();
    } else {
      AdMobInterstitial.requestAdAsync()
        .then(() => AdMobInterstitial.showAdAsync())
        .catch(e => console.log('error', e));
    }

    AdMobInterstitial.addEventListener('interstitialDidClose', () => {
      actionAfterAdPlays();
    });

    AdMobInterstitial.addEventListener('interstitialDidFailToLoad', () => {
      actionAfterAdPlays();
    });
  } catch (error) {
    console.log('error from showAd', error);
    actionAfterAdPlays();
  }
};

export { shouldShowAd, showAd, configureAds };
