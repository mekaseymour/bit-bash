import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Modal as ModalStyles } from '../styles';
import { confettiIcon } from '../assets';
import ModalButton from './ModalButton';

const CompletedSectionModal = ({ visible, onAcknowledgePress }) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View style={ModalStyles.wrapper}>
      <View style={ModalStyles.contentContainer}>
        <Text style={ModalStyles.header}>You're on fire!</Text>
        <Text style={ModalStyles.subheader}>{`+25 Brain Power`}</Text>
        <Image style={{ height: 65, width: 65, marginVertical: 20 }} source={confettiIcon} />
        <Text style={ModalStyles.subheader}>Not all heroes carry calculators</Text>
        <ModalButton onPress={onAcknowledgePress} type="primary">
          Continue
        </ModalButton>
      </View>
    </View>
  </Modal>
);

export default CompletedSectionModal;
