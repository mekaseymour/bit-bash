import React from 'react';
import { Image, Modal, Text, View } from 'react-native';
import { Colors, Modal as ModalStyles, Typography } from '../styles';
import ModalButton from './ModalButton';
import ModalLevelAndBrainPowerSection from './ModalLevelAndBrainPowerSection';

const PauseModal = ({ brainPower, level, mode, onExitPress, onResumePress, visible }) => (
  <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => {}}>
    <View style={ModalStyles.wrapper}>
      <View style={ModalStyles.container}>
        <ModalLevelAndBrainPowerSection brainPower={brainPower} level={level} mode={mode} />
        <View style={ModalStyles.content}>
          <Text style={ModalStyles.header}>Taking a Brain Break</Text>
          <Image style={{ width: 65, height: 56 }} source={require('../assets/icons/brain-2x.png')} />
          <View>
            <ModalButton onPress={onResumePress} type="primary">
              Resume
            </ModalButton>
            <ModalButton onPress={onExitPress}>{mode === 'practice' ? 'Exit Round' : 'Exit Level'}</ModalButton>
          </View>
        </View>
      </View>
    </View>
  </Modal>
);

export default PauseModal;
