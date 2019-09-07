import React, { useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Modal as ModalStyles, Typography } from '../styles';
import ModalButton from './ModalButton';
import { getOperatorForDisplay } from '../util/operations';

import { hintIcon } from '../assets';

const HintModal = ({
  hints,
  hintsUnlocked,
  onDismissPress,
  onUnlockHintPress,
  userHasEnoughBrainPowerForHint,
  visible,
}) => {
  const [unlockedHints, setUnlockedHints] = useState([]);
  const [levelHints, setLevelHints] = useState([]);

  useEffect(
    () => {
      if (hints) {
        setUnlockedHints(hints.slice(0, hintsUnlocked));
        setLevelHints(hints);
      }
    },
    [hints, hintsUnlocked]
  );

  const hintsAreAvailableForLevel = hints && hints.length > 0;
  const gameHasSomeUnlockedHints = hintsUnlocked > 0;
  const allHintsHaveBeenUnlocked = unlockedHints === levelHints.length;
  const areMoreHintsToUnlock = unlockedHints.length < levelHints.length;

  const onGetHintPress = () => {
    if (hintsUnlocked) {
      const nextAvailableHint = hints[hintsUnlocked];
      onUnlockHintPress(nextAvailableHint);
    } else {
      const firstHint = hints[0];
      onUnlockHintPress(firstHint);
    }
  };

  const getHintsDisplay = () =>
    unlockedHints.map((hint, i) => (
      <Text key={`hint-${i}`} style={{ ...styles.bodyText, fontSize: 22 }}>
        {hint}
      </Text>
    ));

  const headerText = () => {
    if (!areMoreHintsToUnlock) {
      return 'All The Hints';
    } else if (gameHasSomeUnlockedHints) {
      return 'Need Another Hint?';
    } else {
      return 'Need a Hint?';
    }
  };

  const getMainHintContent = () => {
    if (!hintsAreAvailableForLevel) {
      <Text style={styles.bodyText}>There are no hints available for this level</Text>;
    } else if (gameHasSomeUnlockedHints) {
      if (!allHintsHaveBeenUnlocked && !userHasEnoughBrainPowerForHint) {
        return (
          <React.Fragment>
            <View>{getHintsDisplay()}</View>
            <Text style={styles.bodyText}>(You need 10 points to unlock another hint)</Text>
          </React.Fragment>
        );
      } else {
        return <View>{getHintsDisplay()}</View>;
      }
    } else if (!userHasEnoughBrainPowerForHint) {
      return (
        <React.Fragment>
          <Text style={styles.bodyText}>(You need 10 points to unlock a hint)</Text>
        </React.Fragment>
      );
    } else {
      return <Image style={{ height: 88, width: 88, marginVertical: 5 }} source={hintIcon} />;
    }
  };

  const getModalButtons = () => {
    // if no hints available, all hints have been unlocked, or not enough brain power
    if (!hintsAreAvailableForLevel || allHintsHaveBeenUnlocked || !userHasEnoughBrainPowerForHint) {
      return (
        <React.Fragment>
          <ModalButton onPress={onDismissPress}>Keep Trying</ModalButton>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <ModalButton onPress={onGetHintPress} type="primary">
            Hint (-10 Pts)
          </ModalButton>
          <ModalButton onPress={onDismissPress}>Keep Trying</ModalButton>
        </React.Fragment>
      );
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={ModalStyles.wrapper}>
        <View style={ModalStyles.contentContainer}>
          <Text style={ModalStyles.header} data-test="hint-modal-header">
            {headerText()}
          </Text>
          {getMainHintContent()}
          {getModalButtons()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bodyText: {
    color: Colors.gray,
    ...Typography.mainFont,
    fontSize: 18,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  questionMark: {
    fontSize: 72,
    color: Colors.gray,
    ...Typography.mainFont,
  },
});

export default HintModal;
