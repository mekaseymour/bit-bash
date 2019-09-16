import React from 'react';
import { Image, Modal, Text, View } from 'react-native';
import { Modal as ModalStyles } from '../styles';
import { muscleIcon } from '../assets';
import ModalButton from './ModalButton';

const GameWonModal = ({ earnedBrainPower, mode, onExitPress, onNextLevelPress, visible }) => {
  const brainPowerMessage = !!earnedBrainPower ? `+${earnedBrainPower} Brain Power` : `(Again)`;

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={ModalStyles.wrapper}>
        <View style={ModalStyles.container}>
          <View style={ModalStyles.content}>
            <View>
              <Text style={ModalStyles.header}>You did it!</Text>
              <Text style={ModalStyles.subheader}>{brainPowerMessage}</Text>
            </View>
            <Image style={{ height: 58, width: 58 }} source={muscleIcon} />
            <View>
              <ModalButton onPress={onNextLevelPress} type="primary">
                {mode === 'practice' ? 'Next Round' : 'Next Level'}
              </ModalButton>
              <ModalButton onPress={onExitPress}>{mode === 'practice' ? 'Exit Round' : 'Exit Level'}</ModalButton>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GameWonModal;
