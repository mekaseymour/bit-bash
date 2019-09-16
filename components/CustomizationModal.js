import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal as ModalStyles } from '../styles';
import ModalButton from './ModalButton';
import { Typography, Colors } from '../styles';
import { CustomizationsHelpers } from '../helpers';

const CustomizationModal = ({ visible, context, customization, onContinuePress, onDefaultPress }) => {
  const [showingDefault, setShowingDefault] = useState(false);

  const setDefaultStyle = () => {
    CustomizationsHelpers.enableCustomization(context, null);
    setShowingDefault(true);
  };
  const enableCustomization = () => {
    CustomizationsHelpers.enableCustomization(context, customization);
    setShowingDefault(false);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={ModalStyles.wrapper}>
        <View style={{ ...ModalStyles.container, paddingHorizontal: 10 }}>
          <Text style={ModalStyles.header}>Hooray! Your new getup has been applied!</Text>
          {showingDefault ? (
            <View style={styles.defaultIcon} />
          ) : (
            <Image style={{ height: 85, width: 85, marginBottom: 10 }} source={customization.icon} />
          )}
          <ModalButton onPress={onContinuePress} type="primary">
            Continue
          </ModalButton>
          {showingDefault ? (
            <TouchableOpacity onPress={enableCustomization}>
              <Text style={styles.undoChangesText}>Back to Custom Style</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={setDefaultStyle}>
              <Text style={styles.undoChangesText}>Back to Default Style</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  defaultIcon: {
    height: 85,
    width: 85,
    backgroundColor: Colors.blue,
    borderRadius: 50,
    marginBottom: 10,
  },
  undoChangesText: {
    ...Typography.mainFont,
    color: Colors.blue,
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default CustomizationModal;
