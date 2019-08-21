import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Modal as ModalStyles } from '../styles';
import { exitLevelButton, muscleIcon, nextLevelButton } from '../assets';

const GameWonModal = ({ earnedBrainPower, onExitPress, onNextLevelPress, visible }) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View style={ModalStyles.wrapper}>
      <View style={ModalStyles.contentContainer}>
        <Text style={ModalStyles.header}>You did it!</Text>
        <Text style={ModalStyles.subheader}>{`+${earnedBrainPower} Brain Power`}</Text>
        <Image style={{ height: 58, width: 58 }} source={muscleIcon} />
        <TouchableOpacity onPress={() => {}}>
          <Image style={ModalStyles.button} source={nextLevelButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onExitPress}>
          <Image style={ModalStyles.button} source={exitLevelButton} />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default GameWonModal;
