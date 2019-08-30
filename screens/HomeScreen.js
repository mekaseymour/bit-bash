import React from 'react';
import { Dimensions, ImageBackground, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Typography } from '../styles';
import AnimatedBrain from '../components/AnimatedBrain';

const HomeScreen = props => (
  <ImageBackground
    source={require('../assets/tiny-pattern-background-2x.png')}
    style={{ ...styles.container, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
  >
    <AnimatedBrain />
    <View style={styles.titleAndButton}>
      <Text style={styles.title}>Bit-</Text>
      <Text style={styles.title}>Bash</Text>
      <Text style={styles.title}>+-×÷=</Text>
      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Levels')}>
        <Image source={require('../assets/icons/play-button-2x.png')} style={{ height: 67, width: 280 }} />
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleAndButton: {
    marginTop: 30,
  },
  title: {
    ...Typography.fancyFont,
    color: Colors.blue,
    fontSize: 55,
    textAlign: 'center',
  },
});

export default HomeScreen;
