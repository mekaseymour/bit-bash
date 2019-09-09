import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Colors, Typography } from '../styles';
import { BackButton } from '../components';
import { LEVELS_PER_SECTION } from '../config/gameConfig';

const PracticeModesScreen = props => {
  const [isLoadingGame, setIsLoadingGame] = useState(true);

  useEffect(() => {
    if (props.navigation.getParam('level')) {
      const level = props.navigation.getParam('level');
      props.navigation.navigate('Practice', { level });
    } else {
      setIsLoadingGame(false);
    }
  }, []);

  const navigateHome = () => props.navigation.navigate('Home');
  const navigateToPracticeGame = difficulty => {
    const level = difficulty * LEVELS_PER_SECTION + 1;
    return props.navigation.navigate('Practice', { level });
  };

  return !isLoadingGame ? (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <BackButton onPress={navigateHome} />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.header}>Select Your Mode</Text>
        <View style={styles.buttonAndDescriptionWrapper}>
          <TouchableOpacity
            style={Button.wideButton(Colors.green, Colors.darkGreen)}
            onPress={() => navigateToPracticeGame(1)}
          >
            <Text style={Button.wideButtonText}>Beginner</Text>
          </TouchableOpacity>
          <Text style={styles.description}>(Addition & Subtraction)</Text>
        </View>
        <View style={styles.multiplicationAndDivisonModes}>
          <TouchableOpacity
            style={Button.wideButton(Colors.aquaGreen, Colors.darkAquaGreen)}
            onPress={() => navigateToPracticeGame(5)}
          >
            <Text style={Button.wideButtonText}>Novice</Text>
          </TouchableOpacity>
          <View style={styles.buttonAndDescriptionWrapper}>
            <TouchableOpacity
              style={Button.wideButton(Colors.aquaBlue, Colors.darkAquaBlue)}
              onPress={() => navigateToPracticeGame(10)}
            >
              <Text style={Button.wideButtonText}>Wiz</Text>
            </TouchableOpacity>
            <Text style={styles.description}>(+ Multiplication & Division)</Text>
          </View>
        </View>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: '15%',
    paddingHorizontal: 20,
  },
  buttonAndDescriptionWrapper: {
    alignItems: 'center',
  },
  contentWrapper: {
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    ...Typography.mainFont,
    fontSize: 14,
    color: Colors.blue,
  },
  header: {
    ...Typography.fancyFont,
    color: Colors.blue,
    fontSize: 45,
    textAlign: 'center',
    marginBottom: 30,
  },
  multiplicationAndDivisonModes: {
    borderRadius: 8,
    borderColor: Colors.blue,
    borderWidth: 3,
    padding: 20,
    marginTop: 10,
  },
  topContainer: {
    alignSelf: 'stretch',
    top: 0,
    height: 'auto',
  },
});

export default PracticeModesScreen;
