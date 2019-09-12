import React from 'react';
import { Image, Modal, Text, View } from 'react-native';
import { Colors, Modal as ModalStyles, Typography } from '../styles';
import ModalButton from './ModalButton';
import BrainPowerSection from './BrainPowerSection';

const PauseModal = ({ brainPower, level, mode, onExitPress, onResumePress, visible }) => (
  <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => {}}>
    <View style={ModalStyles.wrapper}>
      <View style={ModalStyles.contentContainer}>
        {mode !== 'practice' ? <Text style={ModalStyles.topSectionText}>{`Level: ${level}`}</Text> : null}
        <Text style={ModalStyles.topSectionText}>{`Brain Power: ${brainPower}`}</Text>
        <Text style={ModalStyles.header}>Taking a Brain Break</Text>
        <Image style={{ width: 65, height: 56 }} source={require('../assets/icons/brain-2x.png')} />
        <ModalButton onPress={onResumePress} type="primary">
          Resume
        </ModalButton>
        <ModalButton onPress={onExitPress}>{mode === 'practice' ? 'Exit Round' : 'Exit Level'}</ModalButton>
      </View>
    </View>
  </Modal>
);

export default PauseModal;
