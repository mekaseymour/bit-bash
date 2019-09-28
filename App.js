import React, { createContext, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';
import LevelsScreen from './screens/LevelsScreen';
import PracticeModesScreen from './screens/PracticeModesScreen';
import PracticeScreen from './screens/PracticeScreen';
import CustomizeScreen from './screens/CustomizeScreen';

import { configureAds } from './helpers/adHelpers';

import {
  BRAIN_POWER,
  COMPLETED_LEVELS,
  ENABLED_CUSTOMIZATION,
  FURTHEST_SEEN_LEVEL,
  IS_FIRST_TIME_OPENING_APP,
  UNLOCKED_CUSTOMIZATIONS,
} from './config/storageKeys';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

const handleFinishLoading = setLoadingComplete => {
  setLoadingComplete(true);
};

const loadResourcesAsync = async (
  setBrainPower,
  setCompletedLevels,
  setFurthestSeenLevel,
  setUnlockedCustomizations,
  setEnabledCustomization,
  setIsFirstTimeOpeningApp
) => {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/icons/brain-2x.png'),
      require('./assets/icons/moon-2x.png'),
      require('./assets/icons/mercury-planet-2x.png'),
      require('./assets/icons/venus-planet-2x.png'),
      require('./assets/icons/earth-planet-2x.png'),
      require('./assets/icons/mars-planet-2x.png'),
      require('./assets/icons/jupiter-planet-2x.png'),
      require('./assets/icons/saturn-planet-2x.png'),
      require('./assets/icons/uranus-planet-2x.png'),
      require('./assets/icons/neptune-planet-2x.png'),
    ]),
    Font.loadAsync({
      bungee: require('./assets/fonts/Bungee-Regular.ttf'),
      bungeeShade: require('./assets/fonts/BungeeShade-Regular.ttf'),
    }),
  ]);

  const brainPower = await AsyncStorage.getItem(BRAIN_POWER);
  const completedLevels = await AsyncStorage.getItem(COMPLETED_LEVELS);
  const furthestSeenLevel = await AsyncStorage.getItem(FURTHEST_SEEN_LEVEL);
  const unlockedCustomizations = await AsyncStorage.getItem(UNLOCKED_CUSTOMIZATIONS);
  const enabledCustomization = await AsyncStorage.getItem(ENABLED_CUSTOMIZATION);
  const isFirstTimeOpeningApp = await AsyncStorage.getItem(IS_FIRST_TIME_OPENING_APP);

  if (!!brainPower) {
    setBrainPower(parseInt(brainPower));
  }

  if (!!completedLevels) {
    setCompletedLevels(JSON.parse(completedLevels));
  }

  if (!!furthestSeenLevel) {
    setFurthestSeenLevel(JSON.parse(furthestSeenLevel));
  }

  if (!!unlockedCustomizations) {
    setUnlockedCustomizations(JSON.parse(unlockedCustomizations));
  }

  if (!!enabledCustomization) {
    setEnabledCustomization(JSON.parse(enabledCustomization));
  }

  if (isFirstTimeOpeningApp === null) {
    setIsFirstTimeOpeningApp(true);
  } else {
    setIsFirstTimeOpeningApp(false);
  }
};

const MainNavigator = createSwitchNavigator({
  Home: HomeScreen,
  Levels: props => <Consumer>{context => <LevelsScreen {...props} />}</Consumer>,
  Game: props => <GameScreen {...props} />,
  PracticeModes: props => <PracticeModesScreen {...props} />,
  Practice: props => <PracticeScreen {...props} />,
  Customize: props => <CustomizeScreen {...props} />,
});

const AppContainer = createAppContainer(MainNavigator);

const { Provider, Consumer } = createContext();

const App = props => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [brainPower, setBrainPower] = useState(0);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [furthestSeenLevel, setFurthestSeenLevel] = useState({});
  const [levelsPlayedBetweenAds, setLevelsPlayedBetweenAds] = useState(0);
  const [unlockedCustomizations, setUnlockedCustomizations] = useState([]);
  const [enabledCustomization, setEnabledCustomization] = useState(null);
  const [isFirstTimeOpeningApp, setIsFirstTimeOpeningApp] = useState(true);

  configureAds();

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={() =>
          loadResourcesAsync(
            setBrainPower,
            setCompletedLevels,
            setFurthestSeenLevel,
            setUnlockedCustomizations,
            setEnabledCustomization,
            setIsFirstTimeOpeningApp
          )
        }
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider
        value={{
          brainPower,
          setBrainPower,
          completedLevels,
          setCompletedLevels,
          furthestSeenLevel,
          setFurthestSeenLevel,
          levelsPlayedBetweenAds,
          setLevelsPlayedBetweenAds,
          unlockedCustomizations,
          setUnlockedCustomizations,
          enabledCustomization,
          setEnabledCustomization,
          isFirstTimeOpeningApp,
          setIsFirstTimeOpeningApp,
        }}
      >
        <View style={styles.container}>
          <Consumer>{context => <AppContainer screenProps={{ context }} />}</Consumer>
        </View>
      </Provider>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
