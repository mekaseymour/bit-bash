import React from 'react';
import { Image, Modal, Text, View } from 'react-native';
import { Modal as ModalStyles } from '../styles';
import { exitLevelButton, resetButton, successKidIcon } from '../assets';
import ModalButton from './ModalButton';

const GameLostModal = ({ visible, mode, onExitPress, onResetPress }) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View style={ModalStyles.wrapper}>
      <View style={ModalStyles.contentContainer}>
        <Text style={ModalStyles.header}>Try Again!</Text>
        <Text style={ModalStyles.subheader}>You Can Do It</Text>
        <Image style={{ height: 70, width: 65, marginTop: 5 }} source={successKidIcon} />
        <ModalButton onPress={onResetPress} type="primary">
          Reset
        </ModalButton>
        <ModalButton onPress={onExitPress}>{mode === 'practice' ? 'Exit Round' : 'Exit Level'}</ModalButton>
      </View>
    </View>
  </Modal>
);

export default GameLostModal;
