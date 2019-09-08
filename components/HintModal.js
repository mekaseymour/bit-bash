import React, { useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Modal as ModalStyles, Typography } from '../styles';
import ModalButton from './ModalButton';
import { getOperatorForDisplay } from '../util/operations';

import { hintIcon } from '../assets';

const NO_AVAILABLE_HINTS_MESSAGE = 'There are no hints available for this level';
const POINTS_NEEDED_TO_UNLOCK = '(You need 10 points to unlock a hint)';
const POINTS_NEEDED_TO_UNLOCK_ANOTHER = '(You need 10 points to unlock another hint)';

export const ALL_HINTS_HEADER = 'All The Hints';
export const NEED_A_HINT_HEADER = 'Need a Hint?';
export const NEED_ANOTHER_HINT_HEADER = 'Need Another Hint?';

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
  const allHintsHaveBeenUnlocked = levelHints.length > 0 && unlockedHints.length === levelHints.length;

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
    if (allHintsHaveBeenUnlocked) {
      return ALL_HINTS_HEADER;
    } else if (gameHasSomeUnlockedHints) {
      return NEED_ANOTHER_HINT_HEADER;
    } else {
      return NEED_A_HINT_HEADER;
    }
  };

  const getMainHintContent = () => {
    if (!hintsAreAvailableForLevel) {
      return (
        <Text style={styles.bodyText} data-test="no-hints-for-level-message">
          {NO_AVAILABLE_HINTS_MESSAGE}
        </Text>
      );
    } else if (gameHasSomeUnlockedHints) {
      if (!allHintsHaveBeenUnlocked && !userHasEnoughBrainPowerForHint) {
        return (
          <React.Fragment>
            <View>{getHintsDisplay()}</View>
            <Text style={styles.bodyText} data-test="points-needed-to-unlock-another">
              {POINTS_NEEDED_TO_UNLOCK_ANOTHER}
            </Text>
          </React.Fragment>
        );
      } else {
        return <View>{getHintsDisplay()}</View>;
      }
    } else if (!userHasEnoughBrainPowerForHint) {
      return (
        <React.Fragment>
          <Text style={styles.bodyText} data-test="points-needed-to-unlock">
            {POINTS_NEEDED_TO_UNLOCK}
          </Text>
        </React.Fragment>
      );
    } else {
      return <Image style={{ height: 88, width: 88, marginVertical: 5 }} source={hintIcon} />;
    }
  };

  const getModalButtons = () => {
    if (!hintsAreAvailableForLevel || allHintsHaveBeenUnlocked || !userHasEnoughBrainPowerForHint) {
      return (
        <React.Fragment>
          <ModalButton onPress={onDismissPress} data-test="hint-dismiss-button">
            Keep Trying
          </ModalButton>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <ModalButton onPress={onGetHintPress} type="primary" data-test="get-hint-button">
            Hint (-10 Pts)
          </ModalButton>
          <ModalButton onPress={onDismissPress} data-test="hint-dismiss-button">
            Keep Trying
          </ModalButton>
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
