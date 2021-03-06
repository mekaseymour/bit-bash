import React from 'react';
import { Dimensions, ImageBackground, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Colors, Typography } from '../styles';
import AnimatedBrain from '../components/AnimatedBrain';

const HomeScreen = props => (
  <ImageBackground
    source={require('../assets/tiny-pattern-background-2x.png')}
    style={{ ...styles.container, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
  >
    <AnimatedBrain />
    <View style={styles.titleAndButton}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bi+</Text>
        <Text style={styles.title}>B×sh</Text>
      </View>
      <TouchableOpacity
        style={Button.wideButton(Colors.green, Colors.darkGreen)}
        onPress={() => props.navigation.navigate('Levels')}
      >
        <Text style={Button.wideButtonText}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={Button.wideButton(Colors.aquaGreen, Colors.darkAquaGreen)}
        onPress={() => props.navigation.navigate('PracticeModes')}
      >
        <Text style={Button.wideButtonText}>Practice</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={Button.wideButton(Colors.aquaBlue, Colors.darkAquaBlue)}
        onPress={() => props.navigation.navigate('Customize')}
      >
        <Text style={Button.wideButtonText}>Customize</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleAndButton: {
    marginTop: 30,
  },
  titleContainer: {
    marginBottom: 15,
    ...Platform.select({
      android: {
        marginBottom: 25,
      },
    }),
  },
  title: {
    ...Typography.fancyFont,
    color: Colors.blue,
    fontSize: 55,
    textAlign: 'center',
    ...Platform.select({
      android: {
        lineHeight: 55,
      },
    }),
  },
});

export default HomeScreen;
