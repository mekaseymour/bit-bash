import React from 'react';
import { Dimensions, ImageBackground, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Typography } from '../styles';

const HomeScreen = props => (
  <ImageBackground
    source={require('../assets/tiny-pattern-background-2x.png')}
    style={{ ...styles.container, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
  >
    <Image source={require('../assets/icons/brain-2x.png')} style={styles.icon} />
    <Text style={styles.title}>Digit-Mash</Text>
    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Levels')}>
      <Image source={require('../assets/icons/play-button-2x.png')} style={{ height: 67, width: 280 }} />
    </TouchableOpacity>
  </ImageBackground>
);

const styles = StyleSheet.create({
  button: {
    marginTop: 25,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 70,
    width: 81,
    marginBottom: 15,
  },
  title: {
    ...Typography.fancyFont,
    color: Colors.blue,
    fontSize: 55,
    textAlign: 'center',
  },
});

export default HomeScreen;
