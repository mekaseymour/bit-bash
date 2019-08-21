import React, { useState } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';
import LevelsScreen from './screens/LevelsScreen';

import { BRAIN_POWER, HIGHEST_LEVEL } from './config/storageKeys';

// AsyncStorage.removeItem(HIGHEST_LEVEL);

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

const loadResourcesAsync = async (setHighestLevel, setBrainPower) => {
  await Promise.all([
    Font.loadAsync({
      bungee: require('./assets/fonts/Bungee-Regular.ttf'),
      bungeeShade: require('./assets/fonts/BungeeShade-Regular.ttf'),
    }),
  ]);

  const highestLevel = await AsyncStorage.getItem(HIGHEST_LEVEL);
  const brainPower = await AsyncStorage.getItem(BRAIN_POWER);

  if (!!highestLevel) {
    setHighestLevel(parseInt(highestLevel));
  }

  if (!!brainPower) {
    setBrainPower(parseInt(brainPower));
  }
};

const MainNavigator = createSwitchNavigator({
  Home: HomeScreen,
  Levels: props => <LevelsScreen {...props} />,
  Game: props => <GameScreen {...props} />,
});

const AppContainer = createAppContainer(MainNavigator);

const App = props => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [highestLevel, setHighestLevel] = useState(0);
  const [brainPower, setBrainPower] = useState(0);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={() => loadResourcesAsync(setHighestLevel, setBrainPower)}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <AppContainer screenProps={{ highestLevel, brainPower }} />
      </View>
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
