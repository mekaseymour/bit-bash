import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Modal as ModalStyles } from '../styles';

const GameLostModal = ({ visible }) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View style={ModalStyles.wrapper}>
      <View style={ModalStyles.contentContainer}>
        <Text style={ModalStyles.header}>Try Again!</Text>
        <Text style={ModalStyles.subheader}>You Can Do It</Text>
        <Image style={{ height: 70, width: 65, marginTop: 5 }} source={require('../assets/icons/success-kid-2x.png')} />
        <TouchableOpacity onPress={() => {}}>
          <Image style={ModalStyles.button} source={require('../assets/icons/reset-button-2x.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Image style={ModalStyles.button} source={require('../assets/icons/home-button-2x.png')} />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default GameLostModal;
