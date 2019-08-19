import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';
import LevelsScreen from './screens/LevelsScreen';

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

const handleFinishLoading = setLoadingComplete => {
  setLoadingComplete(true);
};

const loadResourcesAsync = async () => {
  await Promise.all([
    Font.loadAsync({
      bungee: require('./assets/fonts/Bungee-Regular.ttf'),
      bungeeShade: require('./assets/fonts/BungeeShade-Regular.ttf'),
    }),
  ]);
};

const MainNavigator = createSwitchNavigator({
  Home: HomeScreen,
  Levels: LevelsScreen,
  Game: props => <GameScreen {...props} />,
});

const AppContainer = createAppContainer(MainNavigator);

const App = props => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <AppContainer />
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
