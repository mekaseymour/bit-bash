import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Modal as ModalStyles } from '../styles';
import { exitLevelButton, resetButton, successKidIcon } from '../assets';

const GameLostModal = ({ visible, onExitPress }) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View style={ModalStyles.wrapper}>
      <View style={ModalStyles.contentContainer}>
        <Text style={ModalStyles.header}>Try Again!</Text>
        <Text style={ModalStyles.subheader}>You Can Do It</Text>
        <Image style={{ height: 70, width: 65, marginTop: 5 }} source={successKidIcon} />
        <TouchableOpacity onPress={() => {}}>
          <Image style={ModalStyles.button} source={resetButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onExitPress}>
          <Image style={ModalStyles.button} source={exitLevelButton} />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default GameLostModal;
