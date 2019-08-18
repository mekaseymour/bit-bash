import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Modal as ModalStyles, Typography } from '../styles';

const PauseModal = ({ onExitPress, onResumePress, visible }) => (
  <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => {}}>
    <View style={ModalStyles.wrapper}>
      <View style={ModalStyles.contentContainer}>
        <Text style={ModalStyles.header}>Taking a Brain Break</Text>
        <Image style={ModalStyles.icon} source={require('../assets/icons/brain-2x.png')} />
        <TouchableOpacity onPress={onResumePress}>
          <Image style={ModalStyles.button} source={require('../assets/icons/resume-button-2x.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onExitPress}>
          <Image style={ModalStyles.button} source={require('../assets/icons/exit-level-button-2x.png')} />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default PauseModal;
