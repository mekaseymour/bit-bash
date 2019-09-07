import React from 'react';
import TestRenderer from 'react-test-renderer';
import HintModal from '../HintModal';

test('when level does not have hints, shows correct message and modal button', () => {
  const props = {
    hints: [],
    hintsUnlocked: 0,
    onDismissPress: () => {},
    onUnlockHintPress: () => {},
    userHasEnoughBrainPowerForHint: true,
    visible: true,
  };

  const testRenderer = TestRenderer.create(<HintModal {...props} />);
  const renderedTestComponent = testRenderer.root;

  expect(renderedTestComponent.findByProps({ 'data-test': 'hint-modal-header' }));
});
