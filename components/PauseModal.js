import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Typography } from '../styles';

const PauseModal = ({ onExitPress, onResumePress, visible }) => (
  <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => {}}>
    <View style={styles.modalUnderlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Taking a Brain Break</Text>
        <Image style={styles.brainIcon} source={require('../assets/icons/brain-2x.png')} />
        <TouchableOpacity onPress={onResumePress}>
          <Image style={styles.modalButton} source={require('../assets/icons/resume-button-2x.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onExitPress}>
          <Image style={styles.modalButton} source={require('../assets/icons/exit-level-button-2x.png')} />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  brainIcon: {
    width: 65,
    height: 56,
    marginBottom: 5,
  },
  modalButton: {
    width: 245,
    height: 55,
    marginTop: 13,
  },
  modalContent: {
    backgroundColor: Colors.white,
    height: 300,
    width: 265,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    ...Typography.mainFont,
    color: Colors.blue,
    fontSize: 25,
    textAlign: 'center',
  },
  modalUnderlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteWithOpacity,
  },
});

export default PauseModal;
