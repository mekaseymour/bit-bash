import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Modal as ModalStyles } from '../styles';

const GameWonModal = ({ visible, onHomePress }) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View style={ModalStyles.wrapper}>
      <View style={ModalStyles.contentContainer}>
        <Text style={ModalStyles.header}>You did it!</Text>
        <Text style={ModalStyles.subheader}>+[ num ] Brain Power</Text>
        <Image style={{ height: 58, width: 58 }} source={require('../assets/icons/muscle-2x.png')} />
        <TouchableOpacity onPress={() => {}}>
          <Image style={ModalStyles.button} source={require('../assets/icons/next-level-button-2x.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onHomePress}>
          <Image style={ModalStyles.button} source={require('../assets/icons/home-button-2x.png')} />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default GameWonModal;
