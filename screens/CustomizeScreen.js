import React, { useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IPHONE_8_OR_SMALLER } from '../util/constants';

import { Button, Colors, Typography } from '../styles';
import customizations from '../util/customizations';
import CustomizationOption from '../components/CustomizationOption';
import { CustomizationsHelpers } from '../helpers';
import ScreenTopSection from '../components/ScreenTopSection';
import CustomizationModal from '../components/CustomizationModal';

const CustomizeScreen = props => {
  const context = props.screenProps.context;

  const [selectedOption, setSelectedOption] = useState(null);
  const [applyingStyle, setApplyingStyle] = useState(false);

  const onOptionPress = option => {
    if (selectedOption && selectedOption.id === option.id) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };

  const isOptionSelected = option => {
    return !!selectedOption && option.id === selectedOption.id;
  };

  const userCanAffordToUnlockSelectedCustomization = () => {
    return selectedOption && selectedOption.pointsToUnlock <= context.brainPower;
  };

  const renderCustomizationOptions = () => {
    return customizations.map((customization, i) => (
      <CustomizationOption
        key={`customization-${i}`}
        data={customization}
        selected={isOptionSelected(customization)}
        onPress={onOptionPress}
        unlocked={CustomizationsHelpers.customizationHasAlreadyBeenUnlocked(context, customization)}
      />
    ));
  };

  const buildGrid = (items, itemsPerRow = 3) => {
    const ungroupedItems = [...items];
    const rows = [];
    let key = 0;

    while (ungroupedItems.length > 0) {
      const group = ungroupedItems.splice(0, itemsPerRow);

      rows.push(
        <View key={`row-${key++}`} style={styles.row}>
          {group}
        </View>
      );
    }

    return <React.Fragment>{rows.map(group => group)}</React.Fragment>;
  };

  const applyStyle = () => {
    setApplyingStyle(true);
    CustomizationsHelpers.enableCustomization(context, selectedOption);
  };

  const ctaDisplay = () => {
    if (CustomizationsHelpers.customizationHasAlreadyBeenUnlocked(context, selectedOption)) {
      return (
        <TouchableOpacity style={Button.wideButton(Colors.aquaBlue, Colors.darkAquaBlue)} onPress={applyStyle}>
          <Text style={Button.wideButtonText}>Apply</Text>
        </TouchableOpacity>
      );
    } else {
      if (userCanAffordToUnlockSelectedCustomization()) {
        return (
          <TouchableOpacity
            style={Button.wideButton(Colors.aquaGreen, Colors.darkAquaGreen)}
            onPress={() => CustomizationsHelpers.unlockCustomization(context, selectedOption)}
          >
            <Text style={Button.wideButtonText}>Unlock</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <Text style={styles.notEnoughPointsMessage}>
            You don't have enough points for that one yet. Keep learning!
          </Text>
        );
      }
    }
  };

  const navigateHome = () => props.navigation.navigate('Home');
  const onContinuePress = () => setApplyingStyle(false);

  return (
    <View style={styles.container}>
      <CustomizationModal
        visible={applyingStyle}
        context={context}
        customization={selectedOption || {}}
        onContinuePress={() => {
          onContinuePress();
          navigateHome();
        }}
      />
      <ScreenTopSection backNavigation={navigateHome} brainPower={context.brainPower} />
      <View style={styles.content}>
        <Text style={styles.header}>Customize Your Game</Text>
        <View style={styles.optionsContainer}>{buildGrid(renderCustomizationOptions())}</View>
        <View style={styles.ctaSection}>{selectedOption ? ctaDisplay() : null}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  ctaSection: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    ...Typography.h2,
    color: Colors.blue,
    textAlign: 'center',
    fontSize: IPHONE_8_OR_SMALLER ? 35 : 45,
    ...Platform.select({
      lineHeight: IPHONE_8_OR_SMALLER ? 35 : 45,
    }),
  },
  optionsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  notEnoughPointsMessage: {
    ...Typography.mainFont,
    color: Colors.gray,
    fontSize: 14,
    textAlign: 'center',
    margin: 20,
  },
  row: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default CustomizeScreen;
