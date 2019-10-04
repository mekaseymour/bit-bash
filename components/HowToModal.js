import React, { useState } from 'react';
import { AsyncStorage, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Modal as ModalStyles, Typography } from '../styles';
import ModalButton from './ModalButton';
import { confettiIcon } from '../assets';
import { IS_FIRST_TIME_OPENING_APP } from '../config/storageKeys';
import { IPHONE_8_OR_SMALLER } from '../util/constants';

const mockGameBoard = require('../assets/instructions.png');
const mockSolutionStepOne = require('../assets/demo-equation1.png');
const mockSolutionStepTwo = require('../assets/demo-equation2.png');

const GameInstructions = () => (
  <View style={styles.modalContentWrapper}>
    <Image style={styles.boardImageDimensions} source={mockGameBoard} />
    <View style={styles.textSectionWrapper}>
      <Text style={{ ...styles.modalText }}>Use all the numbers given to get the target number (in this case, 16)</Text>
      <Text style={{ ...styles.modalText }}>
        To perform an operation, tap one of the circles, an operator button, then another circle
      </Text>
    </View>
  </View>
);

const GameSolutions = () => (
  <View style={styles.modalContentWrapper}>
    <View>
      <Image style={styles.moveOneImageDimensions} source={mockSolutionStepOne} />
      <Image style={styles.moveTwoImageDimensions} source={mockSolutionStepTwo} />
    </View>
    <Image style={styles.iconDimensions} source={confettiIcon} />
    <Text style={styles.modalText}>And that's all there is to it!</Text>
  </View>
);

const NextButton = ({ onPress }) => (
  <ModalButton onPress={onPress} type="primary">
    Next
  </ModalButton>
);

const DismissButton = ({ onPress }) => (
  <ModalButton onPress={onPress} type="primary">
    Got It
  </ModalButton>
);

const HowToModal = ({ context, visible }) => {
  const [onFirstSection, setOnFirstSection] = useState(true);
  const [isVisible, setIsVisible] = useState(visible);

  const returnToFirstSection = () => setOnFirstSection(true);
  const goToSecondSection = () => setOnFirstSection(false);
  const dismissModal = () => {
    setIsVisible(false);
    context.setIsFirstTimeOpeningApp(false);
    AsyncStorage.setItem(IS_FIRST_TIME_OPENING_APP, JSON.stringify(false));
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={() => {}}>
      <View style={ModalStyles.wrapper}>
        <View style={styles.modalContainer}>
          <View style={ModalStyles.content}>
            <Text style={{ ...ModalStyles.header, marginVertical: 0, marginTop: 10 }}>How To Play</Text>
            {onFirstSection ? <GameInstructions /> : <GameSolutions />}
            <View style={ModalStyles.bottomSection}>
              {onFirstSection ? <NextButton onPress={goToSecondSection} /> : <DismissButton onPress={dismissModal} />}
              {onFirstSection ? (
                <TouchableOpacity onPress={dismissModal}>
                  <Text style={{ textDecorationLine: 'underline', ...styles.modalText, marginTop: 10 }}>
                    Don't Need an Intro
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={returnToFirstSection}>
                  <Text style={{ textDecorationLine: 'underline', ...styles.modalText, marginTop: 10 }}>Go Back</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  boardImageDimensions: {
    height: IPHONE_8_OR_SMALLER ? 222 : 317,
    width: IPHONE_8_OR_SMALLER ? 173 : 247,
  },
  iconDimensions: {
    height: IPHONE_8_OR_SMALLER ? 45 : 65,
    width: IPHONE_8_OR_SMALLER ? 45 : 65,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    height: IPHONE_8_OR_SMALLER ? 570 : 650,
    width: 300,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  modalContentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    ...Typography.mainFont,
    color: Colors.blue,
    textAlign: 'center',
    marginTop: 20,
    ...Platform.select({
      android: {
        marginTop: 0,
      },
    }),
  },
  moveOneImageDimensions: {
    width: IPHONE_8_OR_SMALLER ? 173 : 247,
    height: IPHONE_8_OR_SMALLER ? 107 : 153,
    marginBottom: 15,
  },
  moveTwoImageDimensions: {
    width: IPHONE_8_OR_SMALLER ? 173 : 247,
    height: IPHONE_8_OR_SMALLER ? 124 : 176,
    marginBottom: 15,
  },
  textSectionWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HowToModal;
