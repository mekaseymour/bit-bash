import React from 'react';
import { Dimensions, ImageBackground, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Typography } from '../styles';

const HomeScreen = props => (
  <View style={styles.wrapper}>
    <ImageBackground
      source={require('../assets/long-background-2x.png')}
      style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
    >
      <View style={styles.container}>
        <Image source={require('../assets/icons/brain-2x.png')} style={styles.icon} />
        <Text style={styles.title}>Number-Mash</Text>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Levels')}>
          <Image source={require('../assets/icons/play-button-2x.png')} style={{ height: 67, width: 280 }} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
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
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
