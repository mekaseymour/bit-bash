import React, { createContext, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';
import LevelsScreen from './screens/LevelsScreen';

import { BRAIN_POWER, COMPLETED_LEVELS, FURTHEST_SEEN_LEVEL } from './config/storageKeys';

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

const loadResourcesAsync = async (setBrainPower, setCompletedLevels, setFurthestSeenLevel) => {
  await Promise.all([
    Font.loadAsync({
      bungee: require('./assets/fonts/Bungee-Regular.ttf'),
      bungeeShade: require('./assets/fonts/BungeeShade-Regular.ttf'),
    }),
  ]);

  const brainPower = await AsyncStorage.getItem(BRAIN_POWER);
  const completedLevels = await AsyncStorage.getItem(COMPLETED_LEVELS);
  const furthestSeenLevel = await AsyncStorage.getItem(FURTHEST_SEEN_LEVEL);

  if (!!brainPower) {
    setBrainPower(parseInt(brainPower));
  }

  if (!!completedLevels) {
    setCompletedLevels(JSON.parse(completedLevels));
  }

  if (!!furthestSeenLevel) {
    setFurthestSeenLevel(JSON.parse(furthestSeenLevel));
  }
};

const MainNavigator = createSwitchNavigator({
  Home: HomeScreen,
  Levels: props => <Consumer>{context => <LevelsScreen {...props} />}</Consumer>,
  Game: props => <GameScreen {...props} />,
});

const AppContainer = createAppContainer(MainNavigator);

const { Provider, Consumer } = createContext();

const App = props => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [brainPower, setBrainPower] = useState(0);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [furthestSeenLevel, setFurthestSeenLevel] = useState({});
  const [levelsCompletedDuringSession, setLevelsCompletedDuringSession] = useState(0);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={() => loadResourcesAsync(setBrainPower, setCompletedLevels, setFurthestSeenLevel)}
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
          levelsCompletedDuringSession,
          setLevelsCompletedDuringSession,
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
